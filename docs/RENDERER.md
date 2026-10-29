# Rendering with Remotion

SceneRail uses Remotion and React for frame-driven motion scenes, typography, diagrams, charts, transitions, and MP4 export. Remotion is the primary example renderer; specialist scene types can use other appropriate tools when they add real value.

## Included composition

`src/Root.tsx` registers `SceneRailDemo`: a 25-second, 1920×1080, 30 fps motion-design composition with an opening title, progressive diagram reveal, animated comparison bars, and closing card. The demo gives the project a known composition that can be previewed, rendered and checked end to end.

Its chart values are explicitly illustrative. Replace them with researched, sourced values before presenting any chart as factual content.

## Run locally

Requirements: a compatible Node.js LTS release plus FFmpeg/ffprobe for media inspection.

```bash
npm install
npm run studio
npm run render:sample
python scripts/probe_mp4.py out/scenerail-demo.mp4 --expect-size 1920x1080 --expect-fps 30
python -m unittest discover -s tests -v
```

The rendered MP4 is written to `out/scenerail-demo.mp4`.

## Use narration

The example deliberately has no narration by default. To add an approved narration file:

1. Place the file under `public/audio/` (for example, `public/audio/narration.mp3`).
2. Set the composition's `narrationFile` prop to `audio/narration.mp3`.
3. Align scene changes, captions and sound cues to the real voice timing.
4. Preview frames across the video to confirm that the visual at each sampled moment matches the spoken line.

Do not fabricate word-level timestamps from a script and report them as actual speech alignment.

## Timing and deterministic scenes

- Drive each visual from `useCurrentFrame()` and explicit props.
- Keep the timeline and all media timing on one FPS basis.
- Use stable scene IDs and frame intervals so content can be rerendered reproducibly.
- Avoid wall-clock timers and unseeded randomness in rendered compositions.
- Test each distinct scene type at its starting frame, a motion frame and its settled frame.

## Dependency management

Remotion packages are pinned to the same exact version in `package.json`. Upgrade them together, review the applicable dependency terms, and rerun TypeScript, render, media-probe and frame-inspection checks after changes.

Remotion is an external dependency with separate license and pricing terms. Review the [official Remotion license and pricing](https://www.remotion.dev/docs/license/pricing) for your circumstances. SceneRail does not relicense Remotion.

## From a composition to a project video

For a specific production, create a brief, script, storyboard, style bible, source/asset manifest and canonical frame timeline as needed. The agent should map approved scene data onto the renderer, add approved narration/captions/audio, render preview frames, inspect contact sheets, fix issues and render the requested final MP4. Use the included sample as a working rendering reference—not as factual content to publish unchanged.
