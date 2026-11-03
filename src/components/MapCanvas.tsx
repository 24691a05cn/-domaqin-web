import { useMemo, useRef, useState } from 'react';
import type { Mission, Point } from '../types';

type Props = { mission?: Mission | null; drone?: Point | null; onMapClick?: (p: Point) => void; compact?: boolean; oldRoute?: Point[]; obstacles?: Point[] };
const demoObstacles: Point[] = [{x:.34,y:.30},{x:.56,y:.46},{x:.68,y:.22},{x:.48,y:.72},{x:.78,y:.62}];
export function MapCanvas({ mission, drone, onMapClick, compact, oldRoute, obstacles }: Props) {
  const ref = useRef<SVGSVGElement>(null); const [zoom,setZoom]=useState(1); const [pan,setPan]=useState({x:0,y:0}); const [drag,setDrag]=useState<{x:number;y:number}|null>(null);
  const route=mission?.route??[]; const currentDrone=drone ?? (route.length?route[Math.floor(route.length*.42)]:null); const obs=obstacles?.length?obstacles:demoObstacles;
  const pathD=useMemo(()=>route.map((p,i)=>`${i?'L':'M'} ${p.x*100} ${p.y*100}`).join(' '),[route]);
  const oldPathD=useMemo(()=>((oldRoute&&oldRoute.length)?oldRoute:[]).map((p,i)=>`${i?'L':'M'} ${p.x*100} ${p.y*100}`).join(' '),[oldRoute]);
  function eventToPoint(e:React.MouseEvent<SVGSVGElement>){if(!ref.current||!onMapClick)return;const r=ref.current.getBoundingClientRect();onMapClick({x:Math.max(0,Math.min(1,(e.clientX-r.left)/r.width)),y:Math.max(0,Math.min(1,(e.clientY-r.top)/r.height))})}
  return <div className={`map-shell ${compact?'compact':''}`}>
    <svg ref={ref} viewBox="0 0 100 100" preserveAspectRatio="none" className="map-canvas" onMouseDown={e=>setDrag({x:e.clientX-pan.x,y:e.clientY-pan.y})} onMouseMove={e=>drag&&setPan({x:e.clientX-drag.x,y:e.clientY-drag.y})} onMouseUp={()=>setDrag(null)} onMouseLeave={()=>setDrag(null)} onClick={eventToPoint}>
      <defs><linearGradient id="terrain" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#061019"/><stop offset=".52" stopColor="#0a1822"/><stop offset="1" stopColor="#061118"/></linearGradient><pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse"><path d="M5 0L0 0 0 5" fill="none" stroke="#173442" strokeWidth=".18"/></pattern><filter id="glow"><feGaussianBlur stdDeviation=".9" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
      <g transform={`translate(${pan.x/4} ${pan.y/4}) scale(${zoom})`}>
        <rect width="100" height="100" fill="url(#terrain)"/><rect width="100" height="100" fill="url(#grid)"/>
        {[...Array(7)].map((_,i)=><ellipse key={i} cx={18+i*13} cy={20+(i%3)*25} rx={10+i*2.3} ry={5+i*1.4} fill="none" stroke="#16333e" strokeWidth=".32" opacity=".7"/>)}
        {[...Array(12)].map((_,i)=><line key={i} x1={i*9} y1="0" x2={i*8+28} y2="100" stroke="#0e2a34" strokeWidth=".16" opacity=".7"/>)}
        <g opacity=".85" fill="#5ea9b6" fontSize="2.15" fontFamily="monospace"><text x="4" y="7">N 17°54.2' E 78°20.1'</text><text x="72" y="94">SIM-TERRAIN / GRID 06</text><text x="4" y="95">ALT REL 000–150 M</text></g>
        {obs.map((p,i)=><g key={i}><circle cx={p.x*100} cy={p.y*100} r="4.1" fill="#1c110c" stroke="#ff9f43" strokeWidth=".42" strokeDasharray="1.2 1.1"/><circle cx={p.x*100} cy={p.y*100} r="1.1" fill="#ff6b35"/></g>)}
        {oldPathD&&<path d={oldPathD} fill="none" stroke="#5d6a72" strokeWidth=".42" strokeDasharray="1.5 1.5"/>}
        {pathD&&<path d={pathD} fill="none" stroke="#0ad8ff" strokeWidth=".9" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)"/>}
        {route.map((p,i)=>i>0&&i<route.length-1?<circle key={i} cx={p.x*100} cy={p.y*100} r=".8" fill="#d9f9ff"/>:null)}
        {mission?.start&&<g><circle cx={mission.start.x*100} cy={mission.start.y*100} r="2.2" fill="#081c20" stroke="#52f6a4" strokeWidth=".65"/><circle cx={mission.start.x*100} cy={mission.start.y*100} r=".75" fill="#52f6a4"/></g>}
        {mission?.destination&&<g><circle cx={mission.destination.x*100} cy={mission.destination.y*100} r="2.4" fill="#281c07" stroke="#ffd166" strokeWidth=".65"/><path d={`M${mission.destination.x*100-1.1} ${mission.destination.y*100}L${mission.destination.x*100+1.1} ${mission.destination.y*100}M${mission.destination.x*100} ${mission.destination.y*100-1.1}V${mission.destination.y*100+1.1}`} stroke="#ffd166" strokeWidth=".45"/></g>}
        {currentDrone&&<g className="drone-marker"><circle cx={currentDrone.x*100} cy={currentDrone.y*100} r="4.6" fill="#00dfff" opacity=".08"/><circle cx={currentDrone.x*100} cy={currentDrone.y*100} r="1.4" fill="#f7fcff" stroke="#00dfff" strokeWidth=".55"/><path d={`M${currentDrone.x*100-3} ${currentDrone.y*100}H${currentDrone.x*100+3}M${currentDrone.x*100} ${currentDrone.y*100-3}V${currentDrone.y*100+3}`} stroke="#dffbff" strokeWidth=".35"/></g>}
      </g>
    </svg>
    <div className="map-topline"><span>TACTICAL SIMULATION SPACE</span><span>LIVE GRID</span></div>
    <div className="map-legend"><span><i className="dot cyan"/> PLANNED</span><span><i className="dot green"/> ACTIVE</span><span><i className="dot amber"/> REPLANNED</span><span><i className="dot orange"/> OBSTACLE</span></div>
    <div className="map-controls"><button onClick={()=>setZoom(z=>Math.min(2.4,z+.2))}>+</button><button onClick={()=>setZoom(z=>Math.max(.8,z-.2))}>−</button><button onClick={()=>{setZoom(1);setPan({x:0,y:0})}}>RESET</button></div>
  </div>
}
