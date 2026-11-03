import type { Telemetry } from '../types';
export function TelemetryRail({t}:{t?:Telemetry|null}){
 const telemetry=t ?? {battery_pct:78,speed_mps:12.4,altitude_m:120,distance_km:2.4,progress_pct:64,eta_sec:138,heading:'NE',current_waypoint:7,status:'READY',updated_at:new Date().toISOString()};
 const batteryClass=telemetry.battery_pct<20?'critical':telemetry.battery_pct<40?'warn':'';
 return <aside className="telemetry-rail">
   <div className="rail-title"><span>LIVE TELEMETRY</span><span className="live-dot"/></div>
   <div className={`battery-card ${batteryClass}`}><div className="battery-head"><span>BATTERY</span><strong>{telemetry.battery_pct.toFixed(0)}%</strong></div><div className="battery-track"><i style={{width:`${Math.max(0,Math.min(100,telemetry.battery_pct))}%`}}/></div><small>{telemetry.battery_pct<20?'LOW RESERVE — RETURN HOME':'RESERVE WITHIN MISSION LIMIT'}</small></div>
   <div className="telemetry-grid">{[['SPEED',`${telemetry.speed_mps.toFixed(1)} m/s`],['ALTITUDE',`${telemetry.altitude_m.toFixed(0)} m`],['DISTANCE',`${telemetry.distance_km.toFixed(2)} km`],['PROGRESS',`${telemetry.progress_pct.toFixed(0)}%`],['ETA',formatEta(telemetry.eta_sec)],['HEADING',telemetry.heading]].map(([a,b])=><div className="metric" key={a}><small>{a}</small><strong>{b}</strong></div>)}</div>
   <div className="telemetry-state"><small>MISSION STATE</small><b>{telemetry.status.replace(/_/g,' ')}</b><span>WAYPOINT {telemetry.current_waypoint}</span></div>
   <div className="rail-foot"><span>UTC SYNC</span><span>{new Date(telemetry.updated_at).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit',second:'2-digit'})}</span></div>
 </aside>
}
function formatEta(sec:number){const m=Math.floor(sec/60).toString().padStart(2,'0'); const s=Math.max(0,sec%60).toString().padStart(2,'0'); return `${m}:${s}`;}
