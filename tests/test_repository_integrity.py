import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LINK_CHECKER = ROOT / "scripts" / "check_repo_links.py"


class RepositoryIntegrityTests(unittest.TestCase):
    def test_all_repository_local_markdown_links_resolve(self):
        result = subprocess.run([sys.executable, str(LINK_CHECKER)], capture_output=True, text=True, check=False)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertIn("local Markdown targets resolve", result.stdout)

    def test_link_checker_finds_missing_relative_target(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / "README.md").write_text("[missing](docs/removed.md)\n", encoding="utf-8")
            result = subprocess.run(
                [sys.executable, str(LINK_CHECKER), "--root", str(root)],
                capture_output=True, text=True, check=False
            )
            self.assertEqual(result.returncode, 1)
            self.assertIn("docs/removed.md", result.stdout)

    def test_link_checker_ignores_links_inside_code_fences(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            fence = chr(96) * 3
            content = "Example:\n\n" + fence + "md\n[not a real link](missing.md)\n" + fence + "\n"
            (root / "README.md").write_text(content, encoding="utf-8")
            result = subprocess.run(
                [sys.executable, str(LINK_CHECKER), "--root", str(root)],
                capture_output=True, text=True, check=False
            )
            self.assertEqual(result.returncode, 0, result.stdout + result.stderr)


if __name__ == "__main__":
    unittest.main()
