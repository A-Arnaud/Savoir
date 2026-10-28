export type Action='status'|'connect'|'disconnect'|'collect'|'chat'|'cancel';
export interface NativeRequest{id:string;action:Action;payload?:Record<string,unknown>}
export interface NativeEvent{id:string;event:'result'|'delta'|'progress'|'error';data?:any;text?:string;code?:string;message?:string}
export const actions=new Set<string>(['status','connect','disconnect','collect','chat','cancel']);
export function validRequest(value:any):value is NativeRequest{
 return !!value&&typeof value==='object'&&!Array.isArray(value)&&typeof value.id==='string'&&value.id.length>0&&value.id.length<=128&&actions.has(value.action)
  &&(value.payload===undefined||!!value.payload&&typeof value.payload==='object'&&!Array.isArray(value.payload))
  &&Object.keys(value).every(key=>['id','action','payload'].includes(key));
}
