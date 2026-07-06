export interface Metadata {
  schemaVersion: string;
  generatedAt: string;
  lastUpdated: string;
  totalBusinesses: number;
  totalCategories: number;
  /** Added in schema 1.1.0 for the homepage Community Statistics section. */
  communityMembers?: number;
}
