# Architecture

## Design goal
The agent should convert instructions into a verified MP4 without relying on one enormous prompt or one monolithic renderer. Agent instructions define the process; structured artifacts retain state; scene modules implement the visual craft; QA gates control delivery.

## Pipeline
```text
Brief + references
  -> environment preflight
  -> source-aware research
  -> thesis + narration script
  -> beat map / narration timing
  -> storyboard + style bible
  -> canonical timeline + asset ledger
  -> scene components
  -> voice / captions / music / SFX
  -> preview renders
  -> contact sheets + sampled-frame inspection
  -> evidence-based fixes
  -> final MP4 encode
  -> media metadata + visual QA
  -> delivery report
```

## Source-of-truth artifacts
- `project/brief.md`: goals, constraints, approvals, assumptions.
- `project/sources.json`: factual claim/source ledger.
- `project/script.md`: final narration split by chapter and beat.
- `project/beats.json`: narrative beats, intent, and approximate duration.
- `project/storyboard.json`: scene purpose, composition, transitions, narration link.
- `project/style-bible.md`: typography, color semantics, motion, texture, layout, audio.
- `project/timeline.json`: canonical frame-aligned scenes, voice, captions, and sound cues.
- `project/assets.json`: asset paths, origins and provenance.
- `project/qa.json`: measurements, checks, findings, fixes, unresolved risk.

Avoid duplicating the same timing or facts in multiple competing files.

## Renderer choices
Choose the simplest compatible renderer for the job and reuse a working project stack.
- **Remotion/React:** deterministic data-driven video scenes, typography and charts.
- **SVG + GSAP/CSS:** vector diagrams, line drawing and chart reveals, provided the animation can be frozen at exact times for export.
- **Canvas/WebGL/Three.js:** procedural illustration, parallax, 2.5D and 3D when they explain the subject.
- **Manim:** mathematical and geometric visual explanations.
- **FFmpeg:** assembly, audio mix, encoding, captions, trimming/concatenation and media inspection.
- **External image/video/TTS services:** optional adapters; never mandatory without need, credential availability and user authorization.

Do not make all renderers mandatory. One primary renderer should own each composition.

## Scene primitive candidates
Implement only when required by real projects:
- chapter/title opener and lower third;
- editorial paper-card scene;
- animated diagram and progressive reveal;
- source-backed chart and data callout;
- timeline/map/comparison;
- object breakdown or exploded view;
- product/UI walkthrough;
- kinetic typography and source/quote card;
- whiteboard draw-on;
- chapter transition and closing summary.

Components accept explicit props and frame/time; they render deterministically and provide a way to preview relevant frames.

## Timeline contract
One canonical timeline owns:
- FPS and integer frame indices;
- scene start/end and transition overlaps;
- narration segment start/end;
- caption segment start/end and text;
- music/SFX start/end, gain and fades;
- QA frame-sampling markers.

Convert audio timestamps to frames by a documented rule. Once locked, individual scenes should not invent separate durations.

## Render lifecycle
1. Preflight tools, inputs, assets, fonts and output path.
2. Build the composition and preview artifacts.
3. Smoke-test small intervals and representative frames.
4. Inspect contact sheets labelled by timestamp and scene.
5. Render a rough cut for pacing and visual coverage.
6. Fix verified findings and re-render affected scenes/ranges.
7. Render final quality.
8. Verify metadata, sampled frames, audio/captions where possible, and ending integrity.
9. Deliver exact output path and honest QA summary.

## Long-form requirements
Long-form is not merely a short template stretched to several minutes. It needs chapter progression, narrative escalation, visual variety under a consistent design system, room to understand complex ideas, meaningful transitions, no repeated filler, quality sampling over the full duration, and checkpoint/resume or scene caching when the renderer supports it.

## Fault handling
Classify failures as environment, dependency, source asset, input data, renderer, timing/audio, encode, or visual QA. Save concise errors and reproducible commands in project logs. Reproduce with the smallest failing scene/range, form an evidence-based hypothesis, repair the narrow cause, run focused tests, then resume.

## Agent/provider compatibility
Keep the core workflow vendor-neutral. Add thin adapters only where a specific agent requires them. Inspect the actual tool capability before relying on a terminal, browser, filesystem, or API. Store credentials in an environment/secret store. The base pipeline should remain useful without external generation APIs.