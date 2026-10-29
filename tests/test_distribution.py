import json
import pathlib
import re
import unittest

ROOT = pathlib.Path(__file__).resolve().parents[1]


class DistributionPackageTests(unittest.TestCase):
    def test_portable_plugin_manifest(self):
        manifest = json.loads((ROOT / "plugin.json").read_text(encoding="utf-8"))
        self.assertEqual(manifest["name"], "masteraiskill-video-studio")
        self.assertTrue((ROOT / manifest["extensions"]["com.openai"]["onboardingSkill"]).is_file())

    def test_claude_plugin_and_marketplace_manifests(self):
        plugin = json.loads((ROOT / ".claude-plugin/plugin.json").read_text(encoding="utf-8"))
        marketplace = json.loads((ROOT / ".claude-plugin/marketplace.json").read_text(encoding="utf-8"))
        self.assertEqual(plugin["name"], "masteraiskill-video-studio")
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
        ids = re.findall(r"\| \[[^]]+\]\(#[-a-z]+\) \| `([-a-z]+)` \|", atlas)
        self.assertGreaterEqual(len(ids), 30)
        self.assertEqual(len(ids), len(set(ids)))

    def test_installer_docs_cover_major_agents(self):
        content = (ROOT / "INSTALL.md").read_text(encoding="utf-8").lower()
        for item in ("claude code", "codex", "antigravity", "npx skills add"):
            self.assertIn(item, content)


if __name__ == "__main__":
    unittest.main()
