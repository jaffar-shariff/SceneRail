import React, {type CSSProperties, type ReactNode} from "react";
import {
  AbsoluteFill,
  Audio,
  Composition,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type DemoProps = {
  videoTitle: string;
  narrationFile: string;
};

const C = {
  background: "#0b1017",
  panel: "#131d28",
  ink: "#f4f2eb",
  muted: "#a6b1bd",
  cyan: "#68e1fd",
  lime: "#d5fb67",
  orange: "#ff9d70",
  line: "#344454",
};

const FONT = "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
const BASE: CSSProperties = {fontFamily: FONT, color: C.ink, boxSizing: "border-box"};

const sceneOpacity = (frame: number, duration: number) =>
  interpolate(frame, [0, 18, Math.max(19, duration - 16), duration - 1], [0, 1, 1, 0.96], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const Eyebrow: React.FC<{children: ReactNode}> = ({children}) => (
  <div style={{...BASE, color: C.cyan, fontSize: 22, fontWeight: 750, letterSpacing: 5, textTransform: "uppercase"}}>
    {children}
  </div>
);

const SceneFrame: React.FC<{frame: number; duration: number; children: ReactNode}> = ({frame, duration, children}) => (
  <AbsoluteFill style={{backgroundColor: C.background, opacity: sceneOpacity(frame, duration), overflow: "hidden"}}>
    <AbsoluteFill style={{
      opacity: 0.26,
      backgroundImage: "linear-gradient(rgba(104,225,253,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(104,225,253,0.10) 1px, transparent 1px)",
      backgroundSize: "72px 72px",
      maskImage: "linear-gradient(to bottom right, black, transparent 85%)",
    }}/>
    {children}
  </AbsoluteFill>
);

const Opening: React.FC<{title: string}> = ({title}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame, fps, config: {damping: 18, stiffness: 110}});
  const shift = interpolate(enter, [0, 1], [70, 0]);
  return (
    <SceneFrame frame={frame} duration={150}>
      <div style={{...BASE, position: "absolute", left: 132, top: 152, right: 120}}>
        <Eyebrow>Masteraiskill · Render study 001</Eyebrow>
        <div style={{height: 46}}/>
        <div style={{fontSize: 90, lineHeight: 1.04, fontWeight: 850, letterSpacing: -4, maxWidth: 1300, transform: `translateY(${shift}px)`, opacity: enter}}>
          {title}
        </div>
        <div style={{marginTop: 35, fontSize: 32, lineHeight: 1.35, color: C.muted, maxWidth: 970, opacity: enter}}>
          A demonstration of narrative-led motion, data reveals, and deterministic video rendering.
        </div>
        <div style={{marginTop: 66, height: 5, width: 520, background: C.line, borderRadius: 5, overflow: "hidden"}}>
          <div style={{height: "100%", width: `${Math.min(100, frame / 90 * 100)}%`, background: C.lime}}/>
        </div>
      </div>
      <div style={{position: "absolute", right: 145, bottom: 150, width: 245, height: 245, border: `2px solid ${C.cyan}`, borderRadius: 34, transform: `rotate(${interpolate(frame, [0, 150], [-12, 8])}deg)`, opacity: 0.9}}>
        <div style={{position: "absolute", left: 28, top: 28, right: 28, bottom: 28, borderRadius: 24, background: "linear-gradient(145deg, rgba(104,225,253,.26), rgba(213,251,103,.05))"}}/>
        <div style={{position: "absolute", left: 55, top: 56, width: 44, height: 44, borderRadius: "50%", background: C.lime}}/>
        <div style={{position: "absolute", right: 40, bottom: 44, width: 64, height: 64, border: `4px solid ${C.cyan}`, borderRadius: 14}}/>
      </div>
    </SceneFrame>
  );
};

const Mechanism: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const intro = spring({frame, fps, config: {damping: 20, stiffness: 100}});
  const nodes = [
    {x: 100, title: "INPUT", note: "A question", color: C.cyan},
    {x: 500, title: "MECHANISM", note: "What changes", color: C.lime},
    {x: 900, title: "OUTCOME", note: "Why it matters", color: C.orange},
  ];
  return (
    <SceneFrame frame={frame} duration={240}>
      <div style={{...BASE, position: "absolute", left: 126, top: 100}}>
        <Eyebrow>02 / Make the mechanism visible</Eyebrow>
        <div style={{fontSize: 64, fontWeight: 800, marginTop: 24, letterSpacing: -2}}>Every scene should explain one thing.</div>
      </div>
      <svg viewBox="0 0 1200 250" style={{position: "absolute", left: 130, top: 365, width: 1200, height: 250}}>
        {nodes.slice(0, 2).map((node, i) => {
          const progress = interpolate(frame, [40 + i * 38, 82 + i * 38], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
          return <path key={node.title} d={`M ${node.x + 220} 126 L ${node.x + 370} 126`} stroke={C.cyan} strokeWidth="4" strokeLinecap="round" strokeDasharray="150" strokeDashoffset={150 * (1-progress)} fill="none"/>;
        })}
      </svg>
      {nodes.map((node, i) => {
        const s = spring({frame: frame - (18 + i * 34), fps, config: {damping: 15, stiffness: 120}});
        return (
          <div key={node.title} style={{
            ...BASE, position: "absolute", left: 130 + i * 400, top: 400,
            width: 300, height: 190, border: `2px solid ${node.color}`, borderRadius: 22,
            background: C.panel, padding: 28, opacity: Math.max(0, s),
            transform: `translateY(${interpolate(s, [0, 1], [24, 0])}px) scale(${interpolate(s, [0, 1], [.96, 1])})`,
            boxShadow: `0 20px 70px rgba(0,0,0,.22)`,
          }}>
            <div style={{color: node.color, fontSize: 21, fontWeight: 800, letterSpacing: 3}}>{node.title}</div>
            <div style={{fontSize: 31, fontWeight: 750, marginTop: 24}}>{node.note}</div>
            <div style={{height: 4, width: 94, background: node.color, marginTop: 28, borderRadius: 4}}/>
          </div>
        );
      })}
      <div style={{...BASE, position: "absolute", left: 132, bottom: 90, fontSize: 24, color: C.muted}}>Reveal the parts first. Connect them second. Label them when the viewer is ready.</div>
    </SceneFrame>
  );
};

const DataReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const bars = [
    {label: "A", value: 42, color: C.cyan},
    {label: "B", value: 68, color: C.lime},
    {label: "C", value: 54, color: C.orange},
    {label: "D", value: 88, color: C.cyan},
    {label: "E", value: 74, color: C.lime},
  ];
  return (
    <SceneFrame frame={frame} duration={240}>
      <div style={{...BASE, position: "absolute", left: 126, top: 100}}>
        <Eyebrow>03 / Data with a job to do</Eyebrow>
        <div style={{fontSize: 64, fontWeight: 800, marginTop: 24, letterSpacing: -2}}>Show the comparison, not decoration.</div>
        <div style={{fontSize: 27, marginTop: 18, color: C.muted}}>Illustrative values only — replace with researched data in a real video.</div>
      </div>
      <div style={{position: "absolute", left: 165, top: 360, width: 1100, height: 365, borderLeft: `2px solid ${C.line}`, borderBottom: `2px solid ${C.line}`, display: "flex", alignItems: "end", justifyContent: "space-around", padding: "0 40px"}}>
        {bars.map((bar, index) => {
          const growth = interpolate(frame, [22 + index * 16, 78 + index * 16], [0, bar.value], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
          return (
            <div key={bar.label} style={{width: 125, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "end"}}>
              <div style={{fontFamily: FONT, fontSize: 31, fontWeight: 800, marginBottom: 14, color: bar.color}}>{Math.round(growth)}</div>
              <div style={{width: 96, height: growth * 3.1, minHeight: 2, background: `linear-gradient(180deg, ${bar.color}, ${bar.color}55)`, borderRadius: "12px 12px 0 0"}}/>
              <div style={{fontFamily: FONT, color: C.muted, fontSize: 24, marginTop: 14}}>{bar.label}</div>
            </div>
          );
        })}
      </div>
      <div style={{...BASE, position: "absolute", right: 140, bottom: 72, fontSize: 21, color: C.muted}}>A real chart must use verified values, units, scales and sources.</div>
    </SceneFrame>
  );
};

const Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const scale = spring({frame, fps: 30, config: {damping: 18, stiffness: 100}});
  return (
    <SceneFrame frame={frame} duration={150}>
      <div style={{...BASE, position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: 100}}>
        <Eyebrow>Built to be checked</Eyebrow>
        <div style={{fontSize: 84, lineHeight: 1.02, letterSpacing: -4, fontWeight: 850, marginTop: 32, maxWidth: 1250, transform: `scale(${scale})`}}>Render. Inspect. Improve. Deliver.</div>
        <div style={{fontSize: 31, color: C.muted, marginTop: 30}}>Masteraiskill · deterministic video workflow</div>
        <div style={{marginTop: 58, padding: "18px 34px", borderRadius: 999, background: C.lime, color: C.background, fontSize: 23, fontWeight: 850}}>FINAL MP4 FIRST</div>
      </div>
    </SceneFrame>
  );
};

const MasteraiskillDemo: React.FC<DemoProps> = ({videoTitle, narrationFile}) => {
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill style={{backgroundColor: C.background}}>
      <Sequence from={0} durationInFrames={150}><Opening title={videoTitle}/></Sequence>
      <Sequence from={120} durationInFrames={240}><Mechanism/></Sequence>
      <Sequence from={330} durationInFrames={240}><DataReveal/></Sequence>
      <Sequence from={540} durationInFrames={240}><Closing/></Sequence>
      {narrationFile ? <Audio src={staticFile(narrationFile)} volume={1} /> : null}
      <AbsoluteFill style={{top: "auto", bottom: 26, left: 48, right: 48, height: 3, background: "#ffffff22"}}>
        <div style={{height: "100%", width: "100%", background: C.cyan, transformOrigin: "left", transform: `scaleX(${interpolate(useCurrentFrame(), [0, 899], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"})})`}}/>
      </AbsoluteFill>
      <div style={{...BASE, position: "absolute", right: 50, top: 30, fontSize: 15, color: "#c6d2dc", letterSpacing: 2}}>MASTERAI / {fps} FPS</div>
    </AbsoluteFill>
  );
};

export const Root: React.FC = () => (
  <>
    <Composition
      id="MasteraiskillDemo"
      component={MasteraiskillDemo}
      durationInFrames={900}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{videoTitle: "THE INVISIBLE ENGINE", narrationFile: ""}}
    />
  </>
);
