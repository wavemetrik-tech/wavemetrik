"use client";

import { ArrowUpRightIcon } from "lucide-react";
import { useState, useTransition } from "react";
import {
  FormNotice,
  Honeypot,
  PhoneField,
  TextAreaField,
  TextField,
} from "@/components/form-field";
import { pillLink } from "@/lib/pill-link";
import { capture } from "@/lib/posthog";
import { posthogLog } from "@/lib/posthog-log";
import { sendEnquiry } from "@/lib/send-enquiry";
import { SITE } from "@/lib/site";
import styles from "./contact.module.css";

// Every subject goes to the support address; the subject line says which
// it is.
const SUBJECTS = ["Product inquiry", "Technical support", "General question"];

// The form is sent from the server (`lib/send-enquiry.ts`) and arrives in
// the support mailbox as an email that can be answered directly.
export function ContactForm() {
  const [result, setResult] = useState<"sent" | "failed" | null>(null);
  const [sending, startSending] = useTransition();
  const [length, setLength] = useState(0);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (!String(data.get("message") ?? "").trim()) {
      const field = form.elements.namedItem("message") as HTMLTextAreaElement;
      field.setCustomValidity("Please tell us how we can help.");
      field.reportValidity();
      return;
    }
    const inquiry = String(data.get("subject") ?? SUBJECTS[0]);
    startSending(async () => {
      const { ok } = await sendEnquiry(data).catch(() => ({ ok: false }));
      setResult(ok ? "sent" : "failed");
      if (!ok) return;
      form.reset();
      setLength(0);
      capture("contact_form_sent", { inquiry_type: inquiry });
      posthogLog.info("Contact form sent", { inquiry_type: inquiry });
    });
  }

  return (
    <section
      aria-labelledby="message-heading"
      className={`plain-fields ${styles.form}`}
    >
      <h2 id="message-heading" className={styles.formTitle}>
        How can we help?
      </h2>
      <form onSubmit={handleSubmit} className={styles.fields}>
        <fieldset className="min-w-0">
          <legend className={styles.formLabel}>I’d like to discuss</legend>
          <div className="segmented">
            {SUBJECTS.map((subject, index) => (
              <label key={subject} className="segmented-option">
                <input
                  className="sr-only"
                  type="radio"
                  name="subject"
                  value={subject}
                  defaultChecked={index === 0}
                />
                <span>{subject}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="flex flex-col gap-3">
          <fieldset className={styles.details}>
            <legend className="sr-only">Your details</legend>
            <TextField
              label="Full name"
              name="name"
              type="text"
              autoComplete="name"
              required
              maxLength={100}
              pattern=".*\S.*"
            />
            <TextField
              label="Work email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={200}
            />
            <TextField
              label="Company"
              optional
              name="company"
              type="text"
              autoComplete="organization"
              maxLength={150}
            />
            <PhoneField />
          </fieldset>
          <TextAreaField
            label="Your message"
            name="message"
            rows={4}
            required
            maxLength={2000}
            onChange={(event) => {
              setLength(event.target.value.length);
              event.target.setCustomValidity("");
            }}
          />
          <p
            aria-hidden
            className="text-right text-caption-1 text-muted-foreground tabular-nums"
          >
            {length.toLocaleString()} / 2,000
          </p>
        </div>
        <Honeypot />
        <div className={styles.submit}>
          <button
            type="submit"
            disabled={sending}
            className={`cursor-pointer disabled:cursor-default disabled:opacity-60 ${pillLink.primary}`}
          >
            {sending ? "Sending…" : "Send message"}{" "}
            <ArrowUpRightIcon aria-hidden className="size-4" />
          </button>
          <p className="text-footnote/5 text-muted-foreground">
            Goes straight to our support team. We reply by email.
          </p>
        </div>
        <div aria-live="polite" aria-atomic="true" className={styles.status}>
          {result === "sent" && (
            <FormNotice sent>
              Your message has been sent. We’ll reply to the email address
              you gave.
            </FormNotice>
          )}
          {result === "failed" && (
            <FormNotice>
              We couldn’t send your message. Please try again, or email{" "}
              <a
                href={`mailto:${SITE.supportEmail}`}
                className="font-medium break-all text-link underline underline-offset-4"
              >
                {SITE.supportEmail}
              </a>{" "}
              directly.
            </FormNotice>
          )}
        </div>
      </form>
    </section>
  );
}
