---
name: narration-timing
description: Align a script, approved voiceover, scenes, captions, and audio cues on one canonical frame timeline.
---

# Narration and Timing

Use whenever a video contains narration, subtitles, timed effects, or scene changes tied to spoken content.

## Timing priority
1. If approved audio exists, use its actual duration and timestamps as the source of truth.
2. If forced alignment/word timestamps exist, preserve their provenance and validate outliers.
3. If only a script exists, estimate duration using a declared speaking rate, then retime after audio exists.
4. Do not pretend a script-derived estimate is an exact caption or word timing.

## Procedure
- Divide narration into semantic phrases/beats; split only where the idea or breath naturally changes.
- Keep one timeline with integer frame indices and a documented conversion from seconds/audio timestamps.
- Define time ranges as half-open intervals: `[start_frame, end_frame)`. The start frame is included; the end frame is excluded. A scene with start 0 and duration 120 ends at frame 120.
- Scene, voiceover, captions, transitions, and SFX reference stable IDs; avoid repeating literal time values in separate files.
- Synchronize key visual events to meaningful spoken words, not every syllable.
- Leave enough dwell time for viewers to read charts, numbers, diagrams and citations.
- Do not cut the narration mid-clause unless the editorial intent warrants it.
- Keep captions concise, readable, correctly punctuated and inside safe areas.
- Time SFX to the perceptual event; do not add a sound to every movement.

## Validation
- All referenced segment IDs exist.
- Every interval has integer start/end, start >= 0 and end > start.
- Segments fit the available timeline and use the same FPS basis.
- Captions neither overlap accidentally nor race ahead of their spoken phrase.
- Scene transitions do not obscure key labels or create unwanted blank frames.
- Compare frame samples against voice timestamps after the actual audio is inserted.

## Report
Distinguish script-estimated timing, transcript/forced-alignment timing, and measured final media duration. Report failures and alignment checks not run.
