# Roadmap

## Phase 0 — Foundation
- [x] Define MP4-first, long-form-explainer product goal.
- [x] Establish agent contract, master prompt, architecture and quality gates.
- [x] Record first-pass analysis of the seven reference repositories.
- [ ] Complete file-level inventory of every relevant reference skill and linked pack.
- [ ] Decide repository license and baseline OS/tool support.

## Phase 1 — Minimal real render pipeline
- [ ] Inspect likely host environment and choose one primary renderer with evidence.
- [ ] Add read-only preflight for Python/Node, FFmpeg/ffprobe, renderer and output folder.
- [ ] Implement canonical timeline schema and validation.
- [ ] Create a minimal sample composition with title, data/diagram, captions and voiceover timing.
- [ ] Implement preview-frame export and contact-sheet generation.
- [ ] Implement MP4 export and ffprobe validation.
- [ ] Test the entire flow on a short sample, record versions and sample metadata.

## Phase 2 — Long-form production
- [ ] Chapter/act planning and beat timing for multi-minute videos.
- [ ] Scene library: data charts, timeline, comparisons, maps, diagrams, paper-card editorial, whiteboard, isometric/exploded view, kinetic text and chapter cards.
- [ ] Voiceover ingestion and word/phrase alignment when timing data is available.
- [ ] Captions, audio mixing and intentional SFX cueing.
- [ ] Checkpoint/resume and selective re-render of changed scenes.
- [ ] Claim/source and asset-provenance ledgers.
- [ ] QA sampling across the complete timeline.

## Phase 3 — Agent compatibility
- [ ] Keep the core workflow vendor-neutral.
- [ ] Add thin adapters for specific agent conventions only where needed.
- [ ] Test filesystem/terminal/permission assumptions in each claimed environment.
- [ ] Produce an agent capability report at run start.

## Phase 4 — Craft and reliability
- [ ] Test multiple topics, visual directions and runtime ranges.
- [ ] Benchmark render duration, compute use and edit/iteration cost.
- [ ] Automated checks for clipping where feasible, duration, audio stream, deterministic frame output, and missing assets.
- [ ] Document realistic hardware requirements and unsupported use cases.
- [ ] Demonstrate a complete long-form output before calling the system production-ready.