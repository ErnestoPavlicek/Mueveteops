"use client";

import { useId, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 100;
const MAX_COMPANY = 100;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 2000;

export function ContactForm() {
  const formId = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [messageLen, setMessageLen] = useState(0);

  function validate(formData: FormData): FieldErrors {
    const next: FieldErrors = {};
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name) next.name = "Please enter your name.";
    else if (name.length > MAX_NAME) next.name = `Keep it under ${MAX_NAME} characters.`;

    if (!email) next.email = "Please enter your email.";
    else if (email.length > MAX_EMAIL) next.email = "That email looks too long.";
    else if (!EMAIL_RE.test(email)) next.email = "Enter a valid email address.";

    if (!message) next.message = "Tell us a bit about your project.";
    else if (message.length < 10) next.message = "A little more detail helps — at least 10 characters.";
    else if (message.length > MAX_MESSAGE) next.message = `Keep it under ${MAX_MESSAGE} characters.`;

    return next;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return; // prevent double-submit

    const formData = new FormData(e.currentTarget);

    // Honeypot — real users won't fill this
    if (String(formData.get("website") ?? "")) {
      setStatus("success"); // silently drop
      return;
    }

    const fieldErrors = validate(formData);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) {
      // Focus the first invalid field
      const firstKey = Object.keys(fieldErrors)[0];
      const el = e.currentTarget.querySelector<HTMLElement>(
        `[name="${firstKey}"]`
      );
      el?.focus();
      return;
    }

    const form = e.currentTarget;
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(formData.get("name") ?? "").trim(),
          email: String(formData.get("email") ?? "").trim(),
          company: String(formData.get("company") ?? "").trim(),
          message: String(formData.get("message") ?? "").trim(),
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
      setMessageLen(0);
    } catch {
      setStatus("error");
    }
  }

  const nameId = `${formId}-name`;
  const emailId = `${formId}-email`;
  const companyId = `${formId}-company`;
  const messageId = `${formId}-message`;
  const messageHintId = `${formId}-message-hint`;

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="rounded-xl bg-[#0D1117] border border-[var(--border)] p-6 sm:p-8 lg:p-10 flex flex-col gap-6 sm:gap-7"
      aria-labelledby={`${formId}-title`}
    >
      <h2
        id={`${formId}-title`}
        className="text-heading text-[var(--text-primary)]"
      >
        Send us a message
      </h2>
      <p className="text-body text-[var(--text-secondary)]">
        Tell us about your business and we&apos;ll get back to you within 24
        hours.
      </p>

      <Field
        id={nameId}
        name="name"
        label="Name"
        placeholder="Your name"
        autoComplete="name"
        maxLength={MAX_NAME}
        error={errors.name}
        required
      />
      <Field
        id={emailId}
        name="email"
        label="Email"
        type="email"
        inputMode="email"
        placeholder="you@company.com"
        autoComplete="email"
        maxLength={MAX_EMAIL}
        error={errors.email}
        required
      />
      <Field
        id={companyId}
        name="company"
        label="Company"
        placeholder="Your company name"
        autoComplete="organization"
        maxLength={MAX_COMPANY}
      />

      {/* Honeypot field — hidden from real users */}
      <div aria-hidden="true" className="hidden">
        <label>
          Website
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between gap-2">
          <label
            htmlFor={messageId}
            className="text-base font-medium text-[var(--text-primary)]"
          >
            Message
            <span aria-hidden="true" className="text-[var(--accent)]">
              {" *"}
            </span>
          </label>
          <span
            className="font-mono text-xs text-[var(--text-secondary)] tabular-nums"
            aria-hidden="true"
          >
            {messageLen}/{MAX_MESSAGE}
          </span>
        </div>
        <textarea
          id={messageId}
          name="message"
          required
          maxLength={MAX_MESSAGE}
          onChange={(e) => setMessageLen(e.target.value.length)}
          aria-invalid={errors.message ? "true" : undefined}
          aria-describedby={
            errors.message ? `${messageId}-error` : messageHintId
          }
          placeholder="Tell us about your project and how we can help..."
          className="min-h-[130px] rounded-md bg-[var(--bg-input)] border border-[var(--border)] px-3.5 py-3.5 text-base text-[var(--text-primary)] placeholder:text-white/[0.19] leading-relaxed resize-y focus:outline-none focus:border-[var(--accent)] transition-colors break-words"
        />
        {errors.message ? (
          <p
            id={`${messageId}-error`}
            className="text-sm text-red-400"
            role="alert"
          >
            {errors.message}
          </p>
        ) : (
          <p id={messageHintId} className="sr-only">
            At least 10 characters.
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        aria-busy={status === "submitting"}
        className="h-12 w-full rounded-md bg-[var(--accent)] text-[var(--bg)] font-semibold text-base hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Sending…" : "Send Message"}
      </button>

      {/* Live region for async status */}
      <div role="status" aria-live="polite" className="min-h-[1.25rem]">
        {status === "success" && (
          <p className="text-sm text-[var(--accent)]">
            Thanks — your message is in. We&apos;ll be in touch within 24 hours.
          </p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-400">
            Something went wrong sending your message. Please try again, or
            email{" "}
            <a
              href="mailto:ernst@mueveops.com"
              className="underline underline-offset-2"
            >
              ernst@mueveops.com
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}

type FieldProps = {
  id: string;
  name: string;
  label: string;
  type?: string;
  inputMode?: "text" | "email" | "tel" | "url" | "numeric";
  placeholder?: string;
  autoComplete?: string;
  maxLength?: number;
  error?: string;
  required?: boolean;
};

function Field({
  id,
  name,
  label,
  type = "text",
  inputMode,
  placeholder,
  autoComplete,
  maxLength,
  error,
  required,
}: FieldProps) {
  const errorId = `${id}-error`;
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-base font-medium text-[var(--text-primary)]"
      >
        {label}
        {required && (
          <span aria-hidden="true" className="text-[var(--accent)]">
            {" *"}
          </span>
        )}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        inputMode={inputMode}
        placeholder={placeholder}
        autoComplete={autoComplete}
        maxLength={maxLength}
        required={required}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? errorId : undefined}
        className="h-11 min-w-0 w-full rounded-md bg-[var(--bg-input)] border border-[var(--border)] px-3.5 text-base text-[var(--text-primary)] placeholder:text-white/[0.19] focus:outline-none focus:border-[var(--accent)] transition-colors"
      />
      {error && (
        <p id={errorId} className="text-sm text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
