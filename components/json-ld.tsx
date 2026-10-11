// Structured data for search engines. Pass one schema.org node or several;
// they are published as one graph.
export function JsonLd({
  data,
}: {
  data: Record<string, unknown> | Record<string, unknown>[];
}) {
  const graph = {
    "@context": "https://schema.org",
    "@graph": Array.isArray(data) ? data : [data],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        // "<" is escaped so no value can close the script element.
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}
