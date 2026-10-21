import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { randomInt } from "crypto";
import prisma from "../config/prisma";

const otpStore = new Map<string, { code: string; userId: string; expiresAt: number; attempts: number }>();

export const resendLoginOTP = async (
    req: Request,
    res: Response
) => {
    try {
        const { email } = req.body;

        const challenge = otpStore.get(email);
        if (!challenge || challenge.expiresAt < Date.now() || challenge.attempts >= 5) {
            return res.status(400).json({ message: "Please sign in with your password first." });
        }
        const otp = randomInt(100000, 1000000).toString();
        otpStore.set(email, { ...challenge, code: otp });

        const transporter =
            nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: Number(process.env.SMTP_PORT),
                secure: false,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
            });

        transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: "GN Alliances Login OTP",
            html: `
        <h2>GN Alliances Login OTP</h2>
        <h1>${otp}</h1>
      `,
        });

        return res.json({
            message: "OTP resent successfully",
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to resend OTP",
        });
    }
};

// ========================================
// LOGIN
// ========================================
export const login = async (
    req: Request,
    res: Response
) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user || user.status !== "ACTIVE") {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }

        const validPassword = await bcrypt.compare(
            password,
            user.password
        );

        if (!validPassword) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }

        // ========================================
        // TWO FACTOR AUTHENTICATION
        // ========================================
        if (user.twoFactor) {
            if (!user.twoFactorEmail) return res.status(400).json({ message: "Two-factor email is not configured." });
            const otp = randomInt(100000, 1000000).toString();
            otpStore.set(user.twoFactorEmail, { code: otp, userId: user.id, expiresAt: Date.now() + 10 * 60 * 1000, attempts: 0 });

            const transporter =
                nodemailer.createTransport({
                    host: process.env.SMTP_HOST,
                    port: Number(
                        process.env.SMTP_PORT
                    ),
                    secure: false,
                    auth: {
                        user: process.env.SMTP_USER,
                        pass: process.env.SMTP_PASS,
                    },
                });

            transporter.sendMail({
                from: process.env.SMTP_USER,
                to: user.twoFactorEmail!,
                subject: "GN Alliances Login OTP",
                html: `
    <h2>GN Alliances Login OTP</h2>
    <h1>${otp}</h1>
  `,
            }).catch(console.error);

            return res.json({
                requires2FA: true,
                email: user.twoFactorEmail,
            });
        }

        // ========================================
        // NORMAL LOGIN
        // ========================================
        const token = jwt.sign(
            {
                id: user.id,
                role: user.role,
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: "7d",
            }
        );

        return res.json({
            token,
            id: user.id,
            role: user.role,
            email: user.email,
            name: user.name,
            avatar: user.avatar,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Server error",
        });
    }
};

// ========================================
// VERIFY LOGIN OTP
// ========================================

export const verifyLoginOTP = async (
    req: Request,
    res: Response
) => {

    try {
        const { email, otp } = req.body;

        const challenge = otpStore.get(email);
        if (!challenge || challenge.expiresAt < Date.now() || challenge.attempts >= 5) {
            otpStore.delete(email);
            return res.status(400).json({ message: "OTP expired. Please sign in again." });
        }
        challenge.attempts += 1;
        if (challenge.code !== otp) return res.status(400).json({ message: "Invalid OTP" });
        const user = await prisma.user.findUnique({ where: { id: challenge.userId } });
        if (!user || user.status !== "ACTIVE" || !user.twoFactor || user.twoFactorEmail !== email) {
            return res.status(401).json({ message: "Invalid login challenge" });
        }
        otpStore.delete(email);

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role,
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: "7d",
            }
        );


        return res.json({
            token,
            id: user.id,
            role: user.role,
            email: user.email,
            name: user.name,
            avatar: user.avatar,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Server error",
        });
    }
};