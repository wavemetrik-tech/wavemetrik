"use server";

import { headers } from "next/headers";
import { enquiryEmail } from "@/lib/enquiry-email";
import { SITE } from "@/lib/site";

// Who reads the forms. The mailbox is named in the environment, not here:
// this repository is public. Without it they go to the support address.
const TO = process.env.RESEND_TO || SITE.supportEmail;

// The address the email comes from. Resend only sends from a domain that is
// verified in its dashboard, so wavemetrik.com has to be verified there.
const FROM = process.env.RESEND_FROM || SITE.supportEmail;

// A few sends per visitor is plenty. This is kept in memory, so it is per
// server instance: it slows a script down, it does not stop a determined one.
const LIMIT = 5;
const WINDOW = 10 * 60 * 1000;
const recent = new Map<string, number[]>();

function allowed(visitor: string) {
  const now = Date.now();
  const times = (recent.get(visitor) ?? []).filter((at) => now - at < WINDOW);
  if (times.length >= LIMIT) return false;
  recent.set(visitor, [...times, now]);
  if (recent.size > 5000) recent.clear();
  return true;
}

// One line of text, no longer than the field allows.
const line = (data: FormData, name: string, max: number) =>
  String(data.get(name) ?? "")
    .replace(/[\r\n]+/g, " ")
    .trim()
    .slice(0, max);

// The page a form was on, taken from the address the browser says it came
// from.
function pagePath(referer: string | null) {
  try {
    return new URL(referer ?? "").pathname.slice(0, 120);
  } catch {
    return "";
  }
}

// Sends what a visitor typed into the contact form or a document request
// form. It answers only whether the email was accepted for delivery; the
// page says the rest. Nothing is stored here, and nothing a visitor typed is
// written to the log.
export async function sendEnquiry(data: FormData): Promise<{ ok: boolean }> {
  // A field no person sees or fills. A script that fills it is told it
  // worked.
  if (data.get("referral_code")) return { ok: true };

  const name = line(data, "name", 100);
  const email = line(data, "email", 200);
  const company = line(data, "company", 150);
  const phone = line(data, "phone", 20);
  const document = line(data, "document", 60);
  const message = String(data.get("message") ?? "")
    .trim()
    .slice(0, 2000);
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false };
  if (!document && !message) return { ok: false };

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("A form was submitted but RESEND_API_KEY is not set.");
    return { ok: false };
  }

  const request = await headers();
  const visitor =
    request.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (!allowed(visitor)) return { ok: false };

  const product = line(data, "product", 40);
  const { subject, text, html } = enquiryEmail({
    topic: document
      ? [product, document].filter(Boolean).join(" ")
      : line(data, "subject", 60) || "Website enquiry",
    request: Boolean(document),
    name,
    email,
    company,
    phone,
    message: document ? line(data, "interest", 200) : message,
    page: pagePath(request.get("referer")),
  });
  // The inbox shows who wrote, not only that the website did.
  const sender = name.replace(/[^\p{L}\p{N} .'-]/gu, "").trim();

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${sender ? `${sender} via ` : ""}Wavemetrik website <${FROM}>`,
        to: [TO],
        reply_to: email,
        subject,
        text,
        html,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (response.ok) return { ok: true };
    const problem = await response.json().catch(() => null);
    console.error(
      `Resend refused a form email (${response.status}): ${problem?.message ?? "no reason given"}`,
    );
  } catch (error) {
    console.error("Resend could not be reached for a form email.", error);
  }
  return { ok: false };
}
