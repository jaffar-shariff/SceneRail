import React, {type CSSProperties, type ReactNode} from "react";
import {AbsoluteFill, Composition, interpolate, spring, Sequence, useCurrentFrame, useVideoConfig} from "remotion";

/* Interface Theatre motion pass: frame-deterministic, original vector/UI art. */
const K={bg:"#07111d",panel:"#102030",line:"#2a4358",ink:"#f4f7fb",muted:"#a8bbcd",dim:"#6d879f",teal:"#5fe3c7",cyan:"#69d5fa",purple:"#b99aff",amber:"#ffc879",coral:"#ff8a87"};
const FONT="Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
const BASE:CSSProperties={fontFamily:FONT,boxSizing:"border-box",color:K.ink};
const CLAMP={extrapolateLeft:"clamp" as const,extrapolateRight:"clamp" as const};
const enter=(f:number,fps:number,d=0)=>spring({frame:f-d,fps,config:{damping:17,stiffness:108,mass:.85}});
const prog=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],CLAMP);

const Backdrop:React.FC<{frame:number}> = ({frame}) => {
 const shift=(frame*.32)%48;
 return <AbsoluteFill style={{overflow:"hidden",pointerEvents:"none"}}>
  <div style={{position:"absolute",inset:-60,backgroundImage:"linear-gradient(rgba(105,213,250,.065) 1px, transparent 1px),linear-gradient(90deg, rgba(105,213,250,.065) 1px, transparent 1px)",backgroundSize:"48px 48px",backgroundPosition:shift+"px "+(shift*.55)+"px",opacity:.62}}/>
  <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 78% 12%, rgba(185,154,255,.13), transparent 39%), radial-gradient(ellipse at 12% 91%, rgba(95,227,199,.09), transparent 42%)"}}/>
  {Array.from({length:20},(_,i)=>{const x=(i*137+frame*(.35+(i%3)*.13))%2020-50,y=(i*83+Math.sin(frame*.026+i)*35+frame*.12)%950+65,c=i%2?K.cyan:K.teal;return <div key={i} style={{position:"absolute",left:x,top:y,width:2+(i%3),height:2+(i%3),borderRadius:9,background:c,opacity:.17+(i%4)*.08,boxShadow:"0 0 12px "+c}}/>;})}
 </AbsoluteFill>;
};

