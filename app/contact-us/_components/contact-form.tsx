"use client";

import { ArrowUpRightIcon, CheckIcon } from "lucide-react";
import { useState } from "react";
import { TextAreaField, TextField } from "@/components/form-field";
import { pillLink } from "@/lib/pill-link";
import styles from "./contact.module.css";

const SUBJECTS = [
  { label: "Product inquiry", to: "sales@wavemetrik.com" },
  { label: "Technical support", to: "support@wavemetrik.com" },
  { label: "General question", to: "sales@wavemetrik.com" },
];

export function ContactForm() {
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [length, setLength] = useState(0);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!message) {
      const field = form.elements.namedItem("message") as HTMLTextAreaElement;
      field.setCustomValidity("Please tell us how we can help.");
      field.reportValidity();
      return;
    }
    const subject =
      SUBJECTS.find((item) => item.label === data.get("subject")) ??
      SUBJECTS[0];
    const query = new URLSearchParams({
      subject: `${subject.label}: ${name}`,
      body: `${message}\n\n${name}\n${email}${company ? `\n${company}` : ""}`,
    })
      .toString()
      .replace(/\+/g, "%20");
    setSentTo(subject.to);
    window.location.assign(`mailto:${subject.to}?${query}`);
  }

  return (
    <section aria-labelledby="message-heading" className={styles.form}>
      <h2 id="message-heading" className={styles.formTitle}>
        How can we help?
      </h2>
      <form onSubmit={handleSubmit} className={styles.fields}>
        <fieldset className="min-w-0">
          <legend className={styles.formLabel}>I’d like to discuss</legend>
          <div className={styles.choices}>
            {SUBJECTS.map((subject, index) => (
              <label key={subject.label} className={styles.choice}>
                <input
                  className="sr-only"
                  type="radio"
                  name="subject"
                  value={subject.label}
                  defaultChecked={index === 0}
                />
                <span>{subject.label}</span>
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
        <div className={styles.submit}>
          <button
            type="submit"
            className={`cursor-pointer ${pillLink.primary}`}
          >
            Open email draft <ArrowUpRightIcon aria-hidden className="size-4" />
          </button>
          <p className="text-footnote/5 text-muted-foreground">
            Opens your email app with your message ready to review and send.
          </p>
        </div>
        <div aria-live="polite" aria-atomic="true" className={styles.status}>
          {sentTo && (
            <div className="flex items-start gap-3 rounded-xl bg-muted p-4 text-footnote/5">
              <CheckIcon
                aria-hidden
                className="mt-0.5 size-4 shrink-0 text-link"
              />
              <p>
                Your email draft is prepared. Send it from your email app to
                finish. If your app didn’t open, email{" "}
                <a
                  href={`mailto:${sentTo}`}
                  className="font-medium break-all text-link underline underline-offset-4"
                >
                  {sentTo}
                </a>{" "}
                directly.
              </p>
            </div>
          )}
        </div>
      </form>
    </section>
  );
}
