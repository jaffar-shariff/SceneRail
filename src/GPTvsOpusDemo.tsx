import React, {type CSSProperties, type ReactNode} from "react";
import {
  AbsoluteFill,
  Composition,
  interpolate,
  spring,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const K = {
  bg: "#101720",
  panel: "#172331",
  panelDeep: "#111c28",
  border: "#344859",
  ink: "#f4f7fb",
  muted: "#a8b8c8",
  dim: "#74899d",
  cyan: "#72d6ef",
  teal: "#62e1c5",
  purple: "#b19aff",
  amber: "#f4bc72",
  coral: "#ff8e83",
  green: "#73e1ad",
};
const FONT = "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
const BASE: CSSProperties = {fontFamily: FONT, boxSizing: "border-box", color: K.ink};
const SHADOW = "0 20px 60px rgba(0,0,0,.24)";

const riseIn = (frame: number, fps: number, delay = 0) => {
  const progress = spring({frame: frame - delay, fps, config: {damping: 18, stiffness: 115}});
  return {opacity: Math.max(0, progress), transform: "translateY(" + interpolate(progress, [0, 1], [24, 0]) + "px)"};
};

const Pill: React.FC<{children: ReactNode; color?: string}> = ({children, color = K.cyan}) => (
  <div style={{...BASE, display: "inline-flex", alignItems: "center", gap: 10, padding: "10px 16px", border: "1px solid " + color + "66", background: color + "16", borderRadius: 999, fontSize: 17, fontWeight: 700, letterSpacing: .3, whiteSpace: "nowrap"}}>
    <span style={{display: "inline-block", width: 7, height: 7, background: color, borderRadius: 99}} />
    {children}
  </div>
);

const TopChrome: React.FC<{scene: string; index: string; source?: string; children: ReactNode}> = ({scene, index, source, children}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 10], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  return (
    <AbsoluteFill style={{backgroundColor: K.bg, opacity, overflow: "hidden"}}>
      <AbsoluteFill style={{backgroundImage: "linear-gradient(rgba(114,214,239,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(114,214,239,.055) 1px, transparent 1px)", backgroundSize: "48px 48px", opacity: .6}} />
      <AbsoluteFill style={{background: "radial-gradient(ellipse at 85% 8%, rgba(177,154,255,.10), transparent 38%), radial-gradient(ellipse at 0% 95%, rgba(98,225,197,.07), transparent 42%)"}} />
      <div style={{...BASE, position: "absolute", left: 70, right: 70, top: 35, height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid " + K.border, paddingBottom: 16}}>
        <div style={{display: "flex", alignItems: "center", gap: 14}}>
          <div style={{width: 32, height: 32, borderRadius: 9, border: "2px solid " + K.teal, display: "grid", placeItems: "center", color: K.teal, fontSize: 17, fontWeight: 900}}>S</div>
          <div style={{fontSize: 21, fontWeight: 800, letterSpacing: .3}}>SceneRail <span style={{color: K.dim, fontWeight: 500}}>/ Interface Theatre</span></div>
        </div>
        <div style={{display: "flex", alignItems: "center", gap: 16}}>
          <span style={{fontSize: 14, letterSpacing: 2, color: K.dim, fontWeight: 800}}>MODEL FIELD NOTES</span>
          <span style={{fontSize: 15, color: K.ink, background: K.panel, border: "1px solid " + K.border, padding: "7px 12px", borderRadius: 8}}>{index} / 06</span>
        </div>
      </div>
      <div style={{...BASE, position: "absolute", left: 72, right: 72, top: 112, bottom: 78}}>
        {children}
      </div>
      <div style={{...BASE, position: "absolute", left: 72, right: 72, bottom: 30, display: "flex", alignItems: "center", justifyContent: "space-between", color: K.dim, fontSize: 13, letterSpacing: .45}}>
        <span>GPT-6.1 SOL  ×  CLAUDE OPUS 5.5</span>
        <span>{source || "Vendor-reported evaluations · Results depend on task and setup"}</span>
      </div>
    </AbsoluteFill>
  );
};

const SectionHead: React.FC<{eyebrow: string; title: string; subtitle?: string}> = ({eyebrow, title, subtitle}) => (
  <div style={{...BASE, marginBottom: 32}}>
    <div style={{fontSize: 17, color: K.teal, fontWeight: 850, letterSpacing: 3, marginBottom: 15}}>{eyebrow.toUpperCase()}</div>
    <div style={{fontSize: 54, lineHeight: 1.08, letterSpacing: -1.8, fontWeight: 850, maxWidth: 1500}}>{title}</div>
    {subtitle ? <div style={{fontSize: 24, lineHeight: 1.4, color: K.muted, marginTop: 15, maxWidth: 1450}}>{subtitle}</div> : null}
  </div>
);

const ModelCard: React.FC<{name: string; sub: string; accent: string; children: ReactNode}> = ({name, sub, accent, children}) => (
  <div style={{...BASE, flex: 1, minWidth: 0, border: "1px solid " + accent + "77", background: "linear-gradient(145deg, " + accent + "13, " + K.panel + " 45%)", borderRadius: 20, padding: 28, boxShadow: SHADOW, position: "relative"}}>
    <div style={{position: "absolute", left: 0, top: 22, bottom: 22, width: 4, borderRadius: "0 4px 4px 0", background: accent}} />
    <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18, gap: 12}}>
      <div>
        <div style={{fontSize: 25, fontWeight: 850}}>{name}</div>
        <div style={{fontSize: 16, color: K.muted, marginTop: 5}}>{sub}</div>
      </div>
      <div style={{width: 14, height: 14, borderRadius: 50, background: accent, boxShadow: "0 0 24px " + accent + "88"}} />
    </div>
    {children}
  </div>
);

