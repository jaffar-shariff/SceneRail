# Scripts

All scripts are intended to be safe first-run utilities. They do not install software or download models.

## Read-only environment inventory
```bash
python scripts/preflight.py
python scripts/preflight.py --json
```

Reports Python, Node/npm, FFmpeg/ffprobe, Git and optional Python modules. Missing optional tools are reported, not installed.

## Timeline structure validator
```bash
python scripts/validate_timeline.py examples/timeline.json --strict
```

Checks timeline field types, required scene fields, unique IDs, cross-references, timed text, audio cues, and obvious gaps/overlaps. Gaps and overlaps are warnings by default because some may be intentional; use `--strict` to reject unreviewed warnings.

## Frame Purpose Contract

```bash
python scripts/validate_storyboard.py examples/storyboard.json --strict
python scripts/validate_storyboard.py examples/storyboard.json --strict --report out/qa/storyboard-report.json
```

Checks whether a plan states audience, thesis, payoff, visual system, chapters, claim/source links, asset rights, and concrete scene-by-scene intent. It flags exact repeated scene descriptions and low variety in visual operations or composition language. Warnings require review; they are not proof of poor art. The report sets `artistic_quality_certified` to `false`: rendered frames still need inspection using the [Creative Quality playbook](../docs/CREATIVE_QUALITY.md) and [review sheet](../templates/CREATIVE_REVIEW.md).

## Internal Markdown links

```bash
python scripts/check_repo_links.py
```

Checks local Markdown targets throughout the repository so moving or removing a document does not leave silent broken links.

## Inspect a rendered media file
```bash
python scripts/probe_mp4.py path/to/final.mp4
python scripts/probe_mp4.py path/to/final.mp4 --expect-size 1920x1080 --expect-fps 30 --require-audio
python scripts/probe_mp4.py path/to/final.mp4 --json
```

Uses `ffprobe` to report measured container, duration, size, video stream and audio stream details. It does not perform aesthetic checks or prove captions/narration are synchronized.

## Scope note
These checks catch structural defects and some repetition signals; they cannot certify storytelling, visual taste, pacing, or viewer experience. Combine them with the [Creative Quality playbook](../docs/CREATIVE_QUALITY.md), the [scene-by-scene review sheet](../templates/CREATIVE_REVIEW.md), rendered-frame inspection, and measured media verification.
## Sample frames and contact sheet

After rendering an MP4 and ensuring FFmpeg/ffprobe are on PATH:

```bash
python -m pip install -r requirements-qa.txt
python scripts/render_qa_frames.py out/masteraiskill-demo.mp4 --count 12 --output-dir out/qa/frames
python scripts/create_contact_sheet.py out/qa/frames --output out/qa/contact-sheet.png
```

The frame extractor samples evenly across the encoded video and writes a JSON manifest with each sample timestamp. The contact-sheet script uses Pillow to create a labelled grid. Inspect the resulting image; creating it alone is not visual inspection.
