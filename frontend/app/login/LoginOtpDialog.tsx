"use client";
import { useEffect, useRef } from "react";
import { ShieldCheck, X } from "lucide-react";
import styles from "./Login.module.css";

type Props = { open: boolean; email: string; code: string; onCodeChange: (value: string) => void; onVerify: () => Promise<void>; onResend: () => Promise<void>; onClose: () => void; verifying: boolean; resending: boolean; error: string; message: string };
export default function LoginOtpDialog({ open, email, code, onCodeChange, onVerify, onResend, onClose, verifying, resending, error, message }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) { dialog.showModal(); input.current?.focus(); }
    if (!open && dialog.open) dialog.close();
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);
  // Native modal dialogs enter the browser's top layer, above every page stacking context.
  return <dialog ref={ref} className={styles.dialog} aria-labelledby="login-otp-title" aria-describedby="login-otp-description" onCancel={event => { event.preventDefault(); if (!verifying && !resending) onClose(); }}>
    <div className={styles.dialogContent}>
      <button type="button" className={styles.close} aria-label="Close OTP verification" disabled={verifying || resending} onClick={onClose}><X size={20}/></button>
      <span className={styles.otpIcon}><ShieldCheck size={26}/></span>
      <h2 id="login-otp-title">Verify your login</h2><p id="login-otp-description" className={styles.dialogDescription}>Enter the 6-digit code sent to<br/><strong>{email}</strong></p>
      <form onSubmit={event => { event.preventDefault(); void onVerify(); }} className={styles.otpForm}>
        <label htmlFor="login-otp">Verification code</label>
        <input ref={input} id="login-otp" name="otp" value={code} onChange={event => onCodeChange(event.target.value.replace(/\D/g, "").slice(0, 6))} type="text" inputMode="numeric" autoComplete="one-time-code" required pattern="[0-9]{6}" maxLength={6} placeholder="Enter 6-digit code" disabled={verifying} className={styles.otpInput}/>
        {error && <p role="alert" className={styles.error}>{error}</p>}
        {message && <p role="status" className={styles.success}>{message}</p>}
        <button type="submit" disabled={verifying || resending} className={styles.primary}>{verifying ? "Verifying..." : "Verify OTP"}</button>
      </form>
      <div className={styles.resend}><span>Didn't receive the code?</span><button type="button" onClick={() => void onResend()} disabled={resending || verifying}>{resending ? "Sending..." : "Resend OTP"}</button></div>
    </div>
  </dialog>;
}
