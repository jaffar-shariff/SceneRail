#!/usr/bin/env python3
"""Validate the Frame Purpose Contract before scene implementation and rendering."""
from __future__ import annotations

import argparse
import json
import re
import sys
from collections import Counter
from pathlib import Path
from typing import Any

ID_RE = re.compile(r"^[A-Za-z0-9_-]+$")
PROJECT_TEXT = {"title": 3, "audience": 5, "thesis": 20, "payoff": 15}
STYLE_TEXT = {"name": 3, "signature_motif": 15, "palette_logic": 15, "typography": 15, "composition_grammar": 15, "motion_grammar": 15}
SCENE_TEXT = {"viewer_question": 8, "visual_argument": 20, "visible_action": 20, "topic_specificity": 20, "composition": 15, "change_from_previous": 15, "motion_purpose": 12, "hold_reason": 12}
FUNCTIONS = {"hook", "orientation", "question", "mechanism", "evidence", "counterpoint", "synthesis", "payoff", "transition", "pause"}
OPERATIONS = {"isolate", "reveal", "compare", "trace", "assemble", "transform", "demonstrate", "reframe", "resolve", "map", "annotate", "deconstruct", "contrast", "pause"}
CLAIM_KINDS = {"fact", "estimate", "interpretation", "illustrative"}
ASSET_RIGHTS = {"original", "user-provided", "licensed", "public-domain", "generated", "unknown"}
VAGUE_PHRASES = re.compile(r"\b(cinematic visuals|engaging animation|cool graphics|stunning visuals|beautiful visuals|make it pop|add some effects)\b", re.I)


