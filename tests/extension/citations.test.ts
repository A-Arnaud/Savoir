import {test,expect} from 'vitest';
import {citedParts} from '../../apps/extension/src/native/citations.js';
test('only source-backed timestamps become actionable links',()=>{
 const source=[{startSeconds:50.97189189189189,text:'budget'}];
 expect(citedParts('Budget [00:50] ; inventé [99:59] ; <script>x</script>',source)).toEqual([
  {text:'Budget '},{text:'00:50',seconds:50.97189189189189},{text:' ; inventé '},{text:'[99:59]'},{text:' ; <script>x</script>'}
 ]);
});
