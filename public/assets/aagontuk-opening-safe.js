(function(){
  'use strict';
  const cards=[
    ['01','Compartment','Live stranger chat'],['02','Ticket Wall','From / To confessions'],['03','Platform Radio','Search and play songs'],['04','Table Tray','Four chat games'],['05','Chapters','Personal journey logs'],['06','Creator','Editable carriage bio'],['07','Control Room','Admin moderation'],['08','Signal Desk','Reports and safety'],['09','Moonline','19:00 — 05:00 route'],['10','Noticeboard','Station updates'],['11','Boarding Gate','Login and access'],['12','Radio Upload','Device upload progress']
  ];
  const copy={
    open:{label:'Moonline Live',color:'#28b66d',cta:'Enter Platform',title:['Moonline','is live'],kicker:'Signal clear. Compartments are open.',board:'BOARDING NOW',next:'closes at 05:00'},
    boarding:{label:'Pre-Boarding',color:'#d9a24a',cta:'Wait on Platform',title:['Signal','warming'],kicker:'The route opens at 19:00 Bangladesh time.',board:'PRE-BOARDING',next:'opens at 19:00'},
    closed:{label:'Off Platform',color:'#c44b4b',cta:'View Platform',title:['Moonline','returns'],kicker:'The platform is quiet. Return at 19:00.',board:'OFF PLATFORM',next:'opens at 19:00'}
  };
  function getBDParts(){
    const parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Dhaka',hourCycle:'h23',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit'}).formatToParts(new Date());
    const out={}; parts.forEach(p=>{out[p.type]=p.value;});
    return out;
  }
  function current(){
    const p=getBDParts(); const hour=Number(p.hour); let key='closed';
    if(hour>=19||hour<5) key='open'; else if(hour>=17&&hour<19) key='boarding';
    return {key,time:`${p.hour}:${p.minute}:${p.second}`,...copy[key]};
  }
  function countdown(key){
    const p=getBDParts(); const h=Number(p.hour);
    const bd=new Date(`${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}:${p.second}+06:00`);
    let target;
    if(h>=19){ target=new Date(`${p.year}-${p.month}-${p.day}T05:00:00+06:00`); target.setUTCDate(target.getUTCDate()+1); }
    else if(h<5){ target=new Date(`${p.year}-${p.month}-${p.day}T05:00:00+06:00`); }
    else { target=new Date(`${p.year}-${p.month}-${p.day}T19:00:00+06:00`); }
    let ms=Math.max(0,target-bd); const hh=String(Math.floor(ms/3600000)).padStart(2,'0'); ms%=3600000; const mm=String(Math.floor(ms/60000)).padStart(2,'0'); ms%=60000; const ss=String(Math.floor(ms/1000)).padStart(2,'0');
    return `${hh}:${mm}:${ss}`;
  }
  function railRows(){
    const all=cards.concat(cards);
    const row=(start)=>all.slice(start,start+18).map(c=>`<div class="aag-rail-card"><small>${c[0]}</small><b>${c[1]}</b><p>${c[2]}</p></div>`).join('');
    return `<div class="aag-feature-rail" aria-label="Aagontuk features"><div class="aag-rail-row">${row(0)}</div><div class="aag-rail-row">${row(3)}</div><div class="aag-rail-row">${row(6)}</div></div>`;
  }
  function titleHTML(p){ return `<div class="aag-morph"><span>${p.title[0]}</span><span>${p.title[1]}</span></div>`; }
  function setText(root,sel,val){ const n=root.querySelector(sel); if(n) n.textContent=val; }
  function update(root){
    const p=current(); root.dataset.phase=p.key;
    setText(root,'[data-aag-status]',p.label); setText(root,'[data-aag-time]',p.time); setText(root,'[data-aag-kicker]',p.kicker); setText(root,'[data-aag-board]',p.board); setText(root,'[data-aag-next]',p.next); setText(root,'[data-aag-countdown]',countdown(p.key));
    const dot=root.querySelector('.aag-dot'); if(dot){ dot.style.background=p.color; dot.style.boxShadow=`0 0 16px ${p.color}aa`; }
    const btn=root.querySelector('.aag-enter-btn'); if(btn) btn.textContent=p.cta;
    const title=root.querySelector('.aag-route-title'); if(title && title.dataset.key!==p.key){ title.dataset.key=p.key; title.innerHTML=titleHTML(p); }
  }
  function build(){
    const p=current();
    const wrap=document.createElement('section'); wrap.id='aag-opening-deck'; wrap.className='aag-opening-deck'; wrap.dataset.phase=p.key;
    wrap.innerHTML=`
      <div class="aag-terminal-grid">
        <div class="aag-departure-board">
          <div class="aag-board-top"><div><div class="aag-label">Opening Terminal</div><div class="aag-route-sub">Aagontuk Express</div></div><div class="aag-pill"><i class="aag-dot" style="background:${p.color};box-shadow:0 0 16px ${p.color}aa"></i><span data-aag-status>${p.label}</span></div></div>
          <h2 class="aag-route-title" data-key="${p.key}">${titleHTML(p)}</h2>
          <p class="aag-live-line" data-aag-kicker>${p.kicker}</p>
          <div class="aag-status-strip"><span data-aag-board>${p.board}</span><i></i><span data-aag-next>${p.next}</span><i></i><span data-aag-countdown>${countdown(p.key)}</span></div>
          <div class="aag-board-stats"><div class="aag-stat"><span class="aag-label">Window</span><strong>19:00 — 05:00</strong></div><div class="aag-stat"><span class="aag-label">BD Time</span><strong data-aag-time>${p.time}</strong></div><div class="aag-stat"><span class="aag-label">Route</span><strong>Compartment 01</strong></div></div>
        </div>
        <aside class="aag-side-panel">
          <a class="aag-side-action" href="/board"><div><b>Compartment</b><span>stranger chat</span></div><span>↗</span></a>
          <a class="aag-side-action" href="/confessions"><div><b>Ticket Wall</b><span>confessions + songs</span></div><span>↗</span></a>
          <a class="aag-side-action" href="/games"><div><b>Table Tray</b><span>games while waiting</span></div><span>↗</span></a>
          <a class="aag-enter-btn" href="/board">${p.cta}</a>
        </aside>
      </div>${railRows()}`;
    return wrap;
  }
  function findHero(){ return Array.from(document.querySelectorAll('section')).find(s=>s.id!=='aag-opening-deck' && /Aagontuk/i.test(s.textContent||'') && /Express/i.test(s.textContent||'')); }
  function render(){
    try{
      const path=(location.pathname.replace(/\/$/,'')||'/');
      const existing=document.getElementById('aag-opening-deck');
      if(path!=='/'){ if(existing) existing.remove(); return; }
      if(existing){ update(existing); return; }
      const hero=findHero(); if(!hero) return;
      hero.insertAdjacentElement('afterend',build());
    }catch(e){ console.warn('Aagontuk opening module skipped:',e); }
  }
  function boot(){
    let attempts=0; const t=setInterval(()=>{render(); if(document.getElementById('aag-opening-deck')||++attempts>80) clearInterval(t);},250);
    setInterval(render,1000);
    window.addEventListener('popstate',()=>setTimeout(render,120));
    const oldPush=history.pushState, oldReplace=history.replaceState;
    history.pushState=function(){ const r=oldPush.apply(this,arguments); setTimeout(render,120); return r; };
    history.replaceState=function(){ const r=oldReplace.apply(this,arguments); setTimeout(render,120); return r; };
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();
