import { expect, it } from 'vitest';
import { formatTimestamp } from '../src/panel/components/time.js';
it('formats seconds without changing the numeric action value',()=>{
  expect(formatTimestamp(50.97189189189189)).toBe('00:50');
  expect(formatTimestamp(0)).toBe('00:00');
  expect(formatTimestamp(3600)).toBe('01:00:00');
  for(const value of [-1,NaN,Infinity])expect(()=>formatTimestamp(value)).toThrow();
});
