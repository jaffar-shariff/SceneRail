#!/usr/bin/env python3
"""Combine extracted QA frames into a labelled contact sheet using Pillow."""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    print("FAIL: Pillow is not installed. Run: python -m pip install -r requirements-qa.txt", file=sys.stderr)
    raise SystemExit(2)


def load_font(size: int) -> ImageFont.ImageFont:
    # Use a common font where available; the built-in font is a portable fallback.
    for candidate in (
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/Library/Fonts/Arial.ttf",
        "C:/Windows/Fonts/arial.ttf",
    ):
        try:
            return ImageFont.truetype(candidate, size=size)
        except OSError:
            pass
    return ImageFont.load_default()


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("frame_dir", type=Path, help="Directory produced by render_qa_frames.py")
    parser.add_argument("--output", type=Path, default=Path("out/qa/contact-sheet.png"))
    parser.add_argument("--columns", type=int, default=4)
    parser.add_argument("--cell-width", type=int, default=480)
    args = parser.parse_args()

    if args.columns < 1 or args.cell_width < 160:
        parser.error("--columns must be positive and --cell-width must be at least 160")
    frames = sorted(args.frame_dir.glob("frame-*.png"))
    if not frames:
        print(f"FAIL: no frame-*.png images found in {args.frame_dir}", file=sys.stderr)
        return 2

    try:
        manifest_path = args.frame_dir / "manifest.json"
        meta: dict[str, Any] = json.loads(manifest_path.read_text(encoding="utf-8")) if manifest_path.exists() else {}
        records = {item.get("filename"): item for item in meta.get("frames", [])}
        opened = []
        for path in frames:
            with Image.open(path) as source:
                image = source.convert("RGB")
                thumb_height = max(1, round(image.height * args.cell_width / image.width))
                image = image.resize((args.cell_width, thumb_height), Image.Resampling.LANCZOS)
                opened.append((path, image, records.get(path.name, {})))
    except (OSError, ValueError, json.JSONDecodeError) as exc:
        print(f"FAIL: unable to read frames/manifest: {exc}", file=sys.stderr)
        return 2

    image_height = max(image.height for _, image, _ in opened)
    label_height, padding = 38, 14
    rows = (len(opened) + args.columns - 1) // args.columns
    cell_height = image_height + label_height
    canvas = Image.new(
        "RGB",
        (args.columns * args.cell_width + (args.columns + 1) * padding,
         rows * cell_height + (rows + 1) * padding),
        "#101820",
    )
    draw = ImageDraw.Draw(canvas)
    label_font = load_font(17)
    for index, (path, image, record) in enumerate(opened):
        col, row = index % args.columns, index // args.columns
        x = padding + col * (args.cell_width + padding)
        y = padding + row * (cell_height + padding)
        canvas.paste(image, (x, y))
        timestamp = record.get("timestamp_seconds")
        stamp = f"{float(timestamp):.2f}s" if timestamp is not None else path.stem
        draw.text((x + 2, y + image.height + 8), f"{index + 1:02d}  {stamp}", fill="#e9eef2", font=label_font)

    args.output.parent.mkdir(parents=True, exist_ok=True)
    try:
        canvas.save(args.output)
    except OSError as exc:
        print(f"FAIL: unable to save contact sheet: {exc}", file=sys.stderr)
        return 2
    print(f"PASS: contact sheet written to {args.output} ({len(opened)} frames, {args.columns} columns)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
