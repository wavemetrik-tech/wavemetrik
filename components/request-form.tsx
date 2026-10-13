"use client";

import { ArrowUpRightIcon } from "lucide-react";
import { useState, useTransition } from "react";
import {
  FormNotice,
  Honeypot,
  PhoneField,
  TextField,
} from "@/components/form-field";
import { pillLink } from "@/lib/pill-link";
import { capture } from "@/lib/posthog";
import { posthogLog } from "@/lib/posthog-log";
import { sendEnquiry } from "@/lib/send-enquiry";
import { SITE } from "@/lib/site";

// Shown if a request cannot be sent; requests themselves go there too.
const TO = SITE.supportEmail;

// The fields for asking Wavemetrik to send a document that is not published
// on the site. Like the contact form, it is sent from the server
// (`lib/send-enquiry.ts`) to the support mailbox. `document` names what is
// asked for; `products` adds a choice of product, and `interest` an optional line
// about what the visitor is testing.
export function RequestForm({
  document,
  products,
  defaultProduct,
  interest = false,
  submitLabel,
  compact = false,
}: {
  document: string;
  products?: readonly string[];
  defaultProduct?: string;
  interest?: boolean;
  submitLabel: string;
  // For a dropdown: the button fills the width and its note is centered.
  compact?: boolean;
}) {
  const [result, setResult] = useState<"sent" | "failed" | null>(null);
  const [sending, startSending] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("document", document);
    const product = String(data.get("product") ?? "") || undefined;
    startSending(async () => {
      const { ok } = await sendEnquiry(data).catch(() => ({ ok: false }));
      setResult(ok ? "sent" : "failed");
      if (!ok) return;
      form.reset();
      capture("document_request_sent", { document_type: document, product });
      posthogLog.info("Document request sent", {
        document_type: document,
        product,
      });
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="plain-fields grid min-w-0 gap-3"
    >
      {products && (
        <fieldset className="mb-2 min-w-0">
          <legend className="mb-2.5 text-footnote font-medium text-muted-foreground">
            Product
          </legend>
          <div className="segmented">
            {products.map((product) => (
              <label key={product} className="segmented-option">
                <input
                  className="sr-only"
                  type="radio"
                  name="product"
                  value={product}
                  defaultChecked={product === (defaultProduct ?? products[0])}
                />
                <span>{product}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}
      <TextField
        label="Full name"
        name="name"
        type="text"
        autoComplete="name"
        required
        maxLength={100}
        pattern=".*\S.*"
      />
      <div className="col-span-full grid min-w-0 gap-3 sm:grid-cols-2">
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
          name="company"
          type="text"
          autoComplete="organization"
          required
          maxLength={150}
          pattern=".*\S.*"
        />
      </div>
      <PhoneField className="col-span-full" />
      {interest && (
        <TextField
          label="What are you evaluating?"
          optional
          name="interest"
          type="text"
          maxLength={200}
          className="col-span-full"
        />
      )}
      <Honeypot />
      <div className="col-span-full mt-2 flex flex-col gap-3">
        <button
          type="submit"
          disabled={sending}
          className={`cursor-pointer disabled:cursor-default disabled:opacity-60 ${pillLink.primary} ${compact ? "sm:w-full" : ""}`}
        >
          {sending ? "Sending…" : submitLabel}{" "}
          <ArrowUpRightIcon aria-hidden className="size-4" />
        </button>
        <p
          className={`text-footnote/5 text-muted-foreground ${compact ? "text-center" : ""}`}
        >
          We’ll send it to your work email.
        </p>
      </div>
      <div
        aria-live="polite"
        aria-atomic="true"
        className="col-span-full empty:hidden"
      >
        {result === "sent" && (
          <FormNotice sent>
            Your request has been sent. We’ll email the {document} to the
            address you gave.
          </FormNotice>
        )}
        {result === "failed" && (
          <FormNotice>
            We couldn’t send your request. Please try again, or email{" "}
            <a
              href={`mailto:${TO}`}
              className="font-medium break-all text-link underline underline-offset-4"
            >
              {TO}
            </a>{" "}
            directly.
          </FormNotice>
        )}
      </div>
    </form>
  );
}
