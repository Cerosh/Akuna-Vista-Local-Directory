"use client";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Fallback for errors that escape the root layout itself (e.g. a broken
 * Navigation/Footer). Deliberately minimal and self-contained — no shared
 * components imported, since those could be part of whatever just failed.
 * Must render its own <html>/<body> per Next.js's requirement for this file.
 */
export default function GlobalError({ reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body>
        <div
          style={{
            display: "flex",
            minHeight: "100vh",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            padding: "2rem",
            textAlign: "center",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <h1 style={{ fontSize: "1.5rem", fontWeight: 600 }}>Something went wrong</h1>
          <p style={{ color: "#525252", maxWidth: "28rem" }}>
            The application hit an unexpected problem. Please try again, or reload the page.
          </p>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button
              onClick={reset}
              style={{
                borderRadius: "0.5rem",
                backgroundColor: "#2563eb",
                color: "#ffffff",
                padding: "0.5rem 1rem",
                border: "none",
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            {/* A plain <a>, not next/link, is deliberate here: this page
                renders when something has escaped the root layout, so it
                must not depend on the App Router being healthy. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              style={{
                borderRadius: "0.5rem",
                border: "1px solid #d4d4d4",
                padding: "0.5rem 1rem",
                textDecoration: "none",
                color: "#171717",
              }}
            >
              Return home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
