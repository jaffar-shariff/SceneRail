# Install Masteraiskill

Masteraiskill separates the **portable agent instructions** from the **video-production workspace**. Install the skills in your coding agent; use the repository when you need its renderer, templates, QA scripts, and sample project.

## Recommended: install for your AI coding agents

Requires Node.js and the Vercel Skills CLI through `npx`.

Install the full skill collection and choose the agent(s) interactively:

```bash
npx skills add jaffar-shariff/Masteraiskill
```

Install the complete skill collection to all agent types recognized by the CLI:

```bash
npx skills add jaffar-shariff/Masteraiskill --skill '*' --agent '*'
```

Install into specific agents (repeat `-a` for each target):

```bash
npx skills add jaffar-shariff/Masteraiskill --skill '*' -a claude-code -a codex -a antigravity
```

Add `-g` to install globally for your user instead of the current project. For a project install, commit the generated agent skill files only when you want the whole team to use them.

The installer supports many agent environments, and the supported list can change. See the [Skills CLI documentation](https://github.com/vercel-labs/skills) for current agents and options. Agent Skills are portable instructions; they do not force every host to expose the same tools or native-plugin features.

## Native Claude Code plugin

This repository includes a Claude Code plugin manifest and marketplace catalog.

```bash
claude plugin marketplace add jaffar-shariff/Masteraiskill
claude plugin install masteraiskill-video-studio@masteraiskill
```

If your Claude Code version uses different marketplace commands, run `claude plugin --help` and follow its current syntax.

## Use the actual video-production workspace

The skill instructions alone do not install the renderer, npm dependencies, FFmpeg, fonts, browser binaries, or external media services. For the included Remotion example and QA tools, clone the repository:

```bash
git clone https://github.com/jaffar-shariff/Masteraiskill.git
cd Masteraiskill
npm install
npm run studio
npm run render:sample
```

Use `PROMPT.md` to start a production task. Read `AGENTS.md` for repository-level rules. The sample is a renderer demonstration; it is not an automatic finished video for every arbitrary topic. A full production needs the research, script, scene plan, assets, rendering, and QA steps in the workflow.

## Install manually

- **Claude Code:** install via the marketplace commands above, or copy a skill folder into `~/.claude/skills/<skill-name>/` or `.claude/skills/<skill-name>/`.
- **Codex:** use the CLI above, or install skill folders under `~/.agents/skills/<skill-name>/` or `.agents/skills/<skill-name>/` in the workspace.
- **Google Antigravity App / IDE:** use the CLI above, or install in `.agents/skills/<skill-name>/` in the workspace or `~/.gemini/config/skills/<skill-name>/` globally.
- **Google Antigravity CLI:** use `.agents/skills/<skill-name>/` in the workspace or `~/.gemini/antigravity-cli/skills/<skill-name>/` globally. When supported by your installed CLI, its plugin installer can also install a bundle directly from a repository URL.
- **Other supported agents:** use `npx skills add` and select the agent identifier shown by the CLI. For unsupported hosts, copy the skill directory into the host's documented skill location and confirm that it supports the Agent Skills `SKILL.md` format.

## Troubleshooting

1. Restart or reload the agent after installation if the skill list has not refreshed.
2. Ask the agent to list the installed skills and verify that `masteraiskill-video-studio` is available.
3. For render problems, check `node --version`, `npm --version`, `ffmpeg -version`, and `ffprobe -version`; then run the relevant timeline and media QA commands.
4. Do not claim video rendering is configured just because the skill has installed successfully.
