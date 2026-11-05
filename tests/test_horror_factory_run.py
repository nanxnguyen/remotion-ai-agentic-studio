import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch
import sys
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'scripts'))

from horror_factory_run import validate_manifest, FactoryBlocked, render_from_manifest


def make_package(root):
    art = root / 'production' / 'horror-assets' / 'ben-song-la'
    art.mkdir(parents=True,exist_ok=True)
    svg = '<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920"><rect width="1080" height="1920" fill="#101a26"/></svg>'
    for name in ['shot1.svg', 'shot2.svg', 'thumb1.svg', 'thumb2.svg']:
        (art / name).write_text(svg)
    data = {
        'schema_version': 1, 'slug': 'ben-song-la', 'classification': 'FICTION_INSPIRED_BY_FOLKLORE',
        'sources': [{'url': 'https://example.org/folklore', 'classification': 'FOLKLORE'}],
        'script_audit': {'score': 94, 'retention_prediction': 44, 'independent_reviewer': 'script-audit-tool'},
        'title_candidates': ['Bến Sông Lạ - Chuyện Đêm Trăng', 'Chuyến Đò Không Người Lái', 'Ai Gọi Dưới Nước?'],
        'description': 'Phim hư cấu lấy cảm hứng từ truyền thuyết. Thả tim và đăng ký Hẻm Chuyện Lạ.',
        'thumbnail_candidates': [f'production/horror-assets/ben-song-la/thumb{x}.svg' for x in (1,2)],
        'scenes': [
            {'id': i, 'narration': f'Cảnh thứ {i}: một tiếng động từ bờ sông vang lên.',
             'art': f'production/horror-assets/ben-song-la/shot{1+(i%2)}.svg'} for i in range(1,9)
        ],
    }
    return data


class FactoryTests(unittest.TestCase):
    def test_valid_package_passes(self):
        with tempfile.TemporaryDirectory() as tmp:
            root=Path(tmp)
            self.assertEqual(validate_manifest(make_package(root),root)['slug'],'ben-song-la')

    def test_missing_independent_script_review_rejected(self):
        with tempfile.TemporaryDirectory() as tmp:
            root=Path(tmp); d=make_package(root)
            d['script_audit'].pop('independent_reviewer')
            with self.assertRaisesRegex(FactoryBlocked,'independent'):
                validate_manifest(d,root)

    def test_svg_external_resources_rejected(self):
        with tempfile.TemporaryDirectory() as tmp:
            root=Path(tmp);d=make_package(root)
            (root/d['scenes'][0]['art']).write_text('<svg><image href="https://bad.example/pic" /></svg>')
            with self.assertRaisesRegex(FactoryBlocked,'Unsafe SVG'):
                validate_manifest(d,root)

    def test_asset_outside_story_folder_rejected(self):
        with tempfile.TemporaryDirectory() as tmp:
            root=Path(tmp);d=make_package(root)
            d['scenes'][0]['art']='../../etc/passwd'
            with self.assertRaisesRegex(FactoryBlocked,'Asset path'):
                validate_manifest(d,root)

    def test_missing_cta_or_insufficient_scenes_rejected(self):
        with tempfile.TemporaryDirectory() as tmp:
            root=Path(tmp);d=make_package(root)
            d['description']='Mô tả không có hành động.'
            with self.assertRaisesRegex(FactoryBlocked,'CTA'):
                validate_manifest(d,root)
            d=make_package(root);d['scenes']=d['scenes'][:3]
            with self.assertRaisesRegex(FactoryBlocked,'scenes'):
                validate_manifest(d,root)

    def test_internal_svg_gradient_allowed(self):
        with tempfile.TemporaryDirectory() as tmp:
            root=Path(tmp); d=make_package(root)
            svg='''<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920"><defs><linearGradient id="sky"><stop stop-color="#11091c"/></linearGradient></defs><rect width="1080" height="1920" fill="url(#sky)"/></svg>'''
            (root/d['scenes'][0]['art']).write_text(svg)
            validate_manifest(d,root)

    def test_render_fails_closed_without_real_vbee(self):
        with tempfile.TemporaryDirectory() as tmp:
            root=Path(tmp);d=make_package(root)
            with patch.dict('os.environ',{},clear=True):
                with self.assertRaisesRegex(FactoryBlocked,'Vbee'):
                    render_from_manifest(d, root, root/'out')


if __name__=='__main__': unittest.main()
