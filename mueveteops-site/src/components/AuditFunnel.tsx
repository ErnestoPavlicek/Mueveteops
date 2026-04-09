"use client";

import { useId, useState, useEffect, useRef, useCallback } from "react";
import { Button } from "./ui/Button";

/* ─── Types ─────────────────────────────────────────────────── */

type Phase = 1 | 2 | 3 | 4;

type FormData = {
  name: string;
  email: string;
  company: string;
  website: string;
  teamSize: string;
  industry: string;
  painPoint: string;
};

type CSSVars = React.CSSProperties & Record<`--${string}`, string>;

const INITIAL_FORM: FormData = {
  name: "",
  email: "",
  company: "",
  website: "",
  teamSize: "",
  industry: "",
  painPoint: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const TEAM_SIZES = ["1-5", "6-20", "21-50", "50+"];

const INDUSTRIES = [
  "E-commerce / Retail",
  "SaaS / Tech",
  "Professional Services",
  "Healthcare / Wellness",
  "Real Estate",
  "Restaurant / Hospitality",
  "Finance / Insurance",
  "Marketing / Agency",
  "Manufacturing / Logistics",
  "Other",
];

const ANALYSIS_STEPS = [
  { label: "Connecting to website", duration: 1800 },
  { label: "Crawling pages and structure", duration: 2400 },
  { label: "Detecting tech stack and tools", duration: 2000 },
  { label: "Analyzing lead capture methods", duration: 1600 },
  { label: "Mapping customer touchpoints", duration: 1800 },
  { label: "Cross-referencing industry benchmarks", duration: 2200 },
  { label: "Identifying automation opportunities", duration: 2000 },
  { label: "Compiling your report", duration: 1400 },
];

/* ─── Main Component ────────────────────────────────────────── */

export function AuditFunnel() {
  const formId = useId();
  const [phase, setPhase] = useState<Phase>(1);
  const [phaseKey, setPhaseKey] = useState(0);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [shakeKey, setShakeKey] = useState(0);

  const updateField = useCallback(
    (field: keyof FormData, value: string) => {
      setForm((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
      }
    },
    [errors]
  );

  function advancePhase(next: Phase) {
    setPhaseKey((k) => k + 1);
    setPhase(next);
  }

  const firstName = form.name.split(" ")[0] || form.name;

  return (
    <section className="relative min-h-[calc(100svh-72px)] lg:min-h-[calc(100svh-84px)] flex flex-col items-center justify-center px-5 sm:px-8 py-16 overflow-hidden">
      {/* Backdrop */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid-fade opacity-50" />
      <div
        aria-hidden
        className="absolute -z-10 glow-teal animate-glow-drift"
        style={{ width: 700, height: 700, left: "-15%", top: "-10%" }}
      />
      <div
        aria-hidden
        className="absolute -z-10 glow-purple"
        style={{ width: 500, height: 500, right: "-15%", bottom: "-10%", opacity: 0.35 }}
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-noise" />

      {/* Card */}
      <div
        key={phaseKey}
        className="phase-enter w-full"
        style={{ maxWidth: phase === 3 ? 640 : phase === 4 ? 600 : 520 }}
      >
        <div className="rounded-2xl bg-[var(--bg-card)] border border-[var(--border-strong)] overflow-hidden accent-shadow">
          {/* Teal accent line */}
          <div
            aria-hidden
            className="h-[2px]"
            style={{ background: "linear-gradient(90deg, var(--accent), var(--accent-2))" }}
          />

          <div className="p-7 sm:p-9 lg:p-12">
            {/* Step indicator (phases 1 & 2 only) */}
            {(phase === 1 || phase === 2) && (
              <StepIndicator current={phase} />
            )}

            {phase === 1 && (
              <PhaseAboutYou
                formId={formId}
                form={form}
                errors={errors}
                shakeKey={shakeKey}
                updateField={updateField}
                onContinue={() => {
                  const fieldErrors = validateStep1(form);
                  if (Object.keys(fieldErrors).length > 0) {
                    setErrors(fieldErrors);
                    setShakeKey((k) => k + 1);
                    return;
                  }
                  setErrors({});
                  advancePhase(2);
                }}
              />
            )}

            {phase === 2 && (
              <PhaseAboutBusiness
                form={form}
                errors={errors}
                shakeKey={shakeKey}
                updateField={updateField}
                onBack={() => advancePhase(1)}
                onSubmit={() => {
                  const fieldErrors = validateStep2(form);
                  if (Object.keys(fieldErrors).length > 0) {
                    setErrors(fieldErrors);
                    setShakeKey((k) => k + 1);
                    return;
                  }
                  setErrors({});
                  advancePhase(3);
                }}
              />
            )}

            {phase === 3 && (
              <PhaseAnalyzing
                company={form.company}
                website={form.website}
                formData={form}
                onComplete={() => advancePhase(4)}
              />
            )}

            {phase === 4 && (
              <PhaseConfirmation
                firstName={firstName}
                email={form.email}
                website={form.website}
                industry={form.industry}
              />
            )}
          </div>
        </div>

        {/* Trust footer */}
        <p className="text-center text-xs text-[var(--text-tertiary)] mt-6 px-4">
          {phase === 4
            ? "Powered by MueveOps \u00B7 mueveops.com"
            : "Your data is processed securely \u00B7 Never used for AI training \u00B7 GDPR compliant"}
        </p>
      </div>
    </section>
  );
}

/* ─── Step Indicator ────────────────────────────────────────── */

function StepIndicator({ current }: { current: 1 | 2 }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-8">
      {[1, 2].map((step) => (
        <div
          key={step}
          className="flex items-center gap-3"
        >
          <div
            className="w-2.5 h-2.5 rounded-full transition-all duration-300"
            style={{
              background:
                step === current
                  ? "var(--accent)"
                  : step < current
                  ? "var(--accent)"
                  : "var(--border-strong)",
              boxShadow:
                step === current
                  ? "0 0 8px var(--accent-glow)"
                  : "none",
              opacity: step < current ? 0.5 : 1,
            }}
          />
          {step < 2 && (
            <div
              className="w-12 h-[2px] rounded-full"
              style={{
                background:
                  current > 1 ? "var(--accent)" : "var(--border-strong)",
                opacity: current > 1 ? 0.5 : 1,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── Phase 1: About You ────────────────────────────────────── */

function PhaseAboutYou({
  formId,
  form,
  errors,
  shakeKey,
  updateField,
  onContinue,
}: {
  formId: string;
  form: FormData;
  errors: Record<string, string>;
  shakeKey: number;
  updateField: (field: keyof FormData, value: string) => void;
  onContinue: () => void;
}) {
  const hasErrors = Object.keys(errors).length > 0;
  const allFilled =
    form.name.trim() !== "" &&
    form.email.trim() !== "" &&
    form.company.trim() !== "" &&
    form.website.trim() !== "";

  return (
    <form
      key={hasErrors ? `shake-${shakeKey}` : "form"}
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        onContinue();
      }}
      className={hasErrors && shakeKey > 0 ? "field-shake" : ""}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-display-3 text-[var(--text-primary)]">
            Get your free <span className="text-gradient">AI Audit</span>
          </h2>
          <p className="text-body text-[var(--text-secondary)]">
            We&apos;ll analyze your website and business to identify your
            highest-value automation opportunities.
          </p>
        </div>

        <Field
          id={`${formId}-name`}
          name="name"
          label="Your name"
          placeholder="Jane Smith"
          autoComplete="name"
          value={form.name}
          onChange={(v) => updateField("name", v)}
          error={errors.name}
          required
        />
        <Field
          id={`${formId}-email`}
          name="email"
          label="Work email"
          type="email"
          inputMode="email"
          placeholder="jane@company.com"
          autoComplete="email"
          value={form.email}
          onChange={(v) => updateField("email", v)}
          error={errors.email}
          required
        />
        <Field
          id={`${formId}-company`}
          name="company"
          label="Company name"
          placeholder="Acme Inc."
          autoComplete="organization"
          value={form.company}
          onChange={(v) => updateField("company", v)}
          error={errors.company}
          required
        />
        <Field
          id={`${formId}-website`}
          name="website"
          label="Website URL"
          type="url"
          inputMode="url"
          placeholder="https://yourcompany.com"
          autoComplete="url"
          value={form.website}
          onChange={(v) => updateField("website", v)}
          error={errors.website}
          required
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          disabled={!allFilled}
        >
          Continue →
        </Button>
      </div>
    </form>
  );
}

/* ─── Phase 2: About Your Business ──────────────────────────── */

function PhaseAboutBusiness({
  form,
  errors,
  shakeKey,
  updateField,
  onBack,
  onSubmit,
}: {
  form: FormData;
  errors: Record<string, string>;
  shakeKey: number;
  updateField: (field: keyof FormData, value: string) => void;
  onBack: () => void;
  onSubmit: () => void;
}) {
  const hasErrors = Object.keys(errors).length > 0;
  const allFilled = form.teamSize !== "" && form.industry !== "";

  return (
    <form
      key={hasErrors ? `shake-${shakeKey}` : "form"}
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className={hasErrors && shakeKey > 0 ? "field-shake" : ""}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-display-3 text-[var(--text-primary)]">
            Tell us about your <span className="text-gradient">business</span>
          </h2>
          <p className="text-body text-[var(--text-secondary)]">
            This helps us benchmark against similar companies in your industry.
          </p>
        </div>

        {/* Team size */}
        <div className="flex flex-col gap-3">
          <label className="text-base font-medium text-[var(--text-primary)]">
            Team size
            <span aria-hidden="true" className="text-[var(--accent)]">
              {" *"}
            </span>
          </label>
          <div className="flex flex-wrap gap-2.5">
            {TEAM_SIZES.map((size) => (
              <Button
                key={size}
                type="button"
                variant={form.teamSize === size ? "outline-accent" : "outline-soft"}
                size="sm"
                onClick={() => updateField("teamSize", size)}
              >
                {size}
              </Button>
            ))}
          </div>
          {errors.teamSize && (
            <p className="text-sm text-red-400" role="alert">
              {errors.teamSize}
            </p>
          )}
        </div>

        {/* Industry */}
        <div className="flex flex-col gap-3">
          <label className="text-base font-medium text-[var(--text-primary)]">
            Industry
            <span aria-hidden="true" className="text-[var(--accent)]">
              {" *"}
            </span>
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            {INDUSTRIES.map((ind) => (
              <button
                key={ind}
                type="button"
                onClick={() => updateField("industry", ind)}
                className={`min-h-11 px-4 py-2.5 rounded-full text-sm font-bold tracking-tight text-left transition-all duration-200 border-2 ${
                  form.industry === ind
                    ? "border-[var(--accent)] text-[var(--accent)] bg-[var(--accent-muted)] shadow-[0_0_0_4px_var(--accent-muted)]"
                    : "border-[var(--border-strong)] text-[var(--text-primary)] hover:bg-white/[0.05] hover:border-[var(--text-primary)]"
                }`}
              >
                {ind}
              </button>
            ))}
          </div>
          {errors.industry && (
            <p className="text-sm text-red-400" role="alert">
              {errors.industry}
            </p>
          )}
        </div>

        {/* Optional textarea */}
        <div className="flex flex-col gap-2">
          <label className="text-base font-medium text-[var(--text-primary)]">
            What&apos;s the one task you wish would just handle itself?
          </label>
          <textarea
            rows={3}
            value={form.painPoint}
            onChange={(e) => updateField("painPoint", e.target.value)}
            placeholder="e.g. Following up with leads takes forever and half of them go cold before we respond..."
            className="field-input min-h-[88px] rounded-xl bg-[var(--bg-input)] border-2 border-[var(--border)] px-4 py-3.5 text-base text-[var(--text-primary)] placeholder:text-white/[0.19] leading-relaxed resize-y"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline-soft"
            size="lg"
            onClick={onBack}
          >
            ← Back
          </Button>
          <div className="flex-1">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={!allFilled}
            >
              Run AI Audit →
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

/* ─── Phase 3: Analyzing ────────────────────────────────────── */

function PhaseAnalyzing({
  company,
  website,
  formData,
  onComplete,
}: {
  company: string;
  website: string;
  formData: FormData;
  onComplete: () => void;
}) {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const hasSubmitted = useRef(false);

  // Fire API call
  useEffect(() => {
    if (hasSubmitted.current) return;
    hasSubmitted.current = true;

    fetch("/api/audit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).catch((err) => {
      console.error("[audit] Failed to submit:", err);
    });
  }, [formData]);

  // Run the step animation sequence
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let stepIndex = 0;

    function runStep() {
      if (stepIndex >= ANALYSIS_STEPS.length) {
        // Small delay before advancing to confirmation
        timeout = setTimeout(onComplete, 600);
        return;
      }

      setActiveStep(stepIndex);

      timeout = setTimeout(() => {
        setCompletedSteps((prev) => [...prev, stepIndex]);
        stepIndex++;
        runStep();
      }, ANALYSIS_STEPS[stepIndex].duration);
    }

    runStep();

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayUrl = website.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Pulsing orb */}
      <div
        className="w-16 h-16 rounded-full bg-[var(--accent)] animate-orb-pulse"
        aria-hidden
      />

      {/* Header */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-display-3 text-[var(--text-primary)]">
          Analyzing {company}
        </h2>
        <p className="font-mono text-sm text-[var(--text-secondary)]">
          {displayUrl}
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 rounded-full bg-[var(--bg-card-2)] overflow-hidden">
        <div className="h-full rounded-full bg-[var(--accent)] animate-progress-fill" />
      </div>

      {/* Terminal log */}
      <div className="w-full rounded-xl bg-[var(--bg)] border border-[var(--border-strong)] p-5 font-mono text-sm">
        <div className="flex flex-col gap-2.5">
          {ANALYSIS_STEPS.map((step, i) => {
            const isCompleted = completedSteps.includes(i);
            const isActive = activeStep === i && !isCompleted;
            const isVisible = i <= activeStep;

            if (!isVisible) return null;

            return (
              <div
                key={step.label}
                className="flex items-center justify-between gap-3 animate-fade-in-up"
                style={{ "--fade-delay": "0ms" } as CSSVars}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {isCompleted ? (
                    <span className="text-[var(--accent)] flex-shrink-0">
                      ✓
                    </span>
                  ) : (
                    <span className="text-[var(--accent)] flex-shrink-0 animate-cursor-blink">
                      ▸
                    </span>
                  )}
                  <span
                    className={`truncate ${
                      isCompleted
                        ? "text-[var(--text-secondary)]"
                        : "text-[var(--text-primary)]"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {isCompleted && (
                  <span className="text-xs text-[var(--accent)] flex-shrink-0">
                    done
                  </span>
                )}
                {isActive && (
                  <span className="text-xs text-[var(--text-tertiary)] flex-shrink-0">
                    ...
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─── Phase 4: Confirmation ─────────────────────────────────── */

function PhaseConfirmation({
  firstName,
  email,
  website,
  industry,
}: {
  firstName: string;
  email: string;
  website: string;
  industry: string;
}) {
  const displayUrl = website.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Success icon */}
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center"
        style={{
          background: "var(--accent-muted)",
          boxShadow: "0 0 40px 8px var(--accent-glow)",
        }}
      >
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="check-icon w-9 h-9"
          fill="none"
          stroke="var(--accent)"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12.5 10 17 19 7" />
        </svg>
      </div>

      {/* Header */}
      <div className="flex flex-col items-center gap-3 text-center">
        <h2 className="text-display-3 text-[var(--text-primary)]">
          {firstName}, your AI Audit is being <span className="text-gradient">prepared</span>
        </h2>
        <p className="text-body text-[var(--text-secondary)] max-w-[44ch]">
          We crawled {displayUrl} and cross-referenced with {industry} automation
          benchmarks to build your personalized report.
        </p>
      </div>

      {/* Report includes card */}
      <div
        className="w-full rounded-xl bg-[var(--bg)] border border-[var(--border)] p-6 flex flex-col gap-4 animate-fade-in-up"
        style={{ "--fade-delay": "200ms" } as CSSVars}
      >
        <h3 className="text-heading text-[var(--text-primary)]">
          Your report includes
        </h3>
        <div className="flex flex-col gap-3">
          {[
            { icon: "\uD83D\uDD0D", text: "Website & tech stack analysis" },
            {
              icon: "\u26A1",
              text: "Top 3-5 automation opportunities specific to your business",
            },
            {
              icon: "\uD83D\uDCCA",
              text: "Estimated time savings per automation (based on industry data)",
            },
            {
              icon: "\uD83D\uDDFA\uFE0F",
              text: "Recommended implementation roadmap",
            },
          ].map((item) => (
            <div
              key={item.text}
              className="flex items-start gap-3 text-body text-[var(--text-secondary)]"
            >
              <span className="flex-shrink-0">{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Email delivery note */}
      <div
        className="w-full rounded-xl p-5 text-center animate-fade-in-up"
        style={{
          "--fade-delay": "400ms",
          background: "var(--accent-muted)",
          border: "1px solid rgba(11, 255, 194, 0.15)",
        } as CSSVars}
      >
        <p className="text-body text-[var(--text-primary)]">
          📧 Report arriving at{" "}
          <span className="font-bold text-[var(--accent)]">{email}</span>
          {" — "}Usually within a few hours.
        </p>
      </div>

      {/* CTA */}
      <div
        className="w-full flex flex-col items-center gap-4 animate-fade-in-up"
        style={{ "--fade-delay": "600ms" } as CSSVars}
      >
        <a
          href="https://calendly.com"
          target="_blank"
          rel="noopener noreferrer"
          className="animate-cta-glow btn-shimmer relative inline-flex items-center justify-center gap-2 rounded-full font-bold text-base tracking-tight select-none transition-[background-color,border-color,color,opacity,transform,box-shadow] duration-200 ease-out active:scale-[0.97] motion-reduce:transform-none bg-[var(--accent)] text-[var(--bg)] px-8 min-h-14 w-full"
        >
          Walk through the findings together →
        </a>
        <p className="text-sm text-[var(--text-tertiary)] text-center">
          15-minute strategy call · No commitment · We&apos;ll discuss your specific
          opportunities
        </p>
      </div>

      {/* Contact fallback */}
      <p
        className="text-sm text-[var(--text-tertiary)] animate-fade-in-up"
        style={{ "--fade-delay": "800ms" } as CSSVars}
      >
        Questions? Reach out directly at{" "}
        <a
          href="mailto:ernst@mueveops.com"
          className="text-[var(--accent)] underline underline-offset-2"
        >
          ernst@mueveops.com
        </a>
      </p>
    </div>
  );
}

/* ─── Shared Field Component ────────────────────────────────── */

function Field({
  id,
  name,
  label,
  type = "text",
  inputMode,
  placeholder,
  autoComplete,
  value,
  onChange,
  error,
  required,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  inputMode?: "text" | "email" | "url";
  placeholder?: string;
  autoComplete?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}) {
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
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? errorId : undefined}
        className="field-input h-12 min-w-0 w-full rounded-xl bg-[var(--bg-input)] border-2 border-[var(--border)] px-4 text-base text-[var(--text-primary)] placeholder:text-white/[0.19]"
      />
      {error && (
        <p id={errorId} className="text-sm text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

/* ─── Validation ────────────────────────────────────────────── */

function validateStep1(form: FormData): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!form.name.trim()) errors.name = "Please enter your name.";
  if (!form.email.trim()) errors.email = "Please enter your email.";
  else if (!EMAIL_RE.test(form.email.trim()))
    errors.email = "Enter a valid email address.";
  if (!form.company.trim()) errors.company = "Please enter your company name.";
  if (!form.website.trim()) errors.website = "Please enter your website URL.";

  return errors;
}

function validateStep2(form: FormData): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!form.teamSize) errors.teamSize = "Please select your team size.";
  if (!form.industry) errors.industry = "Please select your industry.";

  return errors;
}
