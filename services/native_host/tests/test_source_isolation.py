import json
import threading
import pytest
from cypher_native.service import VideoService, ServiceError, PROMPT_LIMIT
from test_service import VIDEO, SOURCE, Auth, Cloud


def call(service, action, **payload):
    return service.handle(action, {'video': VIDEO, **payload}, threading.Event(), lambda e: None)


@pytest.mark.parametrize('mode', ['summary', 'chat'])
def test_every_generation_requires_the_exact_displayed_snapshot(tmp_path, mode):
    cloud = Cloud()
    service = VideoService(tmp_path, Auth(), cloud, collector=lambda video: SOURCE)
    source_a = call(service, 'collect')
    source_b = call(service, 'collect', importedText='PRIVATE IMPORT FROM TAB B: unique-private-fact')
    result = call(service, 'chat', mode=mode, question='Budget ?', sourceHash=source_a['sourceHash'])
    assert result['sourceHash'] == source_a['sourceHash'] != source_b['sourceHash']
    sent = str(cloud.calls)
    assert '120 arbres' in sent and 'unique-private-fact' not in sent
    assert call(service, 'collect')['sourceHash'] == source_a['sourceHash']
    # Tab B still owns an independently addressable immutable source.
    result_b = call(service, 'chat', mode=mode, question='Quel fait ?', sourceHash=source_b['sourceHash'])
    assert result_b['sourceHash'] == source_b['sourceHash']
    assert 'unique-private-fact' in str(cloud.calls[-1])


@pytest.mark.parametrize('expected', [None, '', 'unknown', '0' * 64, {}])
def test_missing_or_unknown_snapshot_never_calls_the_cloud(tmp_path, expected):
    cloud = Cloud()
    service = VideoService(tmp_path, Auth(), cloud, collector=lambda video: SOURCE)
    call(service, 'collect')
    with pytest.raises(ServiceError, match='source_changed'):
        call(service, 'chat', mode='summary', sourceHash=expected)
    assert cloud.calls == []


def test_snapshot_does_not_authorize_a_different_video(tmp_path):
    cloud = Cloud()
    service = VideoService(tmp_path, Auth(), cloud, collector=lambda video: SOURCE)
    snapshot = call(service, 'collect')
    other = {**VIDEO, 'videoId': '01234567890', 'canonicalUrl': 'https://www.youtube.com/watch?v=01234567890'}
    with pytest.raises(ServiceError, match='source_changed'):
        service.handle('chat', {'video': other, 'mode': 'summary', 'sourceHash': snapshot['sourceHash']}, threading.Event(), lambda e: None)
    assert not cloud.calls


def test_long_imported_paragraph_is_split_before_retrieval_and_never_empty(tmp_path):
    cloud = Cloud()
    service = VideoService(tmp_path, Auth(), cloud, collector=lambda video: SOURCE)
    snapshot = call(service, 'collect', importedText=('Le budget est de 24000 euros. ' * 3000))
    assert len(snapshot['transcript']['segments']) == 1
    events = []
    service.handle('chat', {'video': VIDEO, 'sourceHash': snapshot['sourceHash'], 'mode': 'chat', 'question': 'Quel budget ?'}, threading.Event(), events.append)
    context = json.loads(cloud.calls[-1]['messages'][0]['content'])
    assert '24000 euros' in context['transcript']
    assert 0 < len(context['transcript']) <= PROMPT_LIMIT
    progress = [e['data'] for e in events if e.get('data', {}).get('stage') == 'relevant_passages']
    assert progress and 0 < progress[-1]['selected'] <= progress[-1]['total']
