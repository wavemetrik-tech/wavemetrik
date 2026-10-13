import { CheckIcon, CircleAlertIcon } from "lucide-react";
import { useId } from "react";

// Form fields in the manner of Apple's web forms: a tall rounded field whose
// label sits inside it and moves to the top edge once the field has the
// focus or a value. The styles are beside `.input-field` in globals.css.

function FieldLabel({
  htmlFor,
  optional,
  children,
}: {
  htmlFor: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="input-label">
      {children}
      {optional && " (optional)"}
    </label>
  );
}

export function TextField({
  label,
  optional,
  className = "",
  ...props
}: { label: string; optional?: boolean } & React.ComponentProps<"input">) {
  const id = useId();
  return (
    <div className={`input-field ${className}`}>
      {/* The blank placeholder lets CSS tell an empty field from a filled
          one. */}
      <input id={id} placeholder=" " {...props} className="input-control" />
      <FieldLabel htmlFor={id} optional={optional}>
        {label}
      </FieldLabel>
    </div>
  );
}

export function TextAreaField({
  label,
  className = "",
  ...props
}: { label: string } & React.ComponentProps<"textarea">) {
  const id = useId();
  return (
    <div className={`input-field ${className}`}>
      <textarea
        id={id}
        placeholder=" "
        {...props}
        className="input-control input-area"
      />
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
    </div>
  );
}

// The optional mobile number every form asks for. Any usual way of writing
// a number passes, with or without a country code.
export function PhoneField({ className }: { className?: string }) {
  return (
    <TextField
      label="Mobile number"
      optional
      name="phone"
      type="tel"
      autoComplete="tel"
      maxLength={20}
      pattern="[+\(0-9][0-9 \(\)\-.]{5,19}"
      title="A phone number, for example +91 98765 43210"
      className={className}
    />
  );
}

// A field for scripts that fill in every input they find. It is not shown,
// not reachable by keyboard and not announced; a submission that has it
// filled is dropped by `lib/send-enquiry.ts`.
export function Honeypot() {
  return (
    <div aria-hidden className="hidden">
      <input type="text" name="referral_code" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

// What a form says once it has been sent, or could not be.
export function FormNotice({
  sent = false,
  children,
}: {
  sent?: boolean;
  children: React.ReactNode;
}) {
  const Icon = sent ? CheckIcon : CircleAlertIcon;
  return (
    <div className="flex items-start gap-3 rounded-xl bg-muted p-4 text-footnote/5">
      <Icon aria-hidden className="mt-0.5 size-4 shrink-0 text-link" />
      <p>{children}</p>
    </div>
  );
}
