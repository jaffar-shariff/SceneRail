#!/usr/bin/env python3
"""Extract representative frames from an MP4 for visual QA."""
from __future__ import annotations

import argparse
import json
import shutil
import subprocess
import sys
from pathlib import Path
from typing import Any


def run(command: list[str]) -> subprocess.CompletedProcess[str]:
    return subprocess.run(command, capture_output=True, text=True, timeout=180, check=False)


def get_duration(path: Path, ffprobe: str) -> float:
    result = run([
        ffprobe, "-v", "error", "-show_entries", "format=duration",
        "-of", "default=noprint_wrappers=1:nokey=1", str(path),
    ])
    if result.returncode != 0:
        raise RuntimeError((result.stderr or "ffprobe failed").strip())
    try:
        value = float(result.stdout.strip())
    except ValueError as exc:
        raise RuntimeError("ffprobe did not return a valid media duration") from exc
    if value <= 0:
        raise RuntimeError("input duration must be greater than zero")
    return value


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("video", type=Path)
    parser.add_argument("--count", type=int, default=12, help="Number of evenly spaced samples (2–100)")
    parser.add_argument("--output-dir", type=Path, default=Path("out/qa/frames"))
    parser.add_argument("--width", type=int, default=640, help="Preview frame width in pixels")
    args = parser.parse_args()

    if args.count < 2 or args.count > 100:
        parser.error("--count must be between 2 and 100")
    if args.width < 160:
        parser.error("--width must be at least 160")
    ffmpeg, ffprobe = shutil.which("ffmpeg"), shutil.which("ffprobe")
    if not ffmpeg or not ffprobe:
        print("FAIL: ffmpeg and ffprobe must both be available on PATH", file=sys.stderr)
        return 2
    if not args.video.is_file() or args.video.stat().st_size == 0:
        print(f"FAIL: missing or empty input video: {args.video}", file=sys.stderr)
        return 2

    try:
        duration = get_duration(args.video, ffprobe)
    except (OSError, RuntimeError, subprocess.TimeoutExpired) as exc:
        print(f"FAIL: {exc}", file=sys.stderr)
        return 2

    args.output_dir.mkdir(parents=True, exist_ok=True)
    samples: list[dict[str, Any]] = []
    for index in range(args.count):
        # Sample inside the duration, avoiding exact boundaries where frames may be ambiguous.
        timestamp = duration * (index + 0.5) / args.count
        filename = f"frame-{index:03d}.png"
        destination = args.output_dir / filename
        command = [
            ffmpeg, "-hide_banner", "-loglevel", "error", "-y",
            "-ss", f"{timestamp:.6f}", "-i", str(args.video),
            "-frames:v", "1", "-vf", f"scale={args.width}:-2", str(destination),
        ]
        try:
            result = run(command)
        except (OSError, subprocess.TimeoutExpired) as exc:
            print(f"FAIL: frame {index} extraction failed: {exc}", file=sys.stderr)
            return 2
        if result.returncode != 0 or not destination.is_file() or destination.stat().st_size == 0:
            print(f"FAIL: frame {index} extraction failed: {(result.stderr or '').strip()}", file=sys.stderr)
            return 1
        samples.append({
            "index": index,
            "timestamp_seconds": round(timestamp, 3),
            "filename": filename,
        })

    manifest = {
        "video": str(args.video),
        "duration_seconds": round(duration, 3),
        "sample_count": len(samples),
        "frames": samples,
        "note": "Frames are samples for visual review; they do not prove every frame is artifact-free.",
    }
    (args.output_dir / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    print(f"PASS: extracted {len(samples)} frames across {duration:.2f}s into {args.output_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
