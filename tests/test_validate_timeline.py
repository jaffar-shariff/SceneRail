import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
VALIDATOR = ROOT / "scripts" / "validate_timeline.py"


class TimelineValidatorTests(unittest.TestCase):
    def validate(self, data, *extra_args):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "timeline.json"
            path.write_text(json.dumps(data), encoding="utf-8")
            return subprocess.run(
                [sys.executable, str(VALIDATOR), str(path), *extra_args],
                capture_output=True,
                text=True,
                check=False,
            )

    def base(self):
        return {
            "fps": 30,
            "width": 1920,
            "height": 1080,
            "scenes": [
                {
                    "id": "opening",
                    "start_frame": 0,
                    "duration_frames": 30,
                    "type": "title",
                    "purpose": "Introduce the idea",
                },
                {
                    "id": "body",
                    "start_frame": 30,
                    "duration_frames": 60,
                    "type": "diagram",
                    "purpose": "Explain the mechanism",
                },
            ],
        }

    def test_valid_timeline_passes(self):
        result = self.validate(self.base())
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertIn("PASS", result.stdout)
        self.assertIn("3.000 seconds", result.stdout)

    def test_invalid_json_shape_fails(self):
        data = self.base()
        data["fps"] = 0
        result = self.validate(data)
        self.assertEqual(result.returncode, 1)
        self.assertIn("'fps' must be an integer >= 1", result.stdout)

    def test_duplicate_ids_fail(self):
        data = self.base()
        data["scenes"][1]["id"] = "opening"
        result = self.validate(data)
        self.assertEqual(result.returncode, 1)
        self.assertIn("duplicate scene id", result.stdout)

    def test_negative_start_frame_fails(self):
        data = self.base()
        data["scenes"][0]["start_frame"] = -1
        result = self.validate(data)
        self.assertEqual(result.returncode, 1)
        self.assertIn("start_frame must be an integer", result.stdout)

    def test_gap_is_warning_by_default(self):
        data = self.base()
        data["scenes"][1]["start_frame"] = 35
        result = self.validate(data)
        self.assertEqual(result.returncode, 0)
        self.assertIn("timeline gap", result.stdout)

    def test_strict_mode_rejects_gap(self):
        data = self.base()
        data["scenes"][1]["start_frame"] = 35
        result = self.validate(data, "--strict")
        self.assertEqual(result.returncode, 1)
        self.assertIn("strict mode", result.stdout)

    def test_overlap_is_warning_by_default(self):
        data = self.base()
        data["scenes"][1]["start_frame"] = 20
        result = self.validate(data)
        self.assertEqual(result.returncode, 0)
        self.assertIn("overlap", result.stdout)

    def test_missing_caption_reference_fails(self):
        data = self.base()
        data["scenes"][0]["caption_segment_ids"] = ["missing-caption"]
        result = self.validate(data)
        self.assertEqual(result.returncode, 1)
        self.assertIn("references missing caption segment", result.stdout)

    def test_strict_mode_passes_clean_timeline(self):
        result = self.validate(self.base(), "--strict")
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)


if __name__ == "__main__":
    unittest.main()
