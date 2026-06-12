/**
 * Renders one or more JSON-LD structured-data blocks into the document.
 *
 * Uses a native `<script type="application/ld+json">` (not `next/script`) because
 * JSON-LD is data, not executable code. The `<` → `<` escape scrubs HTML
 * tags from the payload to prevent XSS via interpolated strings.
 */
export function JsonLd({
  data,
}: {
  data: Record<string, unknown> | Record<string, unknown>[];
}) {
  const blocks = Array.isArray(data) ? data : [data];

  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(block).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
