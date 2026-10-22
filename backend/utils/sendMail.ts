import { sendEmail } from "../services/emailService";

export const sendOTPEmail = async (
  email: string,
  otp: string
) => {
  await sendEmail({
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