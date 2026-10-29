# Masteraiskill

<p align="center">
  <strong>From an idea to a finished video.</strong><br>
  An AI-agent video studio for short-form, long-form, and motion-driven storytelling.
</p>

<p align="center">
  <a href="https://github.com/jaffar-shariff/Masteraiskill/actions/workflows/ci.yml"><img src="https://github.com/jaffar-shariff/Masteraiskill/actions/workflows/ci.yml/badge.svg" alt="Masteraiskill CI"></a>
  <img src="https://img.shields.io/badge/Output-MP4-3b82f6" alt="MP4 output">
  <img src="https://img.shields.io/badge/Renderer-Remotion%20%2B%20FFmpeg-8b5cf6" alt="Remotion and FFmpeg">
</p>

Masteraiskill gives AI coding agents a structured production workflow for turning a topic, script, research pack, or creative brief into a coherent video. It brings narrative planning, original motion design, scene timing, narration, captions, rendering, and quality checks into one code-first workspace.

Use it with coding agents such as Claude Code, OpenAI Codex, Google Antigravity, or another agent with repository and terminal access. The core instructions are agent-neutral; individual tools and integrations depend on your environment.

## What you can create

| Video format | Production approach |
|---|---|
| **YouTube Shorts, Reels, TikTok** | Strong opening hook, vertical framing, bold captions, quick scene rhythm, sound hits, and a clear payoff |
| **Long-form YouTube explainers** | Chapter structure, narration-first scripts, progressive reveals, data visualization, visual callbacks, and pacing across the full runtime |
| **Business, finance, and economics** | Comparisons, timelines, charts, money flows, cause-and-effect diagrams, and number-led storytelling |
| **Company stories and history** | Chaptered narrative, event timelines, original editorial graphics, maps, documents, and source-aware visuals |
| **Science, technology, and education** | Step-by-step diagrams, process animations, technical breakdowns, geometric scenes, and familiar visual analogies |
| **Product and software explainers** | UI walkthroughs, feature sequences, interface overlays, feature comparisons, and clear benefit-led narration |
| **Data stories and recaps** | Source-backed charts, animated statistics, ranking reveals, and template-driven personalized videos |
| **Whiteboard and sketch explainers** | Draw-on paths, sequential handwriting, guided diagrams, and marker-style movement |
| **Paper-card and 2D collage videos** | Layered cut-paper compositions, editorial objects, texture, controlled parallax, and handmade visual language |
| **Isometric and exploded-view scenes** | Layered systems, product internals, infrastructure, process stacks, and spatial diagrams |
| **Documentary and mixed-media edits** | Approved footage, archival visuals, maps, annotations, captions, and original graphics unified by one visual system |
| **Motion-graphics-led videos** | Kinetic typography, title sequences, lower thirds, charts, transitions, and data-driven animations |

Choose one primary visual system for a film and vary scenes to suit the explanation. The aim is cohesive storytelling—not a grab bag of unrelated effects.

## How the production workflow works

1. **Understand the brief** — topic, audience, runtime, aspect ratio, visual tone, narration, references, delivery needs, and constraints.
2. **Research and shape the story** — establish a thesis, verify important claims, structure the script, and build chapters or beats suited to the format.
3. **Lock the visual language** — set typography, color meanings, layout, materials, motion rules, caption treatment, and audio identity.
4. **Build a scene plan** — map each spoken beat to a purposeful visual and record assets, transitions, and timing.
5. **Animate from one timeline** — use shared frame timing for scenes, narration, captions, transitions, and sound cues.
6. **Render previews** — generate representative frames and low-cost renders before committing to a full export.
7. **Inspect and improve** — review contact sheets, correct clipping, pacing, overlaps, weak contrast, timing drift, missing assets, and confusing visuals.
8. **Export and verify** — render the MP4, inspect measured media properties, sample frames across the video, and report the result accurately.

## Built for agent-driven production

