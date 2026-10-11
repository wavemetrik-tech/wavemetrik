import { ChevronsUpDownIcon } from "lucide-react";
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

export function SelectField({
  label,
  options,
  className = "",
  ...props
}: {
  label: string;
  options: readonly string[];
} & React.ComponentProps<"select">) {
  const id = useId();
  return (
    // A select always shows a value, so its label stays at the top.
    <div className={`input-field ${className}`} data-filled>
      <select id={id} {...props} className="input-control cursor-pointer pr-10">
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <ChevronsUpDownIcon
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted-foreground"
      />
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
