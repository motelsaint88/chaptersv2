
(function(){
  const cards=[
    ['01','Compartment','Live stranger chat'],['02','Ticket Wall','From / To confessions'],['03','Platform Radio','Search and play songs'],['04','Table Tray','Four chat games'],['05','Chapters','Personal journey logs'],['06','Creator','Editable carriage bio'],['07','Control Room','Admin moderation'],['08','Signal Desk','Reports and safety'],['09','Moonline','19:00 — 05:00 route'],['10','Noticeboard','Station updates'],['11','Boarding Gate','Login and access'],['12','Radio Upload','Device upload progress']
  ];
  const phaseCopy={
    open:{
      label:'Moonline Live',
      color:'#28b66d',
      cta:'Enter Platform',
      title:['Moonline','is live'],
      kicker:'Signal clear. Compartments are open.',
      board:'BOARDING NOW',
      next:'closes at 05:00',
      tone:'live'
    },
    boarding:{
      label:'Pre-Boarding',
      color:'#d9a24a',
      cta:'Wait on Platform',
      title:['Signal','warming'],
      kicker:'The route opens at 19:00 Bangladesh time.',
      board:'PRE-BOARDING',
      next:'opens at 19:00',
      tone:'warming'
    },
    closed:{
      label:'Off Platform',
      color:'#c44b4b',
      cta:'View Platform',
      title:['Moonline','returns'],
      kicker:'The platform is quiet. Return at 19:00.',
      board:'OFF PLATFORM',
      next:'opens at 19:00',
      tone:'closed'
    }
  };
  function parts(){
    const now=new Date();
    const fmt=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Dhaka',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false});
    const time=fmt.format(now);
    const hour=Number(new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Dhaka',hour:'2-digit',hour12:false}).format(now));
    let key='closed';
    if(hour>=19||hour<5) key='open';
    else if(hour>=17&&hour<19) key='boarding';
    return {key,time,...phaseCopy[key]};
  }
  function countdown(){
    const now=new Date();
    const bdParts=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Dhaka',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).formatToParts(now).reduce((a,p)=>{a[p.type]=p.value;return a;},{});
    const bd=new Date(`${bdParts.year}-${bdParts.month}-${bdParts.day}T${bdParts.hour}:${bdParts.minute}:${bdParts.second}+06:00`);
    const h=Number(bdParts.hour);
    let target=new Date(bd);
    if(h>=19||h<5){
      if(h<5) target=new Date(`${bdParts.year}-${bdParts.month}-${bdParts.day}T05:00:00+06:00`);
      else { target.setDate(target.getDate()+1); target.setHours(5,0,0,0); }
    } else {
      target=new Date(`${bdParts.year}-${bdParts.month}-${bdParts.day}T19:00:00+06:00`);
    }
    let ms=Math.max(0,target-bd);
    const hh=String(Math.floor(ms/3600000)).padStart(2,'0'); ms%=3600000;
    const mm=String(Math.floor(ms/60000)).padStart(2,'0'); ms%=60000;
    const ss=String(Math.floor(ms/1000)).padStart(2,'0');
    return `${hh}:${mm}:${ss}`;
  }
  function railRows(){
    const row = (start)=> cards.concat(cards).slice(start,start+18).map(c=>`<div class="aag-rail-card"><small>${c[0]}</small><b>${c[1]}</b><p>${c[2]}</p></div>`).join('');
    return `<div class="aag-feature-rail"><div class="aag-rail-row">${row(0)}</div><div class="aag-rail-row">${row(3)}</div><div class="aag-rail-row">${row(6)}</div></div>`;
  }
  function titleHTML(p){
    return `<div class="aag-morph" data-tone="${p.tone}"><span>${p.title[0]}</span><span>${p.title[1]}</span></div>`;
  }
  function update(el){
    const p=parts();
    el.dataset.phase=p.key;
    const set=(sel,txt)=>{const n=el.querySelector(sel); if(n) n.textContent=txt;};
    set('[data-aag-status]',p.label); set('[data-aag-time]',p.time); set('[data-aag-kicker]',p.kicker); set('[data-aag-board]',p.board); set('[data-aag-next]',p.next); set('[data-aag-countdown]',countdown());
    const dot=el.querySelector('.aag-dot'); if(dot){dot.style.background=p.color; dot.style.boxShadow=`0 0 16px ${p.color}aa`;}
    const btn=el.querySelector('.aag-enter-btn'); if(btn) btn.textContent=p.cta;
    const title=el.querySelector('.aag-route-title'); if(title) title.innerHTML=titleHTML(p);
  }
  function render(){
    const path=location.pathname.replace(/\/$/,'')||'/';
    const existing=document.getElementById('aag-opening-deck');
    if(path!=='/'){ if(existing) existing.remove(); return; }
    if(existing){ update(existing); return; }
    const hero=[...document.querySelectorAll('section')].find(s=>s.textContent&&s.textContent.includes('Aagontuk')&&s.textContent.includes('Express'));
    if(!hero) return;
    const p=parts();
    const wrap=document.createElement('section');
    wrap.id='aag-opening-deck';
    wrap.className='aag-opening-deck';
    wrap.dataset.phase=p.key;
    wrap.innerHTML=`
      <div class="aag-terminal-grid">
        <div class="aag-departure-board">
          <div class="aag-board-top"><div><div class="aag-label">Opening Terminal</div><div class="aag-route-sub">Aagontuk Express</div></div><div class="aag-pill"><i class="aag-dot" style="background:${p.color};box-shadow:0 0 16px ${p.color}aa"></i><span data-aag-status>${p.label}</span></div></div>
          <h2 class="aag-route-title">${titleHTML(p)}</h2>
          <p class="aag-live-line" data-aag-kicker>${p.kicker}</p>
          <div class="aag-status-strip"><span data-aag-board>${p.board}</span><i></i><span data-aag-next>${p.next}</span><i></i><span data-aag-countdown>${countdown()}</span></div>
          <div class="aag-board-stats"><div class="aag-stat"><span class="aag-label">Window</span><strong>19:00 — 05:00</strong></div><div class="aag-stat"><span class="aag-label">BD Time</span><strong data-aag-time>${p.time}</strong></div><div class="aag-stat"><span class="aag-label">Route</span><strong>Compartment 01</strong></div></div>
        </div>
        <aside class="aag-side-panel">
          <a class="aag-side-action" href="/board"><div><b>Compartment</b><span>stranger chat</span></div><span>↗</span></a>
          <a class="aag-side-action" href="/confessions"><div><b>Ticket Wall</b><span>confessions + songs</span></div><span>↗</span></a>
          <a class="aag-side-action" href="/games"><div><b>Table Tray</b><span>games while waiting</span></div><span>↗</span></a>
          <a class="aag-enter-btn" href="/board">${p.cta}</a>
        </aside>
      </div>
      ${railRows()}
    `;
    hero.insertAdjacentElement('afterend',wrap);
  }
  function boot(){render();setInterval(render,1000);const mo=new MutationObserver(()=>render());mo.observe(document.body,{childList:true,subtree:true});['pushState','replaceState'].forEach(k=>{const old=history[k];history[k]=function(){const r=old.apply(this,arguments);setTimeout(render,50);return r;};});addEventListener('popstate',()=>setTimeout(render,50));}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
