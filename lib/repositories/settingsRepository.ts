import type { Settings } from "@/types/settings";
import settingsData from "@/data/settings.json";

export interface SettingsRepository {
  get(): Promise<Settings>;
}

/**
 * JSON-backed implementation. See businessRepository.ts for why the data
 * set is injectable via the constructor.
 */
export class JSONSettingsRepository implements SettingsRepository {
  private readonly settings: Settings;

  constructor(settings: Settings = settingsData as Settings) {
    this.settings = settings;
  }

  async get(): Promise<Settings> {
    return this.settings;
  }
}

export const settingsRepository: SettingsRepository = new JSONSettingsRepository();
