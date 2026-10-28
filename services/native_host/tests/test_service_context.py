import threading
import pytest
from cypher_native.service import VideoService,ServiceError
from test_service import VIDEO,SOURCE,Auth,Cloud,bound_payload


def test_all_long_source_chunks_are_submitted_without_model_side_effects_at_idle(tmp_path):
 source={**SOURCE,'segments':[{'id':f's{i}','startSeconds':i*10.,'durationSeconds':10.,'text':f'Original fact {i}. '+'word '*180} for i in range(85)]}
 cloud=Cloud();service=VideoService(tmp_path,Auth(),cloud,collector=lambda video:source)
 assert cloud.calls==[]
 service.handle('chat',bound_payload(service,mode='summary'),threading.Event(),lambda e:None)
 originals=[call for call in cloud.calls if 'transcript' in str(call['messages'])]
 joined=' '.join(str(call['messages']) for call in originals)
 for i in range(85):assert f'Original fact {i}.' in joined
 assert len(originals)>1


def test_pasted_source_has_separate_version_and_requires_new_summary(tmp_path):
 cloud=Cloud();service=VideoService(tmp_path,Auth(),cloud,collector=lambda video:SOURCE)
 service.handle('chat',bound_payload(service,mode='summary'),threading.Event(),lambda e:None)
 changed=service.handle('collect',{'video':VIDEO,'importedText':'Texte totalement différent sans temps.'},threading.Event(),lambda e:None)
 assert 'timing_unavailable' in changed['transcript']['diagnostics']
 result=service.handle('chat',{'video':VIDEO,'sourceHash':changed['sourceHash'],'mode':'summary'},threading.Event(),lambda e:None)
 assert not result['cached'] and len(cloud.calls)==2
 assert 'Texte totalement' in str(cloud.calls[1]['messages'])
