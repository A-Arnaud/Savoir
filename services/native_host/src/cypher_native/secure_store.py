"""Installation-local, user-bound Windows DPAPI credential storage."""
from contextlib import contextmanager
import ctypes
from ctypes import wintypes
import json
import os
from pathlib import Path
import tempfile
import threading
import time
import uuid


class StorageError(Exception):
    """Safe storage error: never include OS messages or credential content."""


class DPAPIProtector:
    def _transform(self, data: bytes, decrypt: bool) -> bytes:
        if os.name != 'nt':
            raise StorageError('Protected credential storage requires Windows.')
        class Blob(ctypes.Structure):
            _fields_ = [('cbData', wintypes.DWORD), ('pbData', ctypes.POINTER(ctypes.c_ubyte))]
        buffer = (ctypes.c_ubyte * len(data)).from_buffer_copy(data)
        source = Blob(len(data), buffer)
        output = Blob()
        crypt = ctypes.WinDLL('crypt32', use_last_error=True)
        kernel = ctypes.WinDLL('kernel32', use_last_error=True)
        kernel.LocalFree.argtypes = [ctypes.c_void_p]
        kernel.LocalFree.restype = ctypes.c_void_p
        if decrypt:
            fn = crypt.CryptUnprotectData
            fn.argtypes = [ctypes.POINTER(Blob), ctypes.c_void_p, ctypes.c_void_p, ctypes.c_void_p, ctypes.c_void_p, wintypes.DWORD, ctypes.POINTER(Blob)]
            args = (ctypes.byref(source), None, None, None, None, 1, ctypes.byref(output))
        else:
            fn = crypt.CryptProtectData
            fn.argtypes = [ctypes.POINTER(Blob), wintypes.LPCWSTR, ctypes.c_void_p, ctypes.c_void_p, ctypes.c_void_p, wintypes.DWORD, ctypes.POINTER(Blob)]
            args = (ctypes.byref(source), 'Savoir credentials', None, None, None, 1, ctypes.byref(output))
        fn.restype = wintypes.BOOL
        if not fn(*args):
            raise StorageError('Protected credential operation failed.')
        try:
            return ctypes.string_at(output.pbData, output.cbData)
        finally:
            kernel.LocalFree(output.pbData)

    def protect(self, data: bytes) -> bytes:
        return self._transform(data, False)

    def unprotect(self, data: bytes) -> bytes:
        return self._transform(data, True)


_LOCKS: dict[str, threading.RLock] = {}
_LOCKS_GUARD = threading.Lock()


class SecureStore:
    def __init__(self, data_dir: Path, *, protector=None):
        self.directory = Path(data_dir)
        self.directory.mkdir(parents=True, exist_ok=True)
        self.path = self.directory / 'chatgpt-credentials.dpapi'
        self.protector = protector if protector is not None else DPAPIProtector()
        with _LOCKS_GUARD:
            self._lock = _LOCKS.setdefault(str(self.directory.resolve()).casefold(), threading.RLock())

    @contextmanager
    def locked(self):
        """Serialize rotating refreshes across threads AND host processes."""
        with self._lock:
            lockpath = self.directory / 'credentials.lock'
            with open(lockpath, 'a+b') as handle:
                handle.seek(0, 2)
                if handle.tell() == 0:
                    handle.write(b'0')
                    handle.flush()
                handle.seek(0)
                if os.name == 'nt':
                    import msvcrt
                    deadline = time.monotonic() + 120
                    while True:
                        try:
                            msvcrt.locking(handle.fileno(), msvcrt.LK_NBLCK, 1)
                            break
                        except OSError:
                            if time.monotonic() >= deadline:
                                raise StorageError('Credential storage is busy.') from None
                            time.sleep(.05)
                else:
                    import fcntl
                    fcntl.flock(handle.fileno(), fcntl.LOCK_EX)
                try:
                    yield
                finally:
                    handle.seek(0)
                    if os.name == 'nt':
                        msvcrt.locking(handle.fileno(), msvcrt.LK_UNLCK, 1)
                    else:
                        fcntl.flock(handle.fileno(), fcntl.LOCK_UN)

    def _atomic_write(self, path: Path, data: bytes):
        temporary = None
        try:
            fd, temporary = tempfile.mkstemp(prefix='.cypher-', dir=self.directory)
            with os.fdopen(fd, 'wb') as handle:
                handle.write(data)
                handle.flush()
                os.fsync(handle.fileno())
            os.replace(temporary, path)
        except OSError:
            raise StorageError('Credential storage could not be written.') from None
        finally:
            if temporary and os.path.exists(temporary):
                os.unlink(temporary)

    def host_id(self) -> str:
        with self.locked():
            path = self.directory / 'host-id'
            if path.exists():
                try:
                    return uuid.UUID(path.read_text(encoding='ascii').strip()).urn
                except (ValueError, OSError):
                    raise StorageError('Invalid installation identifier.') from None
            value = uuid.uuid4()
            self._atomic_write(path, str(value).encode('ascii'))
            return value.urn

    def load(self) -> dict | None:
        try:
            if not self.path.exists():
                return None
            if self.path.stat().st_size > 1024 * 1024:
                raise ValueError()
            result = json.loads(self.protector.unprotect(self.path.read_bytes()))
            if not isinstance(result, dict):
                raise ValueError()
            return result
        except Exception:
            raise StorageError('Protected credentials could not be read.') from None

    def save(self, record: dict):
        try:
            encrypted = self.protector.protect(json.dumps(record, separators=(',', ':')).encode('utf-8'))
            self._atomic_write(self.path, encrypted)
        except Exception:
            raise StorageError('Protected credentials could not be saved.') from None

    def clear(self):
        try:
            self.path.unlink(missing_ok=True)
        except OSError:
            raise StorageError('Protected credentials could not be removed.') from None
