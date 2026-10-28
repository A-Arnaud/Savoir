const segmenter=new Intl.Segmenter(undefined,{granularity:'grapheme'});
const emojiGrapheme=/\p{Extended_Pictographic}|\p{Regional_Indicator}|\u20e3/u;
export function displayText(text:string,emoji:boolean):string {
  return emoji?text:[...segmenter.segment(text)].filter(part=>!emojiGrapheme.test(part.segment)).map(part=>part.segment).join('');
}
