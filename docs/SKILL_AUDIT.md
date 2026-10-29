# Skill-by-Skill Audit

This is a decision record for the supplied repositories, based on repository trees and the individual unique `SKILL.md` contents inspected. It separates **video-production craft**, **general coding-agent discipline**, and **unrelated/provider-specific skills**. Masteraiskill should reimplement the useful ideas in its own workflow; do not copy a protected skill or substantial text just because it is technically useful.

## Summary

| Reference | Unique skill files inspected | Decision |
|---|---:|---|
| [sahibul-nf/Motion-graphics-skill](https://github.com/sahibul-nf/Motion-graphics-skill) | 2 | Reimplement director workflow ideas; clipper is optional and short-form-only |
| [lemomo-ai/lemo-opuscar](https://github.com/lemomo-ai/lemo-opuscar) | 2 | Adapt modular-style and library-discovery concepts |
| [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) | 22 unique | Adapt investigation, lean-build, refactor, patch, and verification; exclude unrelated/provider-specific skills |
| [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) | 6 unique | Adapt small-complete-change and code-review principles |
| [Anil-matcha/vox-ai-motion-graphics-generator](https://github.com/Anil-matcha/vox-ai-motion-graphics-generator) | 1 | Reimplement end-to-end topic-to-video stage separation; keep external providers optional |
| [iart-ai/explainer-video-skills](https://github.com/iart-ai/explainer-video-skills) | 5 | Reimplement narrative, diagram, whiteboard, isometric, and data-template techniques |
| [iart-ai/motion-skills](https://github.com/iart-ai/motion-skills) | 0 at repository root | Readme describes 56 skills across 19 packs, but the repository itself contains no individual `SKILL.md`; audit the linked pack files before adopting any specific skill |

The count covers unique active skill paths: **38 unique `SKILL.md` files across six repositories**, plus packaged copies/variants. Caveman's plugin folder contains six copies also present under `skills/`; Ponytail exposes compatibility copies in `.openclaw/skills/` as well as its main `skills/` folder. A separate `benchmarks/arms/caveman-SKILL.md` is a benchmark artifact, not a production skill to install.

---

## A. Motion Video Director

### `skills/motion-video-director/SKILL.md`
**Purpose:** General video director/editor/sound-design workflow that uses a coding agent with local access.

**Useful concepts to reimplement**
- read-only machine/tool preflight; no assumptions about user paths, GPU, installed models or credentials;
- project continuity via a style/taste record, progress state and log;
- reference analysis and meaningful approval gates before large amounts of animation;
- narration/beat timing as the source for visuals and SFX;
- seeded, frame-deterministic animation;
- short preview renders and contact-sheet inspection before final export;
- deliberate sound design, source provenance, secure credentials and technical delivery checks.

**Decision:** High relevance. Use as a design influence for `AGENTS.md`, `render-verify`, the style bible and future timeline tooling. Build original implementation. Its own licence explicitly restricts redistribution of its protected material; do not copy its skills, scripts, templates, guides or private assets.

### `skills/talking-head-clipper/SKILL.md`
**Purpose:** Select a moment from existing long footage and produce a branded 9:16 social clip with word-timed captions, punches/stamps, SFX and source credit.

**Useful concepts:** transcript with word timestamps; hook/payoff selection; one structured beat file for clip timing, captions, emphasis effects, sound cues and credits; preview the actual effect moments; inspect contact sheets and verify output.

**Decision:** Optional future skill for repurposing a completed video into Shorts. Not part of the default original long-form production path.

---

## B. Lemo-Opuscar

### `plugin/skills/lemo-opuscar/SKILL.md`
**Purpose:** Directs an agent to create a code-generated film in a named style or help select/create a style, then use a separate style library and project pipeline.

**Useful concepts:** a visual style is a structured system with materials, motion and tool requirements; styles should be selectable/customizable; a film can be produced programmatically without a video-generation model being mandatory for every frame.

**Decision:** Reimplement a small original style catalogue and project-specific style-bible workflow. Do not make the external Lemo library or its setup script a core dependency.

### `tools/directory/SKILL.md`
**Purpose:** Helps an agent navigate the Lemo library/tool directory, so it can find the relevant reference and helper instead of loading everything.

**Useful concept:** discover the specific tool/guide needed rather than loading an entire library.

**Decision:** Adapt the principle as Masteraiskill's skill router. The original directory navigation logic itself is library-specific and is not needed.

---

## C. Caveman — all unique skills

Caveman is primarily a coding-agent efficiency, workflow, telemetry and code-management toolkit. It is not a motion renderer. Only a subset meaningfully improves video-production engineering.

| Skill file under `skills/` | Main purpose observed | Decision for Masteraiskill |
|---|---|---|
| `cavecrew/SKILL.md` | Delegates repo investigation, small edits and review to specialized subagents with compressed results | Optional adapter when the agent platform supports subagents; do not require it |
| `caveman-commit/SKILL.md` | Conventional, concise commit-message format | Use the general good practice for repo commits; not a production skill |
| `caveman-compress/SKILL.md` | Sends a specified instruction/memory file to an LLM provider, compresses it and overwrites the source while keeping a backup | Exclude; dangerous as an automatic step and not needed for video quality |
| `caveman-discover/SKILL.md` | Finds and labels LLM workflows for Caveman Cloud spend attribution | Exclude; provider/telemetry-specific and unrelated to making videos |
| `caveman-evidence-review/SKILL.md` | Reviews Caveman Cloud reports, token/cost/latency traces and attribution | Exclude the integration; adapt the principle of separating measured results from inference |
| `caveman-explore/SKILL.md` | Read-only repository explorer that returns precise path/line evidence | Optional agent navigation pattern; useful for large repo investigations |
| `caveman-help/SKILL.md` | One-shot help/reference card for Caveman commands | Exclude; command catalogue is unrelated |
| `caveman-learn/SKILL.md` | Reviews token sink measurements and proposes consent-gated context/cost changes | Exclude its telemetry/optimization procedure; keep the idea that measured savings must not be invented |
| `caveman-manage/SKILL.md` | Reviews or blocks unsafe Caveman experiment lifecycle changes | Exclude the product-specific operations; adapt fail-closed safety gates for paid render/API actions |
| `caveman-optimize/SKILL.md` | Turns Caveman optimization reports into operator-selected candidates and paired evaluations | Exclude provider-specific optimizer; evidence-based experiments are a general quality principle |
| `caveman-review/SKILL.md` | Very compact one-line code-review findings with precise location and fix | Adapt concise, actionable findings; never compress the actual explanation of major render defects out of the QA record |
| `caveman-setup/SKILL.md` | Wires app LLM call sites through Caveman Cloud proxy and verifies the integration | Exclude; this would add a provider dependency unrelated to rendering |
| `caveman-stats/SKILL.md` | Reports model/token/cache usage by agent host | Exclude; not needed for video production |
| `caveman/SKILL.md` | Persistent terse response voice, retaining technical facts | Don't enable as a default; scripts, storyboard, QA and delivery need enough clarity |
| `investigate-first/SKILL.md` | Evidence-ranked diagnosis before edits; separate observed symptoms from causes | Adopt in the render-failure repair loop |
| `lean-build/SKILL.md` | Derives acceptance criteria/non-goals and builds the narrow complete feature | Adopt for implementation discipline, without skipping end-to-end rendering or QA |
| `megacave/SKILL.md` | Classical Chinese compressed response mode | Exclude; language/persona mode unrelated to video craft |
| `migration/SKILL.md` | Compatibility-safe migration with forward/rollback plan and staged verification | Adapt for renderer, dependency and timeline-schema upgrades |
| `safe-refactor/SKILL.md` | Preserves behavior while restructuring one ownership boundary at a time | Adopt for video pipeline refactors |
| `surgical-patch/SKILL.md` | Reproduces a defect and fixes the narrowest responsible layer with regression proof | Adopt for render/audio/timing bug fixes |
| `ultracave/SKILL.md` | Maximum-compression language mode | Exclude; aggressive compression can harm creative reasoning and quality reporting |
| `verify-and-stop/SKILL.md` | Minimal acceptance proof; differentiates pass/fail/unavailable; stop when proven | Adopt directly as the principle behind quality gates |

### Caveman packaging duplicates
The six files under `plugins/caveman/skills/` are package copies of `cavecrew`, `caveman-compress`, `caveman-stats`, `caveman`, `megacave`, and `ultracave`. They add no new unique video capability. The plugin copies are not to be merged as separate skills.

---

## D. Ponytail — all six main skills

Ponytail emphasizes reducing unnecessary code while still completing the actual task. It is not a video-generation engine.

| Skill file under `skills/` | Main purpose observed | Decision |
|---|---|---|
| `ponytail/SKILL.md` | Smallest change that fully solves the task; reuse code/dependencies; name risks and omitted checks | Adopt for lean implementation and concise status reporting |
| `ponytail-audit/SKILL.md` | Whole-repository audit for correctness, security, load, tests, speed and bloat | Use as an optional repo-health review before major releases |
| `ponytail-debt/SKILL.md` | Collects deliberate shortcut/debt comments into a ledger | Optional; only useful if Masteraiskill deliberately defers a known issue |
| `ponytail-gain/SKILL.md` | Displays the source project's own benchmarked code/cost/speed savings | Exclude; benchmarks for the source project must never be presented as Masteraiskill performance |
| `ponytail-help/SKILL.md` | Lists Ponytail modes and commands | Exclude as a source-specific command menu |
| `ponytail-review/SKILL.md` | Reviews changes in code context for logic, safety, load, tests, speed and unnecessary lines | Adopt as an implementation quality review, including callers/tests rather than diff-only inspection |

The `.openclaw/skills/` tree also contains compatibility variants. They should not be treated as additional capabilities without a diff-based comparison. `benchmarks/arms/caveman-SKILL.md` is a benchmark artifact, not a skill to install.

---

## E. Vox AI Motion Graphics Generator

### `SKILL.md`
**Purpose:** Orchestrates a topic-to-finished-video workflow across writing, visual/keyframe generation, animation, narration/music/captions and final assembly. The repository also contains `AGENTS.md` and stage scripts.

**Useful concepts**
- a beats file as the structured backbone linking scenes and timing;
- separation of writing, art direction, keyframe/clip generation, audio, and assembly;
- explicit story and visual-direction approval gates;
- modular stages that can be debugged/re-run independently;
- a finished MP4 as the user-facing result.

**Important limitation:** The documented pipeline relies on external generation integrations in some paths (including MuAPI and ComfyUI/video-model support). These must not be assumed to be available or free.

**Decision:** Rebuild the stage separation and user-control pattern in an original pipeline. External image/video/audio/TTS adapters remain opt-in and replaceable. Add long-form chapters, actual voice-timing synchronization, full-duration QA sampling and render caching rather than simply stretching a short-video flow.

---

## F. iart-ai Explainer Video Skills — all five skills

### `skills/explainer-video/SKILL.md`
**Purpose:** A scripted short explainer workflow with a one-message thesis, narration-first structure, storyboard, visual-system consistency, caption timing and deterministic MP4 rendering.

**Decision:** Adopt the core narrative and timeline rules, then extend to long-form chapters. The example's 30–90-second word budget should not be used as a long-form runtime ceiling.

### `skills/diagram-animation/SKILL.md`
**Purpose:** Reveals diagrams and charts progressively: nodes → edges → labels, highlights active items, animates connectors/bars/lines/count-ups, and uses exact-frame preview checks.

**Decision:** Adopt as an original scene-craft pattern. Chart values and scales must be validated independently of animation code.

### `skills/isometric-animation/SKILL.md`
**Purpose:** Builds 2.5D/true-isometric scenes using consistent axes and parallel projection, including stacks, extruded layers and exploded diagrams.

**Decision:** Optional scene type for objects/processes where depth clarifies the concept. Do not force isometric treatment into unrelated scenes.

### `skills/whiteboard-animation/SKILL.md`
**Purpose:** Reveals SVG paths in narration order and tracks a marker-hand asset to the actual path tip.

**Decision:** Optional scene type. The implementation must check path geometry, hand-tip alignment, narration pacing and transitions; the effect should explain the subject rather than be decorative filler.

### `skills/wrapped-video/SKILL.md`
**Purpose:** Turns a row of data into a shareable video using a reusable template, big-number reveals, rankings/superlatives and batch rendering.

**Decision:** Separate future mode for personalized or recap videos. Not part of the default one-off long-form explainer pipeline.

---

## G. iart-ai Motion Skills

### Repository-level README and tools
Source: https://github.com/iart-ai/motion-skills

The README says the project catalogs 56 skills across 19 installable packs, spanning kinetic typography, data visualization, explainers, 3D/WebGL, generative illustration, canvas animation, social videos, b-roll and other workflows. It emphasizes rendering a frame, taking a screenshot, and inspecting it rather than trusting an animation by inspection of code alone.

The current top-level Git tree has only 11 entries and **no individual `SKILL.md` files**; the catalogue is largely a collection/entry point to separate packs. The associated `tools/verify` area should be reviewed as tooling, while individual skill files must be inspected in their own pack repositories before integrating them. This project was not treated as if the skill pack files were physically present in the supplied root repository.

**Decision:** Use the broad catalogue to inform the skill taxonomy and QA philosophy, not as a license to assume or import every skill. Audit the specific pack used for any later scene.

---

## Unified design decisions

1. **Core agent instructions stay short enough to execute.** Specialist skills load by task.
2. **Narrative drives craft.** Thesis, script, source ledger, beat map and visual style precede scene implementation.
3. **One timeline drives everything.** Scene/frame timing, narration, captions, transitions and sound cues share a source of truth.
4. **Deterministic rendering is preferred.** A given frame should depend on the frame number and explicit props.
5. **Quality inspection is a production stage.** Preview renders, contact sheets, frame checks, focused fixes and final file probing are mandatory where available.
6. **Debugging is evidence-first.** Reproduce, localize, fix the narrowest cause, rerun targeted tests, then verify the final output.
7. **External services are optional.** No API keys, paid calls, model downloads or uploads of private media without user authorization.
8. **MP4 is the primary deliverable.** Source project files support reproducibility but do not replace a finished export.
9. **Report measured results, not promises.** Distinguish machine checks from actual visual inspection/listening.
10. **No wholesale copying.** A technique can be independently reimplemented; code, artwork, assets and substantial instruction text require separate rights review before reuse.
