import { describe, expect, it } from 'vitest';
import { normalizeSettings } from '../src/settings.js';
import { parseJobRequest, parseJobSnapshot } from '../src/index.js';
import { readFileSync } from 'node:fs';

describe('settings and shared wire schema', () => {
  it('migrates old data idempotently and retains independent interface/output languages', () => {
    const settings = normalizeSettings({ schemaVersion: 0, outputLanguage: 'FR' });
    expect(settings.flexible).toEqual({ focus: 'insightful', format: 'list', amount: 'auto', emoji: true, highlight: true, grouping: true });
    expect(settings.autoSummary).toBe(false);
    expect(settings.outputLanguage).toBe('FR');
    expect(settings.interfaceLanguage).toBe('fr');
    expect(normalizeSettings(settings)).toEqual(settings);
    expect(normalizeSettings({ schemaVersion: 999 }).outputLanguage).toBe('EN');
  });
  it('reads the Python contract fixture without loss and rejects unsafe times and video URLs', () => {
    const fixture = JSON.parse(readFileSync('tests/fixtures/contracts/job-request.json', 'utf8'));
    expect(parseJobRequest(fixture)).toEqual(fixture);
    const negative = structuredClone(fixture);
    negative.importedSource.segments[0].startSeconds = -1;
    expect(() => parseJobRequest(negative)).toThrow();
    const invalid = structuredClone(fixture);
    invalid.video.canonicalUrl = 'http://127.0.0.1/private';
    expect(() => parseJobRequest(invalid)).toThrow();
    const mismatched = structuredClone(fixture);
    mismatched.video.canonicalUrl = 'https://www.youtube.com/watch?v=01234567890';
    expect(() => parseJobRequest(mismatched)).toThrow();
    const duplicate = structuredClone(fixture);
    duplicate.importedSource.segments.push({ ...duplicate.importedSource.segments[0] });
    expect(() => parseJobRequest(duplicate)).toThrow();
  });
  it('rejects a comment result whose advertised count exceeds its actual items',()=>{
    const fixture=JSON.parse(readFileSync('tests/fixtures/contracts/job-request.json','utf8'));
    const result={kind:'comments',tldr:null,comments:[],collection:{fetchedCount:2,complete:true,diagnostics:[],announcedCount:2},language:'EN',provenance:null};
    expect(()=>parseJobSnapshot({id:'one',video:fixture.video,state:'completed',stage:'completed',completed:0,total:null,revision:1,result,error:null})).toThrow();
  });
});
