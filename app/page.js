'use client';
import {useEffect,useState} from 'react';
const demo=[
 {id:'d1',title:'Technical Support Specialist',company:'Remote SaaS Co',location:'Remote',salary:'$900–$1,400/mo',email:'careers@example.com',url:'https://example.com',description:'Customer support, troubleshooting, SaaS, HTML/CSS and strong communication.'},
 {id:'d2',title:'Junior QA Engineer',company:'Cloud Product Team',location:'Remote',salary:'$1,000–$1,600/mo',email:'jobs@example.com',url:'https://example.com',description:'Manual QA, bug reporting, regression testing and web applications.'}
];
export default function Home(){
 const [leads,setLeads]=useState([]),[i,setI]=useState(0),[loading,setLoading]=useState(false),[toast,setToast]=useState(''),[prefs,setPrefs]=useState({liked:[],skipped:[]});
 useEffect(()=>{const p=JSON.parse(localStorage.getItem('jobswipe-prefs')||'{"liked":[],"skipped":[]}');setPrefs(p);refresh()},[]);
 const save=(p)=>{setPrefs(p);localStorage.setItem('jobswipe-prefs',JSON.stringify(p))};
 async function refresh(){setLoading(true);setI(0);try{let r=await fetch('/api/leads');let d=await r.json();setLeads(d.leads?.length?d.leads:demo)}catch{setLeads(demo)}finally{setLoading(false)}}
 async function swipe(yes){let job=leads[i];if(!job)return; let p={...prefs,[yes?'liked':'skipped']:[...(prefs[yes?'liked':'skipped']||[]),job.id]};save(p);if(yes){setToast('Preparing tailored application…');try{let r=await fetch('/api/send',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({job})});let d=await r.json();setToast(d.message||'Application prepared')}catch{setToast('Could not send. Check Settings / environment variables.')}}setI(x=>x+1);setTimeout(()=>setToast(''),4000)}
 const j=leads[i];
 return <main><header><div><b>JobSwipe <span>AI</span></b><small>Fresh remote leads • tailored applications</small></div><button onClick={refresh} disabled={loading}>↻ {loading?'Loading…':'Refresh 20'}</button></header>
 <section className="stats"><div><strong>{prefs.liked?.length||0}</strong><small>Right swipes</small></div><div><strong>{prefs.skipped?.length||0}</strong><small>Skipped</small></div><div><strong>{leads.length}</strong><small>Fresh batch</small></div></section>
 <section className="deck">{j?<article className="card"><div className="badge">FRESH LEAD</div><h1>{j.title}</h1><h2>{j.company}</h2><p className="meta">📍 {j.location||'Remote'}</p><p className="salary">💰 {j.salary||'Salary not listed'}</p><p>{(j.description||'').slice(0,420)}</p><div className="contact">✉ {j.email||'No public application email found — opens job page instead'}</div><a href={j.url} target="_blank">View source ↗</a></article>:<article className="card done"><h1>Batch complete</h1><p>You reviewed all leads. Refresh to fetch another 20.</p><button onClick={refresh}>Get 20 more</button></article>}</section>
 <section className="actions"><button className="no" onClick={()=>swipe(false)} disabled={!j}>✕</button><div><b>Swipe left</b><small>Skip</small></div><div><b>Swipe right</b><small>Tailor + send</small></div><button className="yes" onClick={()=>swipe(true)} disabled={!j}>✓</button></section>
 <section className="notice"><b>How sending works</b><p>Right swipe sends only when the lead publishes an application email and Gmail SMTP is configured. Otherwise it safely prepares the application and directs you to the job source. Your swipe choices are remembered on this device.</p></section>
 {toast&&<div className="toast">{toast}</div>}</main>
}
