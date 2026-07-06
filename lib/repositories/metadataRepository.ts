import type { Metadata } from "@/types/metadata";
import metadataData from "@/data/metadata.json";

export interface MetadataRepository {
  get(): Promise<Metadata>;
}

/**
 * JSON-backed implementation. See businessRepository.ts for why the data
 * set is injectable via the constructor.
 */
export class JSONMetadataRepository implements MetadataRepository {
  private readonly metadata: Metadata;

  constructor(metadata: Metadata = metadataData as Metadata) {
    this.metadata = metadata;
  }

  async get(): Promise<Metadata> {
    return this.metadata;
  }
}

export const metadataRepository: MetadataRepository = new JSONMetadataRepository();
