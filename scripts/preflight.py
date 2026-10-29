#!/usr/bin/env python3
"""Read-only inventory of tools that may be used by Masteraiskill."""
from __future__ import annotations

import argparse
import json
import platform
import shutil
import subprocess
import sys
from typing import Any


COMMANDS = {
    "node": ["node", "--version"],
    "npm": ["npm", "--version"],
    "ffmpeg": ["ffmpeg", "-version"],
    "ffprobe": ["ffprobe", "-version"],
    "git": ["git", "--version"],
}


def inspect_command(name: str, command: list[str]) -> dict[str, Any]:
    executable = shutil.which(command[0])
    item: dict[str, Any] = {"available": executable is not None}
    if executable is None:
        return item
    item["executable"] = executable
    try:
        result = subprocess.run(
            command, capture_output=True, text=True, timeout=8, check=False
        )
        first_line = (result.stdout or result.stderr).splitlines()
        item["version"] = first_line[0].strip() if first_line else "version output unavailable"
        item["exit_code"] = result.returncode
    except (OSError, subprocess.TimeoutExpired) as exc:
        item["error"] = str(exc)
    return item


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--json", action="store_true", help="Print machine-readable JSON.")
    args = parser.parse_args()

    report: dict[str, Any] = {
        "python": {
            "available": True,
            "version": platform.python_version(),
            "implementation": platform.python_implementation(),
        },
        "platform": platform.system(),
        "commands": {name: inspect_command(name, command) for name, command in COMMANDS.items()},
        "optional_python": {},
        "note": "Read-only preflight: it installs nothing and downloads nothing.",
    }
    for module in ("PIL", "jsonschema"):
        try:
            imported = __import__(module)
            report["optional_python"][module] = {
                "available": True,
                "version": getattr(imported, "__version__", "installed"),
            }
        except ImportError:
            report["optional_python"][module] = {"available": False}

    if args.json:
        print(json.dumps(report, indent=2))
    else:
        print("Masteraiskill preflight (read-only)")
        print(f"Platform: {report['platform']} | Python: {report['python']['version']}")
        for name, item in report["commands"].items():
            if item["available"]:
                print(f"[OK]   {name}: {item.get('version', item.get('executable', 'available'))}")
            else:
                print(f"[MISS] {name}: not found on PATH")
        print("Optional Python modules:")
        for name, item in report["optional_python"].items():
            print(f"  {name}: {'available ' + str(item.get('version')) if item['available'] else 'not installed'}")
        print(report["note"])
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
