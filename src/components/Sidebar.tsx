import type { ReactNode } from 'react';

type Props = { tab: string; onTab: (v:string)=>void; online: boolean };
const items = [['overview','⌂','Overview'],['missions','◈','Missions'],['planner','◎','Planner'],['simulation','◉','Simulation'],['analytics','▤','Analytics']];
export function Sidebar({tab,onTab,online}:Props){return <aside className="sidebar">
  <div className="brand"><div className="brand-mark">D</div><div><strong>DOMAQIN</strong><span>MISSION CONTROL</span></div></div>
  <div className="system-status"><span className={`pulse ${online?'online':''}`}/><div><small>SYSTEM</small><b>{online?'AI SYSTEM ONLINE':'BACKEND OFFLINE'}</b></div></div>
  <nav>{items.map(([id,icon,label])=><button key={id} className={tab===id?'active':''} onClick={()=>onTab(id)}><span className="nav-icon">{icon}</span><span>{label}</span><kbd>{id==='overview'?'1':id==='missions'?'2':id==='planner'?'3':id==='simulation'?'4':'5'}</kbd></button>)}</nav>
  <div className="side-bottom"><button className="settings-link" onClick={()=>onTab('settings')}>⚙ <span>Settings</span></button><div className="safety-note"><span>SIMULATION ONLY</span><small>No physical drone control / no harmful payloads</small></div></div>
</aside>}
