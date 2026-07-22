"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Wrong password. Try again.");
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-4">
          <Image
            src="/brand/cybrix-mark.png"
            alt="Cybrix"
            width={72}
            height={72}
            className="h-16 w-auto"
          />
          <div className="text-center">
            <p className="kicker text-muted">Admin access</p>
            <h1 className="font-display text-2xl italic text-ink">
              Cybrix Studio
            </h1>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-md border border-line-strong bg-paper-2 p-6"
        >
          <label className="mb-1 block kicker text-muted" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input mb-4"
            placeholder="Enter admin password"
            autoFocus
          />
          {error && (
            <p className="mb-4 text-sm text-oxblood-bright">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading || !password}
            className="btn-ink btn-press w-full border border-navy bg-navy px-5 py-2.5 text-sm font-semibold text-cream shadow-[0_10px_20px_-8px_rgba(14,26,58,0.85)] [--ink-fill:var(--color-navy-2)] disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center kicker text-muted">
          ← <a href="/" className="hover:text-teal-bright transition-colors">Back to site</a>
        </p>
      </div>
    </main>
  );
}