const Shell:React.FC<{index:string;section:string;source:string;duration:number;children:ReactNode}> = ({index,section,source,duration,children}) => {
 const f=useCurrentFrame();
 return <AbsoluteFill style={{background:K.bg,overflow:"hidden"}}>
  <Backdrop frame={f}/>
  <div style={{...BASE,position:"absolute",top:27,left:76,right:76,height:49,display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid "+K.line,paddingBottom:13}}>
   <div style={{display:"flex",alignItems:"center",gap:12}}>
    <svg width="33" height="33" viewBox="0 0 33 33"><path d="M5 4 L28 16.5 L5 29 Z" fill="none" stroke={K.teal} strokeWidth="2.8" strokeLinejoin="round"/><path d="M12 10 L22 16.5 L12 23 Z" fill={K.cyan}/></svg>
    <span style={{fontSize:20,fontWeight:850,letterSpacing:-.3}}>SceneRail <span style={{fontWeight:500,color:K.dim}}>/ Interface Theatre</span></span>
   </div>
   <div style={{display:"flex",alignItems:"center",gap:15}}><span style={{fontSize:12,letterSpacing:2.5,color:K.dim,fontWeight:850}}>MODEL FIELD NOTES</span><span style={{fontSize:14,background:K.panel,border:"1px solid "+K.line,padding:"7px 11px",borderRadius:7}}>{index} / 06</span></div>
  </div>
  {children}
  <div style={{position:"absolute",left:76,right:76,bottom:29,height:2,background:"#253748",overflow:"hidden"}}><div style={{height:"100%",width:(Math.min(1,f/Math.max(1,duration-1))*100)+"%",background:"linear-gradient(90deg, "+K.teal+", "+K.cyan+", "+K.purple+")"}}/></div>
  <div style={{...BASE,position:"absolute",left:78,right:78,bottom:39,display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:12,color:K.dim,letterSpacing:.2}}><span>GPT-6.1 SOL × CLAUDE OPUS 5.5</span><span>{source}</span></div>
 </AbsoluteFill>;
};

const Heading:React.FC<{kicker:string;title:string;subtitle?:string;size?:number}> = ({kicker,title,subtitle,size=53}) => <div style={{...BASE}}>
 <div style={{fontSize:15,fontWeight:900,letterSpacing:3.1,color:K.teal,marginBottom:16}}>{kicker.toUpperCase()}</div>
 <div style={{fontSize:size,lineHeight:1.07,fontWeight:880,letterSpacing:-1.7,maxWidth:1510}}>{title}</div>
 {subtitle?<div style={{fontSize:22,lineHeight:1.4,color:K.muted,marginTop:15,maxWidth:1410}}>{subtitle}</div>:null}
</div>;

const Corner:React.FC<{color:string}> = ({color})=><svg width="30" height="30" viewBox="0 0 30 30"><path d="M2 13 V2 H13 M17 2 H28 V13 M28 17 V28 H17 M13 28 H2 V17" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round"/></svg>;

const Hero:React.FC=()=>{
 const f=useCurrentFrame(),{fps}=useVideoConfig(),h=enter(f,fps,4),a=enter(f,fps,14),b=enter(f,fps,26),orbit=prog(f,72,138);
 return <Shell index="01" section="Question" source="A fair comparison starts by defining the task." duration={180}>
  <div style={{...BASE,position:"absolute",left:92,top:148,width:880,opacity:Math.max(0,h),transform:"translateY("+interpolate(h,[0,1],[32,0])+"px)"}}>
   <div style={{fontSize:16,letterSpacing:4.2,color:K.teal,fontWeight:900}}>THE PRACTICAL COMPARISON</div>
   <div style={{fontSize:126,lineHeight:.91,fontWeight:950,letterSpacing:-7,marginTop:27}}>
    <div style={{overflow:"hidden",height:126}}><div style={{transform:"translateY("+interpolate(h,[0,1],[130,0])+"px)"}}>GPT <span style={{color:K.dim,fontWeight:400}}>vs</span></div></div>
    <div style={{overflow:"hidden",height:133}}><div style={{color:K.purple,transform:"translateY("+interpolate(a,[0,1],[140,0])+"px)"}}>OPUS<span style={{color:K.teal}}>.</span></div></div>
   </div>
   <div style={{fontSize:31,fontWeight:750,marginTop:28,opacity:a}}>Where GPT gets more value — and where it doesn't.</div>
   <div style={{fontSize:20,color:K.muted,marginTop:15,maxWidth:810,opacity:b}}>Price, selected workflow results, and one counterexample to a universal winner.</div>
  </div>
  <div style={{position:"absolute",left:1000,right:80,top:155,bottom:147,transform:"translateX("+interpolate(orbit,[0,1],[180,0])+"px)",opacity:orbit}}>
   <svg viewBox="0 0 720 580" style={{width:"100%",height:"100%",overflow:"visible"}}>
    <defs><linearGradient id="heroLine" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor={K.teal}/><stop offset="1" stopColor={K.purple}/></linearGradient><filter id="heroGlow"><feGaussianBlur stdDeviation="7" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <circle cx="360" cy="255" r="204" stroke={K.line} strokeWidth="1" fill="none" strokeDasharray="2 12"/>
    <circle cx="360" cy="255" r="155" stroke="url(#heroLine)" strokeWidth="2" strokeOpacity=".35" fill="none" strokeDasharray="7 12" transform={"rotate("+(f*-.4)+" 360 255)"}/>
    <path d="M84 255 H637" stroke="url(#heroLine)" strokeWidth="2" strokeDasharray="9 11" strokeDashoffset={-f*1.5} fill="none"/>
    <path d={"M360 51 C"+(540+Math.sin(f*.02)*15)+" 117 "+(600+Math.sin(f*.025)*15)+" 318 360 459 C"+(130+Math.sin(f*.02)*20)+" 410 171 127 360 51Z"} stroke={K.dim} strokeOpacity=".4" strokeWidth="1.5" fill="none" strokeDasharray="3 9"/>
    <g transform={"translate("+(207+Math.sin(f*.028)*10)+" "+(168+Math.sin(f*.025)*8)+")"}><circle r="87" fill={K.teal} opacity=".06"/><circle r="78" fill="none" stroke={K.teal} strokeDasharray="3 7" transform={"rotate("+(f*.7)+")"}/><circle r="68" fill={K.teal} fillOpacity=".12" stroke={K.teal} strokeWidth="2"/><circle r="23" fill={K.teal}/><text y="106" textAnchor="middle" fontSize="15" fontWeight="850" fill={K.muted}>GPT-6.1 SOL</text></g>
    <g transform={"translate(506 "+(333+Math.cos(f*.025)*12)+")"}><circle r="87" fill={K.purple} opacity=".06"/><circle r="78" fill="none" stroke={K.purple} strokeDasharray="3 7" transform={"rotate("+(-f*.7)+")"}/><circle r="68" fill={K.purple} fillOpacity=".12" stroke={K.purple} strokeWidth="2"/><circle r="23" fill={K.purple}/><text y="106" textAnchor="middle" fontSize="15" fontWeight="850" fill={K.muted}>OPUS 5.5</text></g>
    <g filter="url(#heroGlow)"><circle cx="360" cy="255" r="72" fill="#102435" stroke={K.cyan} strokeWidth="2"/><text x="360" y="246" textAnchor="middle" fontSize="18" fontWeight="800" fill={K.muted} letterSpacing="2">BETTER</text><text x="360" y="284" textAnchor="middle" fontSize="40" fontWeight="950" fill={K.ink}>FOR?</text></g>
    {Array.from({length:12},(_,i)=>{const ang=(i/12)*Math.PI*2+f*.009,r=220+(i%3)*23,x=360+Math.cos(ang)*r,y=255+Math.sin(ang)*r;return <rect key={i} x={x-5} y={y-5} width="10" height="10" rx="2" fill={i%2?K.teal:K.purple} opacity={.36+(i%3)*.2} transform={"rotate("+(ang*180/Math.PI)+" "+x+" "+y+")"} />;})}
   </svg>
  </div>
  <div style={{position:"absolute",left:94,bottom:104,display:"flex",gap:13,opacity:b}}>{[["PRICE",K.teal],["WORKFLOW",K.cyan],["COUNTEREXAMPLE",K.purple]].map(([label,c])=><span key={label} style={{border:"1px solid "+c+"66",background:c+"12",padding:"10px 15px",borderRadius:8,fontSize:15,fontWeight:800,color:c}}>{label}</span>)}</div>
 </Shell>;
};

const TokenStream:React.FC<{frame:number;color:string;count:number}> = ({frame,color,count})=><div style={{display:"flex",gap:7,overflow:"hidden",height:22,alignItems:"center"}}>
 {Array.from({length:count},(_,i)=>{const x=(frame*2.3+i*23)%(count*23);return <div key={i} style={{width:13+(i%4)*5,height:7+(i%3)*4,borderRadius:2,background:color,opacity:.25+(i%5)*.13,transform:"translateX("+x+"px)",flexShrink:0}}/>;})}
</div>;

const RateRow:React.FC<{label:string;gpt:number;opus:number;max:number;frame:number;color:string}> = ({label,gpt,opus,max,frame,color})=>{
 const p=prog(frame,10,58);
 return <div style={{marginTop:22}}>
  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:19,marginBottom:10}}><span style={{color:K.muted,fontWeight:700,letterSpacing:.5}}>{label}</span><span style={{fontSize:14,color:K.dim}}>USD / 1M tokens</span></div>
  {[{name:"GPT-6.1 Sol",v:gpt,c:K.teal},{name:"Opus 5.5",v:opus,c:K.purple}].map(row=><div key={row.name} style={{display:"grid",gridTemplateColumns:"125px 1fr 90px",alignItems:"center",gap:15,marginBottom:9}}>
   <span style={{fontSize:15,color:row.c,fontWeight:850}}>{row.name}</span><div style={{height:19,borderRadius:4,background:"#223547",overflow:"hidden"}}><div style={{width:(row.v/max*100*p)+"%",height:"100%",background:"linear-gradient(90deg,"+row.c+","+color+")",boxShadow:"0 0 24px "+row.c+"44"}}/></div><span style={{fontSize:23,fontWeight:900,textAlign:"right"}>{"$"+row.v.toFixed(2)}</span>
  </div>)}
  <TokenStream frame={frame} color={color} count={8}/>
 </div>;
};

const Price:React.FC=()=>{
 const f=useCurrentFrame(),{fps}=useVideoConfig(),h=enter(f,fps,4),big=enter(f,fps,25),cells=Math.round(prog(f,22,68)*10);
 return <Shell index="02" section="Price" source="Sources: OpenAI GPT-6.1 Sol · Anthropic Claude Opus 5.5" duration={240}>
  <div style={{position:"absolute",left:88,right:88,top:120,opacity:h,transform:"translateY("+interpolate(h,[0,1],[22,0])+"px)"}}><Heading kicker="01 / Listed API rates" title="The same token costs half as much." subtitle="Standard input and output rates per one million tokens. Lower rates are an advantage—not a guarantee of lower cost for every task."/></div>
  <div style={{position:"absolute",left:105,top:345,width:800,opacity:big,transform:"translateY("+interpolate(big,[0,1],[28,0])+"px)"}}>
   <div style={{display:"flex",alignItems:"center",gap:25}}><div style={{fontSize:190,lineHeight:.86,fontWeight:950,letterSpacing:-10,color:K.teal,textShadow:"0 0 48px "+K.teal+"33"}}>2<span style={{fontSize:88,color:K.ink,letterSpacing:-3}}>×</span></div><div style={{fontSize:26,lineHeight:1.23,fontWeight:850}}>lower standard<br/>input and output rates</div></div>
   <div style={{display:"flex",gap:8,marginTop:32}}>{Array.from({length:20},(_,i)=><div key={i} style={{height:7,flex:1,borderRadius:3,background:i<cells?K.teal:"#263849",boxShadow:i<cells?"0 0 15px "+K.teal+"55":"none"}}/>)}</div>
   <div style={{fontSize:16,color:K.dim,marginTop:14}}>20 illuminated units = 2× the listed price</div>
  </div>
  <div style={{position:"absolute",right:91,top:338,width:700,padding:"20px 24px 17px",borderLeft:"1px solid "+K.line,background:"linear-gradient(90deg, transparent, #11233499)"}}><RateRow label="INPUT TOKENS" gpt={2} opus={4} max={4} frame={f} color={K.cyan}/><RateRow label="OUTPUT TOKENS" gpt={10} opus={20} max={20} frame={f} color={K.teal}/></div>
  <div style={{position:"absolute",left:105,bottom:100,display:"flex",alignItems:"center",gap:18,opacity:prog(f,50,72)}}><Corner color={K.amber}/><div style={{fontSize:18,color:K.amber,fontWeight:750}}>Task cost still depends on tokens, caching, tools, and retries.</div></div>
 </Shell>;
};

const Automation:React.FC=()=>{
 const f=useCurrentFrame(),{fps}=useVideoConfig(),h=enter(f,fps,3),p=prog(f,14,75),delta=2.2*p,cost=prog(f,25,83),r=112,circ=2*Math.PI*r,show=enter(f,fps,15),show2=enter(f,fps,26);
 return <Shell index="03" section="Workflow evidence" source="OpenAI-reported AutomationBench comparison · medium reasoning" duration={240}>
  <div style={{position:"absolute",left:88,right:88,top:120,opacity:h,transform:"translateY("+interpolate(h,[0,1],[20,0])+"px)"}}><Heading kicker="02 / Selected workflow evidence" title="A small score lead. A bigger cost difference." subtitle="OpenAI reports GPT-6.1 Sol 2.2 percentage points above Opus 5.5 on AutomationBench at medium reasoning effort." size={49}/></div>
  <div style={{position:"absolute",left:105,top:363,display:"flex",alignItems:"center",gap:35,opacity:show,transform:"translateX("+interpolate(show,[0,1],[-30,0])+"px)"}}>
   <svg width="300" height="300" viewBox="0 0 300 300">
    <defs><linearGradient id="metricDial" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={K.teal}/><stop offset="1" stopColor={K.cyan}/></linearGradient></defs>
    <circle cx="150" cy="150" r="128" fill="#102132" stroke={K.line} strokeWidth="1"/><circle cx="150" cy="150" r={r+15} fill="none" stroke="#253a4c" strokeWidth="22" strokeDasharray="3 9" transform={"rotate("+(f*-.3)+" 150 150)"}/><circle cx="150" cy="150" r={r} fill="none" stroke="url(#metricDial)" strokeWidth="8" strokeDasharray={circ} strokeDashoffset={circ*(1-cost)} strokeLinecap="round" transform="rotate(-90 150 150)"/>
    {Array.from({length:31},(_,i)=>{const a=i/31*Math.PI*2-Math.PI/2;return <line key={i} x1={150+Math.cos(a)*139} y1={150+Math.sin(a)*139} x2={150+Math.cos(a)*148} y2={150+Math.sin(a)*148} stroke={i<31*cost?K.teal:K.line} strokeWidth={i%5===0?3:1.4} opacity={i<31*cost?1:.55}/>;})}
    <text x="150" y="119" textAnchor="middle" fontSize="14" letterSpacing="2" fontWeight="850" fill={K.dim}>REPORTED EDGE</text><text x="150" y="177" textAnchor="middle" fontSize="60" fontWeight="950" letterSpacing="-3" fill={K.teal}>+{delta.toFixed(1)}</text><text x="150" y="205" textAnchor="middle" fontSize="14" fontWeight="850" fill={K.muted}>POINTS</text>
   </svg>
   <div style={{width:295}}><div style={{fontSize:16,color:K.dim,fontWeight:850,letterSpacing:2}}>READ THE METRIC</div><div style={{fontSize:31,fontWeight:850,lineHeight:1.15,marginTop:18}}>Not a 2.2% relative lift.</div><div style={{fontSize:19,color:K.muted,lineHeight:1.45,marginTop:14}}>It's a reported difference in benchmark score, with vendor-specific test conditions.</div></div>
  </div>
  <div style={{position:"absolute",right:101,top:390,width:760,border:"1px solid "+K.line,borderRadius:17,background:"linear-gradient(140deg,#142738,#0e1b29)",padding:"28px 28px 25px",boxShadow:"0 20px 55px #0004",opacity:show2,transform:"translateY("+interpolate(show2,[0,1],[35,0])+"px)"}}>
   <div style={{fontSize:15,letterSpacing:2.4,fontWeight:900,color:K.dim}}>REPORTED COST PER TASK</div>
   <div style={{display:"flex",justifyContent:"space-between",marginTop:31,fontSize:18,fontWeight:850}}><span style={{color:K.teal}}>GPT-6.1 Sol</span><span>About one-third the cost</span></div>
   <div style={{height:24,background:"#263a4c",borderRadius:5,marginTop:10,overflow:"hidden"}}><div style={{height:"100%",width:(34*cost)+"%",background:"linear-gradient(90deg,"+K.teal+","+K.cyan+")",boxShadow:"0 0 28px "+K.teal+"55"}}/></div>
   <div style={{display:"flex",justifyContent:"space-between",marginTop:27,fontSize:18,fontWeight:850}}><span style={{color:K.purple}}>Claude Opus 5.5</span><span style={{color:K.dim}}>Reference</span></div>
   <div style={{height:24,background:"#263a4c",borderRadius:5,marginTop:10,overflow:"hidden"}}><div style={{height:"100%",width:(100*cost)+"%",background:"linear-gradient(90deg,"+K.purple+",#8e72d0)",boxShadow:"0 0 28px "+K.purple+"44"}}/></div>
   <div style={{display:"flex",gap:9,marginTop:24,alignItems:"center",color:K.amber,fontSize:15,fontWeight:700}}><Corner color={K.amber}/>Vendor-reported; results depend on task mix, effort and fallback handling.</div>
  </div>
 </Shell>;
};

const ScienceCost:React.FC=()=>{
 const f=useCurrentFrame(),{fps}=useVideoConfig(),h=enter(f,fps,4),p=prog(f,16,80);
 const data=[{name:"GPT-6.1 SOL",value:5.47,color:K.teal},{name:"CLAUDE OPUS 5.5",value:23.21,color:K.purple}];
 return <Shell index="04" section="Scientific workflow cost" source="OpenAI-published Terminal-Bench Science 0.1 · maximum effort" duration={270}>
  <div style={{position:"absolute",left:88,right:88,top:120,opacity:h,transform:"translateY("+interpolate(h,[0,1],[20,0])+"px)"}}><Heading kicker="03 / Average cost per task" title="A cost gap you can see from across the room." subtitle="Reported average task cost at maximum reasoning effort. Cost is not a quality score." size={50}/></div>
  <div style={{position:"absolute",left:112,top:350,width:1640,height:435}}>
   <div style={{position:"absolute",left:0,top:0,bottom:52,width:260,display:"flex",flexDirection:"column",justifyContent:"center",opacity:p}}>
    <div style={{fontSize:16,color:K.dim,fontWeight:900,letterSpacing:2}}>CALCULATED DIFFERENCE</div><div style={{fontSize:100,fontWeight:950,letterSpacing:-5,color:K.teal,lineHeight:1,marginTop:22,transform:"scale("+(0.94+.06*p)+")"}}>−76%</div><div style={{fontSize:22,fontWeight:800,marginTop:16}}>lower reported cost</div><div style={{fontSize:16,lineHeight:1.5,color:K.muted,marginTop:13,maxWidth:220}}>Calculated from published cost-per-task figures.</div>
   </div>
   <div style={{position:"absolute",left:300,right:0,top:20,height:344}}>
    {[0,5,10,15,20,25].map(v=><div key={v} style={{position:"absolute",left:(v/25*100)+"%",top:0,bottom:0,width:1,background:K.line,opacity:.72}}><span style={{position:"absolute",top:-24,left:7,fontSize:13,color:K.dim}}>{"$"}{v}</span></div>)}
    {data.map((d,i)=>{const y=58+i*148,w=d.value/25*100*p;return <svg key={d.name} width="100%" height="115" viewBox="0 0 1200 115" preserveAspectRatio="none" style={{position:"absolute",left:0,top:y-26,overflow:"visible"}}>
      <text x="0" y="16" fontSize="18" fontWeight="850" fill={d.color} letterSpacing="1.2">{d.name}</text><rect x="0" y="33" width="1200" height="55" rx="5" fill="#1a2b3c"/><rect x="0" y="33" width={(d.value/25*1200*p)} height="55" rx="5" fill={d.color} opacity=".88"/><rect x="0" y="33" width={(d.value/25*1200*p)} height="55" rx="5" fill="none" stroke={d.color} strokeWidth="1.5"/><text x={Math.min(1000,d.value/25*1200*p+18)} y="68" fontSize="27" fontWeight="950" fill={K.ink}>{"$"+d.value.toFixed(2)}</text>
     </svg>;})}
   </div>
   <div style={{position:"absolute",left:302,right:0,bottom:0,fontSize:15,color:K.muted,display:"flex",justifyContent:"space-between",gap:22}}><span>Same unit: USD per completed task</span><span>Vendor-reported evaluation</span></div>
  </div>
 </Shell>;
};

const Terminal:React.FC<{frame:number}> = ({frame})=>{
 const lines=[{w:245,c:K.purple},{w:405,c:K.muted},{w:335,c:K.teal},{w:380,c:K.muted},{w:260,c:K.cyan},{w:425,c:K.muted},{w:315,c:K.purple},{w:360,c:K.muted},{w:238,c:K.teal}];
 return <div style={{padding:"23px 25px",border:"1px solid "+K.line,borderRadius:15,background:"#08131e",boxShadow:"inset 0 0 50px #0003"}}>
  <div style={{display:"flex",gap:7,marginBottom:20,alignItems:"center"}}><span style={{width:8,height:8,borderRadius:10,background:K.coral}}/><span style={{width:8,height:8,borderRadius:10,background:K.amber}}/><span style={{width:8,height:8,borderRadius:10,background:K.teal}}/><span style={{marginLeft:8,color:K.dim,fontSize:12,letterSpacing:2,fontWeight:850}}>TERMINAL-BENCH 4.0 / REPORTED SCORES</span></div>
  {lines.map((l,i)=>{const v=prog(frame,7+i*5,17+i*5);return <div key={i} style={{height:19,display:"flex",alignItems:"center",gap:13,opacity:v,marginBottom:7}}><span style={{fontSize:11,color:K.dim,width:15,textAlign:"right"}}>{String(i+1).padStart(2,"0")}</span><div style={{height:5,width:(l.w*v/2),borderRadius:4,background:l.c,opacity:.7}}/>{i===8?<span style={{fontSize:12,color:K.teal}}>scores loaded ✓</span>:null}</div>;})}
 </div>;
};

const Counterexample:React.FC=()=>{
 const f=useCurrentFrame(),{fps}=useVideoConfig(),h=enter(f,fps,4),p=prog(f,18,78),left=enter(f,fps,16),right=enter(f,fps,27);
 return <Shell index="05" section="The counterexample" source="Anthropic-published Terminal-Bench 4.0 comparison; effort settings differ" duration={210}>
  <div style={{position:"absolute",left:88,right:88,top:120,opacity:h,transform:"translateY("+interpolate(h,[0,1],[20,0])+"px)"}}><Heading kicker="04 / A necessary counterexample" title="But Opus leads on this coding benchmark." subtitle="Anthropic reports Terminal-Bench 4.0 scores of 66.4% for Opus 5.5 and 57.9% for GPT-6 Astra." size={49}/></div>
  <div style={{position:"absolute",left:104,top:355,width:930,opacity:left,transform:"translateX("+interpolate(left,[0,1],[-20,0])+"px)"}}>
   <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:18}}><span style={{fontSize:15,color:K.dim,letterSpacing:2.1,fontWeight:900}}>REPORTED RESOLUTION RATE</span><span style={{fontSize:14,color:K.amber,fontWeight:750}}>DIFFERENT EFFORT SETTINGS</span></div>
   {[{name:"CLAUDE OPUS 5.5",v:66.4,c:K.purple},{name:"GPT-6 ASTRA",v:57.9,c:K.cyan}].map((d,i)=>{const y=i*145;return <div key={d.name} style={{position:"absolute",left:0,right:0,top:y+35}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}><span style={{fontSize:21,fontWeight:900,color:d.c,letterSpacing:.6}}>{d.name}</span><span style={{fontSize:43,fontWeight:950,letterSpacing:-2,color:d.c}}>{(d.v*p).toFixed(1)}%</span></div>
    <div style={{height:34,background:"#1e3142",borderRadius:4,overflow:"hidden",position:"relative"}}><div style={{height:"100%",width:(d.v/75*100*p)+"%",background:"linear-gradient(90deg,"+d.c+"55,"+d.c+")",boxShadow:"0 0 30px "+d.c+"33",borderRadius:4}}/>{Array.from({length:16},(_,t)=><div key={t} style={{position:"absolute",left:((t+1)/17*100)+"%",top:0,bottom:0,width:1,background:"#d9e7f622"}}/>)}</div>
   </div>;})}
   <div style={{position:"absolute",top:330,left:0,right:0,borderLeft:"3px solid "+K.amber,padding:"11px 16px",background:K.amber+"0c",fontSize:16,lineHeight:1.45,color:K.muted}}>Opus 5.5 at xhigh effort; GPT-6 Astra at high effort, as reported by Anthropic. This is not a GPT-6.1 Sol score comparison.</div>
  </div>
  <div style={{position:"absolute",right:103,top:377,width:600,opacity:right,transform:"translateY("+interpolate(right,[0,1],[32,0])+"px)"}}><Terminal frame={f}/><div style={{marginTop:25,display:"flex",gap:13,alignItems:"center"}}><div style={{fontSize:64,fontWeight:950,color:K.purple,letterSpacing:-4}}>+</div><div><div style={{fontSize:23,fontWeight:850}}>The exception is the story.</div><div style={{fontSize:18,color:K.muted,marginTop:6}}>A fair test shows the result that cuts against the headline.</div></div></div></div>
 </Shell>;
};

