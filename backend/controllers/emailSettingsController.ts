import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import { EmailSettingsValidationError, emailPattern, getEmailSettings, saveEmailConfig, sendEmail } from "../services/emailService";
export const readEmailSettings = async (_: AuthRequest, res: Response) => {
  try { res.json(await getEmailSettings()); }
  catch { res.status(500).json({ message: "Unable to load email sender settings." }); }
};
export const updateEmailSettings = async (req: AuthRequest, res: Response) => {
  try { res.json(await saveEmailConfig(req.body || {})); }
  catch (error) { res.status(400).json({ message: error instanceof EmailSettingsValidationError ? error.message : "Unable to save email sender settings." }); }
};
const tests = new Map<string, number>();
export const testEmailSettings = async (req: AuthRequest, res: Response) => {
  const to = typeof req.body?.to === "string" ? req.body.to.trim() : "";
  if (to.length > 254 || !emailPattern.test(to)) return res.status(400).json({ message: "Enter a valid test recipient email." });
  const id = req.user?.id || "owner";
  if (Date.now() - (tests.get(id) || 0) < 30000) return res.status(429).json({ message: "Wait 30 seconds before sending another test." });
  tests.set(id, Date.now());
  try {
    const result = await sendEmail({ to, subject: "GN Alliances email configuration test", text: "Your GN Alliances email sender is configured. OTP and demo notification emails use this sender." });
    if (!result.accepted?.length) throw new Error("Not accepted");
    res.json({ message: "Test email accepted by your mail provider. Check the recipient inbox and spam folder." });
  } catch { res.status(502).json({ message: "Test email could not be sent. Check the saved SMTP details and sender permissions with your email provider." }); }
};
