'use client';
import {useMemo,useState} from 'react';

const tickets=[
{id:'INC-1042',title:'Payment callback delayed',customer:'Acme Retail',priority:'High',status:'Investigating',age:'18m'},
{id:'INC-1041',title:'Unable to download invoice',customer:'Northwind',priority:'Medium',status:'Open',age:'42m'},
{id:'INC-1040',title:'Product search timeout',customer:'Globex',priority:'High',status:'Resolved',age:'1h'},
{id:'INC-1039',title:'User invitation email missing',customer:'Wayne Foods',priority:'Low',status:'Open',age:'2h'},
{id:'INC-1038',title:'Dashboard showing stale data',customer:'Acme Retail',priority:'Medium',status:'Investigating',age:'3h'}];

export default function Home(){
 const [filter,setFilter]=useState('All'),[selected,setSelected]=useState(null);
 const visible=useMemo(()=>filter==='All'?tickets:tickets.filter(t=>t.status===filter),[filter]);
 return <main className="page">
  <header><div><small>CUSTOMER OPERATIONS</small><h1>Support Portal</h1><p>Track incidents, customer impact and response progress.</p></div><span className="agent">● Online · Support Agent</span></header>
  <section className="stats"><Metric l="Open" v="2"/><Metric l="Investigating" v="2"/><Metric l="Resolved today" v="14"/><Metric l="Avg. response" v="11m"/></section>
  <section className="content"><div className="panel"><div className="toolbar"><div><h2>Incident Queue</h2><p>Click an incident to inspect its details.</p></div><select value={filter} onChange={e=>setFilter(e.target.value)}><option>All</option><option>Open</option><option>Investigating</option><option>Resolved</option></select></div>
  <div className="tickets">{visible.map(t=><button className="ticket" key={t.id} onClick={()=>setSelected(t)}><div className="row"><b>{t.id}</b><span className={'priority '+t.priority.toLowerCase()}>{t.priority}</span></div><strong>{t.title}</strong><div className="row muted"><span>{t.customer}</span><span>{t.status} · {t.age}</span></div></button>)}</div></div>
  <aside className="detail">{selected?<><small>{selected.id}</small><h2>{selected.title}</h2><p>Customer: <b>{selected.customer}</b></p><hr/><h3>Response plan</h3><ul><li>Confirm customer impact</li><li>Check logs and metrics</li><li>Communicate next update</li><li>Attach resolution notes</li></ul><button className="action" onClick={()=>setSelected(null)}>Close details</button></>:<div className="empty"><div className="icon">↗</div><h2>Select an incident</h2><p>The selected customer's issue and response plan will appear here.</p></div>}</aside></section>
  <footer>Next.js App Router • Mock support ticket data</footer>
 </main>;
}
function Metric({l,v}){return <div className="metric"><span>{l}</span><strong>{v}</strong></div>}
