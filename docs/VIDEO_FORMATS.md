# Video Formats and Production Playbooks

Masteraiskill uses one production core and format-specific playbooks. The story, scene choices, timeline, and final QA adapt to the video type—rather than forcing every request through a single template.

## 1. Short-form social video

**Typical destinations:** YouTube Shorts, Instagram Reels, TikTok.

**Editorial needs**
- The opening visual and first spoken line establish a question, contradiction, payoff, or clear promise immediately.
- Keep a single main idea per beat and remove setup that does not advance it.
- Use vertical composition (typically 9:16), safe margins around app UI, high-contrast captions and readable numbers.
- Use quick transitions only where they clarify the beat. Give key statements and data long enough to register.
- End with a payoff, callback, or one requested next action.

**Production plan**
1. Develop a hook and beat map before scene construction.
2. Target the approved runtime; do not invent a universal duration cap.
3. Use one timeline for word/phrase captions, emphasis, cuts and sound cues.
4. Render a low-resolution cut and inspect every scene/effect moment.
5. Verify vertical resolution, caption safe zones, voice intelligibility and ending.

## 2. Long-form explainer and documentary essay

**Typical destinations:** long-form YouTube, educational channels, narrated essays.

**Editorial needs**
- A central thesis that the film demonstrates, not merely announces.
- Chapters/acts with escalating evidence, mechanisms, examples and payoffs.
- Pacing that varies: brisk when orienting the viewer, slower for complex mechanisms and evidence, quiet when a point should land.
- Visual variety under a consistent design bible.
- Callbacks and transitions that connect chapters; no repeated scenes or filler to manufacture runtime.

**Production plan**
1. Research claims and build a source ledger.
2. Write full narration and divide it into chapters and beats.
3. Time the actual narration when available; do not treat word-count estimates as final sync.
4. Plan sequence-level style, then scene composition.
5. Generate rough-cut previews and sample the full duration—not only the opening.
6. Use checkpoint or selective re-rendering when supported by the renderer.
7. Inspect chapter transitions, repeated patterns, audio consistency and finale.

## 3. Finance, business, economics and company stories

**Useful visual grammar**
- A number-led cold open, followed by the contradiction or tension behind the number.
- Money-flow diagrams, unit-economics breakdowns, timelines, comparisons, price/volume charts and cause-and-effect chains.
- Source cards for consequential claims; data labels should show units, dates and comparison bases.
- Visual metaphors should be consistent throughout a sequence.

**Guardrails**
- Do not animate illustrative sample values as if they were research.
- Check units, scale, source date, currency and comparison basis independently from the chart drawing code.
- Keep important caveats visible without burying the main point in footnotes.

## 4. History, company origin, and event timelines

**Useful visual grammar**
- Chapter cards, dates, event timelines, location maps, archival documents, period context and recurring visual motifs.
- Show cause and consequence, not only a chronological list.
- Distinguish verified archive material from illustrative recreations.
- Maintain a source ledger for disputed dates, anecdotes, quotations and numbers.

**Guardrails**
- Never invent an image and present it as archival proof.
- Preserve source credits and usage restrictions when using actual footage, images or documents.

## 5. Science, technology, and educational walkthroughs

Choose one explanatory approach per beat:
- **Mechanism:** progressively reveal parts, connections and labels.
- **Mathematics/geometry:** use exact diagramming or a suitable mathematics renderer.
- **System architecture:** layer, sequence or animate data flow through the system.
- **Abstract idea:** choose one familiar analogy and keep its visual grammar consistent.
- **Step-by-step tutorial:** show the correct sequence and highlight the current step.

Do not use animation to imply scientific certainty that the evidence does not support. Hold complex diagrams long enough to read and dim inactive elements when that helps focus.

## 6. Product, UI and software explainers

- Begin with the user problem or desired outcome, not a list of features.
- Show the mechanism in a small number of concrete steps.
- Use current, approved product screenshots or original UI recreation with accurate labels.
- Keep cursor/zoom motion purposeful and preserve UI legibility.
- Do not fabricate product interface states that could mislead viewers.

## 7. Data stories, reports, and personalized recaps

- Use source-validated values and a shared visual grammar.
- Reveal one number/category at a time, with comparisons that use a valid scale.
- For repeated data records, keep a template and validate each row before batch rendering.
- Check sample cases, missing values, extreme values, text length and output uniqueness.
- Never leak private per-user data into shared logs or repository assets.

## 8. Whiteboard, sketch, and draw-on videos

- Reveal the illustration in narration order, not as an arbitrary decorative draw.
- Synchronize each SVG path reveal to its own duration and position.
- If using a marker hand, align its tip to the true path endpoint at every sampled frame.
- Use an appropriately restrained line style and enough hold time for reasoning.
- Verify frame-seeking behavior before relying on browser animation timing for video export.

## 9. Paper-card / 2D collage editorial

- Use flat 2D paper layers, cut shapes, intentional texture, restrained shadows, strong negative space and a consistent palette.
- Build a coherent scene language from original graphic elements.
- Use parallax, sliding cards, folds and impacts only to serve the story.
- Avoid unrelated decorative objects, unnecessary fake 3D bevels, random spins, clutter and text-generation artifacts.
- Keep crucial facts and captions separate from highly textured elements.

## 10. Isometric, 2.5D, and exploded-view scenes

- Choose one projection convention and keep axes consistent.
- Reveal structures layer by layer and make component relationships clear.
- Use labels and leaders that remain attached during motion.
- Keep perspective and camera movement controlled.
- Choose true 3D only where it adds explanatory value over a simpler diagram.

## 11. Documentary and mixed-media production

- Use only approved or appropriately licensed footage, images, maps, music and documents.
- Track source, creator, URL/origin, permission/license evidence and any attribution requirement.
- Unify live footage and graphics with consistent color, typography, annotation and transition rules.
- Avoid unsupported recreations of real events and do not present generated imagery as real evidence.
- Mix recorded audio carefully; keep narration intelligible.

## 12. Motion-graphics packages and channel identity

Reusable modules may include:
- opening title/hook;
- chapter/section cards;
- lower thirds and source cards;
- animated statistics/charts;
- diagrams, timelines and comparison layouts;
- caption treatments;
- transition families;
- recurring object/metaphor;
- closing takeaway and optional CTA.

Build a recurring element only when it makes the channel more recognizable or clarifies the story. Do not introduce branding that the user did not request.

## Format routing rule

If a brief combines formats (for example, one long-form video plus three Shorts), treat them as related but distinct deliverables. Reuse approved facts, assets and style decisions, but write separate edits, timelines and aspect-ratio layouts. Verify each file independently.
