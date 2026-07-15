const TRANSPORT_NSW_BASE_URL = "https://api.transport.nsw.gov.au";

export class TransportNswApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
  ) {
    super(message);
    this.name = "TransportNswApiError";
  }
}

/**
 * Shared, authenticated server-side client for every NSW Transport Open
 * Data API this project calls (carpark, trip-planner departure board,
 * stop finder). The API key is read from `process.env` here and only
 * here — never pass it through a component prop or a client-visible
 * response (DECISIONS.md ADR-014).
 *
 * Deliberately thin: no retries, no response caching beyond Next.js's
 * own `fetch` revalidation — callers pass `revalidateSeconds` to match
 * their own polling cadence (carpark: 300s, departures: 30s).
 */
export async function fetchTransportNsw<T>(
  path: string,
  params: Record<string, string>,
  revalidateSeconds: number,
): Promise<T> {
  const apiKey = process.env.TRANSPORT_NSW_API_KEY;
  if (!apiKey) {
    throw new TransportNswApiError("TRANSPORT_NSW_API_KEY is not configured");
  }

  const url = new URL(path, TRANSPORT_NSW_BASE_URL);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      Authorization: `apikey ${apiKey}`,
    },
    next: { revalidate: revalidateSeconds },
  });

  if (!response.ok) {
    throw new TransportNswApiError(
      `NSW Transport API returned ${response.status} for ${path}`,
      response.status,
    );
  }

  return (await response.json()) as T;
}
