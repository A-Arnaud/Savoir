import {languageOptions} from './generated.js';
export interface LanguageOption {code:string;label:string;direction:'rtl'|'ltr'}
export const languages:readonly LanguageOption[]=languageOptions;
export function directionFor(code:string):'ltr'|'rtl'{return languages.find(language=>language.code===code.toUpperCase())?.direction||'ltr';}