def normalize(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", " ", value.lower()).strip()


def check_text(obj: dict[str, Any], field: str, prefix: str, minimum: int, errors: list[str]) -> str | None:
    value = obj.get(field)
    if not isinstance(value, str) or len(value.strip()) < minimum:
        errors.append(f"{prefix}.{field} must contain at least {minimum} non-blank characters")
        return None
    return value.strip()


def read_id(item: Any, prefix: str, seen: set[str], errors: list[str]) -> str | None:
    if not isinstance(item, dict):
        errors.append(f"{prefix} must be an object")
        return None
    value = item.get("id")
    if not isinstance(value, str) or not ID_RE.fullmatch(value):
        errors.append(f"{prefix}.id must match ^[A-Za-z0-9_-]+$")
        return None
    if value in seen:
        errors.append(f"duplicate id '{value}' in {prefix}")
    seen.add(value)
    return value


def validate(data: Any, repo_root: Path | None = None) -> tuple[list[str], list[str], dict[str, int]]:
    errors: list[str] = []
    warnings: list[str] = []
    stats = {"chapters": 0, "claims": 0, "sources": 0, "assets": 0, "scenes": 0}
    required = ("schema_version", "title", "format", "audience", "thesis", "payoff", "style_id", "visual_system", "chapters", "claims", "sources", "assets", "scenes")
    if not isinstance(data, dict):
        return ["storyboard must be a JSON object"], warnings, stats
    for field in required:
        if field not in data:
            errors.append(f"missing required field '{field}'")
    if data.get("schema_version") != 1:
        errors.append("schema_version must be 1")
    if data.get("format") not in {"short-form", "long-form", "multi-deliverable", "custom"}:
        errors.append("format must be short-form, long-form, multi-deliverable, or custom")
    for field, minimum in PROJECT_TEXT.items():
        check_text(data, field, "project", minimum, errors)

    style_id = data.get("style_id")
    if not isinstance(style_id, str) or not re.fullmatch(r"[a-z0-9-]+", style_id):
        errors.append("style_id must use lowercase kebab-case")
    elif style_id != "custom" and repo_root is not None and (repo_root / "styles").is_dir():
        if not (repo_root / "styles" / style_id / "STYLE.md").is_file():
            warnings.append(f"style_id '{style_id}' is not in the local atlas; document the original custom style in the style bible")

    system = data.get("visual_system")
    if not isinstance(system, dict):
        errors.append("visual_system must be an object")
    else:
        for field, minimum in STYLE_TEXT.items():
            check_text(system, field, "visual_system", minimum, errors)
        avoid = system.get("avoid")
        if not isinstance(avoid, list) or len(avoid) < 3 or any(not isinstance(v, str) or len(v.strip()) < 5 for v in avoid):
            errors.append("visual_system.avoid must name at least three concrete anti-patterns")

    def get_array(field: str) -> list[Any]:
        value = data.get(field)
        if not isinstance(value, list):
            errors.append(f"{field} must be an array")
            return []
        return value

    chapter_items = get_array("chapters")
    claim_items = get_array("claims")
    source_items = get_array("sources")
    asset_items = get_array("assets")
    scene_items = get_array("scenes")
    stats.update(chapters=len(chapter_items), claims=len(claim_items), sources=len(source_items), assets=len(asset_items), scenes=len(scene_items))
    if not chapter_items:
        errors.append("at least one chapter is required")
    if len(scene_items) < 3:
        errors.append("at least three planned scenes are required")

    chapter_ids: set[str] = set()
    for i, chapter in enumerate(chapter_items):
        prefix = f"chapters[{i}]"
        read_id(chapter, prefix, chapter_ids, errors)
        if isinstance(chapter, dict):
            check_text(chapter, "purpose", prefix, 12, errors)

    source_ids: set[str] = set()
    for i, source in enumerate(source_items):
        prefix = f"sources[{i}]"
        read_id(source, prefix, source_ids, errors)
        if isinstance(source, dict):
            for field, minimum in (("title", 3), ("locator", 4), ("support_note", 12)):
                check_text(source, field, prefix, minimum, errors)

    claim_ids: set[str] = set()
    used_claims: set[str] = set()
    for i, claim in enumerate(claim_items):
        prefix = f"claims[{i}]"
        claim_id = read_id(claim, prefix, claim_ids, errors)
        if not isinstance(claim, dict):
            continue
        kind = claim.get("kind")
        if kind not in CLAIM_KINDS:
            errors.append(f"{prefix}.kind must be one of: {', '.join(sorted(CLAIM_KINDS))}")
        check_text(claim, "text", prefix, 12, errors)
        refs = claim.get("source_ids")
        if not isinstance(refs, list) or any(not isinstance(ref, str) for ref in refs):
            errors.append(f"{prefix}.source_ids must be an array of strings")
            refs = []
        if kind in {"fact", "estimate"} and not refs:
            errors.append(f"{prefix} is a {kind} and needs at least one source id")
        for ref in refs:
            if ref not in source_ids:
                errors.append(f"{prefix} references unknown source id '{ref}'")

    asset_ids: set[str] = set()
    used_assets: set[str] = set()
    for i, asset in enumerate(asset_items):
        prefix = f"assets[{i}]"
        read_id(asset, prefix, asset_ids, errors)
        if not isinstance(asset, dict):
            continue
        for field, minimum in (("kind", 3), ("origin", 5), ("rights_evidence", 5)):
            check_text(asset, field, prefix, minimum, errors)
        rights = asset.get("rights")
        if rights not in ASSET_RIGHTS:
            errors.append(f"{prefix}.rights must be one of: {', '.join(sorted(ASSET_RIGHTS))}")
        elif rights == "unknown":
            errors.append(f"{prefix} has unknown asset rights; replace it or establish permission before rendering")

    scene_ids: set[str] = set()
    operations: list[str] = []
    compositions: list[str] = []
    arguments: list[str] = []
    actions: list[str] = []
    used_functions: list[str] = []
    for i, scene in enumerate(scene_items):
        prefix = f"scenes[{i}]"
        read_id(scene, prefix, scene_ids, errors)
        if not isinstance(scene, dict):
            continue
        chapter = scene.get("chapter")
        if not isinstance(chapter, str) or chapter not in chapter_ids:
            errors.append(f"{prefix}.chapter must reference a declared chapter id")
        function = scene.get("narrative_function")
        if function not in FUNCTIONS:
            errors.append(f"{prefix}.narrative_function must be one of: {', '.join(sorted(FUNCTIONS))}")
        else:
            used_functions.append(function)
        operation = scene.get("visual_operation")
        if operation not in OPERATIONS:
            errors.append(f"{prefix}.visual_operation must be one of: {', '.join(sorted(OPERATIONS))}")
        else:
            operations.append(operation)
        for field, minimum in SCENE_TEXT.items():
            value = check_text(scene, field, prefix, minimum, errors)
            if value is not None and field in {"composition", "visual_argument", "visible_action"}:
                target = {"composition": compositions, "visual_argument": arguments, "visible_action": actions}[field]
                target.append(normalize(value))
        specificity = scene.get("topic_specificity")
        if isinstance(specificity, str) and VAGUE_PHRASES.search(specificity):
            warnings.append(f"{prefix}.topic_specificity uses generic creative language; name the topic-specific visual idea")
        claim_refs = scene.get("claim_ids")
        if not isinstance(claim_refs, list) or any(not isinstance(ref, str) for ref in claim_refs):
            errors.append(f"{prefix}.claim_ids must be an array of strings")
            claim_refs = []
        for ref in claim_refs:
            if ref not in claim_ids:
                errors.append(f"{prefix} references unknown claim id '{ref}'")
            else:
                used_claims.add(ref)
        asset_refs = scene.get("asset_ids")
        if not isinstance(asset_refs, list) or any(not isinstance(ref, str) for ref in asset_refs):
            errors.append(f"{prefix}.asset_ids must be an array of strings")
            asset_refs = []
        for ref in asset_refs:
            if ref not in asset_ids:
                errors.append(f"{prefix} references unknown asset id '{ref}'")
            used_assets.add(ref)

    if scene_items and isinstance(scene_items[0], dict) and scene_items[0].get("narrative_function") not in {"hook", "orientation", "question"}:
        warnings.append("opening scene does not establish a hook, orientation, or question")
    if scene_items and isinstance(scene_items[-1], dict) and scene_items[-1].get("narrative_function") not in {"payoff", "synthesis"}:
        warnings.append("final scene does not resolve the story with a payoff or synthesis")
    for field, values in (("visual_argument", arguments), ("visible_action", actions)):
        for value, count in Counter(values).items():
            if value and count > 1:
                warnings.append(f"{count} scenes repeat the same {field}; keep a recurring motif only when its meaning changes")
    if len(scene_items) >= 5 and operations and len(set(operations)) < 3:
        warnings.append("fewer than three visual operations across a five-plus-scene plan; inspect for repetitive visual grammar")
    if len(compositions) >= 5 and len(set(compositions)) / len(compositions) < 0.6:
        warnings.append("composition descriptions repeat across most scenes; confirm that visual rhythm changes intentionally")
    for cid in sorted(claim_ids - used_claims):
        warnings.append(f"claim '{cid}' is recorded but never assigned to a scene")
    for aid in sorted(asset_ids - used_assets):
        warnings.append(f"asset '{aid}' is declared but never used")

    return errors, warnings, stats


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("storyboard", type=Path, help="Path to storyboard JSON")
    parser.add_argument("--strict", action="store_true", help="Treat review warnings as a failure.")
    parser.add_argument("--report", type=Path, help="Write a machine-readable validation report.")
    args = parser.parse_args()
    try:
        data = json.loads(args.storyboard.read_text(encoding="utf-8"))
    except OSError as exc:
        print(f"FAIL: cannot read {args.storyboard}: {exc}", file=sys.stderr)
        return 2
    except json.JSONDecodeError as exc:
        print(f"FAIL: invalid JSON at line {exc.lineno}, column {exc.colno}: {exc.msg}", file=sys.stderr)
        return 2

    errors, warnings, stats = validate(data, Path(__file__).resolve().parents[1])
    for error in errors:
        print(f"ERROR: {error}")
    for warning in warnings:
        print(f"REVIEW: {warning}")
    status = "BLOCKED" if errors or (args.strict and warnings) else ("REVIEW REQUIRED" if warnings else "STRUCTURE PASS")
    report = {
        "status": status,
        "structural_errors": errors,
        "review_warnings": warnings,
        "counts": stats,
        "artistic_quality_certified": False,
        "next_required_step": "Inspect rendered frames and complete the creative QA review; structure checks cannot certify aesthetics."
    }
    if args.report:
        try:
            args.report.parent.mkdir(parents=True, exist_ok=True)
            args.report.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
        except OSError as exc:
            print(f"FAIL: cannot write report {args.report}: {exc}", file=sys.stderr)
            return 2
    print(f"{status}: {stats['scenes']} scenes, {stats['chapters']} chapters, {stats['claims']} claims, {stats['assets']} assets")
    print("NOTE: this checks structure and repetition signals, not aesthetic quality or whether the final edit is compelling.")
    return 1 if errors or (args.strict and warnings) else 0


if __name__ == "__main__":
    raise SystemExit(main())