const Verdict:React.FC=()=>{
 const f=useCurrentFrame(),{fps}=useVideoConfig(),h=enter(f,fps,2),c=enter(f,fps,18),rule=enter(f,fps,35),sweep=prog(f,0,75);
 return <Shell index="06" section="The verdict" source="Source URLs and benchmark caveats are in the demo source ledger" duration={210}>
  <div style={{...BASE,position:"absolute",left:95,right:95,top:155,opacity:h,transform:"translateY("+interpolate(h,[0,1],[28,0])+"px)"}}><div style={{fontSize:16,fontWeight:900,letterSpacing:3.2,color:K.teal}}>THE FAIR VERDICT</div><div style={{fontSize:91,lineHeight:1.01,letterSpacing:-4.4,fontWeight:950,marginTop:22,maxWidth:1560}}>No universal winner.<br/><span style={{color:K.cyan}}>Choose by workload.</span></div></div>
  <div style={{position:"absolute",left:105,right:105,top:433,display:"flex",gap:24,opacity:c,transform:"translateY("+interpolate(c,[0,1],[24,0])+"px)"}}>
   <div style={{flex:1,position:"relative",overflow:"hidden",border:"1px solid "+K.teal+"88",background:"linear-gradient(135deg,#14352f99,#112332)",borderRadius:16,padding:"25px 28px"}}><div style={{position:"absolute",left:0,top:0,bottom:0,width:5,background:K.teal,transform:"scaleY("+sweep+")",transformOrigin:"top"}}/><div style={{fontSize:15,letterSpacing:2.5,fontWeight:900,color:K.teal}}>GPT-6.1 SOL</div><div style={{fontSize:28,fontWeight:900,marginTop:17}}>Value on selected tasks</div><div style={{fontSize:19,color:K.muted,lineHeight:1.45,marginTop:10}}>Lower standard rates and selected workflow-cost advantages reported by OpenAI.</div><svg width="100%" height="32" viewBox="0 0 500 32" preserveAspectRatio="none" style={{marginTop:18}}><path d="M0 24 C70 24 65 7 120 7 S190 28 240 18 S315 4 365 16 S440 20 500 5" fill="none" stroke={K.teal} strokeWidth="2.5" strokeDasharray="500" strokeDashoffset={500*(1-sweep)}/></svg></div>
   <div style={{flex:1,position:"relative",overflow:"hidden",border:"1px solid "+K.purple+"88",background:"linear-gradient(135deg,#28204299,#112332)",borderRadius:16,padding:"25px 28px"}}><div style={{position:"absolute",left:0,top:0,bottom:0,width:5,background:K.purple,transform:"scaleY("+sweep+")",transformOrigin:"top"}}/><div style={{fontSize:15,letterSpacing:2.5,fontWeight:900,color:K.purple}}>CLAUDE OPUS 5.5</div><div style={{fontSize:28,fontWeight:900,marginTop:17}}>A serious coding contender</div><div style={{fontSize:19,color:K.muted,lineHeight:1.45,marginTop:10}}>Leads the cited Terminal-Bench 4.0 comparison, under its reported settings.</div><svg width="100%" height="32" viewBox="0 0 500 32" preserveAspectRatio="none" style={{marginTop:18}}><path d="M0 18 C70 4 105 26 170 16 S265 7 320 21 S420 9 500 12" fill="none" stroke={K.purple} strokeWidth="2.5" strokeDasharray="500" strokeDashoffset={500*(1-sweep)}/></svg></div>
  </div>
  <div style={{...BASE,position:"absolute",left:105,right:105,top:730,border:"1px solid "+K.line,background:"#0b1825",borderRadius:14,padding:"22px 28px",display:"flex",alignItems:"center",gap:23,opacity:rule,transform:"translateY("+interpolate(rule,[0,1],[22,0])+"px)"}}><div style={{width:48,height:48,borderRadius:12,display:"grid",placeItems:"center",border:"1px solid "+K.amber+"88",color:K.amber,fontSize:27,fontWeight:900}}>✓</div><div><div style={{fontSize:15,letterSpacing:2.6,fontWeight:900,color:K.amber}}>THE RULE</div><div style={{fontSize:27,fontWeight:850,marginTop:5}}>Test both. Track quality, time, and total cost.</div></div></div>
  <div style={{position:"absolute",left:107,right:107,bottom:101,height:2,background:K.line}}/><div style={{position:"absolute",left:107,right:107,bottom:110,display:"flex",justifyContent:"space-between",color:K.dim,fontSize:14}}><span>OPENAI.COM / INTRODUCING GPT-6.1 SOL</span><span>ANTHROPIC.COM / CLAUDE OPUS 5.5</span></div>
 </Shell>;
};

export const GPTvsOpusDemo:React.FC=()=> <AbsoluteFill style={{background:K.bg}}>
 <Sequence from={0} durationInFrames={180}><Hero/></Sequence>
 <Sequence from={180} durationInFrames={240}><Price/></Sequence>
 <Sequence from={420} durationInFrames={240}><Automation/></Sequence>
 <Sequence from={660} durationInFrames={270}><ScienceCost/></Sequence>
 <Sequence from={930} durationInFrames={210}><Counterexample/></Sequence>
 <Sequence from={1140} durationInFrames={210}><Verdict/></Sequence>
</AbsoluteFill>;
export const GPTvsOpusComposition:React.FC=()=> <Composition id="GPTvsOpusInterfaceTheatre" component={GPTvsOpusDemo} durationInFrames={1350} fps={30} width={1920} height={1080}/>;
