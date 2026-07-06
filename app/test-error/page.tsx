/**
 * Test-only route: deliberately throws so tests/e2e/error-pages.spec.ts can
 * exercise app/error.tsx's fallback UI. There is no way to make a Server
 * Component reading static JSON throw via network interception (Playwright
 * can only intercept the network layer), so a minimal dedicated route is
 * the pragmatic way to test a real error boundary — added for Sprint 07
 * (Quality & Performance).
 */
// Forces this to throw at request time, not at build time — a page that
// unconditionally throws would otherwise fail static prerendering itself.
export const dynamic = "force-dynamic";

export default function TestErrorPage(): never {
  throw new Error("Intentional test error — exercises app/error.tsx's boundary.");
}
