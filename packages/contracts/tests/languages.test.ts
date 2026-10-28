import {test,expect} from 'vitest';
import {languages,directionFor} from '../src/languages.js';
import {normalizeSettings} from '../src/index.js';
test('41 factual language choices retain variants and independent interface language',()=>{
  expect(new Set(languages.map(language=>language.code)).size).toBe(41);
  expect(languages.map(language=>language.code)).toEqual(expect.arrayContaining(['PT-BR','PT-PT','ZH','ZH-TW','NB','TL']));
  for(const code of ['AR','HE','UR'])expect(directionFor(code)).toBe('rtl');
  expect(directionFor('FR')).toBe('ltr');
  expect(normalizeSettings({outputLanguage:'AR',interfaceLanguage:'en'})).toMatchObject({outputLanguage:'AR',interfaceLanguage:'en'});
  expect(normalizeSettings({outputLanguage:'XX'}).outputLanguage).toBe('EN');
});
