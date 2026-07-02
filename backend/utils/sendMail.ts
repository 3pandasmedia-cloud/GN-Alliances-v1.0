import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendOTPEmail = async (
  email: string,
  otp: string
) => {
  await transporter.sendMail({
    from: `"GN Alliances" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "GN Alliances Security Verification",

    html: `
      <div style="font-family:sans-serif">
        <h2>GN Alliances</h2>

        <p>Your verification code:</p>

        <h1>${otp}</h1>

        <p>This code expires in 10 minutes.</p>
      </div>
    `,
  });
};