"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Underlined from "./Underlined";
import { BOOK, SITE, SOCIALS } from "@/lib/site";

type Errors = { name?: string; email?: string; message?: string };

export default function Book() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const successHeadingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (sent) successHeadingRef.current?.focus();
  }, [sent]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const company = String(data.get("company") || "").trim();
    const message = String(data.get("message") || "").trim();

    const nextErrors: Errors = {};
    if (!name) nextErrors.name = "Please enter your name.";
    if (!email) nextErrors.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      nextErrors.email = "Please enter a valid email address.";
    if (!message) nextErrors.message = "Please tell us a bit about your goals.";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const firstField = nextErrors.name
        ? "name"
        : nextErrors.email
          ? "email"
          : "message";
      document.getElementById(firstField)?.focus();
      return;
    }

    setErrors({});

    const subject = `Strategy call request from ${name}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : null,
      "",
      message,
    ]
      .filter((line) => line !== null)
      .join("\n");

    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    setSent(true);
  }

  return (
    <section
      id="book"
      className="relative overflow-hidden bg-navy text-white"
    >
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.06]" />
      <span className="marginalia !text-[#B9CBE4]">appointments open</span>
      <div className="container-x relative z-10 py-24 sm:py-32">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Left — the offer */}
          <div>
            <span className="kicker text-[#78efeb]">{BOOK.kicker}</span>
            <h2
              data-split
              className="split-parent mt-4 font-display text-4xl font-medium leading-[1.05] tracking-tight text-balance sm:text-6xl"
            >
              Let&apos;s map your <Underlined>growth</Underlined>.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-[#B9CBE4] text-pretty">
              {BOOK.copy}
            </p>

            <ul className="mt-10 max-w-md">
              {BOOK.checkmarks.map((item) => (
                <li
                  key={item}
                  className="flex items-baseline gap-4 border-b border-white/15 py-4 first:border-t"
                >
                  <span aria-hidden="true" className="font-mono text-[#78efeb]">
                    ✓
                  </span>
                  <span className="text-base">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 space-y-3">
              <a
                href={`mailto:${SITE.email}`}
                className="group flex w-fit items-baseline gap-3 text-lg font-medium"
              >
                <span aria-hidden="true" className="font-mono text-sm text-[#78efeb]">
                  ✉
                </span>
                <span className="border-b border-white/25 transition-colors group-hover:border-white/70">
                  {SITE.email}
                </span>
              </a>
              <ul className="flex flex-wrap gap-x-5 gap-y-1 pl-7">
                {SOCIALS.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="kicker kicker-bare text-[#B9CBE4] transition-colors hover:text-[#78efeb]"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right — the form, on a white plate */}
          <div className="border border-white/15 bg-paper p-7 text-ink sm:p-9">
            {sent ? (
              <div
                role="status"
                aria-live="polite"
                className="flex h-full min-h-[320px] flex-col items-center justify-center text-center"
              >
                <div className="grid h-14 w-14 place-items-center rounded-full bg-[#78efeb]/15 font-mono text-2xl text-[#3DB5B0]">
                  ✓
                </div>
                <h3
                  ref={successHeadingRef}
                  tabIndex={-1}
                  className="mt-5 font-display text-2xl font-medium outline-none"
                >
                  Thanks — your email is ready to send.
                </h3>
                <p className="mt-2 max-w-sm text-sm text-muted">
                  We&apos;ve opened your mail app with the details filled in. If
                  it didn&apos;t open, email us directly at{" "}
                  <a
                    href={`mailto:${SITE.email}`}
                    className="font-medium text-navy underline"
                  >
                    {SITE.email}
                  </a>
                  .
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-6 text-sm font-semibold text-ink underline underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <p className="kicker text-muted">Request a call</p>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Name" name="name" required error={errors.name}>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      aria-required="true"
                      className="input"
                      placeholder="Jane Doe"
                      aria-invalid={errors.name ? true : undefined}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                  </Field>
                  <Field label="Email" name="email" required error={errors.email}>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      aria-required="true"
                      className="input"
                      placeholder="jane@startup.com"
                      aria-invalid={errors.email ? true : undefined}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                  </Field>
                </div>
                <Field label="Company" name="company">
                  <input
                    id="company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    className="input"
                    placeholder="Startup (optional)"
                  />
                </Field>
                <Field
                  label="What do you want to grow?"
                  name="message"
                  required
                  error={errors.message}
                >
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    aria-required="true"
                    className="input resize-none"
                    placeholder="A bit about your startup and goals…"
                    aria-invalid={errors.message ? true : undefined}
                    aria-describedby={
                      errors.message ? "message-error" : undefined
                    }
                  />
                </Field>
                <button
                  type="submit"
                  data-cursor="book"
                  className="btn-ink btn-press inline-flex w-full items-center justify-center bg-[#78efeb] px-6 py-3.5 text-sm font-semibold text-navy [--ink-fill:var(--color-navy)]"
                >
                  Book my strategy call
                </button>
                <p className="text-center font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
                  30 minutes · Google Meet · No pitch
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  required,
  error,
  children,
}: {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block font-mono text-[0.65rem] font-medium uppercase tracking-[0.14em] text-muted"
      >
        {label}
        {required && (
          <>
            <span className="text-red-500" aria-hidden="true">
              {" "}
              *
            </span>
            <span className="sr-only"> (required)</span>
          </>
        )}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-xs font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
