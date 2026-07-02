import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import prisma from "../config/prisma";

const otpStore = new Map<string, string>();

export const resendLoginOTP = async (
    req: Request,
    res: Response
) => {
    try {
        const { email } = req.body;

        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        otpStore.set(email, otp);

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

        if (!user) {
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
            const otp = Math.floor(
                100000 + Math.random() * 900000
            ).toString();

            otpStore.set(
                user.twoFactorEmail!,
                otp
            );

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

        console.log("EMAIL:", email);
        console.log("OTP:", otp);

        const storedOtp = otpStore.get(email);

        console.log("STORED OTP:", storedOtp);

        if (!storedOtp || storedOtp !== otp) {
            return res.status(400).json({
                message: "Invalid OTP",
            });
        }

        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { twoFactorEmail: email },
                ],
            },
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

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

        // TEMPORARY
        // otpStore.delete(email);

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