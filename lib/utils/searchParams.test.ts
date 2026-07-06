import { describe, expect, it } from "vitest";
import { withSearchParams } from "./searchParams";

describe("withSearchParams", () => {
  it("returns the bare pathname when there are no params", () => {
    expect(withSearchParams("/businesses", {}, {})).toBe("/businesses");
  });

  it("adds new params", () => {
    expect(withSearchParams("/businesses", {}, { category: "plumbing" })).toBe(
      "/businesses?category=plumbing",
    );
  });

  it("preserves existing params alongside updates", () => {
    const result = withSearchParams("/businesses", { sort: "name" }, { category: "plumbing" });
    expect(result).toBe("/businesses?sort=name&category=plumbing");
  });

  it("overwrites an existing param with the same key", () => {
    const result = withSearchParams("/businesses", { sort: "featured" }, { sort: "name" });
    expect(result).toBe("/businesses?sort=name");
  });

  it("removes a param when the update value is undefined", () => {
    const result = withSearchParams(
      "/businesses",
      { category: "plumbing", page: "2" },
      { page: undefined },
    );
    expect(result).toBe("/businesses?category=plumbing");
  });

  it("stringifies numeric values", () => {
    expect(withSearchParams("/businesses", {}, { page: 2 })).toBe("/businesses?page=2");
  });
});
