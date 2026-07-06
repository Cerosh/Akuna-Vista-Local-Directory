// Fixed to UTC — JSON_SCHEMA.md's dates are UTC ISO 8601, and formatting
// in the server/CI's local timezone could shift a date-only string like
// "2026-07-01" to the previous or next day.
const DATE_FORMATTER = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function formatDate(dateIso: string): string {
  return DATE_FORMATTER.format(new Date(dateIso));
}

/**
 * Renders a single date when start and end fall on the same UTC day (the
 * common case for events like a BBQ or working bee), otherwise a range.
 */
export function formatDateRange(startIso: string, endIso: string): string {
  const start = new Date(startIso);
  const end = new Date(endIso);

  if (start.toISOString().slice(0, 10) === end.toISOString().slice(0, 10)) {
    return formatDate(startIso);
  }

  return `${formatDate(startIso)} – ${formatDate(endIso)}`;
}
