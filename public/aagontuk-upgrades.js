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

  function injectPolishStyles(){
    const stale=document.getElementById('ae-final-polish-v6');
    if(stale) stale.remove();
    const staleV7=document.getElementById('ae-final-polish-v7');
    if(staleV7) staleV7.remove();
    if(document.getElementById('ae-final-polish-v8')) return;
    const style=document.createElement('style');
    style.id='ae-final-polish-v8';
    style.textContent=`
      body.ae-cinema-home #ae-regeneration-home{background:#090909!important;overflow:hidden!important}
      body.ae-cinema-home #ae-regeneration-home .rg-page{background:radial-gradient(circle at 50% 44%,rgba(210,173,91,.12),transparent 30%),linear-gradient(180deg,#1a1a1a 0%,#101010 48%,#060606 100%)!important}
      body.ae-cinema-home #ae-regeneration-home .rg-page:after{background:radial-gradient(ellipse at center,transparent 54%,rgba(0,0,0,.45)),linear-gradient(90deg,rgba(0,0,0,.5),transparent 18%,transparent 82%,rgba(0,0,0,.5))!important}
      body.ae-cinema-home #ae-regeneration-home .rg-title{letter-spacing:0!important;line-height:.9!important;text-shadow:0 18px 70px rgba(0,0,0,.25)!important;background:linear-gradient(95deg,#f4ecd8 0%,#d5bd71 42%,#b89177 72%,#f0df85 100%)!important;background-size:220% 100%!important;-webkit-background-clip:text!important;background-clip:text!important;color:transparent!important}
      body.ae-cinema-home #ae-regeneration-home .rg-title .ae-word-a,
      body.ae-cinema-home #ae-regeneration-home .rg-title .ae-word-b{line-height:.9!important;letter-spacing:0!important}
      body.ae-cinema-home #ae-regeneration-home .rg-state{line-height:.92!important;letter-spacing:.01em!important;margin-top:18px!important;background:linear-gradient(95deg,#f0dd78,#c9954c,#f1e984)!important;-webkit-background-clip:text!important;background-clip:text!important;color:transparent!important}
      body.ae-cinema-home #ae-regeneration-home .rg-menu a,
      body.ae-cinema-home #ae-regeneration-home .rg-pass,
      body.ae-cinema-home #ae-regeneration-home .rg-action{letter-spacing:.045em!important}
      @media (min-width:981px){
        body.ae-cinema-home #ae-regeneration-home .rg-wrap{height:100svh!important;min-height:100svh!important;padding:clamp(34px,3.4vw,56px) clamp(54px,5vw,96px) clamp(28px,3vw,46px)!important;grid-template-rows:auto minmax(0,1fr)!important}
        body.ae-cinema-home #ae-regeneration-home .rg-nav{grid-template-columns:minmax(290px,1fr) auto minmax(290px,1fr)!important;gap:clamp(28px,3.4vw,58px)!important;min-height:62px!important}
        body.ae-cinema-home #ae-regeneration-home .rg-mark b{font-size:clamp(27px,1.75vw,34px)!important;line-height:.92!important;word-spacing:.16em!important}
        body.ae-cinema-home #ae-regeneration-home .rg-mark::after{font-size:11px!important;letter-spacing:.34em!important}
        body.ae-cinema-home #ae-regeneration-home .rg-menu{gap:clamp(30px,3.1vw,56px)!important}
        body.ae-cinema-home #ae-regeneration-home .rg-menu a,
        body.ae-cinema-home #ae-regeneration-home .rg-pass{font-size:clamp(21px,1.45vw,27px)!important}
        body.ae-cinema-home #ae-regeneration-home .rg-status{font-size:12px!important;letter-spacing:.23em!important}
        body.ae-cinema-home #ae-regeneration-home .rg-hero{height:100%!important;min-height:0!important;padding:8px 0 28px!important;align-items:center!important;justify-content:center!important}
        body.ae-cinema-home #ae-regeneration-home .rg-title{font-size:clamp(76px,7.7vw,136px)!important;max-width:min(980px,78vw)!important;margin:0 auto!important}
        body.ae-cinema-home #ae-regeneration-home .rg-state{font-size:clamp(42px,4.1vw,72px)!important}
        body.ae-cinema-home #ae-regeneration-home .rg-actions{gap:clamp(30px,3vw,48px)!important;margin-top:34px!important}
        body.ae-cinema-home #ae-regeneration-home .rg-action{font-size:clamp(20px,1.45vw,26px)!important}
      }
      @media (max-width:980px){
        body.ae-cinema-home #ae-regeneration-home .rg-wrap{height:100dvh!important;min-height:100dvh!important;padding:20px clamp(16px,4.7vw,28px) 24px!important}
        body.ae-cinema-home #ae-regeneration-home .rg-nav{gap:16px!important}
        body.ae-cinema-home #ae-regeneration-home .rg-mark b{font-size:clamp(25px,7vw,34px)!important;max-width:220px!important;line-height:.9!important}
        body.ae-cinema-home #ae-regeneration-home .rg-mark::after{font-size:10px!important;letter-spacing:.3em!important;margin-top:7px!important}
        body.ae-cinema-home #ae-regeneration-home .rg-menu{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:0!important;width:100%!important;max-width:100%!important;overflow:hidden!important}
        body.ae-cinema-home #ae-regeneration-home .rg-menu a{font-size:clamp(10px,3vw,13px)!important;padding:9px 1px!important;letter-spacing:.018em!important;min-width:0!important;max-width:100%!important;justify-self:center!important;overflow:hidden!important;text-align:center!important}
        body.ae-cinema-home #ae-regeneration-home .rg-hero{padding:10px 0 42px!important;align-items:center!important}
        body.ae-cinema-home #ae-regeneration-home .rg-title{font-size:clamp(46px,15.4vw,78px)!important;line-height:.94!important;max-width:100%!important}
        body.ae-cinema-home #ae-regeneration-home .rg-title .ae-word-a,
        body.ae-cinema-home #ae-regeneration-home .rg-title .ae-word-b{line-height:.94!important}
        body.ae-cinema-home #ae-regeneration-home .rg-state{font-size:clamp(32px,10.4vw,52px)!important;margin-top:14px!important;white-space:nowrap!important}
        body.ae-cinema-home #ae-regeneration-home .rg-actions{gap:clamp(13px,3.7vw,22px)!important;margin-top:24px!important}
        body.ae-cinema-home #ae-regeneration-home .rg-action{font-size:clamp(13px,3.9vw,17px)!important;letter-spacing:.028em!important}
      }
      @media (max-width:390px){
        body.ae-cinema-home #ae-regeneration-home .rg-wrap{padding-left:13px!important;padding-right:13px!important}
        body.ae-cinema-home #ae-regeneration-home .rg-title{font-size:clamp(43px,15vw,58px)!important}
        body.ae-cinema-home #ae-regeneration-home .rg-state{font-size:30px!important}
        body.ae-cinema-home #ae-regeneration-home .rg-menu a{font-size:12px!important}
      }
      @media (max-width:520px){
        body.ae-cinema-home #ae-regeneration-home .rg-menu{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:0!important;width:280px!important;max-width:calc(100vw - 36px)!important;margin:0 auto!important;align-self:center!important;overflow:visible!important}
        body.ae-cinema-home #ae-regeneration-home .rg-menu a{font-size:clamp(9px,2.62vw,11px)!important;letter-spacing:.01em!important;padding:7px 0!important;justify-self:center!important;max-width:100%!important;text-align:center!important;white-space:nowrap!important}
        body.ae-cinema-home #ae-regeneration-home .rg-hero{padding-bottom:32px!important}
        body.ae-cinema-home #ae-regeneration-home .rg-hero > div{transform:translateX(-10vw)!important}
      }
      body.ae-cinema-home #ae-regeneration-home .rg-hero > div{width:100%!important;max-width:100%!important;margin-left:auto!important;margin-right:auto!important}
      body:not(.ae-cinema-home) .min-h-screen.bg-night-950.flex.flex-col.pt-16.px-2{padding-left:clamp(12px,2.5vw,36px)!important;padding-right:clamp(12px,2.5vw,36px)!important;background:radial-gradient(circle at 50% 0%,rgba(217,155,66,.08),transparent 34%),#080810!important}
      body:not(.ae-cinema-home) .chat-bubble-me,
      body:not(.ae-cinema-home) .chat-bubble-stranger{max-width:min(76vw,520px)!important;line-height:1.55!important}
      @media(max-width:640px){
        body:not(.ae-cinema-home) .min-h-screen.bg-night-950.flex.flex-col.pt-16.px-2{padding-left:12px!important;padding-right:12px!important}
        body:not(.ae-cinema-home) .chat-bubble-me,
        body:not(.ae-cinema-home) .chat-bubble-stranger{max-width:86vw!important}
      }
      #ae-waiting-lounge{display:none!important}
      body.ae-chat-route .min-h-screen.bg-night-950.flex.flex-col.pt-16.px-2{min-height:100dvh!important;padding-top:74px!important;background:radial-gradient(circle at 50% 0%,rgba(217,155,66,.08),transparent 34%),#080810!important}
      body.ae-chat-route .min-h-screen.bg-night-950.flex.flex-col.pt-16.px-2 > .glass{position:relative!important;z-index:2!important;display:flex!important;visibility:visible!important;opacity:1!important}
      body.ae-chat-route .flex-1.overflow-y-auto{position:relative!important;z-index:1!important;visibility:visible!important;opacity:1!important;min-height:0!important;max-height:none!important;background:linear-gradient(180deg,rgba(255,255,255,.026),rgba(0,0,0,.12))!important}
      body.ae-chat-route .flex-1.overflow-y-auto .h-64{min-height:360px!important;height:auto!important;border:1px solid rgba(238,229,203,.11)!important;background:radial-gradient(circle at 50% 0%,rgba(217,193,95,.13),transparent 34%),rgba(10,10,10,.62)!important}
      @media(max-width:640px){
        body.ae-chat-route .min-h-screen.bg-night-950.flex.flex-col.pt-16.px-2{padding-top:70px!important;padding-left:10px!important;padding-right:10px!important}
        body.ae-chat-route .flex-1.overflow-y-auto .h-64{min-height:320px!important}
      }
    `;
    document.head.appendChild(style);
  }

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
  function syncWaitingLounge(){
    const old=document.getElementById('ae-waiting-lounge');
    document.body.classList.remove('ae-chat-searching');
    if(old) old.remove();
  }
  function escapeHtml(s){return String(s||'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
  function tick(){try{injectPolishStyles();fetchConfig();enhanceChat();syncWaitingLounge();}catch(e){}}
  ['pushState','replaceState'].forEach(k=>{const o=history[k];history[k]=function(){const r=o.apply(this,arguments);setTimeout(tick,80);return r;};});
  addEventListener('popstate',()=>setTimeout(tick,80));
  setInterval(()=>{try{injectPolishStyles();applyHome((lastConfig&&lastConfig.config)||{});enhanceChat();syncWaitingLounge();}catch(e){}},700);
  setInterval(fetchConfig,15000);
  setTimeout(tick,300);
  setTimeout(tick,1200);
})();
