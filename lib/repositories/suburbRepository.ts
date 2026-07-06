import type { Suburb } from "@/types/suburb";
import suburbsData from "@/data/suburbs.json";

export interface SuburbRepository {
  getAll(): Promise<Suburb[]>;
  getBySlug(id: string): Promise<Suburb | null>;
}

/**
 * JSON-backed implementation. See businessRepository.ts for why the data
 * set is injectable via the constructor.
 */
export class JSONSuburbRepository implements SuburbRepository {
  private readonly suburbs: Suburb[];

  constructor(suburbs: Suburb[] = suburbsData as Suburb[]) {
    this.suburbs = suburbs;
  }

  async getAll(): Promise<Suburb[]> {
    return this.suburbs;
  }

  async getBySlug(id: string): Promise<Suburb | null> {
    return this.suburbs.find((suburb) => suburb.id === id) ?? null;
  }
}

export const suburbRepository: SuburbRepository = new JSONSuburbRepository();
