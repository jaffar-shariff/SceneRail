---
name: masteraiskill-video-studio
description: Plan, script, research, storyboard, style, render, and quality-check original AI-agent-produced videos from Shorts to long-form explainers. Use when a user asks to create, improve, or render a video, motion graphic, documentary explainer, data story, paper-card animation, or complete MP4.
---

# Masteraiskill Video Studio

Turn the user's brief into a coherent, technically verified video. The finished video—not the prompt, storyboard, or code—is the primary deliverable.

## Start here

1. Inspect the current workspace before changing it. Read `AGENTS.md`, any project brief, script, style bible, scene data, package files, previous renders, and error logs that already exist.
2. If this repository is available, use its production contract, templates, scripts, and renderer. Start with `PROMPT.md` and `AGENTS.md`; consult `INSTALL.md`, `styles/STYLEBOOK.md`, `docs/VIDEO_FORMATS.md`, `docs/ARCHITECTURE.md`, and `docs/QUALITY_GATES.md` when present.
3. If only this skill is installed and the repository is not present, do not pretend the renderer or helper scripts are installed. Either work with the available project/toolchain or ask permission before cloning the production repository. Never install system packages, download large models, spend money, or send private assets to an external provider without authorization.
4. Determine topic, thesis, audience, platform, aspect ratio, duration, language, narration, visual direction, source requirements, asset limits, and delivery location. Ask only for information that materially changes the outcome; record sensible assumptions for the rest.

## Production stages

### 1. Research and story

- For factual work, build a source ledger for material claims with URLs, dates where relevant, evidence notes, and uncertainty.
- Separate facts, estimates, interpretations, and hypothetical examples. Never invent citations, figures, quotations, archival evidence, or user-specific data.
- Write narration before detailed animation. Start from a clear question, contradiction, or promise; build an understandable progression; provide examples and counterpoints; land a specific payoff.
- Match structure to runtime. Short-form needs a fast hook and one clear payoff. Long-form needs meaningful acts/chapters, escalation, evidence, and visual variation—not padded repetition.

### 2. Style and storyboard

- Select a primary visual direction from the Style Atlas or define an original one. Use one primary style and at most one supporting style unless the brief calls for a purposeful mixed-media approach.
- Define palette and color semantics, type hierarchy, layout, texture/material, composition, transition grammar, movement, captions, and audio character in a style bible.
- Divide narration into visual beats. Every scene should serve a stated explanatory purpose. Record on-screen text, visual metaphor, source/asset provenance, transition, duration, and audio cues.
- Satisfy the [Frame Purpose Contract](../../docs/CREATIVE_QUALITY.md): specify the viewer question, visual argument, concrete action, topic-specific detail, composition, change from the prior scene, motion purpose, and hold reason for every scene.
- Run `python scripts/validate_storyboard.py project/storyboard.json --strict --report project/qa/storyboard-report.json` after adapting the path. Fix structural errors before implementation; review all warnings. If only this skill is installed, do not pretend the validator exists—use the contract as a manual checklist or clone the repository with permission.
- Do not let a style preset replace a topic-specific concept. Reject interchangeable captions like “show growth,” generic stock/icon soup, meaningless particles, random zooms, and repeated layouts. Every scene must add evidence, a relationship, a reveal, a change of scale, or an intentional emotional beat.
- Preserve a consistent design language. Use references to understand broad design principles, not to copy a creator's distinctive signature style or reuse protected assets without permission.

### 3. Timing and implementation

- Maintain one canonical frame-based timeline for scene duration, narration, captions, transitions, music, and sound effects. Avoid separate hand-maintained timelines that drift apart.
- Prefer deterministic animation based on frame/time and explicit inputs. Seed any procedural randomness.
- Reuse scene primitives, typography, graph/diagram components, caption systems, and transitions where they improve consistency; avoid a generic template look.
- Select a renderer based on the project: existing Remotion, SVG/Canvas, HTML/WebGL, Manim, or FFmpeg pipeline may be appropriate. Inspect the current environment and use what works before migrating.
- Keep all required project state and dependencies explicit. Don't assume API keys, paid accounts, fonts, footage, GPU access, browser binaries, or external tools.

### 4. Preview, inspect, repair

- Render representative scenes and a low-cost preview before a long final render whenever practical.
- Create or inspect a contact sheet covering the beginning, middle, end, scene boundaries, and dense visual moments.
- Look for clipping, low contrast, unreadable captions, awkward empty space, inconsistent characters, weak visual hierarchy, broken transitions, unsupported claims, timing drift, black frames, missing assets, and repetitive compositions.
- Repair the underlying cause and re-render affected sections. Successful encoding by itself is not visual QA.

### 5. Deliver

- Render the requested format with the required resolution, aspect ratio, frame rate, codec, audio, and file path.
- Probe the output using available media metadata tools. Check duration, dimensions, frame rate, streams, audio presence, and file integrity against the brief.
- Inspect representative frames from the rendered output, not just the source composition.
- Report the exact output path, verified technical properties, checks actually completed, and any remaining limitation. Never claim a test or review passed if it was not performed.

## Format routing

- **Shorts/Reels/TikTok:** vertical-safe composition, early visual hook, readable captions, rapid but comprehensible beats, one core idea, satisfying payoff.
- **Long-form explainers:** chapter arc, narration-led timing, progressive disclosure, visual callbacks, source-aware evidence, variation across the whole runtime.
- **Finance/business/economics:** grounded figures, labelled axes, units, explicit periods, clear comparisons, and visible causal mechanisms.
- **History/company documentary:** verified chronology, distinction between real archival evidence and recreations, maps/documents only with provenance.
- **Science/technology:** correct terminology, stepwise diagrams, honest simplification, and labels for conceptual illustrations.
- **Software/product:** accurate interface behavior, readable zooms, safe handling of private data, and honest labeling of mock screens.
- **Data-led recap:** reproducible source data, legible units, explicit date ranges, and reproducible chart logic.
- **Paper-card / whiteboard / isometric / character-led / cinematic abstract:** follow the matching style recipe and inspect readability at delivery size.

## Approval and safety

Respect the user's approval preferences. For larger projects, get approval for the story direction and representative visual direction unless autonomous execution was explicitly requested. Do not ask for approval of every minor production choice. Keep private material local where possible, seek authorization before paid services or external transmission, and be candid about any unavailable tool.

## Useful repository files

- `PROMPT.md` — detailed production prompt.
- `AGENTS.md` — repository-wide operating contract.
- `styles/STYLEBOOK.md` — named visual style index and recipes.
- `docs/VIDEO_FORMATS.md` — format-specific playbooks.
- `docs/QUALITY_GATES.md` — acceptance checks.
- `scripts/` — preflight, timeline validation, MP4 probing, frame sampling, and contact sheets.
- `src/Root.tsx` and `package.json` — included Remotion sample renderer.
