import { describe, expect, it } from "vitest";
import { JSONMetadataRepository } from "./metadataRepository";
import type { Metadata } from "@/types/metadata";

describe("JSONMetadataRepository", () => {
  it("returns the injected metadata", async () => {
    const metadata: Metadata = {
      schemaVersion: "1.1.0",
      generatedAt: "2026-07-06T00:00:00Z",
      lastUpdated: "2026-07-06T00:00:00Z",
      totalBusinesses: 8,
      totalCategories: 8,
      communityMembers: 800,
    };
    const repository = new JSONMetadataRepository(metadata);

    await expect(repository.get()).resolves.toEqual(metadata);
  });
});