const BigNumber: React.FC<{value: string; label: string; accent: string}> = ({value, label, accent}) => (
  <div>
    <div style={{fontSize: 57, lineHeight: 1.02, fontWeight: 900, letterSpacing: -2, color: accent}}>{value}</div>
    <div style={{fontSize: 19, color: K.muted, marginTop: 9}}>{label}</div>
  </div>
);

const HeroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const hero = riseIn(frame, fps, 8);
  const cards = riseIn(frame, fps, 22);
  return (
    <TopChrome scene="opening" index="01">
      <div style={{...BASE, ...hero, position: "absolute", top: 70, left: 12, right: 12}}>
        <div style={{fontSize: 18, color: K.teal, letterSpacing: 3.6, fontWeight: 850}}>THE PRACTICAL COMPARISON</div>
        <div style={{fontSize: 104, fontWeight: 950, lineHeight: .98, letterSpacing: -5, marginTop: 18}}>GPT vs <span style={{color: K.purple}}>OPUS</span></div>
        <div style={{fontSize: 35, fontWeight: 650, marginTop: 22, color: K.ink}}>Where GPT-6.1 Sol has the edge — and where it doesn't.</div>
        <div style={{fontSize: 22, marginTop: 15, color: K.muted}}>A source-led look at price, workflow results, and one important counterexample.</div>
      </div>
      <div style={{...cards, position: "absolute", top: 378, left: 12, right: 12, display: "flex", gap: 24}}>
        <ModelCard name="GPT-6.1 Sol" sub="OpenAI · standard API pricing" accent={K.teal}>
          <div style={{display: "flex", alignItems: "baseline", gap: 9}}><span style={{fontSize: 45, fontWeight: 900}}>$2</span><span style={{color: K.muted, fontSize: 18}}>input / 1M</span></div>
          <div style={{height: 1, background: K.border, margin: "12px 0"}} />
          <div style={{display: "flex", alignItems: "baseline", gap: 9}}><span style={{fontSize: 33, fontWeight: 850, color: K.teal}}>$10</span><span style={{color: K.muted, fontSize: 18}}>output / 1M</span></div>
        </ModelCard>
        <ModelCard name="Claude Opus 5.5" sub="Anthropic · standard API pricing" accent={K.purple}>
          <div style={{display: "flex", alignItems: "baseline", gap: 9}}><span style={{fontSize: 45, fontWeight: 900}}>$4</span><span style={{color: K.muted, fontSize: 18}}>input / 1M</span></div>
          <div style={{height: 1, background: K.border, margin: "12px 0"}} />
          <div style={{display: "flex", alignItems: "baseline", gap: 9}}><span style={{fontSize: 33, fontWeight: 850, color: K.purple}}>$20</span><span style={{color: K.muted, fontSize: 18}}>output / 1M</span></div>
        </ModelCard>
      </div>
      <div style={{position: "absolute", bottom: 10, left: 14, right: 14, display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <Pill color={K.amber}>Sticker price is not total task cost</Pill>
        <div style={{...BASE, color: K.dim, fontSize: 16}}>Standard rates per million tokens · caching and special modes excluded</div>
      </div>
    </TopChrome>
  );
};

const PriceScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const intro = riseIn(frame, fps, 5);
  const bar = interpolate(frame, [18, 68], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  return (
    <TopChrome scene="price" index="02" source="Sources: OpenAI GPT-6.1 Sol · Anthropic Claude Opus 5.5">
      <div style={intro}><SectionHead eyebrow="01 / Listed API rates" title="Same token. Half the listed price." subtitle="Compare standard input and output rates per one million tokens—not the total cost of every task."/></div>
      <div style={{display: "flex", gap: 26, marginTop: 18}}>
        <ModelCard name="GPT-6.1 Sol" sub="Standard API rate" accent={K.teal}>
          <div style={{marginTop: 8}}>
            <div style={{display: "flex", justifyContent: "space-between", fontSize: 19, marginBottom: 10}}><span>Input</span><b>$2.00</b></div>
            <div style={{height: 16, background: "#263643", borderRadius: 5, overflow: "hidden"}}><div style={{height: "100%", width: (22 * bar) + "%", background: K.teal, borderRadius: 5}} /></div>
          </div>
          <div style={{marginTop: 28}}>
            <div style={{display: "flex", justifyContent: "space-between", fontSize: 19, marginBottom: 10}}><span>Output</span><b>$10.00</b></div>
            <div style={{height: 16, background: "#263643", borderRadius: 5, overflow: "hidden"}}><div style={{height: "100%", width: (50 * bar) + "%", background: K.teal, borderRadius: 5}} /></div>
          </div>
          <div style={{fontSize: 16, color: K.dim, marginTop: 25}}>Prices for prompts within the listed standard pricing tier.</div>
        </ModelCard>
        <ModelCard name="Claude Opus 5.5" sub="Standard API rate" accent={K.purple}>
          <div style={{marginTop: 8}}>
            <div style={{display: "flex", justifyContent: "space-between", fontSize: 19, marginBottom: 10}}><span>Input</span><b>$4.00</b></div>
            <div style={{height: 16, background: "#263643", borderRadius: 5, overflow: "hidden"}}><div style={{height: "100%", width: (44 * bar) + "%", background: K.purple, borderRadius: 5}} /></div>
          </div>
          <div style={{marginTop: 28}}>
            <div style={{display: "flex", justifyContent: "space-between", fontSize: 19, marginBottom: 10}}><span>Output</span><b>$20.00</b></div>
            <div style={{height: 16, background: "#263643", borderRadius: 5, overflow: "hidden"}}><div style={{height: "100%", width: (100 * bar) + "%", background: K.purple, borderRadius: 5}} /></div>
          </div>
          <div style={{fontSize: 16, color: K.dim, marginTop: 25}}>Cache reads, fast modes, and workload shape change the final bill.</div>
        </ModelCard>
      </div>
      <div style={{position: "absolute", bottom: 7, left: 0, right: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 18}}>
        <Pill color={K.teal}>50% lower standard input rate</Pill>
        <Pill color={K.teal}>50% lower standard output rate</Pill>
      </div>
    </TopChrome>
  );
};

const AutomationScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const intro = riseIn(frame, fps, 5);
  const meter = interpolate(frame, [18, 75], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  return (
    <TopChrome scene="automation" index="03" source="Source: OpenAI, Introducing GPT-6.1 Sol (vendor-reported)">
      <div style={intro}><SectionHead eyebrow="02 / Selected workflow evidence" title="A measured edge on one business-workflow test." subtitle="OpenAI reports GPT-6.1 Sol ahead of Claude Opus 5.5 on AutomationBench at medium reasoning effort."/></div>
      <div style={{display: "flex", gap: 24, alignItems: "stretch", marginTop: 30}}>
        <div style={{...BASE, width: "42%", background: K.panel, border: "1px solid " + K.border, borderRadius: 20, padding: 32, boxShadow: SHADOW}}>
          <div style={{fontSize: 17, color: K.dim, fontWeight: 850, letterSpacing: 2}}>REPORTED DIFFERENCE</div>
          <div style={{fontSize: 100, fontWeight: 950, letterSpacing: -4, color: K.teal, marginTop: 22}}>+2.2<span style={{fontSize: 45}}> pp</span></div>
          <div style={{fontSize: 23, fontWeight: 750, marginTop: 8}}>GPT-6.1 Sol over Opus 5.5</div>
          <div style={{fontSize: 17, color: K.muted, marginTop: 12}}>Percentage-point difference at medium reasoning, as reported by OpenAI.</div>
        </div>
        <div style={{...BASE, flex: 1, background: K.panel, border: "1px solid " + K.border, borderRadius: 20, padding: 32, boxShadow: SHADOW}}>
          <div style={{fontSize: 17, color: K.dim, fontWeight: 850, letterSpacing: 2}}>REPORTED COST PER TASK</div>
          <div style={{marginTop: 30, display: "flex", flexDirection: "column", gap: 26}}>
            <div>
              <div style={{display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 20}}><b>GPT-6.1 Sol</b><span style={{color: K.teal}}>Lower</span></div>
              <div style={{height: 24, background: "#293846", borderRadius: 5, overflow: "hidden"}}><div style={{width: (34 * meter) + "%", height: "100%", background: K.teal, borderRadius: 5}} /></div>
            </div>
            <div>
              <div style={{display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 20}}><b>Claude Opus 5.5</b><span style={{color: K.purple}}>Reference</span></div>
              <div style={{height: 24, background: "#293846", borderRadius: 5, overflow: "hidden"}}><div style={{width: (100 * meter) + "%", height: "100%", background: K.purple, borderRadius: 5}} /></div>
            </div>
          </div>
          <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 34, gap: 16}}>
            <Pill color={K.teal}>About one-third the reported cost</Pill>
            <span style={{fontSize: 15, color: K.dim}}>Vendor comparison; not a universal guarantee.</span>
          </div>
        </div>
      </div>
      <div style={{...BASE, position: "absolute", left: 3, bottom: 4, fontSize: 16, color: K.muted}}>AutomationBench measures multi-step business workflows. Results depend on task set, reasoning effort, and fallback handling.</div>
    </TopChrome>
  );
};

const ScienceCostScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const intro = riseIn(frame, fps, 6);
  const progress = interpolate(frame, [14, 80], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const solHeight = 270 * (5.47 / 23.21) * progress;
  const opusHeight = 270 * progress;
  return (
    <TopChrome scene="science-cost" index="04" source="Source: OpenAI, Terminal-Bench Science 0.1 cost/task note">
      <div style={intro}><SectionHead eyebrow="03 / Cost of a research task" title="The cost gap widens on a science-workflow evaluation." subtitle="Reported average cost per task at maximum reasoning effort."/></div>
      <div style={{...BASE, position: "absolute", left: 34, right: 34, top: 290, bottom: 45, border: "1px solid " + K.border, background: "linear-gradient(135deg, " + K.panel + ", " + K.panelDeep + ")", borderRadius: 22, padding: "28px 36px", boxShadow: SHADOW}}>
        <div style={{display: "flex", alignItems: "center", gap: 24, height: "100%"}}>
          <div style={{width: "28%", display: "flex", flexDirection: "column", gap: 20}}>
            <div style={{fontSize: 16, letterSpacing: 2.2, color: K.dim, fontWeight: 850}}>REPORTED COST / TASK</div>
            <div style={{fontSize: 81, lineHeight: 1, letterSpacing: -3, fontWeight: 950, color: K.teal}}>−76%</div>
            <div style={{fontSize: 22, fontWeight: 750}}>Lower cost for GPT-6.1 Sol</div>
            <div style={{fontSize: 17, color: K.muted, lineHeight: 1.45}}>Calculated from the two published task-cost figures. Cost is not itself a quality score.</div>
          </div>
          <div style={{width: 1, height: "82%", background: K.border}} />
          <div style={{flex: 1, display: "flex", alignItems: "end", justifyContent: "space-evenly", height: 390, padding: "0 24px"}}>
            <div style={{height: "100%", display: "flex", flexDirection: "column", justifyContent: "end", alignItems: "center", width: 260}}>
              <div style={{fontSize: 35, fontWeight: 900, color: K.teal, marginBottom: 12}}>$5.47</div>
              <div style={{width: 156, height: solHeight, minHeight: 1, background: "linear-gradient(180deg, " + K.teal + ", #2f8d86)", borderRadius: "12px 12px 0 0", boxShadow: "0 0 34px rgba(98,225,197,.15)"}} />
              <div style={{fontSize: 21, fontWeight: 800, marginTop: 16}}>GPT-6.1 Sol</div>
            </div>
            <div style={{height: "100%", display: "flex", flexDirection: "column", justifyContent: "end", alignItems: "center", width: 260}}>
              <div style={{fontSize: 35, fontWeight: 900, color: K.purple, marginBottom: 12}}>$23.21</div>
              <div style={{width: 156, height: opusHeight, minHeight: 1, background: "linear-gradient(180deg, " + K.purple + ", #67539d)", borderRadius: "12px 12px 0 0", boxShadow: "0 0 34px rgba(177,154,255,.13)"}} />
              <div style={{fontSize: 21, fontWeight: 800, marginTop: 16}}>Claude Opus 5.5</div>
            </div>
          </div>
        </div>
      </div>
      <div style={{...BASE, position: "absolute", left: 40, bottom: 0, fontSize: 15, color: K.dim}}>Terminal-Bench Science 0.1 · Maximum effort · OpenAI-published cost comparison. Scores and evaluation conditions matter too.</div>
    </TopChrome>
  );
};

const CounterexampleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const intro = riseIn(frame, fps, 4);
  const progress = interpolate(frame, [18, 75], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  return (
    <TopChrome scene="counterexample" index="05" source="Source: Anthropic, Claude Opus 5.5 benchmark notes">
      <div style={intro}><SectionHead eyebrow="04 / The important counterexample" title="Opus still leads on some coding benchmarks." subtitle="Anthropic reports these Terminal-Bench 4.0 results — so a blanket “GPT is better” claim does not hold."/></div>
      <div style={{...BASE, position: "absolute", left: 20, right: 20, top: 300, bottom: 65, display: "flex", gap: 26}}>
        <div style={{...BASE, flex: 1, background: K.panel, border: "1px solid " + K.purple + "77", borderRadius: 20, padding: 30}}>
          <div style={{fontSize: 18, color: K.dim, fontWeight: 850, letterSpacing: 2}}>TERMINAL-BENCH 4.0</div>
          <div style={{display: "flex", alignItems: "center", gap: 30, marginTop: 28}}>
            <div style={{width: 205, fontSize: 22, fontWeight: 850}}>Claude Opus 5.5</div>
            <div style={{flex: 1, height: 34, background: "#263642", borderRadius: 6, overflow: "hidden"}}><div style={{width: (66.4 / 75 * 100 * progress) + "%", height: "100%", background: K.purple, borderRadius: 6}} /></div>
            <div style={{width: 110, fontSize: 34, fontWeight: 900, color: K.purple}}>66.4%</div>
          </div>
          <div style={{display: "flex", alignItems: "center", gap: 30, marginTop: 22}}>
            <div style={{width: 205, fontSize: 22, fontWeight: 850}}>GPT-6 Astra</div>
            <div style={{flex: 1, height: 34, background: "#263642", borderRadius: 6, overflow: "hidden"}}><div style={{width: (57.9 / 75 * 100 * progress) + "%", height: "100%", background: K.cyan, borderRadius: 6}} /></div>
            <div style={{width: 110, fontSize: 34, fontWeight: 900, color: K.cyan}}>57.9%</div>
          </div>
          <div style={{marginTop: 32, padding: 19, border: "1px solid " + K.border, borderRadius: 12, color: K.muted, fontSize: 17, lineHeight: 1.45}}>
            Different effort settings: Opus 5.5 at xhigh; GPT-6 Astra at high. These are vendor-reported figures, not a matched test of GPT-6.1 Sol.
          </div>
        </div>
        <div style={{...BASE, width: 360, background: "linear-gradient(145deg, " + K.purple + "1a, " + K.panel + ")", border: "1px solid " + K.purple + "66", borderRadius: 20, padding: 30, display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
          <div>
            <div style={{fontSize: 16, color: K.purple, fontWeight: 850, letterSpacing: 2}}>WHAT THIS MEANS</div>
            <div style={{fontSize: 33, lineHeight: 1.15, fontWeight: 850, marginTop: 24}}>A benchmark is a slice, not the whole model.</div>
          </div>
          <div style={{fontSize: 19, color: K.muted, lineHeight: 1.5}}>Tooling, effort, task mix, safeguards and scoring rules can change the result.</div>
        </div>
      </div>
    </TopChrome>
  );
};

const CloseScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const intro = riseIn(frame, fps, 4);
  const takeaway = riseIn(frame, fps, 20);
  return (
    <TopChrome scene="close" index="06" source="Sources linked in the SceneRail demo project">
      <div style={{...BASE, ...intro, position: "absolute", top: 30, left: 15, right: 15}}>
        <div style={{fontSize: 17, color: K.teal, fontWeight: 850, letterSpacing: 3}}>THE FAIR VERDICT</div>
        <div style={{fontSize: 66, lineHeight: 1.04, fontWeight: 950, letterSpacing: -2.3, marginTop: 20, maxWidth: 1500}}>GPT's edge is value on selected work — not universal superiority.</div>
      </div>
      <div style={{...takeaway, position: "absolute", top: 250, left: 15, right: 15, display: "flex", gap: 22}}>
        <div style={{...BASE, flex: 1, border: "1px solid " + K.teal + "70", background: K.teal + "10", borderRadius: 16, padding: 25}}>
          <div style={{fontSize: 15, color: K.teal, fontWeight: 850, letterSpacing: 2}}>GPT-6.1 SOL</div>
          <div style={{fontSize: 27, fontWeight: 850, marginTop: 16}}>Lower standard token rates</div>
          <div style={{fontSize: 19, color: K.muted, lineHeight: 1.4, marginTop: 10}}>Reported task-cost advantages on selected workflow evaluations.</div>
        </div>
        <div style={{...BASE, flex: 1, border: "1px solid " + K.purple + "70", background: K.purple + "10", borderRadius: 16, padding: 25}}>
          <div style={{fontSize: 15, color: K.purple, fontWeight: 850, letterSpacing: 2}}>CLAUDE OPUS 5.5</div>
          <div style={{fontSize: 27, fontWeight: 850, marginTop: 16}}>Strong coding performance</div>
          <div style={{fontSize: 19, color: K.muted, lineHeight: 1.4, marginTop: 10}}>Leads the cited Terminal-Bench 4.0 comparison under the reported settings.</div>
        </div>
      </div>
      <div style={{...BASE, ...riseIn(frame, fps, 45), position: "absolute", left: 15, right: 15, top: 510, borderRadius: 16, border: "1px solid " + K.border, background: K.panelDeep, padding: "23px 28px", display: "flex", alignItems: "center", gap: 24}}>
        <div style={{fontSize: 17, color: K.amber, fontWeight: 900, letterSpacing: 1.7}}>THE RULE</div>
        <div style={{fontSize: 26, fontWeight: 750}}>Test both on your own tasks. Track quality, time, and total cost.</div>
      </div>
      <div style={{...BASE, ...riseIn(frame, fps, 65), position: "absolute", left: 16, right: 16, bottom: 30, borderTop: "1px solid " + K.border, paddingTop: 16, fontSize: 14, lineHeight: 1.45, color: K.muted}}>
        Sources: openai.com/index/introducing-gpt-6-1-sol/ · anthropic.com/claude-opus-5-5 · Published results can differ by setup. See sources.md for notes.
      </div>
    </TopChrome>
  );
};

export const GPTvsOpusDemo: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: K.bg}}>
    <Sequence from={0} durationInFrames={180}><HeroScene /></Sequence>
    <Sequence from={180} durationInFrames={240}><PriceScene /></Sequence>
    <Sequence from={420} durationInFrames={240}><AutomationScene /></Sequence>
    <Sequence from={660} durationInFrames={270}><ScienceCostScene /></Sequence>
    <Sequence from={930} durationInFrames={210}><CounterexampleScene /></Sequence>
    <Sequence from={1140} durationInFrames={210}><CloseScene /></Sequence>
  </AbsoluteFill>
);

export const GPTvsOpusComposition: React.FC = () => (
  <Composition
    id="GPTvsOpusInterfaceTheatre"
    component={GPTvsOpusDemo}
    durationInFrames={1350}
    fps={30}
    width={1920}
    height={1080}
  />
);
