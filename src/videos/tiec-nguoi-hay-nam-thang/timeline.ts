// Provisional only. LOCAL MUST replace durations with measured voice clips before final render.
export const FPS=30;
export const PROPOSED_FRAMES=[195,198,147,183,153,237,213,252] as const;
export const SPANS=PROPOSED_FRAMES.map((duration,index)=>({
  id:`s${index+1}`,from:PROPOSED_FRAMES.slice(0,index).reduce((a,b)=>a+b,0),duration
}));
export const TOTAL_FRAMES=PROPOSED_FRAMES.reduce((a,b)=>a+b,0);
