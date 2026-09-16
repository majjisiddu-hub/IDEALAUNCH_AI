"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api, setSession } from "../../lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const submit = async (event) => {
    event.preventDefault();
    if (!form.username || !form.password) return setMessage("Enter both your username and password to continue.");
    try { const result = await api.post("/auth/login", form); setSession(result.user, result.token); setMessage("Access confirmed. Opening your workspace..."); router.push(new URLSearchParams(window.location.search).get("next") || "/dashboard"); }
    catch (error) { setMessage(error.message); }
  };
  return <main className="auth-page"><section className="auth-visual"><div className="auth-visual-content"><div className="brand"><span className="brand-mark">I</span><span className="brand-name">IDEA<span>LAUNCH</span></span></div><span className="eyebrow">The startup signal library</span><h1>Find the idea worth building <em>next.</em></h1><p>Explore sharp, practical startup concepts and turn early sparks into your next focused move.</p><div className="auth-metric"><div><strong>01</strong><span>personal workspace</span></div><div><strong>∞</strong><span>ideas to explore</span></div><div><strong>100%</strong><span>in your browser</span></div></div></div></section><section className="auth-panel"><div className="auth-form-wrap"><span className="auth-kicker">Workspace access</span><h2>Welcome back.</h2><p className="auth-subtitle">Sign in to continue exploring your launch queue.</p><form onSubmit={submit} noValidate><div className="form-field"><label htmlFor="username">Username or email</label><input id="username" value={form.username} onChange={(event) => setForm({ ...form, username: event.target.value })} autoComplete="username" placeholder="Enter your username" /></div><div className="form-field"><label htmlFor="password">Password</label><div className="password-wrap"><input id="password" type={show ? "text" : "password"} value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} autoComplete="current-password" placeholder="Enter your password" /><button type="button" className="password-toggle" onClick={() => setShow(!show)}>{show ? "Hide" : "Show"}</button></div></div><div className="form-options"><label className="checkbox-label"><input type="checkbox" /> Remember me</label></div><button className="button button-primary auth-submit" type="submit">Enter workspace <span>→</span></button><p className={`form-message ${message.includes("confirmed") ? "success" : message ? "error" : ""}`}>{message}</p></form><p className="signup-note">Don&apos;t have an account? <Link href="/signup">Create Account</Link></p><p className="auth-note">Your account data is securely handled by the IDEALAUNCH API.</p></div></section></main>;
}
