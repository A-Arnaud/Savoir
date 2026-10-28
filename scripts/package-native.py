"""Build the on-demand connector and a per-user Windows installer."""
import argparse
import base64
import hashlib
import importlib.metadata
import json
import os
from pathlib import Path
import shutil
import subprocess
import sys

ROOT=Path(__file__).resolve().parents[1]
VERSION='0.2.0'


def extension_id(manifest):
    try:raw=base64.b64decode(manifest['key'],validate=True)
    except Exception as error:raise ValueError('A valid public extension key is required') from error
    if len(raw)<128:raise ValueError('Invalid public extension key')
    digest=hashlib.sha256(raw).digest()[:16].hex()
    return ''.join(chr(97+int(char,16)) for char in digest)


def host_manifest(manifest):
    return {'name':'com.cypher.youtube','description':'Savoir - connecteur a la demande','path':'connector\\SavoirConnector.exe','type':'stdio',
            'allowed_origins':[f'chrome-extension://{extension_id(manifest)}/']}


def run(command):
    subprocess.run([str(x) for x in command],cwd=ROOT,check=True)


def npm_licenses(root,destination):
    index=[]
    for relative,metadata in json.loads((root/'package-lock.json').read_text(encoding='utf-8'))['packages'].items():
        if not relative.startswith('node_modules/') or metadata.get('dev'):continue
        source=root/relative
        if not source.is_dir():raise RuntimeError('Missing npm runtime dependency; run npm ci before packaging: '+relative)
        target=destination/relative.removeprefix('node_modules/');copied=[]
        for entry in source.iterdir():
            if entry.is_file() and entry.name.lower().startswith(('license','licence','copying','notice')):
                target.mkdir(parents=True,exist_ok=True);shutil.copy2(entry,target/entry.name);copied.append(entry.name)
        index.append({'name':relative.split('node_modules/')[-1],'version':metadata.get('version',''),'files':copied})
    destination.mkdir(parents=True,exist_ok=True)
    (destination/'index.json').write_text(json.dumps(index,indent=2),encoding='utf-8')
    return index


def prune_windows_api_sets(connector):
    # Windows 10+ resolves API-set contracts through its OS loader/schema.
    # Do not redistribute accidental SDK/OS forwarder copies collected by a CI
    # machine; this is not permission to remove real third-party vendor DLLs.
    removed=[]
    for library in connector.rglob('*.dll'):
        if library.name.lower().startswith(('api-ms-win-','ext-ms-win-')):
            removed.append(library.relative_to(connector).as_posix());library.unlink()
    return sorted(removed)


def native_licenses(root,destination,connector):
    source=root/'installer/licenses/native'
    provenance=json.loads((source/'sources.json').read_text(encoding='utf-8'))
    for entry in provenance['files']:
        if hashlib.sha256((source/entry['file']).read_bytes()).hexdigest()!=entry['sha256']:
            raise RuntimeError('Native notice differs from its recorded upstream text: '+entry['file'])
    destination.mkdir(parents=True,exist_ok=True)
    for entry in source.iterdir():
        if entry.is_file():shutil.copy2(entry,destination/entry.name)
    binaries=[]
    for library in sorted(connector.rglob('*.dll')):
        name=library.name.lower()
        if name.startswith('libffi'):notice='LICENSE.libffi.txt'
        elif name.startswith(('libcrypto','libssl')):notice='LICENSE.openssl-3.txt'
        elif name.startswith('sqlite'):notice='LICENSE.sqlite.txt'
        elif name.startswith('python'):notice='../PYTHON-LICENSE.txt'
        elif name.startswith('vcruntime'):notice='MSVC-RUNTIME.txt'
        else:raise RuntimeError('Review the vendor licence of this new native DLL before distributing: '+library.name)
        binaries.append({'path':library.relative_to(connector).as_posix(),'sha256':hashlib.sha256(library.read_bytes()).hexdigest(),'notice':notice})
    index={'notice_sources':'sources.json','binaries':binaries}
    (destination/'index.json').write_text(json.dumps(index,indent=2),encoding='utf-8')
    return index


