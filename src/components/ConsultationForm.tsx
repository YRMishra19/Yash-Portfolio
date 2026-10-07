import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { cn } from "../lib/utils";

type FormState = {
  name: string;
  email: string;
  phone: string;
  reason: string;
  message: string;
};

type Status = "idle" | "submitting" | "success" | "error";

const REASONS = [
  "Career / job search question",
  "Business intelligence or analytics project",
  "AI / automation consulting",
  "Y-PROC services",
  "Speaking or collaboration",
  "Something else",
];

const initialState: FormState = { name: "", email: "", phone: "", reason: REASONS[0], message: "" };

/**
 * Frontend-only consultation form.
 *
 * This does NOT currently send email - there is no backend wired up.
 * To connect it, point CONTACT_ENDPOINT at a Formspree / Resend / Supabase /
 * Firebase Function endpoint that accepts a POST of this JSON body, then
 * flip DEMO_MODE to false below. Until then, submissions are validated and
 * shown a clear "not connected yet" error rather than a fake success.
 */
const CONTACT_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbyjHmqdvmuHpIbrMlAVHc_z0fckWLibwCMWZEPdVsZrvLEyaEvwOaarsG-ZAZ1bA9oSMQ/exec";
const CONTACT_TOKEN = "uby67piqgWODocoV8AfbQif_RcMyXRMo";
const DEMO_MODE = CONTACT_ENDPOINT.length === 0;

export function ConsultationForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!values.name.trim()) nextErrors.name = "Please enter your name.";
    if (!values.email.trim()) {
      nextErrors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = "That doesn't look like a valid email.";
    }
    if (!values.message.trim()) nextErrors.message = "Tell me a little about what you'd like to discuss.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    setErrorMessage("");

    if (DEMO_MODE) {
      // No backend configured - be honest about it rather than faking success.
      await new Promise((resolve) => setTimeout(resolve, 700));
      setStatus("error");
      setErrorMessage(
        "This form isn't connected to a backend yet - no message was sent. In the meantime, reach out directly via email or LinkedIn below."
      );
      return;
    }

    try {
      // Google Apps Script web apps don't send CORS headers back, so the
      // response is opaque under no-cors - if fetch doesn't throw, treat it
      // as delivered. The token is validated server-side before anything
      // is written or emailed.
      await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ ...values, token: CONTACT_TOKEN }).toString(),
      });
      setStatus("success");
      setValues(initialState);
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong sending that. Please try again or reach out directly.");
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5" aria-describedby={DEMO_MODE ? "form-demo-note" : undefined}>
      {DEMO_MODE && (
        <p id="form-demo-note" className="text-xs text-fg-subtle bg-bg-card border border-border rounded-xl px-4 py-3">
          This form is frontend-only right now - it validates input but isn't wired to an email/backend service yet.
        </p>
      )}

      <Field label="Name" error={errors.name}>
        <input
          type="text"
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={handleChange("name")}
          className={inputClass(Boolean(errors.name))}
          aria-invalid={Boolean(errors.name)}
        />
      </Field>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Email" error={errors.email}>
          <input
            type="email"
            name="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange("email")}
            className={inputClass(Boolean(errors.email))}
            aria-invalid={Boolean(errors.email)}
          />
        </Field>
        <Field label="Phone Number (optional)">
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            value={values.phone}
            onChange={handleChange("phone")}
            className={inputClass(false)}
          />
        </Field>
      </div>

      <Field label="Reason for Contact">
        <select name="reason" value={values.reason} onChange={handleChange("reason")} className={inputClass(false)}>
          {REASONS.map((reason) => (
            <option key={reason} value={reason}>
              {reason}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Message" error={errors.message}>
        <textarea
          name="message"
          rows={5}
          value={values.message}
          onChange={handleChange("message")}
          className={inputClass(Boolean(errors.message))}
          aria-invalid={Boolean(errors.message)}
        />
      </Field>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-bg font-medium px-7 py-3.5 transition-all hover:bg-accent-strong disabled:opacity-60 disabled:cursor-not-allowed w-full sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…
          </>
        ) : (
          <>
            Meet me <Send className="h-4 w-4" aria-hidden="true" />
          </>
        )}
      </button>

      <div role="status" aria-live="polite">
        {status === "success" && (
          <p className="flex items-center gap-2 text-sm text-accent">
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> Thanks - your message is on its way.
          </p>
        )}
        {status === "error" && (
          <p className="flex items-start gap-2 text-sm text-fg-muted">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-accent" aria-hidden="true" /> {errorMessage}
          </p>
        )}
      </div>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.15em] text-fg-subtle">{label}</span>
      <div className="mt-2">{children}</div>
      {error && <span className="mt-1.5 block text-xs text-accent">{error}</span>}
    </label>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "w-full rounded-xl bg-bg-card border px-4 py-3 text-sm text-fg placeholder:text-fg-subtle transition-colors focus-visible:outline-2 focus-visible:outline-accent",
    hasError ? "border-accent" : "border-border focus:border-border-strong"
  );
}
