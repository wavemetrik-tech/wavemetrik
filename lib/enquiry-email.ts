// The email a form submission becomes: a subject, an HTML body and the same
// content as plain text. It reads like a short letter: who wrote, what they
// said, and one small line about where it came from. Inline styles, system
// fonts and no images, because it is read in a mail client.

export type Enquiry = {
  // "Product inquiry", or for a document request "MT-Wave datasheet".
  topic: string;
  request: boolean;
  name: string;
  email: string;
  company: string;
  phone: string;
  // The contact form's message, or what a requester said they are evaluating.
  message: string;
  // The page the form was on, as a path.
  page: string;
};

const FONT =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const INK = "#1d1d1f";
const GREY = "#6e6e73";
const BLUE = "#115aa9";

// Everything a visitor typed is text, never markup.
const escape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function enquiryEmail(enquiry: Enquiry) {
  const { topic, request, name, email, company, phone, message, page } =
    enquiry;
  const subject = request
    ? `Request for the ${topic}: ${name}`
    : `${topic}: ${name}`;
  const received = `${new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(new Date())} IST`;
  const source = `Sent from wavemetrik.com${page} on ${received}`;

  // What the email says: the visitor's message, or what they asked for.
  const paragraphs = request
    ? [
        `Please send me the ${topic}.`,
        message && `What I am evaluating: ${message}`,
      ].filter(Boolean)
    : [message];

  const text = [
    ...paragraphs,
    [name, company, email, phone].filter(Boolean).join("\n"),
    `${source}.`,
  ].join("\n\n");

  // Only an address that is safe inside a link becomes one.
  const emailLink = /^[\w.+-]+@[\w.-]+$/.test(email)
    ? `<a href="mailto:${email}" style="color:${BLUE};text-decoration:none;">${email}</a>`
    : escape(email);

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escape(subject)}</title>
  </head>
  <body style="margin:0;padding:24px;background:#ffffff;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">
      <tr>
        <td style="font:400 16px/26px ${FONT};color:${INK};">
          <p style="margin:0 0 20px;font:400 13px/18px ${FONT};color:${GREY};">${escape(
            request ? `Request for the ${topic}` : topic,
          )}</p>
${paragraphs
  .map(
    (paragraph) =>
      `          <p style="margin:0 0 16px;white-space:pre-wrap;word-break:break-word;">${escape(paragraph as string)}</p>`,
  )
  .join("\n")}
          <p style="margin:24px 0 0;font:400 15px/22px ${FONT};color:${GREY};">
            <span style="font-weight:600;color:${INK};">${escape(name)}</span>${
              company ? `<br>${escape(company)}` : ""
            }<br>${emailLink}${phone ? `<br>${escape(phone)}` : ""}
          </p>
          <p style="margin:28px 0 0;padding-top:14px;border-top:1px solid #e8e8ed;font:400 12px/18px ${FONT};color:${GREY};">${escape(source)}</p>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { subject, text, html };
}
