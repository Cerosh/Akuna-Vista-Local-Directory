import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getCarparkAvailability } from "./carparkService";

function mockFacilityResponse(spots: string, occupied: string, ok = true) {
  return {
    ok,
    status: ok ? 200 : 500,
    json: async () => ({ spots, occupancy: { total: occupied } }),
  } as Response;
}

describe("getCarparkAvailability", () => {
  const originalFetch = global.fetch;
  const originalKey = process.env.TRANSPORT_NSW_API_KEY;

  beforeEach(() => {
    process.env.TRANSPORT_NSW_API_KEY = "test-key";
  });

  afterEach(() => {
    global.fetch = originalFetch;
    process.env.TRANSPORT_NSW_API_KEY = originalKey;
    vi.restoreAllMocks();
  });

  it("returns free spots (capacity minus occupancy) for Schofields, and Tallawong's three facilities summed", async () => {
    const responsesByFacility: Record<string, Response> = {
      "24": mockFacilityResponse("700", "45"), // 655 free
      "26": mockFacilityResponse("123", "62"), // 61 free
      "27": mockFacilityResponse("455", "54"), // 401 free
      "28": mockFacilityResponse("397", "32"), // 365 free
    };

    global.fetch = vi.fn((url: string | URL) => {
      const facility = new URL(url).searchParams.get("facility") ?? "";
      return Promise.resolve(responsesByFacility[facility]);
    }) as unknown as typeof fetch;

    const result = await getCarparkAvailability();

    expect(result.schofields).toBe(655);
    expect(result.tallawong).toBe(61 + 401 + 365);
    expect(typeof result.updatedAt).toBe("string");
  });

  it("sends the API key as an Authorization header, never as a query param", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve(mockFacilityResponse("100", "10")),
    ) as unknown as typeof fetch;

    await getCarparkAvailability();

    const calls = (global.fetch as ReturnType<typeof vi.fn>).mock.calls;
    for (const [url, init] of calls) {
      expect(String(url)).not.toContain("test-key");
      expect((init as RequestInit).headers).toMatchObject({
        Authorization: "apikey test-key",
      });
    }
  });

  it("throws if the upstream API is unreachable", async () => {
    global.fetch = vi.fn(() =>
      Promise.reject(new Error("network down")),
    ) as unknown as typeof fetch;

    await expect(getCarparkAvailability()).rejects.toThrow();
  });

  it("throws if any single facility request fails", async () => {
    global.fetch = vi.fn((url: string | URL) => {
      const facility = new URL(url).searchParams.get("facility") ?? "";
      if (facility === "27") {
        return Promise.resolve(mockFacilityResponse("0", "0", false));
      }
      return Promise.resolve(mockFacilityResponse("100", "10"));
    }) as unknown as typeof fetch;

    await expect(getCarparkAvailability()).rejects.toThrow();
  });

  it("throws if the response shape is unexpected (missing/malformed fields)", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({ spots: "not-a-number" }),
      } as Response),
    ) as unknown as typeof fetch;

    await expect(getCarparkAvailability()).rejects.toThrow();
  });
});
