# Creative Quality: the Frame Purpose Contract

## Purpose

The Frame Purpose Contract is SceneRail's original production rule for making every shot accountable to the story. It reduces interchangeable, template-driven “AI slop” by asking the creator to specify what the viewer should understand, what changes on screen, and why the visual belongs to this particular topic.

It is not a magic detector for good art. Automation can catch missing planning information and obvious repetition; only review of the rendered video can judge whether an idea reads clearly, whether the pacing works, and whether the story earns attention.

## Contract for every scene

Before detailed scene implementation, every storyboard scene must answer these questions concretely:

| Field | Required answer |
|---|---|
| Viewer question | What does the viewer need to understand, anticipate, or reconsider at this beat? |
| Visual argument | What idea does the image make visible that narration alone would leave abstract? |
| Visible action | What exact object, graphic, value, part, character, or relationship changes on screen? |
| Topic specificity | Which detail ties this visual to this topic, not just to “business,” “technology,” or “history” in general? |
| Composition | Where does the viewer look first, second, and last? What is deliberately omitted? |
| Change from previous | What new information, scale, viewpoint, visual operation, or emotional state does this scene add? |
| Motion purpose | What relationship, sequence, change, or emphasis is clarified by movement? |
| Hold reason | What must the viewer read or understand before the edit moves on? |
| Claim links | Which factual, estimated, interpretive, or illustrative statements does this scene support? |
| Asset links | Which images, footage, documents, fonts, or audio assets does this scene use, and are their rights clear? |

A description is incomplete if it says only “cinematic animation,” “show the data,” “add B-roll,” or “make it engaging.” Specify the subject, action, framing, relationship, and reveal. If the scene is not specific enough to draw or animate, the thinking is not finished.

## Originality rules

1. **Design from the mechanism.** Start with what is distinctive about the subject: a strange trade-off, hidden dependency, decision sequence, physical structure, disputed claim, human consequence, or unexpected comparison. Choose the visual metaphor after understanding that mechanism.
2. **Use style as grammar, not a template.** A style establishes material, palette, typography, composition, and motion. It does not decide what the scene depicts. Develop a topic-specific motif and make its meaning evolve.
3. **No interchangeable filler.** Ask: “Could this scene be moved unchanged into an unrelated video?” If yes, rewrite it to show topic-specific evidence, mechanism, contrast, or consequence.
4. **Motion earns its place.** Motion must reveal, compare, trace, assemble, transform, demonstrate, isolate, map, annotate, or resolve. A zoom, glow, particle effect, whoosh, or camera move that communicates nothing should be removed.
5. **Variation has a reason.** Vary composition, scale, density, and operation when the story changes. Do not vary them randomly to appear dynamic. Recurring motifs should develop in meaning.
6. **Evidence stays honest.** Source factual claims. Label illustrative values and conceptual diagrams. Never present generated recreations as real archival evidence, product screens, or scientific imagery.
7. **Keep a human reading path.** One primary idea per scene. Reveal complexity in steps, preserve negative space, and give important numbers enough hold time.
8. **Do not imitate as a shortcut.** Translate references into broad principles; do not reproduce another creator's distinctive sequence, character, asset, or composition.

## Format-aware storytelling

- **Short-form:** one focused promise, an honest hook, rapid but comprehensible progression, a meaningful demonstration, and a payoff. Do not replace substance with constant zooms and giant captions.
- **Long-form:** a clear thesis, chapters that change the viewer's understanding, evidence and mechanism scenes, relevant counterpoints, callbacks with changed meaning, and an ending that resolves the opening.
- **Finance/business/economics:** show the mechanism, not only a number. Include units, period, baseline, source, and the economic relationship being claimed.
- **History/documentary:** distinguish confirmed records from inference and recreation. Use chronology, geography, and source details to explain consequence.
- **Science/technology:** identify what is known, simplified, or illustrative. Do not distort the underlying mechanism for visual drama.
- **Product/UI:** demonstrate a truthful interaction. Label concept screens clearly and never imply an unverified feature exists.

## Automated contract check

From the repository root:

```bash
python scripts/validate_storyboard.py examples/storyboard.json --strict
python scripts/validate_storyboard.py project/storyboard.json --strict --report project/qa/storyboard-report.json
```

The validator checks required fields, IDs, chapter/claim links, source requirements for facts and estimates, unknown asset rights, exact repeated descriptions, visual-operation variety, and signals that a scene may be generic. `--strict` rejects warnings as well as errors.

The report deliberately sets `artistic_quality_certified` to `false`. A structural pass is not a promise that a video is original, engaging, correct, or polished.

## Final creative review loop

1. Validate the storyboard and fix weaknesses before detailed implementation.
2. Render an opening, an information-dense scene, a representative mechanism scene, and the ending at delivery size.
3. Inspect actual frames across the whole runtime, each distinct scene type, chapter/transition boundaries, and the ending. Do not inspect only the first few seconds.
4. Identify the three most interchangeable moments. Rewrite or remove them instead of hiding weak thinking behind effects.
5. Check continuity: the palette and motion grammar stay coherent, while each scene adds a new step or meaning.
6. Check labels, units, dates, citations, asset rights, readability, and narration/visual alignment.
7. Re-render repaired sections and inspect the corrected frames again.
8. Complete the [creative review sheet](../templates/CREATIVE_REVIEW.md). If the agent cannot inspect frames or listen to audio, mark that check BLOCKED or NOT RUN.

## Review score

Score each dimension from 1 to 5 in the review sheet. A score below 3 in any applicable dimension fails review; for factual videos, topic specificity, story clarity, and evidence integrity should each score at least 4. A high average never overrides a factual error, rights problem, unreadable text, unusable audio, or major narrative gap. The score is an editorial judgement, not an objective aesthetic measurement.

## What this system can and cannot promise

It can make vague plans harder to pass unnoticed, require per-scene intent, keep claims/assets traceable, expose repetitive plans, and require documented inspection and repair.

It cannot guarantee that every agent follows instructions, every viewer likes the result, or automated metrics can determine taste. Strong output still depends on accurate research, original thinking, implementation skill, real frame inspection, and willingness to revise.
