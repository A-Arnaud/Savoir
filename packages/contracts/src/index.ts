import type { FromSchema } from 'json-schema-to-ts';
import { schemas } from './generated.js';
import validators from './validators.mjs';

export type SettingsV1 = FromSchema<typeof schemas.SettingsV1>;
export type VideoContext = FromSchema<typeof schemas.VideoContext>;
export type Transcript = FromSchema<typeof schemas.Transcript>;
export type JobRequest = FromSchema<typeof schemas.JobRequest>;
export type JobSnapshot = FromSchema<typeof schemas.JobSnapshot>;
export type ExportDocument = FromSchema<typeof schemas.ExportDocument>;
export function parseExportDocument(input:unknown):ExportDocument{
  if(!validators.ExportDocument(input))throw new TypeError('Invalid export document');
  return structuredClone(input) as ExportDocument;
}
export function parseSettings(input: unknown): SettingsV1 {
  if (!validators.SettingsV1(input)) throw new TypeError('Invalid settings');
  return structuredClone(input) as SettingsV1;
}
export function parseJobRequest(input: unknown): JobRequest {
  if (!validators.JobRequest(input)) throw new TypeError('Invalid job request');
  const job = input as JobRequest;
  if (new URL(job.video.canonicalUrl).searchParams.get('v') !== job.video.videoId) throw new TypeError('Video mismatch');
  if (job.importedSource && new Set(job.importedSource.segments.map(s => s.id)).size !== job.importedSource.segments.length) {
    throw new TypeError('Duplicate segment IDs');
  }
  return structuredClone(job);
}
export function parseJobSnapshot(input: unknown): JobSnapshot {
  if (!validators.JobSnapshot(input)) throw new TypeError('Invalid job snapshot');
  const snapshot=input as JobSnapshot;
  if(snapshot.result?.kind==='comments') {
    const result=snapshot.result;
    if(result.collection.fetchedCount!==result.comments.length||new Set(result.comments.map(comment=>comment.id)).size!==result.comments.length)throw new TypeError('Invalid acquired comment count');
  }
  return structuredClone(snapshot);
}
export { normalizeSettings } from './settings.js';
