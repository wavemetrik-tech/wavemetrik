import { RequestForm } from "@/components/request-form";

// The presentation is not published; it is sent to people who ask for it.
export function PresentationRequestForm() {
  return (
    <div className="flex min-w-0 flex-col gap-5 rounded-2xl bg-background p-6 sm:p-7">
      <div>
        <h3 className="text-title-3 font-semibold">Request the presentation</h3>
        <p className="mt-1.5 text-subhead/[1.375rem] text-pretty text-muted-foreground">
          Tell us who you are and we’ll send it to you.
        </p>
      </div>
      <RequestForm
        document="technical presentation"
        interest
        submitLabel="Request presentation"
      />
    </div>
  );
}
