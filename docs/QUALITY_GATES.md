# Quality Gates and Acceptance Criteria

Successful encoding is necessary but does not prove that the video is good. Distinguish automated checks from actual visual inspection or human listening.

## Gate 0 — Environment and assets
- [ ] Renderer and media tool versions recorded.
- [ ] Inputs readable and output path writable.
- [ ] Required fonts/assets available; origins and rights notes recorded.
- [ ] API usage, installs, purchases and model downloads authorized.
- [ ] No secrets, private data or unlicensed content leaked into the package.

## Gate 1 — Story and facts
- [ ] One-sentence thesis and intended viewer takeaway.
- [ ] Long-form outline has real chapter progression, not padding.
- [ ] Important factual claims have traceable sources.
- [ ] Narration is natural, clear and not needlessly repetitive.
- [ ] Runtime estimate uses word count/rate or actual timed audio.

## Gate 2 — Visual system
- [ ] Style bible defines palette/color semantics, type, layout, motion, texture and captions.
- [ ] A topic-specific motif is developed from the story rather than imported as generic template content.
- [ ] Opening, representative scene, dense-data scene and ending frames inspected.
- [ ] Visuals explain the spoken point; no distracting decorative motion.
- [ ] Scenes share one coherent visual system while varying composition intentionally.
- [ ] Contrast, safe areas, line lengths and smallest text are readable at output resolution.

## Gate 2.5 — Frame Purpose Contract and originality
- [ ] Every scene states the viewer question, visual argument, visible action, topic-specific reason, composition, change from the previous scene, motion purpose and hold reason.
- [ ] Every fact or estimate resolves to a source ID; every asset resolves to provenance and rights evidence.
- [ ] The opening establishes a question or promise and the ending pays it off.
- [ ] No scene relies only on vague instructions such as “cinematic visuals,” “engaging animation,” or “add effects.”
- [ ] Recurring motifs change meaning; duplicated scene descriptions and interchangeable filler are rewritten.
- [ ] Each scene's visual operation serves the explanation; movement is purposeful, not decorative.
- [ ] The storyboard contract passes in strict mode and the validation report is saved.

Use the [Creative Quality playbook](CREATIVE_QUALITY.md) and [review sheet](../templates/CREATIVE_REVIEW.md). Structural checks reveal common weaknesses; they do not certify aesthetics or replace inspection of the rendered output.

## Gate 3 — Timing and rough cut
- [ ] One timeline drives scenes, narration, captions, transitions and sound.
- [ ] Complex visuals have enough hold time to comprehend.
- [ ] Captions match the audio and have readable dwell time.
- [ ] Transitions do not hide important information or create blank frames.
- [ ] Visual rhythm varies without losing continuity.
- [ ] Contact sheets sampled across the full video have been inspected.
- [ ] Redundant or weak scenes are revised or removed.

## Gate 4 — Audio
- [ ] Narration covers the intended scenes and is synchronized.
- [ ] No unintended clipping or long gaps.
- [ ] Music supports rather than obscures voice, if used.
- [ ] SFX support meaningful events and do not obscure speech.
- [ ] Technical checks recorded; human listening is claimed only when performed.

## Gate 5 — Technical export
- [ ] Final file exists and is non-zero.
- [ ] Container and codecs match the brief.
- [ ] Resolution, frame rate, duration, pixel format and audio streams measured.
- [ ] Output plays through the ending; no truncation or corrupted tail.
- [ ] Samples include opening, chapters/scenes across the full timeline, transitions, and ending.
- [ ] No missing fonts/assets, unexpected black/frozen frames, clipped content or incorrect chart values.

## Gate 6 — Delivery
- [ ] Exact final MP4 path reported.
- [ ] Requested narration, captions, music, credits and branding present.
- [ ] Metadata comes from measurement, not assumption.
- [ ] Checks labelled PASS, FAIL, BLOCKED or NOT RUN.
- [ ] Known limitations and needed manual steps disclosed.

## Severity
- **Blocker:** missing/corrupt file, critical factual error, unusable audio, required content absent, major mismatch with brief.
- **Major:** unreadable text, clipping/overlap, narration/visual mismatch, severe timing drift, repeated filler, wrong data.
- **Minor:** small easing/alignment/audio-design issue that does not break comprehension.
- **Enhancement:** optional polish outside the acceptance criteria.

Fix every blocker and major issue. Document minor issues and avoid infinite polishing for enhancements.