// The tick scale the header and footer share: a tick every 10px and a longer
// one every 50px, like the frequency axis of a spectrum display. It is 8px
// tall, takes the current text color, and fades out at both ends. `ticks`
// says which edge the ticks stand on.
export function FrequencyScale({
  ticks = "up",
  className = "",
}: {
  ticks?: "up" | "down";
  className?: string;
}) {
  const edge = ticks === "up" ? "bottom" : "top";
  return (
    <div
      aria-hidden
      className={`h-2 mask-x-from-88% text-foreground/30 ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to right, currentColor 1px, transparent 1px)",
        backgroundSize: "10px 4px, 50px 8px",
        backgroundPosition: `center ${edge}, center ${edge}`,
        backgroundRepeat: "repeat-x",
      }}
    />
  );
}
