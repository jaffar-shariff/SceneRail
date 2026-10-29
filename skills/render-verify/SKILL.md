---
name: render-verify
description: Render previews, inspect sampled frames and contact sheets, fix issues, and verify final MP4 delivery.
---

# Render and Verify

A successful render command is not proof of a good video.

## Steps
1. Inspect existing render scripts, dependencies, assets, and the successful project configuration. Do not switch frameworks by preference alone.
2. Validate timeline, assets, fonts, output path and required tools.
3. Render cheap frame previews or short low-resolution ranges first.
4. Build a contact sheet labelled with scene IDs, timestamps, and frame numbers.
5. Inspect the opening, chapter boundaries, each distinct scene type, dense typography/data, transitions, samples across the full video, and ending.
6. Review narration-to-visual correspondence, cropping, contrast, overlap, consistency, text legibility, data labels, transition tails, black/frozen frames, and caption safe areas.
7. Check metadata, audio/video streams, duration, resolution, FPS, pixel format and encode integrity using ffprobe or equivalent.
8. Classify findings as BLOCKER, MAJOR, MINOR, or ENHANCEMENT.
9. Fix blockers/major issues with the smallest relevant change; re-render affected sections and inspect them again.
10. Save a QA record and report exact output path and limitations.

## Evidence rules
- Only claim a frame was inspected if the image was opened/viewed.
- Only claim audio was listened to when actual listening occurred.
- Mark checks PASS, FAIL, BLOCKED, or NOT RUN.
- Record commands/tool versions needed for reproduction.
- Do not delete intermediate work before final verification passes.
