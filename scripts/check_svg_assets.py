#!/usr/bin/env python3
"""Parse repository SVG files to catch malformed artwork before publishing."""
from __future__ import annotations

import argparse
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

IGNORED_DIRS = {".git", "node_modules", "out", "dist", "__pycache__"}
SVG_NS = "{http://www.w3.org/2000/svg}"


def svg_files(root: Path):
    for path in sorted(root.rglob("*.svg")):
        if any(part in IGNORED_DIRS for part in path.relative_to(root).parts):
            continue
        yield path


def check(root: Path) -> list[str]:
    errors: list[str] = []
    root = root.resolve()
    count = 0
    for path in svg_files(root):
        count += 1
        try:
            tree = ET.parse(path)
        except (ET.ParseError, OSError) as exc:
            errors.append(f"{path.relative_to(root)}: invalid SVG/XML: {exc}")
            continue
        node = tree.getroot()
        if node.tag != f"{SVG_NS}svg":
            errors.append(f"{path.relative_to(root)}: root element must be SVG")
        for attr in ("viewBox", "width", "height"):
            if not node.get(attr):
                errors.append(f"{path.relative_to(root)}: missing required {attr} attribute")
    if count == 0:
        errors.append("no SVG files found")
    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1])
    args = parser.parse_args()
    root = args.root.resolve()
    if not root.is_dir():
        print(f"FAIL: repository root is not a directory: {root}", file=sys.stderr)
        return 2
    errors = check(root)
    if errors:
        for error in errors:
            print(f"ERROR: {error}")
        print(f"FAIL: {len(errors)} SVG asset issue(s)")
        return 1
    print(f"PASS: all repository SVG assets parse and include dimensions and viewBox")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