- **MP4-first delivery:** the finished video is the main output; code and intermediate files support reliable production.
- **Narrative-led:** write and structure the story before building detailed visuals.
- **Long-form aware:** chapter progression, coverage, visual variety, and QA across the entire runtime—not just the first 30 seconds.
- **Short-form aware:** vertical-safe composition, hook timing, readable captions, and concise visual beats.
- **Deterministic motion:** prefer scene state driven by frame/time and explicit inputs so frames can be re-rendered reliably.
- **Modular scene craft:** diagrams, charts, timelines, comparisons, title cards, paper-card compositions, whiteboard reveals, isometric scenes, and kinetic typography.
- **Synchronized audio:** narration, captions, music, and SFX share a consistent timing model.
- **Quality gates:** file validation is combined with representative-frame inspection; successful encoding alone is not treated as proof of quality.
- **Flexible integrations:** external image, video, speech, and audio services are optional. Never assume credentials exist or incur paid calls without permission.
- **Evidence-first debugging:** reproduce a failure, find the smallest responsible cause, fix it, and verify the correction.
- **Source-aware assets:** maintain provenance for research claims, footage, images, fonts, and audio.

## Quick start

### Requirements

- Node.js LTS compatible with the pinned Remotion packages
- FFmpeg and ffprobe for MP4 verification and frame sampling
- Python 3 for validation utilities
- Pillow for creating labelled contact sheets

### Preview and render the included composition

```bash
git clone https://github.com/jaffar-shariff/Masteraiskill.git
cd Masteraiskill

npm install
npm run studio
npm run render:sample
python scripts/probe_mp4.py out/masteraiskill-demo.mp4 --expect-size 1920x1080 --expect-fps 30
python -m unittest discover -s tests -v
```

To create a contact sheet for visual review:

```bash
python -m pip install -r requirements-qa.txt
python scripts/render_qa_frames.py out/masteraiskill-demo.mp4 --count 12 --output-dir out/qa/frames
python scripts/create_contact_sheet.py out/qa/frames --output out/qa/contact-sheet.png
```

The included Remotion composition demonstrates a title sequence, progressive diagram, animated comparison bars, and closing card. Its example chart uses illustrative values—not factual research data—and narration is optional in the sample composition.

## Use Masteraiskill with your own topic

Open the repository in your coding agent, then start with [`PROMPT.md`](PROMPT.md). Provide the topic, audience, target duration, desired format, visual direction, narration preference, and any required sources or assets. Read [`AGENTS.md`](AGENTS.md) for the full operating contract.

For each new video, keep a project brief, script, source ledger, storyboard, style bible, canonical timeline, asset manifest, and QA record as appropriate to the task. The final MP4 remains the primary deliverable.

## Project map

- [`AGENTS.md`](AGENTS.md) — production rules for the coding agent.
- [`PROMPT.md`](PROMPT.md) — master production prompt.
- [`src/Root.tsx`](src/Root.tsx) — included Remotion sample composition.
- [`templates/PROJECT_BRIEF.md`](templates/PROJECT_BRIEF.md) — video brief template.
- [`templates/STYLE_BIBLE.md`](templates/STYLE_BIBLE.md) — visual identity template.
- [`templates/SCENE_SCHEMA.json`](templates/SCENE_SCHEMA.json) — canonical scene/timeline structure.
- [`skills/`](skills/) — task-focused production instructions.
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — system architecture.
- [`docs/STYLE_PRESETS.md`](docs/STYLE_PRESETS.md) — original visual style systems.
- [`docs/QUALITY_GATES.md`](docs/QUALITY_GATES.md) — production acceptance criteria.
- [`docs/RENDERER.md`](docs/RENDERER.md) — renderer usage and configuration.
- [`scripts/`](scripts/) — environment preflight, timeline validation, frame sampling, contact sheets, and MP4 inspection.

## Quality standard

A video is delivered only after the output file and its technical properties are verified, representative frames are inspected, and known limitations are reported. If a check cannot be performed, it is marked as not verified—not silently assumed to have passed.
