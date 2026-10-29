import json
import pathlib
import re
import unittest

ROOT = pathlib.Path(__file__).resolve().parents[1]


class DistributionPackageTests(unittest.TestCase):
    def test_portable_plugin_manifest(self):
        manifest = json.loads((ROOT / "plugin.json").read_text(encoding="utf-8"))
        self.assertEqual(manifest["name"], "scenerail-video-studio")
        self.assertTrue((ROOT / manifest["extensions"]["com.openai"]["onboardingSkill"]).is_file())

    def test_claude_plugin_and_marketplace_manifests(self):
        plugin = json.loads((ROOT / ".claude-plugin/plugin.json").read_text(encoding="utf-8"))
        marketplace = json.loads((ROOT / ".claude-plugin/marketplace.json").read_text(encoding="utf-8"))
        self.assertEqual(plugin["name"], "scenerail-video-studio")
        self.assertTrue(any(p["name"] == plugin["name"] for p in marketplace["plugins"]))

    def test_skill_frontmatter(self):
        skill_paths = sorted((ROOT / "skills").glob("*/SKILL.md"))
        self.assertGreaterEqual(len(skill_paths), 7)
        for path in skill_paths:
            content = path.read_text(encoding="utf-8")
            self.assertTrue(content.startswith("---\n"), f"Missing YAML frontmatter: {path}")
            frontmatter = content.split("---", 2)[1]
            self.assertRegex(frontmatter, r"(?m)^name:\s*.+$")
            self.assertRegex(frontmatter, r"(?m)^description:\s*.+$")

    def test_style_atlas_has_named_styles(self):
        atlas = (ROOT / "styles/STYLEBOOK.md").read_text(encoding="utf-8")
        rows = []
        for line in atlas.splitlines():
            if line.startswith("| [") and "STYLE.md)" in line:
                cells = line.split("|")
                link_cell = cells[1].strip()
                link = link_cell.split("](", 1)[1].rstrip(")")
                link_id = link.split("/", 1)[0]
                style_id = cells[2].strip().strip("`")
                rows.append((link_cell, link_id, style_id))
        self.assertGreaterEqual(len(rows), 30)
        ids = [row[2] for row in rows]
        self.assertEqual(len(ids), len(set(ids)))
        for _, link_id, style_id in rows:
            self.assertEqual(link_id, style_id)
            self.assertTrue((ROOT / "styles" / link_id / "STYLE.md").is_file(), link_id)
    def test_installer_docs_cover_major_agents(self):
        content = (ROOT / "INSTALL.md").read_text(encoding="utf-8").lower()
        for item in ("claude code", "codex", "antigravity", "npx skills add"):
            self.assertIn(item, content)


if __name__ == "__main__":
    unittest.main()
