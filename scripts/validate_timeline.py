#!/usr/bin/env python3
"""Validate Masteraiskill timeline JSON without third-party dependencies."""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any


REQUIRED_SCENE_FIELDS = ("id", "start_frame", "duration_frames", "type", "purpose")


def is_int(value: Any) -> bool:
    return isinstance(value, int) and not isinstance(value, bool)


def validate(data: Any) -> tuple[list[str], list[str], int | None]:
    errors: list[str] = []
    warnings: list[str] = []
    if not isinstance(data, dict):
        return ["top-level JSON value must be an object"], warnings, None

    for field in ("fps", "width", "height"):
        value = data.get(field)
        if not is_int(value) or value <= 0:
            errors.append(f"'{field}' must be a positive integer")

    scenes = data.get("scenes")
    if not isinstance(scenes, list):
        errors.append("'scenes' must be an array")
        return errors, warnings, None

    seen: set[str] = set()
    valid_scenes: list[tuple[int, int, str]] = []
    for index, scene in enumerate(scenes):
        prefix = f"scenes[{index}]"
        if not isinstance(scene, dict):
            errors.append(f"{prefix} must be an object")
            continue
        for field in REQUIRED_SCENE_FIELDS:
            if field not in scene:
                errors.append(f"{prefix} is missing required field '{field}'")

        scene_id = scene.get("id")
        if not isinstance(scene_id, str) or not scene_id.strip():
            errors.append(f"{prefix}.id must be a non-empty string")
            scene_id = f"<invalid-{index}>"
        elif scene_id in seen:
            errors.append(f"duplicate scene id '{scene_id}'")
        seen.add(scene_id)

        start = scene.get("start_frame")
        duration = scene.get("duration_frames")
        if not is_int(start) or start < 0:
            errors.append(f"{prefix}.start_frame must be an integer >= 0")
            continue
        if not is_int(duration) or duration < 1:
            errors.append(f"{prefix}.duration_frames must be an integer >= 1")
            continue
        if not isinstance(scene.get("type"), str) or not scene["type"].strip():
            errors.append(f"{prefix}.type must be a non-empty string")
        if not isinstance(scene.get("purpose"), str) or not scene["purpose"].strip():
            errors.append(f"{prefix}.purpose must be a non-empty string")
        valid_scenes.append((start, start + duration, str(scene_id)))

    valid_scenes.sort()
    for previous, current in zip(valid_scenes, valid_scenes[1:]):
        prev_start, prev_end, prev_id = previous
        cur_start, cur_end, cur_id = current
        if cur_start < prev_end:
            warnings.append(
                f"scenes '{prev_id}' and '{cur_id}' overlap by {prev_end - cur_start} frame(s); "
                "confirm this is an intentional transition/layering"
            )
        elif cur_start > prev_end:
            warnings.append(
                f"timeline gap between '{prev_id}' and '{cur_id}': {cur_start - prev_end} frame(s); "
                "confirm the gap is intentional"
            )

    duration_frames = max((end for _, end, _ in valid_scenes), default=0)
    if not valid_scenes:
        warnings.append("timeline contains no valid scenes")
    fps = data.get("fps")
    if is_int(fps) and fps > 0:
        warnings.append(f"computed timeline duration: {duration_frames} frames ({duration_frames / fps:.3f} seconds)")
    return errors, warnings, duration_frames


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("timeline", type=Path, help="Path to timeline JSON")
    parser.add_argument("--strict", action="store_true", help="Treat timeline-gap/overlap warnings as failure.")
    args = parser.parse_args()

    try:
        data = json.loads(args.timeline.read_text(encoding="utf-8"))
    except OSError as exc:
        print(f"FAIL: cannot read {args.timeline}: {exc}", file=sys.stderr)
        return 2
    except json.JSONDecodeError as exc:
        print(f"FAIL: invalid JSON at line {exc.lineno}, column {exc.colno}: {exc.msg}", file=sys.stderr)
        return 2

    errors, warnings, duration = validate(data)
    for message in errors:
        print(f"ERROR: {message}")
    for message in warnings:
        print(f"WARNING: {message}")
    if errors:
        print(f"FAIL: {len(errors)} error(s)")
        return 1
    if args.strict and warnings:
        print(f"FAIL: strict mode rejects {len(warnings)} warning(s)")
        return 1
    print(f"PASS: timeline structure valid; {len(data['scenes'])} scene(s), {duration or 0} total frames")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
