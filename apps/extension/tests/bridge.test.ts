// @vitest-environment jsdom
import { expect, it } from 'vitest';
import { isPlayerCommand, seekVideo } from '../src/content/bridge.js';

it('rejects foreign sources/origins and invalid times at the player boundary', async () => {
  const source = {} as Window;
  const command = { type: 'cypher:seek', seconds: 50.97189189189189 };
  const origin = 'chrome-extension://' + 'a'.repeat(32);
  expect(isPlayerCommand({ source, origin, data: command }, source, origin)).toBe(true);
  expect(isPlayerCommand({ source: {} as Window, origin, data: command }, source, origin)).toBe(false);
  expect(isPlayerCommand({ source, origin: 'https://evil.example', data: command }, source, origin)).toBe(false);
  for (const seconds of [-1, NaN, Infinity]) {
    expect(isPlayerCommand({ source, origin, data: { ...command, seconds } }, source, origin)).toBe(false);
    await expect(seekVideo(seconds)).rejects.toThrow();
  }
});
