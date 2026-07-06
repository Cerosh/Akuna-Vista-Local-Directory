import { describe, expect, it } from "vitest";
import { JSONSuburbRepository } from "./suburbRepository";
import type { Suburb } from "@/types/suburb";

function makeSuburb(overrides: Partial<Suburb>): Suburb {
  return {
    id: "example",
    name: "Example",
    postcode: "2000",
    state: "NSW",
    ...overrides,
  };
}

describe("JSONSuburbRepository", () => {
  it("returns all suburbs", async () => {
    const repository = new JSONSuburbRepository([makeSuburb({ id: "a" }), makeSuburb({ id: "b" })]);

    await expect(repository.getAll()).resolves.toHaveLength(2);
  });

  it("finds a suburb by id", async () => {
    const target = makeSuburb({ id: "schofields", name: "Schofields" });
    const repository = new JSONSuburbRepository([makeSuburb({ id: "other" }), target]);

    await expect(repository.getBySlug("schofields")).resolves.toEqual(target);
  });

  it("returns null for an unknown id", async () => {
    const repository = new JSONSuburbRepository([makeSuburb({ id: "known" })]);

    await expect(repository.getBySlug("unknown")).resolves.toBeNull();
  });
});
