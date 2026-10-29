#!/usr/bin/env python3
"""Validate Masteraiskill timeline JSON without third-party dependencies."""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Any


REQUIRED_SCENE_FIELDS = ("id", "start_frame", "duration_frames", "type", "purpose")
VALID_SCENE_TYPES = {
    "title", "paper_card", "diagram", "chart", "timeline", "comparison", "map",
    "whiteboard", "isometric", "object_breakdown", "kinetic_type", "footage",
    "chapter_card", "custom",
}
ID_PATTERN = re.compile(r"^[a-zA-Z0-9_-]+$")


def is_int(value: Any) -> bool:
    return isinstance(value, int) and not isinstance(value, bool)


def validate(data: Any) -> tuple[list[str], list[str], int | None]:
    errors: list[str] = []
    warnings: list[str] = []
    if not isinstance(data, dict):
        return ["top-level JSON value must be an object"], warnings, None

    for field, minimum in (("fps", 1), ("width", 16), ("height", 16)):
        value = data.get(field)
        if not is_int(value) or value < minimum:
            errors.append(f"'{field}' must be an integer >= {minimum}")

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
        if not isinstance(scene_id, str) or not ID_PATTERN.fullmatch(scene_id):
            errors.append(f"{prefix}.id must match ^[a-zA-Z0-9_-]+$")
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
        if not isinstance(scene.get("type"), str) or scene["type"] not in VALID_SCENE_TYPES:
            errors.append(f"{prefix}.type must be one of: {', '.join(sorted(VALID_SCENE_TYPES))}")
        if not isinstance(scene.get("purpose"), str) or not scene["purpose"].strip():
            errors.append(f"{prefix}.purpose must be a non-empty string")

        caption_ids = scene.get("caption_segment_ids", [])
        if not isinstance(caption_ids, list) or any(not isinstance(value, str) for value in caption_ids):
            errors.append(f"{prefix}.caption_segment_ids must be an array of strings")
        valid_scenes.append((start, start + duration, str(scene_id)))

    valid_scenes.sort()
    for previous, current in zip(valid_scenes, valid_scenes[1:]):
        _, prev_end, prev_id = previous
        cur_start, _, cur_id = current
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

    # All timed collections use half-open frame intervals [start_frame, end_frame).
    collection_ids: dict[str, set[str]] = {}
    for collection_name in ("narration", "captions", "audio_cues"):
        entries = data.get(collection_name, [])
        if not isinstance(entries, list):
            errors.append(f"'{collection_name}' must be an array")
            continue
        ids: set[str] = set()
        collection_ids[collection_name] = ids
        for index, item in enumerate(entries):
            prefix = f"{collection_name}[{index}]"
            if not isinstance(item, dict):
                errors.append(f"{prefix} must be an object")
                continue
            item_id = item.get("id")
            if not isinstance(item_id, str) or not ID_PATTERN.fullmatch(item_id):
                errors.append(f"{prefix}.id must match ^[a-zA-Z0-9_-]+$")
            elif item_id in ids:
                errors.append(f"duplicate {collection_name} id '{item_id}'")
            else:
                ids.add(item_id)
            start = item.get("start_frame")
            end = item.get("end_frame")
            if not is_int(start) or start < 0:
                errors.append(f"{prefix}.start_frame must be an integer >= 0")
            if not is_int(end) or (is_int(start) and end <= start):
                errors.append(f"{prefix}.end_frame must be an integer greater than start_frame")
            if is_int(end) and duration_frames and end > duration_frames:
                warnings.append(
                    f"{prefix} ends at frame {end}, beyond current visual timeline end {duration_frames}"
                )

    narration_ids = collection_ids.get("narration", set())
    caption_ids = collection_ids.get("captions", set())
    for index, scene in enumerate(scenes):
        if not isinstance(scene, dict):
            continue
        narration_id = scene.get("narration_segment_id")
        if narration_id is not None and narration_id not in narration_ids:
            errors.append(f"scenes[{index}] references missing narration segment '{narration_id}'")
        caption_ids_for_scene = scene.get("caption_segment_ids", [])
        if isinstance(caption_ids_for_scene, list):
            for caption_id in caption_ids_for_scene:
                if caption_id not in caption_ids:
                    errors.append(f"scenes[{index}] references missing caption segment '{caption_id}'")

    return errors, warnings, duration_frames


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("timeline", type=Path, help="Path to timeline JSON")
    parser.add_argument("--strict", action="store_true", help="Treat warnings as failure.")
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
    fps = data.get("fps") if isinstance(data, dict) else None
    if is_int(fps) and fps > 0:
        print(f"INFO: computed timeline duration: {duration or 0} frames ({(duration or 0) / fps:.3f} seconds)")
    if errors:
        print(f"FAIL: {len(errors)} error(s)")
        return 1
    if args.strict and warnings:
        print(f"FAIL: strict mode rejects {len(warnings)} warning(s)")
        return 1
    scene_count = len(data["scenes"]) if isinstance(data.get("scenes"), list) else 0
    print(f"PASS: timeline structure valid; {scene_count} scene(s), {duration or 0} total frames")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
