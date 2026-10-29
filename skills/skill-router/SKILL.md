---
name: skill-router
description: Select only the relevant SceneRail skills for a video task and keep the production context focused.
---

# Skill Router

Read the top-level `AGENTS.md` once at task start. Load specialist skills by need rather than dumping every skill into context.

## Routing
- Multi-minute explainer, history, business, technology, documentary essay: `longform-explainer`.
- Choosing visual metaphor, diagrams, charts, whiteboard, paper-card, isometric or custom scenes: `scene-craft`.
- Preview, contact sheets, rendering, media metadata, defects or final acceptance: `render-verify`.
- Narration/voiceover synchronization, captions and timed audio: `narration-timing`.
- Research claims, outside images/footage, typography, fonts, music, SFX, or generated/user assets: `asset-provenance`.

## Working rules
- Multiple skills may apply to one job.
- Read a skill when needed; don't repeat its full contents in every response.
- Preserve project state and approved decisions when resuming.
- Do not invent skills, tool support, APIs, or installed dependencies.
- When a task reveals a repeatable new capability, propose a new narrowly scoped skill only after confirming it belongs in the long-term system.
- Never let token-saving heuristics remove research, deterministic timing, or visual quality checks.
