import { describe, expect, it } from "vitest";
import { createTtlCache } from "./weatherCache";

describe("createTtlCache", () => {
  it("returns null before anything has been set", () => {
    const cache = createTtlCache<string>(1000);
    expect(cache.get(0)).toBeNull();
  });

  it("returns the cached value before the TTL elapses", () => {
    const cache = createTtlCache<string>(1000);
    cache.set("value", 0);
    expect(cache.get(500)).toBe("value");
    expect(cache.get(999)).toBe("value");
  });

  it("returns null once the TTL has elapsed", () => {
    const cache = createTtlCache<string>(1000);
    cache.set("value", 0);
    expect(cache.get(1000)).toBeNull();
    expect(cache.get(5000)).toBeNull();
  });

  it("overwriting the value resets the TTL window", () => {
    const cache = createTtlCache<string>(1000);
    cache.set("first", 0);
    cache.set("second", 900);
    expect(cache.get(1500)).toBe("second");
    expect(cache.get(1900)).toBeNull();
  });
});
