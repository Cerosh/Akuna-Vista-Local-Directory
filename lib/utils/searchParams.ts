/**
 * Builds a URL with the given params merged in — undefined values are
 * removed. Keeps filter/sort/page state driven entirely by the URL
 * (CODING_STANDARDS.md "prefer derived state"), so directory pages need
 * no client-side state management.
 */
export function withSearchParams(
  pathname: string,
  current: Record<string, string | undefined>,
  updates: Record<string, string | number | undefined>,
): string {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(current)) {
    if (value !== undefined) params.set(key, value);
  }
  for (const [key, value] of Object.entries(updates)) {
    if (value === undefined) {
      params.delete(key);
    } else {
      params.set(key, String(value));
    }
  }

  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
}
