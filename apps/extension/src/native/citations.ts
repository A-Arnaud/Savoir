export interface CitationPart{text:string;seconds?:number}
export function citedParts(text:string,segments:{startSeconds:number;text?:string}[]):CitationPart[]{
 const known=new Map<number,number>();for(const segment of segments)if(!known.has(Math.floor(segment.startSeconds)))known.set(Math.floor(segment.startSeconds),segment.startSeconds);
 const parts:CitationPart[]=[];let start=0;
 for(const match of text.matchAll(/\[(\d{1,3}:\d{2}(?::\d{2})?)\]/g)){
  const index=match.index!;if(index>start)parts.push({text:text.slice(start,index)});
  const fields=match[1].split(':').map(Number);const valid=fields.slice(1).every(n=>n<60);
  const seconds=fields.reduce((n,value)=>n*60+value,0),actual=valid?known.get(seconds):undefined;
  parts.push(actual===undefined?{text:match[0]}:{text:match[1],seconds:actual});start=index+match[0].length;
 }
 if(start<text.length)parts.push({text:text.slice(start)});return parts;
}
