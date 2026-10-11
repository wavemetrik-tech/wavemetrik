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
