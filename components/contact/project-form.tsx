"use client";

import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { squadOptions } from "@/lib/site-config";

interface FormState {
  name: string;
  company: string;
  email: string;
  squad: string;
  brief: string;
}

const initialState: FormState = {
  name: "",
  company: "",
  email: "",
  squad: "",
  brief: "",
};

const fieldClass =
  "w-full rounded-xl border border-border bg-background/60 px-4 py-3.5 text-base text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground hover:border-foreground/30 focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/30";

const labelClass = "block font-mono text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground";

/**
 * Project engagement form. Performs client-side validation and surfaces a
 * confirmation state.
 *
 * NOTE: there is no backend yet. `handleSubmit` is the integration point — wire
 * it to a Next.js Route Handler (`app/api/contact/route.ts`) or an email
 * service. Do not log or persist the corporate email anywhere it could leak.
 */
export function ProjectForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    // TODO: replace with a real submission (Route Handler / email service).
    // Simulated success so the UX is complete ahead of backend integration.
    await new Promise((resolve) => setTimeout(resolve, 600));
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div
        className="flex flex-col items-start gap-4 rounded-2xl border border-border bg-background/60 p-8 lg:p-10"
        role="status"
        aria-live="polite"
      >
        <span className="flex size-12 items-center justify-center rounded-full bg-brand/15 text-brand">
          <Check className="size-6" />
        </span>
        <h3 className="text-2xl font-bold tracking-tight text-foreground">Engagement initialised.</h3>
        <p className="text-base leading-relaxed text-muted-foreground">
          Thanks, {form.name.split(" ")[0] || "there"}. We&rsquo;ve received your brief and our engineers will be
          in touch shortly.
        </p>
        <button
          type="button"
          onClick={() => {
            setForm(initialState);
            setStatus("idle");
          }}
          className="link-underline mt-2 font-mono text-sm uppercase tracking-wide text-foreground"
        >
          Submit another brief
        </button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate={false}>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className={labelClass}>
            Your name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className={fieldClass}
            placeholder="Ada Lovelace"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="company" className={labelClass}>
            Company / Project name
          </label>
          <input
            id="company"
            name="company"
            type="text"
            required
            autoComplete="organization"
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
            className={fieldClass}
            placeholder="Acme Inc."
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="email" className={labelClass}>
            Corporate email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className={fieldClass}
            placeholder="you@company.com"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="squad" className={labelClass}>
            Target core squad
          </label>
          <select
            id="squad"
            name="squad"
            required
            value={form.squad}
            onChange={(e) => update("squad", e.target.value)}
            className={`${fieldClass} appearance-none bg-background`}
          >
            <option value="" disabled>
              Select a squad
            </option>
            {squadOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="brief" className={labelClass}>
          Project brief & requirements
        </label>
        <textarea
          id="brief"
          name="brief"
          required
          rows={6}
          value={form.brief}
          onChange={(e) => update("brief", e.target.value)}
          className={`${fieldClass} resize-y`}
          placeholder="Tell us what you're building, the problem it solves, and any constraints we should know about."
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand px-8 text-sm font-semibold uppercase tracking-wide text-brand-foreground transition-all duration-300 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60"
      >
        {submitting ? "Initialising…" : "Initialize Project Engagement"}
        {submitting ? <Loader2 className="size-4 animate-spin" /> : <ArrowRight className="size-4" />}
      </button>
    </form>
  );
}
