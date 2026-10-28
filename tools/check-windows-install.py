"""Exercise the real per-user Windows installer and uninstall ownership.

Run after building and installing Savoir. Uses one fresh temporary A install,
then restores the normal B install even if an assertion fails. No account use.
"""
import hashlib
import json
import os
from pathlib import Path
import shutil
import subprocess
import tempfile
import winreg

ROOT=Path(__file__).resolve().parents[1]
INSTALLER=ROOT/'release/native-0.2.0/Savoir-Setup-0.2.0.exe'
NORMAL=Path(os.environ['LOCALAPPDATA'])/'Programs/Savoir YouTube'
KEY=r'Software\Microsoft\Windows\CurrentVersion\Uninstall\SavoirYouTube'

def value(key,name=''):
    try:
        with winreg.OpenKey(winreg.HKEY_CURRENT_USER,key) as handle:
            return winreg.QueryValueEx(handle,name)[0]
    except FileNotFoundError:
        return None

assert value(KEY,'InstallLocation')==str(NORMAL),'install the current Savoir package first'
scratch=Path(os.environ.get('TMPDIR',str(ROOT/'.local')))
scratch.mkdir(parents=True,exist_ok=True)
a=Path(tempfile.mkdtemp(prefix='savoir-install-owner-a-',dir=scratch))
shortcut=Path(os.environ['APPDATA'])/'Microsoft/Windows/Start Menu/Programs/Savoir YouTube/Premiers pas.lnk'
try:
    subprocess.run([str(INSTALLER),'/S',f'/D={a}'],check=True,timeout=60)
    assert value(KEY,'InstallLocation')==str(a)
    subprocess.run([str(INSTALLER),'/S'],check=True,timeout=60)
    assert value(KEY,'InstallLocation')==str(NORMAL)
    shortcut_hash=hashlib.sha256(shortcut.read_bytes()).hexdigest()
    subprocess.run([str(a/'Uninstall.exe'),'/S',f'_?={a}'],check=True,timeout=60)
    assert not (a/'extension/manifest.json').exists()
    assert value(KEY,'InstallLocation')==str(NORMAL)
    assert value(KEY,'UninstallString')=='"'+str(NORMAL/'Uninstall.exe')+'"'
    for browser in ('Google\\Chrome','Microsoft\\Edge'):
        assert value('Software\\'+browser+'\\NativeMessagingHosts\\com.cypher.youtube')==str(NORMAL/'com.cypher.youtube.json')
    assert hashlib.sha256(shortcut.read_bytes()).hexdigest()==shortcut_hash
    manifest=json.loads((NORMAL/'com.cypher.youtube.json').read_text())
    assert (NORMAL/manifest['path']).is_file()
    assert manifest['allowed_origins']==['chrome-extension://jpikchfngegijdlhpadbahgkaiaihgpi/']
    assert json.loads((NORMAL/'extension/manifest.json').read_text())['name']=='Savoir'
    print('PASS: installed Savoir, real host paths/origin, and older-A uninstall preserves current B records/shortcut/binaries')
finally:
    subprocess.run([str(INSTALLER),'/S'],check=True,timeout=60)
    shutil.rmtree(a)
