"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { PillButton } from "@/components/ui/pill-button";
import { squadOptions } from "@/lib/site-config";
import { PopIn } from "@/components/motion/pop-in";

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

const labelClass = "mb-2 block text-[14px] font-medium text-ink";

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
      <div className="flex min-h-[24rem] flex-col items-start justify-center gap-4" role="status" aria-live="polite">
        <PopIn delay={0.05} rotate={-90} className="flex size-12 items-center justify-center rounded-full bg-ink text-white">
          <Check className="size-5" strokeWidth={2} />
        </PopIn>
        <h2 className="display text-[1.75rem] text-ink">Thank you — your brief has been received.</h2>
        <p className="max-w-[26rem] text-[15px] leading-6 text-muted-foreground">
          Thanks, {form.name.split(" ")[0] || "there"}. We’ve received your brief and a human from the studio will be in touch within
          one business day.
        </p>
        <button
          type="button"
          onClick={() => {
            setForm(initialState);
            setStatus("idle");
          }}
          className="link-underline mt-2 cursor-pointer text-[15px] text-ink"
        >
          Submit another brief
        </button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} className="form-cascade space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
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
            className="field"
            placeholder="Jane Smith"
          />
        </div>

        <div>
          <label htmlFor="company" className={labelClass}>
            Company name
          </label>
          <input
            id="company"
            name="company"
            type="text"
            required
            autoComplete="organization"
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
            className="field"
            placeholder="Company name"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Work email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          className="field"
          placeholder="you@company.com"
        />
      </div>

      <div>
        <label htmlFor="squad" className={labelClass}>
          Which squad?
        </label>
        <select id="squad" name="squad" required value={form.squad} onChange={(e) => update("squad", e.target.value)} className="field">
          <option value="" disabled>
            Select an option
          </option>
          {squadOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="brief" className={labelClass}>
          What are you trying to build?
        </label>
        <textarea
          id="brief"
          name="brief"
          required
          rows={5}
          value={form.brief}
          onChange={(e) => update("brief", e.target.value)}
          className="field"
          placeholder="A few lines about the product, the problem it solves, and any constraints we should know about."
        />
      </div>

      <PillButton type="submit" disabled={submitting} className="w-full">
        {submitting ? "Sending…" : "Send project brief"}
      </PillButton>
    </form>
  );
}
