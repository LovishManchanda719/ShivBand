"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  updateProfile,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { LoaderCircle } from "lucide-react";
import { auth } from "@/lib/firebaseConfig";
import Logo from "@/components/Logo";

const friendly = (err: unknown) => {
  const code = err instanceof FirebaseError ? err.code : "";
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "That email and password do not match. Please try again.";
    case "auth/email-already-in-use":
      return "An account with this email already exists. Try signing in instead.";
    case "auth/weak-password":
      return "Please use a password with at least 6 characters.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a minute and try again.";
    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request":
      return "";
    case "auth/unauthorized-domain":
      return "Google sign-in is not enabled for this web address yet.";
    case "auth/network-request-failed":
      return "No internet connection. Please check and try again.";
    default:
      return "Something went wrong. Please try again.";
  }
};

// Official multi-colour Google "G" mark, required by Google's sign-in branding guidelines.
const GoogleMark = () => (
  <svg viewBox="0 0 48 48" className="h-[18px] w-[18px]" aria-hidden="true">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
  </svg>
);

export default function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState<"" | "email" | "google">("");
  const isLogin = mode === "login";

  const done = () => {
    const next = new URLSearchParams(window.location.search).get("next");
    router.push(next && next.startsWith("/") && !next.startsWith("//") ? next : "/");
  };

  const google = async () => {
    setError("");
    setBusy("google");
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      await signInWithPopup(auth, provider);
      done();
    } catch (err) {
      if (err instanceof FirebaseError && err.code === "auth/popup-blocked") {
        await signInWithRedirect(auth, provider);
        return;
      }
      setError(friendly(err));
    } finally {
      setBusy("");
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setBusy("email");
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      } else {
        const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
        if (name.trim()) await updateProfile(cred.user, { displayName: name.trim() });
      }
      done();
    } catch (err) {
      setError(friendly(err));
    } finally {
      setBusy("");
    }
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="mb-8 flex justify-center">
        <Logo variant="badge" size="lg" />
      </div>
      <div className="rounded-3xl border border-line bg-white p-6 sm:p-9">
        <h1 className="text-center font-display text-3xl text-ink">{isLogin ? "Welcome back" : "Create your account"}</h1>
        <p className="mt-2 text-center text-[14px] text-stone">
          {isLogin ? "Sign in to see your booking requests." : "Keep track of your booking requests in one place."}
        </p>

        <button
          type="button"
          onClick={google}
          disabled={!!busy}
          className="mt-8 flex w-full items-center justify-center gap-3 rounded-full border border-line bg-white px-6 py-3 text-[15px] font-medium text-ink transition-colors hover:bg-ivory disabled:opacity-60"
        >
          {busy === "google" ? <LoaderCircle className="h-[18px] w-[18px] animate-spin" strokeWidth={1.75} /> : <GoogleMark />}
          Continue with Google
        </button>

        <div className="my-7 flex items-center gap-4 text-[11px] uppercase tracking-[0.2em] text-stone-light">
          <span className="h-px flex-1 bg-line" /> or with email <span className="h-px flex-1 bg-line" />
        </div>

        <form onSubmit={submit} className="space-y-4">
          {!isLogin && (
            <div>
              <label htmlFor="au-name" className="field-label">
                Name
              </label>
              <input id="au-name" className="field" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required />
            </div>
          )}
          <div>
            <label htmlFor="au-email" className="field-label">
              Email
            </label>
            <input id="au-email" type="email" className="field" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
          </div>
          <div>
            <label htmlFor="au-pass" className="field-label">
              Password
            </label>
            <input
              id="au-pass"
              type="password"
              className="field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={isLogin ? "current-password" : "new-password"}
              minLength={6}
              required
            />
          </div>

          {error && (
            <p className="rounded-xl bg-maroon/5 px-4 py-3 text-[14px] text-maroon" role="alert">
              {error}
            </p>
          )}

          <button type="submit" disabled={!!busy} className="btn-primary w-full">
            {busy === "email" && <LoaderCircle className="h-4 w-4 animate-spin" strokeWidth={1.75} />}
            {isLogin ? "Sign in" : "Create account"}
          </button>
        </form>
      </div>

      <p className="mt-6 text-center text-[14px] text-stone">
        {isLogin ? "New here? " : "Already have an account? "}
        <Link href={isLogin ? "/signup" : "/login"} className="font-medium text-maroon underline-offset-4 hover:underline">
          {isLogin ? "Create an account" : "Sign in"}
        </Link>
      </p>
      <p className="mt-3 text-center text-[13px] text-stone-light">You do not need an account to book — just call or send your date.</p>
    </div>
  );
}