def licenses(destination):
    destination.mkdir(parents=True,exist_ok=True)
    python_license=Path(sys.base_prefix)/'LICENSE.txt'
    if not python_license.is_file():raise RuntimeError('CPython LICENSE.txt missing; do not distribute an incomplete runtime notice')
    shutil.copy2(python_license,destination/'PYTHON-LICENSE.txt')
    index=[]
    for distribution in importlib.metadata.distributions():
        name=distribution.metadata.get('Name','dependency');folder=destination/name
        copied=[]
        for entry in distribution.files or []:
            basename=Path(str(entry)).name.lower()
            if basename.startswith(('license','licence','copying','notice')):
                path=Path(distribution.locate_file(entry))
                if path.is_file():
                    folder.mkdir(exist_ok=True);target=folder/Path(str(entry)).name
                    if not target.exists():shutil.copy2(path,target)
                    copied.append(target.name)
        index.append({'name':name,'version':distribution.version,'license':distribution.metadata.get('License-Expression') or distribution.metadata.get('License',''),'files':copied})
    (destination/'index.json').write_text(json.dumps(index,ensure_ascii=False,indent=2),encoding='utf-8')
    npm_licenses(ROOT,destination/'npm')
    native_licenses(ROOT,destination/'native',destination.parent/'connector')


def main():
    parser=argparse.ArgumentParser();parser.add_argument('--skip-connector',action='store_true');args=parser.parse_args()
    release=ROOT/'release/native-0.2.0';stage=release/'payload';stage.mkdir(parents=True,exist_ok=True)
    manifest=json.loads((ROOT/'dist/extension/manifest.json').read_text(encoding='utf-8'))
    if manifest.get('version')!=VERSION:raise RuntimeError('Build extension 0.2.0 first')
    if not args.skip_connector:
        run([sys.executable,'-m','PyInstaller','--noconfirm','--clean','--onedir','--console','--name','SavoirConnector',
             '--distpath',release/'pyinstaller','--workpath',ROOT/'.local/native-build','--specpath',ROOT/'.local/native-build',
             '--paths',ROOT/'services/native_host/src','--paths',ROOT/'services/companion/src',
             '--hidden-import','cypher_native.auth','--hidden-import','cypher_native.cloud','--hidden-import','cypher.sources.youtube',
             '--collect-submodules','yt_dlp',ROOT/'services/native_host/entrypoint.py'])
    connector=release/'pyinstaller/SavoirConnector'
    if not (connector/'SavoirConnector.exe').is_file():raise RuntimeError('Packaged connector missing')
    for name,source in [('connector',connector),('extension',ROOT/'dist/extension')]:
        target=stage/name
        if target.exists():shutil.rmtree(target)
        shutil.copytree(source,target)
    excluded_api_sets=prune_windows_api_sets(stage/'connector')
    (stage/'com.cypher.youtube.json').write_text(json.dumps(host_manifest(manifest),indent=2),encoding='utf-8')
    shutil.copy2(ROOT/'LICENSE',stage/'LICENSE.txt')
    licenses(stage/'licenses')
    public_key_id=extension_id(manifest)
    guide=(ROOT/'installer/guide.html').read_text(encoding='utf-8').replace('__EXTENSION_ID__',public_key_id).replace('__VERSION__',VERSION)
    (stage/'Premiers pas.html').write_text(guide,encoding='utf-8')
    nsis=Path(os.environ.get('SAVOIR_MAKENSIS') or os.environ.get('CYPHER_MAKENSIS') or shutil.which('makensis') or str(Path.home()/'AppData/Local/electron-builder/Cache/nsis-3.0.4.1/nsis-3.0.4.1-1mx3n/makensis.exe'))
    if not nsis.is_file():raise RuntimeError('NSIS missing: install NSIS or set SAVOIR_MAKENSIS')
    installer=release/f'Savoir-Setup-{VERSION}.exe'
    run([nsis,'/INPUTCHARSET','UTF8',f'/DPAYLOAD={stage}',f'/DOUTPUT={installer}',ROOT/'installer/cypher.nsi'])
    result={'version':VERSION,'extensionId':public_key_id,'installer':str(installer.resolve()),'sha256':hashlib.sha256(installer.read_bytes()).hexdigest(),
            'bytes':installer.stat().st_size,'signed':False,'storePublished':False,'osApiSetForwardersExcluded':excluded_api_sets}
    (release/'release-manifest.json').write_text(json.dumps(result,indent=2),encoding='utf-8')
    print(json.dumps(result,indent=2))


if __name__=='__main__':main()
