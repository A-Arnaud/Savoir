import os
import pytest
from cypher_native.secure_store import SecureStore, StorageError


def test_dpapi_roundtrip_atomic_and_no_plaintext(tmp_path):
    if os.name != 'nt':
        pytest.skip('Windows DPAPI')
    store = SecureStore(tmp_path)
    store.save({'access_token': 'FAKE_SECRET_very_private'})
    assert b'FAKE_SECRET' not in store.path.read_bytes()
    assert SecureStore(tmp_path).load() == {'access_token': 'FAKE_SECRET_very_private'}
    store.clear()
    assert store.load() is None


def test_host_id_stable(tmp_path):
    assert SecureStore(tmp_path).host_id() == SecureStore(tmp_path).host_id()
    assert SecureStore(tmp_path).host_id().startswith('urn:uuid:')


def test_corrupt_storage_safe(tmp_path):
    store = SecureStore(tmp_path)
    store.path.write_bytes(b'FAKE_SECRET')
    with pytest.raises(StorageError) as exc:
        store.load()
    assert 'FAKE_SECRET' not in str(exc.value)


def test_non_windows_dpapi_fails_closed(monkeypatch):
    from cypher_native import secure_store
    monkeypatch.setattr(secure_store.os, 'name', 'posix')
    with pytest.raises(StorageError):
        secure_store.DPAPIProtector().protect(b'FAKE_SECRET')


def test_explicit_test_protector_and_failed_write_preserves_record(tmp_path):
    class TestProtector:
        def protect(self, data): return bytes(x ^ 173 for x in data)
        def unprotect(self, data): return bytes(x ^ 173 for x in data)
    store = SecureStore(tmp_path, protector=TestProtector())
    store.save({'v': 'original'})
    assert store.load() == {'v': 'original'}
    class BrokenProtector(TestProtector):
        def protect(self, data): raise RuntimeError('FAKE_SECRET')
    store.protector = BrokenProtector()
    with pytest.raises(StorageError) as exc:
        store.save({'v': 'replacement'})
    assert 'FAKE_SECRET' not in str(exc.value)
    assert store.load() == {'v': 'original'}
