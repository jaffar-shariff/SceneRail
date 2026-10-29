#!/usr/bin/env python3
"""Check that local Markdown links point to files or directories in the repository."""
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path
from urllib.parse import unquote, urlsplit

FENCE_RE = re.compile(r"(?ms)^ {0,3}([\x60]{3,}|~{3,})[^\n]*\n.*?^ {0,3}\1[^\n]*(?:\n|$)")
LINK_RE = re.compile(r"!?\[[^\]]*\]\(\s*(<[^>]+>|[^)\s]+)")
INLINE_CODE_RE = re.compile(r"\x60([^\x60\n]+)\x60")
REPO_PATH_PREFIXES = ("docs/", "templates/", "scripts/", "examples/", "skills/", "styles/", "src/", "tests/", ".github/", ".claude-plugin/")
IGNORED_DIRS = {".git", "node_modules", "out", "dist", ".next"}


def source_files(root: Path):
    for path in root.rglob("*.md"):
        if any(part in IGNORED_DIRS for part in path.relative_to(root).parts):
            continue
        yield path


def links_in(markdown: str):
    text = FENCE_RE.sub(lambda match: "\n" * match.group(0).count("\n"), markdown)
    for match in LINK_RE.finditer(text):
        target = match.group(1).strip()
        if target.startswith("<") and target.endswith(">"):
            target = target[1:-1]
        line = text.count("\n", 0, match.start()) + 1
        yield line, target


def check(root: Path) -> list[str]:
    failures: list[str] = []
    root = root.resolve()
    for source in sorted(source_files(root)):
        try:
            markdown = source.read_text(encoding="utf-8")
        except (OSError, UnicodeError) as exc:
            failures.append(f"{source.relative_to(root)}: cannot read Markdown file: {exc}")
            continue
        for line, target in links_in(markdown):
            parts = urlsplit(target)
            if parts.scheme or parts.netloc or not parts.path:
                continue
            resolved = (source.parent / unquote(parts.path)).resolve()
            try:
                resolved.relative_to(root)
            except ValueError:
                failures.append(f"{source.relative_to(root)}:{line}: link escapes repository root: {target}")
                continue
            if not resolved.exists():
                failures.append(f"{source.relative_to(root)}:{line}: missing local target: {target}")

        # Also check paths shown as inline code, which are easy to leave stale
        # after moving a file even when they are not Markdown hyperlinks.
        without_fences = FENCE_RE.sub(lambda match: "\n" * match.group(0).count("\n"), markdown)
        for match in INLINE_CODE_RE.finditer(without_fences):
            target = match.group(1).strip().rstrip(".,:;")
            if not target.startswith(REPO_PATH_PREFIXES) or any(char in target for char in "<>{}*"):
                continue
            path_target = target.split("#", 1)[0].split("?", 1)[0]
            if not path_target or " " in path_target:
                continue
            resolved = (root / unquote(path_target)).resolve()
            try:
                resolved.relative_to(root)
            except ValueError:
                failures.append(f"{source.relative_to(root)}: inline path escapes repository root: {target}")
                continue
            if not resolved.exists():
                line = without_fences.count("\n", 0, match.start()) + 1
                failures.append(f"{source.relative_to(root)}:{line}: missing inline repository path: {target}")
    return failures


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1], help="Repository root to check.")
    args = parser.parse_args()
    root = args.root.resolve()
    if not root.is_dir():
        print(f"FAIL: repository root is not a directory: {root}", file=sys.stderr)
        return 2
    failures = check(root)
    if failures:
        for failure in failures:
            print(f"ERROR: {failure}")
        print(f"FAIL: {len(failures)} broken local Markdown link(s)")
        return 1
    count = sum(1 for _ in source_files(root))
    print(f"PASS: local Markdown targets resolve across {count} Markdown file(s)")
    print("NOTE: external URLs, fragment anchors, and link accessibility are not checked.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
