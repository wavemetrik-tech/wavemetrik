"use client";

import { ArrowUpRightIcon, CheckIcon } from "lucide-react";
import { useState } from "react";
import { TextField } from "@/components/form-field";
import { pillLink } from "@/lib/pill-link";
import { SITE } from "@/lib/site";

const TO = SITE.email;

// The fields for asking Wavemetrik to send a document that is not published
// on the site. Like the contact form, it prepares an email in the visitor's
// own app; nothing is sent from the page. `document` names what is asked
// for; `products` adds a choice of product, and `interest` an optional line
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
  const [prepared, setPrepared] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const field = (name: string) => String(data.get(name) ?? "").trim();
    const name = field("name");
    const product = field("product");
    const wanted = product ? `${product} ${document}` : document;
    const query = new URLSearchParams({
      subject: `Request for the ${wanted}: ${name}`,
      body: [
        `Please send me the ${wanted}.`,
        field("interest") && `What I am evaluating: ${field("interest")}`,
        [name, field("email"), field("company")].join("\n"),
      ]
        .filter(Boolean)
        .join("\n\n"),
    })
      .toString()
      .replace(/\+/g, "%20");
    setPrepared(true);
    window.location.assign(`mailto:${TO}?${query}`);
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
      <div className="col-span-full mt-2 flex flex-col gap-3">
        <button
          type="submit"
          className={`cursor-pointer ${pillLink.primary} ${compact ? "sm:w-full" : ""}`}
        >
          {submitLabel} <ArrowUpRightIcon aria-hidden className="size-4" />
        </button>
        <p
          className={`text-footnote/5 text-muted-foreground ${compact ? "text-center" : ""}`}
        >
          Opens your email app with the request ready to send.
        </p>
      </div>
      <div
        aria-live="polite"
        aria-atomic="true"
        className="col-span-full empty:hidden"
      >
        {prepared && (
          <div className="flex items-start gap-3 rounded-xl bg-muted p-4 text-footnote/5">
            <CheckIcon
              aria-hidden
              className="mt-0.5 size-4 shrink-0 text-link"
            />
            <p>
              Your request is prepared. Send it from your email app to finish.
              If your app didn’t open, email{" "}
              <a
                href={`mailto:${TO}`}
                className="font-medium break-all text-link underline underline-offset-4"
              >
                {TO}
              </a>{" "}
              directly.
            </p>
          </div>
        )}
      </div>
    </form>
  );
}
