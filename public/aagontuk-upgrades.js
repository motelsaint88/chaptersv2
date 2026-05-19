(function(){
  const API='/api/site/config';
  const ADMIN='/api/site';
  const EMOJIS=['❤️','😂','😭','🔥','💀','🤝','😶','👀','💯','🎵'];
  const isHome=()=>location.pathname==='/'||location.pathname==='';
  const token=()=>localStorage.getItem('ae_token')||'';
  const user=()=>{try{return JSON.parse(localStorage.getItem('ae_user')||'null')}catch{return null}};
  const authed=()=>!!token();
  const admin=()=>{const u=user();return !!u&&(u.role==='admin'||u.email==='n.i.farhan44@gmail.com')};
  let lastConfig=null;

  async function fetchConfig(){
    try{
      const r=await fetch(API,{cache:'no-store'}); if(!r.ok) return;
      const data=await r.json(); lastConfig=data;
      localStorage.setItem('ae_site_config', JSON.stringify(data.config||{}));
      applyHome(data.config||{}); renderAd(data.ad||null); renderAdminTools(data.config||{});
    }catch(e){}
  }

  function bdStatusFallback(){const parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Dhaka',hour12:false,hour:'2-digit'}).formatToParts(new Date()).reduce((a,p)=>(a[p.type]=p.value,a),{});const h=+parts.hour;return h>=19||h<5?'IS LIVE':h>=17?'PRE-BOARDING':'RETURNS 19:00'}
  function applyHome(cfg){
    const home=document.getElementById('ae-regeneration-home'); if(!home) return;
    const title=home.querySelector('.rg-title');
    if(title){ title.innerHTML='<span class="ae-word-a">AAGONTUK</span><span class="ae-word-b">EXPRESS</span>'; title.setAttribute('aria-label','Aagontuk Express'); }
    const mark=home.querySelector('.rg-mark');
    if(mark){ mark.innerHTML='<b>Aagontuk Express</b>'; }
    const state=home.querySelector('.rg-state');
    if(state){ state.textContent=cfg.paused?(cfg.pauseText||'SIGNAL PAUSED'):(cfg.label||bdStatusFallback()); }
    const statusText=home.querySelector('.rg-status-text');
    if(statusText){ statusText.textContent=cfg.paused?'Signal Paused':cfg.forceOpen?'Moonline Active':(cfg.status==='pre'?'Pre-Boarding':cfg.status==='off'?'Off Platform':'Moonline Active'); }
    const dot=home.querySelector('.rg-dot');
    if(dot){ dot.className='rg-dot '+(cfg.paused?'off':cfg.status==='pre'?'pre':cfg.status==='off'?'off':''); }
    const cta=home.querySelector('.rg-main-cta');
    if(cta){ cta.textContent=cfg.paused?'Hold':cfg.open?'Board':cfg.status==='pre'?'Wait':'Info'; cta.href=cfg.paused?'/about':cfg.open?'/board':'/about'; }
  }

  function renderAd(ad){
    const old=document.getElementById('ae-ad-card');
    if(!ad||!ad.active||!ad.image||!authed()||location.pathname==='/admin'||location.pathname==='/chat'){ if(old) old.remove(); return; }
    if(sessionStorage.getItem('ae_ad_closed')===ad._id){ if(old) old.remove(); return; }
    let el=old; if(!el){ el=document.createElement('a'); el.id='ae-ad-card'; document.body.appendChild(el); }
    el.href=ad.link||'#'; el.target=ad.link?'_blank':'_self'; el.rel='noopener';
    el.innerHTML=`<button class="ae-ad-x" type="button">×</button><img src="${ad.image}" alt="${escapeHtml(ad.title||'Aagontuk ad')}"><div class="ae-ad-body"><div class="ae-ad-k">Station Notice</div><div class="ae-ad-title">${escapeHtml(ad.title||'Aagontuk Express')}</div><div class="ae-ad-sub">${escapeHtml(ad.subtitle||'')}</div></div>`;
    el.querySelector('.ae-ad-x').onclick=(e)=>{e.preventDefault();e.stopPropagation();sessionStorage.setItem('ae_ad_closed',ad._id);el.remove();};
  }

  function renderAdminTools(cfg){
    if(location.pathname!=='/admin'||!admin()) { const old=document.getElementById('ae-admin-tools'); if(old) old.remove(); return; }
    if(document.getElementById('ae-admin-tools')) return;
    const root=document.querySelector('main')||document.getElementById('root')||document.body;
    const box=document.createElement('section'); box.id='ae-admin-tools';
    box.innerHTML=`<h2>Control Room Extras</h2><div class="ae-admin-grid"><div class="ae-admin-box"><b>Signal Control</b><div class="ae-row"><label><input type="checkbox" id="ae-paused"> Pause site</label><label><input type="checkbox" id="ae-force"> Force open</label></div><label>Pause line</label><input id="ae-pause-text" type="text" maxlength="40" placeholder="SIGNAL PAUSED"><button id="ae-save-signal">Save Signal</button><div class="ae-admin-note" id="ae-signal-note"></div></div><div class="ae-admin-box"><b>Website Ad</b><label>Ad image</label><input id="ae-ad-file" type="file" accept="image/*"><div class="ae-progress"><i id="ae-upload-bar"></i></div><label>Title</label><input id="ae-ad-title" type="text" placeholder="Short ad title"><label>Subtitle</label><input id="ae-ad-subtitle" type="text" placeholder="Optional short line"><label>Link</label><input id="ae-ad-link" type="url" placeholder="https://..."><div class="ae-row"><label><input id="ae-ad-active" type="checkbox" checked> Active</label></div><button id="ae-post-ad">Post Ad</button><div class="ae-admin-note" id="ae-ad-note"></div></div></div>`;
    root.prepend(box);
    box.querySelector('#ae-paused').checked=!!cfg.paused;
    box.querySelector('#ae-force').checked=!!cfg.forceOpen;
    box.querySelector('#ae-pause-text').value=cfg.pauseText||'SIGNAL PAUSED';
    box.querySelector('#ae-save-signal').onclick=saveSignal;
    box.querySelector('#ae-post-ad').onclick=postAd;
  }

  async function saveSignal(){
    const note=document.getElementById('ae-signal-note');
    const payload={paused:document.getElementById('ae-paused').checked,forceOpen:document.getElementById('ae-force').checked,pauseText:document.getElementById('ae-pause-text').value||'SIGNAL PAUSED'};
    note.textContent='Saving...';
    try{const r=await fetch(ADMIN+'/config',{method:'PUT',headers:{'Content-Type':'application/json',Authorization:'Bearer '+token()},body:JSON.stringify(payload)});const d=await r.json();if(!r.ok)throw new Error(d.message||'Failed');note.textContent='Signal saved.';await fetchConfig();}
    catch(e){note.textContent=e.message||'Signal failed.'}
  }
  function uploadImage(file,onProgress){
    return new Promise((resolve,reject)=>{const fd=new FormData();fd.append('image',file);const xhr=new XMLHttpRequest();xhr.open('POST','/api/admin/upload-image');xhr.setRequestHeader('Authorization','Bearer '+token());xhr.upload.onprogress=e=>{if(e.lengthComputable)onProgress(Math.round(e.loaded/e.total*100));};xhr.onload=()=>{try{const d=JSON.parse(xhr.responseText||'{}');if(xhr.status>=200&&xhr.status<300)resolve(d.url);else reject(new Error(d.message||'Upload failed'));}catch(e){reject(e)}};xhr.onerror=()=>reject(new Error('Upload failed'));xhr.send(fd);});
  }
  async function postAd(){
    const note=document.getElementById('ae-ad-note'),bar=document.getElementById('ae-upload-bar'),file=document.getElementById('ae-ad-file').files[0];
    try{if(!file)throw new Error('Select ad image.'); note.textContent='Uploading 0%'; bar.style.width='0%'; const url=await uploadImage(file,p=>{bar.style.width=p+'%';note.textContent='Uploading '+p+'%';}); note.textContent='Posting ad...'; const payload={image:url,title:document.getElementById('ae-ad-title').value,subtitle:document.getElementById('ae-ad-subtitle').value,link:document.getElementById('ae-ad-link').value,active:document.getElementById('ae-ad-active').checked}; const r=await fetch(ADMIN+'/ad',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+token()},body:JSON.stringify(payload)}); const d=await r.json(); if(!r.ok)throw new Error(d.message||'Ad failed'); note.textContent='Ad posted live.'; await fetchConfig();}
    catch(e){note.textContent=e.message||'Ad failed.'}
  }

  function enhanceChat(){
    if(location.pathname!=='/chat') return;
    const input=document.querySelector('input[placeholder="Type a message..."]');
    const sendBtn=input&&input.parentElement&&input.parentElement.querySelector('button');
    document.querySelectorAll('.chat-bubble-me,.chat-bubble-stranger').forEach(b=>{
      if(!b.dataset.aeReact){b.dataset.aeReact='1'; const row=document.createElement('div'); row.className='ae-quick-react'; row.innerHTML=EMOJIS.map(e=>`<button type="button">${e}</button>`).join(''); row.addEventListener('click',ev=>{const btn=ev.target.closest('button'); if(!btn||!input||!sendBtn)return; input.value=btn.textContent; input.dispatchEvent(new Event('input',{bubbles:true})); setTimeout(()=>sendBtn.click(),30);}); b.appendChild(row);}
      if(b.textContent.includes('Song Dedication')&&!b.dataset.aeSongLink){b.dataset.aeSongLink='1'; b.style.cursor='pointer'; b.title='Open on Spotify'; b.addEventListener('click',ev=>{if(ev.target.closest('.ae-quick-react'))return; const lines=b.innerText.split('\n').filter(Boolean); const title=lines.find(x=>!x.includes('Song Dedication')&&!x.match(/AM|PM/))||''; const artist=lines[lines.indexOf(title)+1]||''; if(title) window.open('https://open.spotify.com/search/'+encodeURIComponent(title+' '+artist),'_blank','noopener');});}
    });
  }
  function escapeHtml(s){return String(s||'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
  function tick(){try{fetchConfig();enhanceChat();}catch(e){}}
  ['pushState','replaceState'].forEach(k=>{const o=history[k];history[k]=function(){const r=o.apply(this,arguments);setTimeout(tick,80);return r;};});
  addEventListener('popstate',()=>setTimeout(tick,80));
  setInterval(()=>{try{applyHome((lastConfig&&lastConfig.config)||{});enhanceChat();}catch(e){}},700);
  setInterval(fetchConfig,15000);
  setTimeout(tick,300);
  setTimeout(tick,1200);
})();
