import importlib.util,json
from pathlib import Path
import pytest
ROOT=Path(__file__).resolve().parents[3]


def packaging():
 path=ROOT/'scripts/package-native.py';assert path.is_file(),'native packaging script missing'
 spec=importlib.util.spec_from_file_location('cypher_packaging',path);module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module);return module


def test_host_manifest_pins_only_the_actual_extension_id():
 p=packaging();manifest=json.loads((ROOT/'apps/extension/manifest.json').read_text())
 value=p.host_manifest(manifest)
 assert value['name']=='com.cypher.youtube' and value['type']=='stdio'
 assert value['allowed_origins']==['chrome-extension://jpikchfngegijdlhpadbahgkaiaihgpi/']
 assert value['path']=='connector\\SavoirConnector.exe'


def test_npm_runtime_license_text_is_packaged_but_dev_tools_are_not(tmp_path):
 p=packaging()
 root=tmp_path/'fixture-root';root.mkdir()
 (root/'package-lock.json').write_text(json.dumps({'packages':{'node_modules/react':{'version':'0.0.0-fixture'},'node_modules/dev-tool':{'version':'0.0.0-fixture','dev':True}}}))
 for name in ('react','dev-tool'):
  folder=root/'node_modules'/name;folder.mkdir(parents=True);(folder/'LICENSE').write_text('Original fixture license notice')
 destination=tmp_path/'license-output'
 index=p.npm_licenses(root,destination)
 assert len(index)==1 and index[0]['name']=='react'
 assert (destination/'react/LICENSE').read_text()=='Original fixture license notice'
 assert not (destination/'dev-tool').exists()


def test_native_runtime_notices_are_copied_and_bound_to_distributed_binaries(tmp_path):
 p=packaging();connector=tmp_path/'connector';internal=connector/'_internal';internal.mkdir(parents=True)
 for name in ('libffi-8.dll','libcrypto-3-x64.dll','libssl-3-x64.dll'):(internal/name).write_bytes(b'explicit-test-fixture-not-a-real-library')
 destination=tmp_path/'native-notices'
 index=p.native_licenses(p.ROOT,destination,connector)
 assert 'Anthony Green' in (destination/'LICENSE.libffi.txt').read_text()
 assert 'Apache License' in (destination/'LICENSE.openssl-3.txt').read_text()
 assert {r['path'] for r in index['binaries']}=={'_internal/libffi-8.dll','_internal/libcrypto-3-x64.dll','_internal/libssl-3-x64.dll'}
 assert all(r['notice'] and len(r['sha256'])==64 for r in index['binaries'])


def test_os_api_set_forwarders_are_excluded_without_removing_vendor_libraries(tmp_path):
 p=packaging();folder=tmp_path/'connector';folder.mkdir()
 names=('api-ms-win-core-console-l1-1-0.dll','ext-ms-win-test-fixture.dll','libffi-8.dll','unknown-vendor.dll')
 for name in names:(folder/name).write_bytes(b'explicit-packaging-test-fixture')
 removed=p.prune_windows_api_sets(folder)
 assert set(removed)==set(names[:2])
 assert not (folder/names[0]).exists() and not (folder/names[1]).exists()
 assert (folder/'libffi-8.dll').exists() and (folder/'unknown-vendor.dll').exists()


def test_packaging_refuses_arbitrary_extension_keys():
 p=packaging()
 with pytest.raises(ValueError):p.host_manifest({'key':'invalid'})
