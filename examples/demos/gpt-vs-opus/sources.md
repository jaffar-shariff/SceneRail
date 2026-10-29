# Source ledger — GPT vs Opus demo

Checked 29 October 2026. These are vendor-authored sources; the video labels claims accordingly.

## 1. OpenAI — Introducing GPT-6.1 Sol
https://openai.com/index/introducing-gpt-6-1-sol/

Used for:
- GPT-6.1 Sol standard API rates: $2 per million input tokens and $10 per million output tokens within the standard price tier.
- OpenAI's statement that, on AutomationBench at medium reasoning effort, GPT-6.1 Sol scores 2.2 percentage points above Opus 5.5 at roughly one-third the task cost.
- OpenAI's reported Terminal-Bench Science 0.1 maximum-effort average cost per task: $5.47 for GPT-6.1 Sol and $23.21 for Opus 5.5.

Caveats:
- This is OpenAI's own published comparison. OpenAI notes evaluation results can vary by system prompts, tools, effort settings and harness.
- Price per token does not equal price per successful task across all workloads.
- Terminal-Bench Science task cost alone does not report the full quality story.

## 2. Anthropic — Claude Opus 5.5
https://www.anthropic.com/claude-opus-5-5

Used for:
- Claude Opus 5.5 standard API rates: $4 per million input tokens and $20 per million output tokens.
- Terminal-Bench 4.0: Anthropic reports 66.4% for Opus 5.5 and 57.9% for GPT-6 Astra. The comparison is included as a counterexample to universal-win messaging.

Caveats:
- Anthropic reports Opus 5.5 at xhigh effort and GPT-6 Astra at high effort for Terminal-Bench 4.0, and includes benchmark error ranges/limitations in the notes.
- The Terminal-Bench 4.0 counterexample is against GPT-6 Astra, not GPT-6.1 Sol.
- Anthropic also documents strengths of Opus 5.5 in long-running coding and professional work.

## Calculation shown in the video
The “76% lower reported task cost” figure is calculated from the published $5.47 and $23.21 task costs:
(23.21 - 5.47) / 23.21 = 0.7643, or 76.4%, rounded to 76%.

## Editorial rule
This demo intentionally makes a narrow case about price and selected evaluation costs, not a claim that GPT is always more intelligent than Claude Opus. Before publishing, re-check both primary source pages and date-stamp any revised figures.
