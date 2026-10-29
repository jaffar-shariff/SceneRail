# Masteraiskill

**An agent-driven, code-first production system for long-form explainer videos.**

Give a coding agent a topic, script, or production brief. Masteraiskill guides it through research, narrative design, storyboarding, visual systems, motion graphics, narration, captions, rendering, quality checks, and delivery of a finished MP4.

Designed for coding agents such as Claude Code, OpenAI Codex, Google Antigravity, and other agents that can read repository instructions and run local tools. Exact compatibility depends on the agent's available filesystem, terminal, and permissions.

## Product goal

**The finished MP4 is the main deliverable.** Code, scene data, logs, intermediate frames, and project files support reliable production; they are not a substitute for the video itself.

## Core principles

- Long-form explainers first; support other formats when requested.
- Research and story before visual effects.
- One coherent style bible with scene-specific variation.
- One canonical timeline for visuals, narration, captions, transitions, and sound cues.
- Deterministic, frame-accurate animation wherever practical.
- Preview, render, inspect, fix, and verify; a successful encode alone is not quality assurance.
- Prefer the smallest reliable implementation and reuse healthy project components.
- Keep external providers optional, ask before paid calls or downloads, and never assume credentials exist.
- Track source claims and asset provenance.
- Report only checks actually performed.

## Start here

1. Open this repository in your coding agent.
2. Read `AGENTS.md` and `PROMPT.md`.
3. Provide a topic, desired duration, audience, visual direction, narration preference, and constraints.
4. Produce a narration-first story plan and style direction.
5. Build scenes from one canonical timeline, render previews, inspect contact sheets, and fix problems.
6. Export and verify the final MP4. Report the exact path and measured metadata.

## Run the current sample

Requirements: a compatible Node.js LTS version and FFmpeg/ffprobe for media inspection.

```bash
npm install
npm run studio
npm run render:sample
python scripts/probe_mp4.py out/masteraiskill-demo.mp4 --expect-size 1920x1080 --expect-fps 30
python -m unittest discover -s tests -v
```

The sample is a visual test composition with illustrative chart values and no narration by default. Do not use those values as real-world facts.

## Repository map

- `AGENTS.md` — global agent operating contract.
- `PROMPT.md` — reusable master production prompt.
- `docs/ARCHITECTURE.md` — pipeline and renderer architecture.
- `docs/QUALITY_GATES.md` — acceptance criteria and QA loop.
- `docs/REFERENCE_ANALYSIS.md` — cross-repository technical synthesis.
- `docs/SKILL_AUDIT.md` — skill-by-skill decisions for the supplied references.
- `docs/STYLE_PRESETS.md` — original visual style systems to choose from.
- `docs/RENDERER.md` — renderer setup, licensing notes and current limitations.
- `docs/QUALITY_GATES.md` — measurable checks and delivery criteria.
- `docs/ROADMAP.md` — phased build plan.
- `templates/` — project brief, style bible, and scene timeline schema.
- `skills/` — focused production skills loaded only when relevant, including long-form narrative, scene craft, narration timing, asset provenance, rendering/verification and skill routing.
- `scripts/` — production and validation utilities as they are implemented.

## Current status

**Foundation phase.** The operating contract and production design are being established before choosing a mandatory renderer. This repository is not yet a tested, complete MP4-rendering engine; the roadmap tracks implementation and validation.

## Third-party references

The reference repositories inform technical research and original workflow design. Do not copy protected code, skill text, templates, artwork, or audio without permission. Record required attribution and preserve licenses for any component actually reused. See `docs/REFERENCE_ANALYSIS.md`.