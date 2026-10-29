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
python scripts/validate_timeline.py examples/timeline.json
```

Checks the timeline JSON structure, required scene fields, unique IDs, frame values and obvious timeline gaps/overlaps. Gaps and overlaps are warnings by default because some may be intentional; use `--strict` to reject them.

## Inspect a rendered media file
```bash
python scripts/probe_mp4.py path/to/final.mp4
python scripts/probe_mp4.py path/to/final.mp4 --expect-size 1920x1080 --expect-fps 30 --require-audio
python scripts/probe_mp4.py path/to/final.mp4 --json
```

Uses `ffprobe` to report measured container, duration, size, video stream and audio stream details. It does not perform aesthetic checks or prove captions/narration are synchronized.

## Scope note
These utilities are the initial validation layer, not a complete renderer. The rendering engine and frame/contact-sheet workflow are tracked in `docs/ROADMAP.md`.
## Sample frames and contact sheet

After rendering an MP4 and ensuring FFmpeg/ffprobe are on PATH:

```bash
python -m pip install -r requirements-qa.txt
python scripts/render_qa_frames.py out/masteraiskill-demo.mp4 --count 12 --output-dir out/qa/frames
python scripts/create_contact_sheet.py out/qa/frames --output out/qa/contact-sheet.png
```

The frame extractor samples evenly across the encoded video and writes a JSON manifest with each sample timestamp. The contact-sheet script uses Pillow to create a labelled grid. Inspect the resulting image; creating it alone is not visual inspection.
