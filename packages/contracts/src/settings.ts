import { defaultSettings } from './generated.js';
import { parseSettings, type SettingsV1 } from './index.js';

export function normalizeSettings(input: unknown): SettingsV1 {
  const defaults = structuredClone(defaultSettings) as SettingsV1;
  if (!input || typeof input !== 'object' || Array.isArray(input)) return defaults;
  const value = input as Record<string, unknown>;
  if (value.schemaVersion !== undefined && value.schemaVersion !== 0 && value.schemaVersion !== 1) return defaults;
  const merged = { ...defaults, ...value, schemaVersion: 1 };
  for (const group of ['flexible', 'timestamped', 'transcript', 'comments'] as const) {
    if (value[group] && typeof value[group] === 'object' && !Array.isArray(value[group])) {
      Object.assign(merged, { [group]: { ...defaults[group], ...value[group] } });
    }
  }
  try { return parseSettings(merged); } catch { return defaults; }
}
