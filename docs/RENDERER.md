# Initial Renderer: Remotion

## Why start here

The first renderer is a small Remotion/React composition because scene geometry, typography, charts, and transitions can be driven by exact frames in one deterministic composition. This is an initial implementation choice—not a claim that Remotion is best for every future scene. Other render strategies can be added behind focused adapters when they materially improve the video.

## Current sample

`src/Root.tsx` registers the `MasteraiskillDemo` composition: a 25-second, 1920×1080, 30 fps motion-design sample with an intro, progressive diagram reveal, animated comparison bars, and ending card. Values in the sample chart are explicitly illustrative and must not be presented as factual research.

## Run locally

1. Install a compatible Node.js LTS release and FFmpeg if required by the local renderer.
2. From the repository root run `npm install`.
3. Run `npm run studio` to preview the composition.
4. Run `npm run render:sample` to render `out/masteraiskill-demo.mp4`.
5. Run `python scripts/probe_mp4.py out/masteraiskill-demo.mp4 --expect-size 1920x1080 --expect-fps 30`.

The sample composition has no narration by default, so it intentionally does not embed a fake voice track. To use an approved narration file, place it in the Remotion public folder (for example, `public/audio/narration.mp3`) and set the composition's `narrationFile` prop to `audio/narration.mp3`. Audio timing and captions must be aligned to the actual narration for a real production project.

## Version discipline

Remotion packages are pinned to the same exact version in `package.json`; upgrade all Remotion packages together and rerun preview/render checks. As of 29 October 2026, npm lists Remotion and `@remotion/cli` 4.0.539 as the latest release. See [Remotion on npm](https://www.npmjs.com/package/remotion) and [Remotion CLI on npm](https://www.npmjs.com/package/@remotion/cli).

## Licensing

Remotion has its own license terms. Its published policy provides a free license for eligible individuals and small companies of up to three people, subject to terms; larger organizations may require a company license. Review the [official license and pricing](https://www.remotion.dev/docs/license/pricing) for the actual situation. Masteraiskill does not sell or relicense Remotion. This repository uses it as an external dependency; installing it does not grant rights beyond Remotion's own terms.

## Known limitation

This is an initial demonstration composition, not yet a full brief-to-final-video engine. The roadmap tracks canonical timeline ingestion, narration/caption alignment, scene caching, contact-sheet inspection, and end-to-end long-form validation.
