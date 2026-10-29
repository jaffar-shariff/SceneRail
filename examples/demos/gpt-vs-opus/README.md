# GPT vs Opus — SceneRail demo

An original 45-second, 16:9 Interface Theatre composition comparing **GPT-6.1 Sol** with **Claude Opus 5.5** using public vendor-reported pricing and benchmark claims.

## What the video argues

The defensible angle is not “GPT wins everything.” It shows three scoped GPT advantages reported by OpenAI—standard token rates, one AutomationBench comparison, and Terminal-Bench Science cost per task—then includes an explicit counterexample: Anthropic reports Opus 5.5 ahead of GPT-6 Astra on Terminal-Bench 4.0 under different effort settings.

The visuals and layout are original React/Remotion elements written for SceneRail. No third-party screen captures, logos, or finished-video frames are used.

## Render locally

```bash
npm install
npm run render:gpt-vs-opus
python scripts/probe_mp4.py out/gpt-vs-opus-interface-theatre.mp4 --expect-size 1920x1080 --expect-fps 30
```

This first render is **silent** and uses on-screen visual explanations and labels. The timed voiceover script is in [narration.txt](narration.txt). The source ledger is in [sources.md](sources.md); the production plan is in [storyboard.json](storyboard.json) and [timeline.json](timeline.json).

## Evidence and limitations

- Vendor-published evaluations are attributed to the publisher. They're not described as independent replications.
- API token prices are not the same as end-to-end task costs. Caching, long-context tiers, fast modes, reasoning effort, fallbacks, tool calls, and model version affect the final bill.
- The AutomationBench claim is presented as OpenAI-reported, at medium reasoning effort, with a visible caveat about task sets and fallback handling.
- The Terminal-Bench Science figures are reported average task costs at maximum effort, not a substitute for comparing task success and answer quality.
- The Terminal-Bench 4.0 counterexample compares Opus 5.5 at xhigh effort with GPT-6 Astra at high effort, as reported by Anthropic. It is explicitly not a GPT-6.1 Sol score comparison.

The file validator checks structure and rendering, not whether the final edit is artistically compelling. Review the exported MP4 and contact sheet before publishing.
