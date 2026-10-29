import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
VALIDATOR = ROOT / "scripts" / "validate_storyboard.py"
EXAMPLE = ROOT / "examples" / "storyboard.json"


class FramePurposeContractTests(unittest.TestCase):
    def setUp(self):
        self.data = json.loads(EXAMPLE.read_text(encoding="utf-8"))

    def run_data(self, data, *args):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "storyboard.json"
            path.write_text(json.dumps(data), encoding="utf-8")
            return subprocess.run(
                [sys.executable, str(VALIDATOR), str(path), *args],
                capture_output=True, text=True, check=False
            )

    def test_example_is_structurally_valid(self):
        result = subprocess.run(
            [sys.executable, str(VALIDATOR), str(EXAMPLE)],
            capture_output=True, text=True, check=False
        )
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertIn("STRUCTURE PASS", result.stdout)
        self.assertIn("not aesthetic quality", result.stdout)

    def test_fact_claim_without_source_is_blocked(self):
        data = self.data
        data["claims"][0]["kind"] = "fact"
        result = self.run_data(data)
        self.assertEqual(result.returncode, 1)
        self.assertIn("needs at least one source id", result.stdout)

    def test_unknown_claim_source_is_blocked(self):
        data = self.data
        data["claims"][0]["kind"] = "fact"
        data["claims"][0]["source_ids"] = ["not-in-source-ledger"]
        result = self.run_data(data)
        self.assertEqual(result.returncode, 1)
        self.assertIn("unknown source id", result.stdout)

    def test_unknown_asset_rights_block_delivery(self):
        data = self.data
        data["assets"] = [{
            "id": "asset-unknown", "kind": "music", "origin": "downloaded from an unknown site",
            "rights": "unknown", "rights_evidence": "No license evidence was found."
        }]
        data["scenes"][0]["asset_ids"] = ["asset-unknown"]
        result = self.run_data(data)
        self.assertEqual(result.returncode, 1)
        self.assertIn("unknown asset rights", result.stdout)

    def test_repeated_visual_argument_is_review_warning(self):
        data = self.data
        data["scenes"][1]["visual_argument"] = data["scenes"][0]["visual_argument"]
        result = self.run_data(data)
        self.assertEqual(result.returncode, 0)
        self.assertIn("repeat the same visual_argument", result.stdout)
        strict = self.run_data(data, "--strict")
        self.assertEqual(strict.returncode, 1)

    def test_malformed_enum_types_return_errors_instead_of_crashing(self):
        data = self.data
        data["format"] = ["not", "a", "format"]
        data["claims"][0]["kind"] = {"not": "a string"}
        data["scenes"][0]["visual_operation"] = ["not-an-operation"]
        result = self.run_data(data)
        self.assertEqual(result.returncode, 1)
        self.assertIn("format must be", result.stdout)
        self.assertNotIn("Traceback", result.stderr)

    def test_true_schema_version_must_not_be_accepted_as_integer_one(self):
        data = self.data
        data["schema_version"] = True
        result = self.run_data(data)
        self.assertEqual(result.returncode, 1)
        self.assertIn("schema_version must be integer 1", result.stdout)

    def test_machine_report_does_not_claim_aesthetic_certification(self):
        with tempfile.TemporaryDirectory() as tmp:
            report_path = Path(tmp) / "qa" / "report.json"
            result = subprocess.run(
                [sys.executable, str(VALIDATOR), str(EXAMPLE), "--report", str(report_path)],
                capture_output=True, text=True, check=False
            )
            self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
            report = json.loads(report_path.read_text(encoding="utf-8"))
            self.assertIs(report["artistic_quality_certified"], False)
            self.assertIn("Inspect rendered frames", report["next_required_step"])


if __name__ == "__main__":
    unittest.main()
