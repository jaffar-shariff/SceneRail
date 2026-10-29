# Examples

- `timeline.json` is an example of the canonical scene timeline and a fixture for `scripts/validate_timeline.py`.
- `storyboard.json` demonstrates the original Frame Purpose Contract. It is a planning example, not a finished long-form video or proof of aesthetic quality.
- `src/Root.tsx` registers `SceneRailDemo`, with an opening, progressive diagram, illustrative data reveal, and closing card.
- Run `npm run validate:all` to check timeline structure, storyboard specificity, and local documentation links.
- Run `npm run render:sample` after installing dependencies to create an MP4. Use `scripts/probe_mp4.py` to inspect metadata and `scripts/render_qa_frames.py` plus `scripts/create_contact_sheet.py` to create visual-inspection artifacts.

The chart values in the renderer demo are illustrative and must not be reused as factual data in a published video. Creating a contact sheet is not the same as inspecting it.
