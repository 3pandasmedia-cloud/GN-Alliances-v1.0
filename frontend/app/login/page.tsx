"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import LoginOtpDialog from "./LoginOtpDialog";
import styles from "./Login.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifyingOTP, setVerifyingOTP] = useState(false);
  const [resending, setResending] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpEmail, setOtpEmail] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpMessage, setOtpMessage] = useState("");
  const loginBusy = useRef(false), verifyBusy = useRef(false), resendBusy = useRef(false);
  const saveSession = (data: any) => {
    sessionStorage.setItem("gn-user", JSON.stringify({ id: data.id, name: data.name, email: data.email, role: data.role, token: data.token, avatar: data.avatar }));
    router.replace(`/platform/${data.role}`);
  };
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault(); if (loginBusy.current) return;
    loginBusy.current = true; setLoading(true); setError("");
    try {
      const response = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: email.trim(), password }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed. Please try again.");
      if (data.requires2FA) { setOtpEmail(data.email); setOtpCode(""); setOtpError(""); setOtpMessage(""); setShowOtpModal(true); }
      else saveSession(data);
    } catch (error) { setError(error instanceof Error ? error.message : "Unable to connect to the server."); }
    finally { loginBusy.current = false; setLoading(false); }
  };
  const verifyOTP = async () => {
    if (verifyBusy.current || resendBusy.current) return;
    if (!/^\d{6}$/.test(otpCode)) { setOtpError("Enter the 6-digit verification code."); return; }
    verifyBusy.current = true; setVerifyingOTP(true); setOtpError(""); setOtpMessage("");
    try {
      const response = await fetch("/api/auth/verify-login-otp", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: otpEmail, otp: otpCode }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to verify the code.");
      saveSession(data);
    } catch (error) { setOtpError(error instanceof Error ? error.message : "Verification failed. Please try again."); }
    finally { verifyBusy.current = false; setVerifyingOTP(false); }
  };
  const resendOTP = async () => {
    if (resendBusy.current || verifyBusy.current) return;
    resendBusy.current = true; setResending(true); setOtpError(""); setOtpMessage("");
    try {
      const response = await fetch("/api/auth/resend-login-otp", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: otpEmail }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to resend the code.");
      setOtpCode(""); setOtpMessage("A new verification code has been sent.");
    } catch (error) { setOtpError(error instanceof Error ? error.message : "Unable to resend the code."); }
    finally { resendBusy.current = false; setResending(false); }
  };
  return <>
    <main className={styles.page}>
      <section className={styles.brandPanel} aria-label="GN Alliances">
        <Image src="/images/login-bgg.png" alt="" fill priority className={styles.background} sizes="55vw"/>
        <div className={styles.shade}/>
        <div className={styles.brandContent}>
          <Link href="/" className={styles.logo}><Image src="/logos/gn-logo-white.png" alt="GN Alliances" width={260} height={150} priority/></Link>
          <h2>The All-in-One Platform for<br/><span>Smarter Partnerships &amp;<br/>Higher Rewards</span></h2>
        </div>
      </section>
      <section className={styles.loginPanel} aria-label="Sign in">
        <div className={styles.loginCard}>
          <Link href="/" className={styles.mobileLogo}><Image src="/logos/gn-logoa.png" alt="GN Alliances" width={180} height={80}/></Link>
          <header className={styles.welcome}><h1>Welcome Back</h1><p>Sign in to continue to your account</p></header>
          <form className={styles.loginForm} onSubmit={handleLogin}>
            <label className={styles.field} htmlFor="login-email"><span>Email Address</span><input id="login-email" type="email" autoComplete="username" required value={email} onChange={event => setEmail(event.target.value)} placeholder="Enter your email address"/></label>
            <div className={styles.field}><label htmlFor="login-password">Password</label><div className={styles.password}><input id="login-password" type={showPassword ? "text" : "password"} autoComplete="current-password" required value={password} onChange={event => setPassword(event.target.value)} placeholder="Enter your password"/><button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}</button></div></div>
            <div className={styles.formOptions}><label><input type="checkbox"/>Remember me</label><Link href="/login/forgot-password">Forgot Password?</Link></div>
            {error && <p role="alert" className={styles.error}>{error}</p>}
            <button type="submit" disabled={loading} className={styles.primary}>{loading ? "Checking credentials..." : "Sign In"}</button>
          </form>
          <p className={styles.footer}>© 2026 GN Alliances. All rights reserved.</p>
        </div>
      </section>
    </main>
    <LoginOtpDialog open={showOtpModal} email={otpEmail} code={otpCode} onCodeChange={value => { setOtpCode(value); setOtpError(""); }} onVerify={verifyOTP} onResend={resendOTP} onClose={() => { setShowOtpModal(false); setOtpCode(""); }} verifying={verifyingOTP} resending={resending} error={otpError} message={otpMessage}/>
  </>;
}
