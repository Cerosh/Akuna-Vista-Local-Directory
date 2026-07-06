import { describe, expect, it } from "vitest";
import { formatDate, formatDateRange } from "./formatDate";

describe("formatDate", () => {
  it("formats an ISO datetime as a short Australian date", () => {
    expect(formatDate("2026-09-10T10:00:00Z")).toBe("10 Sept 2026");
  });

  it("formats a date-only string", () => {
    expect(formatDate("2026-07-01")).toBe("1 July 2026");
  });
});

describe("formatDateRange", () => {
  it("collapses to a single date when start and end are the same day", () => {
    expect(formatDateRange("2026-09-10T10:00:00Z", "2026-09-10T14:00:00Z")).toBe("10 Sept 2026");
  });

  it("renders a range when start and end differ", () => {
    expect(formatDateRange("2026-07-01", "2026-07-31")).toBe("1 July 2026 – 31 July 2026");
  });
});
