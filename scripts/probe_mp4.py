#!/usr/bin/env python3
"""Inspect an exported media file with ffprobe and report measured properties."""
from __future__ import annotations

import argparse
import json
import shutil
import subprocess
import sys
from pathlib import Path
from typing import Any


def probe(path: Path) -> dict[str, Any]:
    ffprobe = shutil.which("ffprobe")
    if not ffprobe:
        raise RuntimeError("ffprobe was not found on PATH")
    if not path.is_file():
        raise RuntimeError(f"file not found: {path}")
    if path.stat().st_size == 0:
        raise RuntimeError("file exists but is empty")

    command = [
        ffprobe, "-v", "error", "-show_format", "-show_streams",
        "-of", "json", str(path),
    ]
    result = subprocess.run(command, capture_output=True, text=True, timeout=60, check=False)
    if result.returncode != 0:
        raise RuntimeError((result.stderr or "ffprobe failed").strip())
    raw = json.loads(result.stdout)
    streams = raw.get("streams", [])
    video = next((s for s in streams if s.get("codec_type") == "video"), None)
    audio = next((s for s in streams if s.get("codec_type") == "audio"), None)
    fmt = raw.get("format", {})
    fps = None
    if video:
        rate = video.get("avg_frame_rate") or video.get("r_frame_rate")
        if isinstance(rate, str) and "/" in rate:
            numerator, denominator = rate.split("/", 1)
            try:
                fps = float(numerator) / float(denominator) if float(denominator) else None
            except (ValueError, ZeroDivisionError):
                fps = None
    return {
        "path": str(path),
        "size_bytes": path.stat().st_size,
        "container": fmt.get("format_name"),
        "duration_seconds": float(fmt["duration"]) if fmt.get("duration") else None,
        "video": None if not video else {
            "codec": video.get("codec_name"),
            "width": video.get("width"),
            "height": video.get("height"),
            "fps": fps,
            "pixel_format": video.get("pix_fmt"),
            "frame_count": video.get("nb_frames"),
        },
        "audio": None if not audio else {
            "codec": audio.get("codec_name"),
            "sample_rate": audio.get("sample_rate"),
            "channels": audio.get("channels"),
        },
    }


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("file", type=Path, help="Media file to inspect")
    parser.add_argument("--json", action="store_true", help="Print complete JSON")
    parser.add_argument("--expect-size", help="Expected video dimensions, e.g. 1920x1080")
    parser.add_argument("--expect-fps", type=float, help="Expected frame rate (tolerance 0.02 fps)")
    parser.add_argument("--require-audio", action="store_true", help="Fail if no audio stream exists")
    args = parser.parse_args()

    try:
        report = probe(args.file)
    except (OSError, RuntimeError, ValueError, json.JSONDecodeError, subprocess.TimeoutExpired) as exc:
        print(f"FAIL: {exc}", file=sys.stderr)
        return 2

    problems: list[str] = []
    video = report.get("video")
    if not video:
        problems.append("no video stream")
    if args.expect_size and video:
        expected = args.expect_size.lower().split("x", 1)
        try:
            expected_size = (int(expected[0]), int(expected[1]))
            actual_size = (video.get("width"), video.get("height"))
            if actual_size != expected_size:
                problems.append(f"expected {args.expect_size}, got {actual_size[0]}x{actual_size[1]}")
        except (ValueError, IndexError):
            print("FAIL: --expect-size must be WIDTHxHEIGHT", file=sys.stderr)
            return 2
    if args.expect_fps is not None and video:
        actual_fps = video.get("fps")
        if actual_fps is None or abs(actual_fps - args.expect_fps) > 0.02:
            problems.append(f"expected {args.expect_fps} fps, got {actual_fps}")
    if args.require_audio and not report.get("audio"):
        problems.append("audio stream is required but missing")

    if args.json:
        print(json.dumps(report, indent=2))
    else:
        print(f"File: {report['path']}")
        print(f"Size: {report['size_bytes']:,} bytes")
        print(f"Container: {report['container']} | Duration: {report['duration_seconds']} seconds")
        print(f"Video: {video}")
        print(f"Audio: {report.get('audio')}")
    if problems:
        for problem in problems:
            print(f"ERROR: {problem}", file=sys.stderr)
        print("FAIL: media does not meet all requested checks")
        return 1
    print("PASS: file readable and requested checks passed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
