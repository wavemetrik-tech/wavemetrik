"use client";

import { useEffect } from "react";
import { captureException } from "@/lib/posthog";

// Shown when the root layout itself fails, so it brings its own document
// and its own few styles: the site's stylesheet and theme are not loaded
// here. It follows the device's light or dark setting.
export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    captureException(error);
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "grid",
          placeItems: "center",
          padding: "1.5rem",
          colorScheme: "light dark",
          background: "Canvas",
          color: "CanvasText",
          fontFamily:
            "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        }}
      >
        <title>Something went wrong | Wavemetrik</title>
        <main style={{ maxWidth: "32rem" }}>
          <h1
            style={{
              margin: 0,
              fontSize: "2rem",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            Something went wrong.
          </h1>
          <p role="alert" style={{ margin: "1rem 0 0", lineHeight: 1.6 }}>
            The page could not be shown. Try again, or go back to the home
            page.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              marginTop: "2rem",
            }}
          >
            <button
              type="button"
              onClick={() => retry()}
              style={{
                minHeight: "3rem",
                padding: "0 1.5rem",
                border: 0,
                borderRadius: "62.5rem",
                background: "#115aa9",
                color: "#fff",
                font: "inherit",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            {/* A full page load, so a fresh copy of the site is fetched. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                minHeight: "3rem",
                padding: "0 1.5rem",
                border: "1px solid color-mix(in srgb, CanvasText 30%, transparent)",
                borderRadius: "62.5rem",
                color: "inherit",
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              Back to home
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
