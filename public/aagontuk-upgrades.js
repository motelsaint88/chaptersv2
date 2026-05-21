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
  let aeReplyTarget=null;
  let aeBypassSend=false;

  function injectPolishStyles(){
    const stale=document.getElementById('ae-final-polish-v6');
    if(stale) stale.remove();
    const staleV7=document.getElementById('ae-final-polish-v7');
    if(staleV7) staleV7.remove();
    const staleV8=document.getElementById('ae-final-polish-v8');
    if(staleV8) staleV8.remove();
    if(document.getElementById('ae-final-polish-v9')) return;
    const style=document.createElement('style');
    style.id='ae-final-polish-v9';
    style.textContent=`
      html.ae-home-boot #root{visibility:hidden!important}
      body.ae-cinema-home{overflow:hidden!important;background:#090909!important}
      body.ae-cinema-home #root{display:none!important}
      #ae-regeneration-home{display:none;position:fixed;inset:0;z-index:2147483600;background:#090909;color:#eee5cb;overflow:hidden;font-family:"DM Sans",system-ui,sans-serif}
      body.ae-cinema-home #ae-regeneration-home{display:block!important}
      #ae-regeneration-home *{box-sizing:border-box}
      #ae-regeneration-home a{text-decoration:none}
      #ae-regeneration-home .rg-page{min-height:100dvh;position:relative;background:radial-gradient(circle at 50% 44%,rgba(210,173,91,.12),transparent 30%),linear-gradient(180deg,#1a1a1a 0%,#101010 48%,#060606 100%)}
      #ae-regeneration-home .rg-page:before{content:"";position:fixed;inset:0;pointer-events:none;background:linear-gradient(90deg,rgba(255,255,255,.022) 1px,transparent 1px),linear-gradient(180deg,rgba(255,255,255,.018) 1px,transparent 1px);background-size:88px 88px;opacity:.24}
      #ae-regeneration-home .rg-page:after{content:"";position:fixed;inset:0;pointer-events:none;background:radial-gradient(ellipse at center,transparent 54%,rgba(0,0,0,.45)),linear-gradient(90deg,rgba(0,0,0,.5),transparent 18%,transparent 82%,rgba(0,0,0,.5));mix-blend-mode:multiply}
      #ae-regeneration-home .rg-grain{position:fixed;inset:0;pointer-events:none;opacity:.12;z-index:1;background-image:radial-gradient(rgba(255,255,255,.11) .7px,transparent .7px);background-size:3px 3px;mix-blend-mode:overlay}
      #ae-regeneration-home .rg-wrap{position:relative;z-index:2;width:100%;max-width:100vw}
      #ae-regeneration-home .rg-nav{position:relative;z-index:20;text-transform:uppercase}
      #ae-regeneration-home .rg-mark{color:#bfb5a4}
      #ae-regeneration-home .rg-mark b{font-family:"Anton","Bebas Neue",Impact,sans-serif;color:#f3ead8;text-transform:uppercase}
      #ae-regeneration-home .rg-mark:after{content:"MOONLINE";color:#bfb5a4}
      #ae-regeneration-home .rg-menu a,
      #ae-regeneration-home .rg-pass,
      #ae-regeneration-home .rg-action{font-family:"Anton","Bebas Neue",Impact,sans-serif;color:#eee5d0;text-transform:uppercase}
      #ae-regeneration-home .rg-status{display:flex;align-items:center;gap:9px;font-family:"IBM Plex Mono",monospace;color:#bfb5a4;text-transform:uppercase}
      #ae-regeneration-home .rg-dot{width:9px;height:9px;border-radius:99px;background:#20c970;box-shadow:0 0 18px #20c970;flex:0 0 auto}
      #ae-regeneration-home .rg-dot.pre{background:#d99a39;box-shadow:0 0 18px #d99a39}
      #ae-regeneration-home .rg-dot.off{background:#d85c4a;box-shadow:0 0 18px #d85c4a}
      #ae-regeneration-home .rg-right{display:flex;align-items:center}
      #ae-regeneration-home .rg-hero{position:relative;z-index:3;text-align:center}
      #ae-regeneration-home .rg-hero > div{width:100%;max-width:100%;margin-left:auto!important;margin-right:auto!important;transform:none!important}
      #ae-regeneration-home .rg-kicker,
      #ae-regeneration-home .rg-foot,
      #ae-regeneration-home .rg-scroll{display:none!important}
      #ae-regeneration-home .rg-title{font-family:"Anton","Bebas Neue",Impact,sans-serif!important;text-transform:uppercase!important;text-align:center!important;letter-spacing:0!important;line-height:.9!important;width:100%!important;max-width:100%!important;overflow:visible!important;white-space:normal!important;background:linear-gradient(95deg,#f4ecd8 0%,#d5bd71 42%,#b89177 72%,#f0df85 100%)!important;background-size:220% 100%!important;-webkit-background-clip:text!important;background-clip:text!important;color:transparent!important;text-shadow:0 18px 70px rgba(0,0,0,.25)!important;margin:0 auto!important}
      #ae-regeneration-home .rg-title .ae-word-a,
      #ae-regeneration-home .rg-title .ae-word-b{display:block!important;width:100%!important;white-space:nowrap!important;text-align:center!important;color:transparent!important;background:inherit!important;-webkit-background-clip:inherit!important;background-clip:inherit!important;font:inherit!important;letter-spacing:inherit!important;line-height:.9!important}
      #ae-regeneration-home .rg-title .ae-word-a:after{content:""!important}
      #ae-regeneration-home .rg-state{font-family:"Anton","Bebas Neue",Impact,sans-serif!important;text-transform:uppercase!important;line-height:.92!important;letter-spacing:.01em!important;background:linear-gradient(95deg,#f0dd78,#c9954c,#f1e984)!important;-webkit-background-clip:text!important;background-clip:text!important;color:transparent!important;margin:18px 0 0!important;text-align:center!important}
      #ae-regeneration-home .rg-actions{display:flex;justify-content:center;align-items:center;flex-wrap:nowrap}
      #ae-regeneration-home .rg-action{position:relative;white-space:nowrap;line-height:1}
      #ae-regeneration-home .rg-action.primary{color:#e4cf62!important}
      #ae-regeneration-home .rg-action:after{content:"";position:absolute;left:0;right:0;bottom:0;height:3px;background:#ead95f;transform:scaleX(0);transform-origin:left;transition:transform .25s ease}
      #ae-regeneration-home .rg-action:hover:after{transform:scaleX(1)}
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
        body.ae-cinema-home #ae-regeneration-home .rg-wrap{height:100svh!important;min-height:100svh!important;padding:clamp(34px,3.4vw,56px) clamp(54px,5vw,96px) clamp(28px,3vw,46px)!important;display:grid!important;grid-template-rows:auto minmax(0,1fr)!important;overflow:hidden!important}
        body.ae-cinema-home #ae-regeneration-home .rg-nav{display:grid!important;grid-template-columns:minmax(290px,1fr) auto minmax(290px,1fr)!important;align-items:center!important;gap:clamp(28px,3.4vw,58px)!important;min-height:62px!important;border:0!important;padding:0!important}
        body.ae-cinema-home #ae-regeneration-home .rg-mark{display:flex!important;align-items:flex-end!important;gap:16px!important;white-space:nowrap!important;font-size:0!important}
        body.ae-cinema-home #ae-regeneration-home .rg-mark b{font-size:clamp(27px,1.75vw,34px)!important;line-height:.92!important;word-spacing:.16em!important}
        body.ae-cinema-home #ae-regeneration-home .rg-mark::after{font-size:11px!important;letter-spacing:.34em!important}
        body.ae-cinema-home #ae-regeneration-home .rg-menu{display:flex!important;justify-content:center!important;align-items:center!important;gap:clamp(30px,3.1vw,56px)!important;white-space:nowrap!important}
        body.ae-cinema-home #ae-regeneration-home .rg-menu a,
        body.ae-cinema-home #ae-regeneration-home .rg-pass{font-size:clamp(21px,1.45vw,27px)!important}
        body.ae-cinema-home #ae-regeneration-home .rg-right{justify-content:flex-end!important;gap:28px!important}
        body.ae-cinema-home #ae-regeneration-home .rg-status{font-size:12px!important;letter-spacing:.23em!important}
        body.ae-cinema-home #ae-regeneration-home .rg-hero{height:100%!important;min-height:0!important;display:flex!important;align-items:center!important;justify-content:center!important;padding:8px 0 28px!important}
        body.ae-cinema-home #ae-regeneration-home .rg-title{font-size:clamp(76px,7.7vw,136px)!important;max-width:min(980px,78vw)!important;margin:0 auto!important}
        body.ae-cinema-home #ae-regeneration-home .rg-state{font-size:clamp(42px,4.1vw,72px)!important}
        body.ae-cinema-home #ae-regeneration-home .rg-actions{gap:clamp(30px,3vw,48px)!important;margin-top:34px!important}
        body.ae-cinema-home #ae-regeneration-home .rg-action{font-size:clamp(20px,1.45vw,26px)!important}
      }
      @media (max-width:980px){
        body.ae-cinema-home #ae-regeneration-home .rg-wrap{height:100dvh!important;min-height:100dvh!important;padding:20px clamp(16px,4.7vw,28px) 24px!important;display:flex!important;flex-direction:column!important;overflow:hidden!important}
        body.ae-cinema-home #ae-regeneration-home .rg-nav{display:flex!important;flex-direction:column!important;align-items:stretch!important;gap:16px!important;border:0!important;padding:0!important}
        body.ae-cinema-home #ae-regeneration-home .rg-mark{display:block!important;width:100%!important;white-space:normal!important;text-align:left!important;font-size:0!important}
        body.ae-cinema-home #ae-regeneration-home .rg-mark b{font-size:clamp(25px,7vw,34px)!important;max-width:220px!important;line-height:.9!important}
        body.ae-cinema-home #ae-regeneration-home .rg-mark::after{font-size:10px!important;letter-spacing:.3em!important;margin-top:7px!important}
        body.ae-cinema-home #ae-regeneration-home .rg-menu{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:0!important;width:100%!important;max-width:100%!important;overflow:hidden!important}
        body.ae-cinema-home #ae-regeneration-home .rg-menu a{font-size:clamp(10px,3vw,13px)!important;padding:9px 1px!important;letter-spacing:.018em!important;min-width:0!important;max-width:100%!important;justify-self:center!important;overflow:hidden!important;text-align:center!important}
        body.ae-cinema-home #ae-regeneration-home .rg-right{display:none!important}
        body.ae-cinema-home #ae-regeneration-home .rg-hero{flex:1!important;min-height:0!important;display:flex!important;align-items:center!important;justify-content:center!important;padding:10px 0 42px!important}
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
        body.ae-cinema-home #ae-regeneration-home .rg-hero > div{transform:none!important}
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
      .ae-quick-react{display:flex;gap:7px;margin-top:12px;opacity:.56;transition:.18s ease;align-items:center;flex-wrap:wrap}
      .chat-bubble-me:hover .ae-quick-react,.chat-bubble-stranger:hover .ae-quick-react{opacity:1}
      .ae-quick-react button{width:34px;height:30px;border-radius:999px;border:1px solid rgba(238,229,203,.08);background:rgba(255,255,255,.035);display:inline-flex;align-items:center;justify-content:center;cursor:pointer;transition:.18s ease;font-size:15px}
      .ae-quick-react button:hover{background:rgba(217,193,95,.15);border-color:rgba(217,193,95,.28);transform:translateY(-1px)}
      .ae-reaction-bar{display:flex;gap:5px;flex-wrap:wrap;margin-top:8px;min-height:20px}
      .ae-reaction-pill{display:inline-flex;align-items:center;justify-content:center;min-width:28px;height:23px;padding:0 8px;border-radius:999px;border:1px solid rgba(217,193,95,.22);background:rgba(217,193,95,.12);box-shadow:0 8px 22px rgba(0,0,0,.18);font-size:14px}
      .ae-protocol-hidden{display:none!important}
      .ae-bubble-more{position:absolute;top:10px;right:12px;z-index:8;width:30px;height:30px;border-radius:999px;border:1px solid rgba(238,229,203,.09);background:rgba(0,0,0,.22);color:#d6cfbd;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;opacity:0;transition:.16s ease;font-size:18px;line-height:1}
      .chat-bubble-me,.chat-bubble-stranger{position:relative!important;z-index:1}
      .chat-bubble-me:hover,.chat-bubble-stranger:hover{z-index:9}
      .chat-bubble-me:hover .ae-bubble-more,.chat-bubble-stranger:hover .ae-bubble-more,.ae-bubble-more[aria-expanded="true"]{opacity:1}
      .ae-bubble-menu{position:fixed;z-index:2147483636;width:148px;padding:6px;border-radius:16px;border:1px solid rgba(238,229,203,.12);background:rgba(12,12,16,.97);box-shadow:0 18px 48px rgba(0,0,0,.42)}
      .ae-bubble-menu button{width:100%;height:34px;border:0;border-radius:11px;background:transparent;color:#eee5cb;display:flex;align-items:center;gap:9px;padding:0 10px;font:700 12px/1 "DM Sans",system-ui,sans-serif;cursor:pointer;text-align:left}
      .ae-bubble-menu button:hover{background:rgba(217,193,95,.12);color:#f2df83}
      .ae-react-pop{position:fixed;z-index:2147483637;display:flex;gap:6px;padding:8px;border-radius:999px;border:1px solid rgba(238,229,203,.12);background:rgba(12,12,16,.97);box-shadow:0 18px 48px rgba(0,0,0,.42)}
      .ae-react-pop button{width:32px;height:32px;border-radius:999px;border:1px solid rgba(238,229,203,.08);background:rgba(255,255,255,.04);cursor:pointer;font-size:15px}
      .ae-react-pop button:hover{background:rgba(217,193,95,.15);transform:translateY(-1px)}
      .ae-reply-preview{display:flex;align-items:center;justify-content:space-between;gap:10px;width:min(720px,100%);margin:0 auto 10px;padding:10px 12px;border-radius:16px;border:1px solid rgba(217,193,95,.16);background:rgba(217,193,95,.08);color:#eee5cb}
      .ae-reply-preview b{font:800 10px/1 "IBM Plex Mono",monospace;letter-spacing:.14em;text-transform:uppercase;color:#d9c15f;display:block;margin-bottom:4px}
      .ae-reply-preview span{display:block;max-width:62vw;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font:600 13px/1.3 "DM Sans",system-ui,sans-serif}
      .ae-reply-preview button{border:0;background:transparent;color:#eee5cb;font-size:20px;cursor:pointer}
      .ae-reply-card{border-left:3px solid rgba(217,193,95,.72);padding:8px 10px;margin-bottom:10px;border-radius:10px;background:rgba(217,193,95,.08)}
      .ae-reply-card small{display:block;font:800 10px/1 "IBM Plex Mono",monospace;letter-spacing:.12em;text-transform:uppercase;color:#d9c15f;margin-bottom:5px}
      .ae-reply-card span{display:block;font:600 13px/1.35 "DM Sans",system-ui,sans-serif;color:#d6cfbd}
      .ae-report-modal{position:fixed;inset:0;z-index:2147483641;background:rgba(3,3,6,.72);backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:center;padding:16px}
      .ae-report-sheet{width:min(480px,100%);border:1px solid rgba(238,229,203,.13);border-radius:24px;background:linear-gradient(180deg,rgba(20,20,28,.98),rgba(8,8,12,.98));box-shadow:0 30px 90px rgba(0,0,0,.56);padding:18px}
      .ae-report-sheet h3{font:800 18px/1.2 "DM Sans",system-ui,sans-serif;color:#fff6df;margin:0 0 8px}
      .ae-report-sheet p{font:500 13px/1.45 "DM Sans",system-ui,sans-serif;color:#9b96bb;margin:0 0 14px}
      .ae-report-sheet textarea{width:100%;min-height:96px;resize:vertical;border-radius:16px;border:1px solid rgba(238,229,203,.13);background:#0c0c13;color:#eee5cb;padding:12px;font:500 14px/1.4 "DM Sans",system-ui,sans-serif}
      .ae-report-actions{display:flex;justify-content:flex-end;gap:10px;margin-top:12px}
      .ae-report-actions button{height:40px;border-radius:14px;padding:0 16px;border:1px solid rgba(238,229,203,.13);background:rgba(255,255,255,.04);color:#eee5cb;cursor:pointer;font:800 12px/1 "IBM Plex Mono",monospace;text-transform:uppercase;letter-spacing:.08em}
      .ae-report-actions button.primary{border:0;background:#d9b14e;color:#090909}
      .ae-staff-triage{max-width:1120px;margin:0 auto 22px;padding:18px;border:1px solid rgba(238,229,203,.10);border-radius:22px;background:rgba(10,10,16,.62);box-shadow:0 24px 70px rgba(0,0,0,.28)}
      .ae-staff-head{display:flex;justify-content:space-between;align-items:center;gap:14px;margin-bottom:14px}
      .ae-staff-head h2{margin:0;font:800 22px/1.1 "DM Sans",system-ui,sans-serif;color:#fff6df}
      .ae-staff-tabs{display:flex;gap:8px;flex-wrap:wrap}
      .ae-staff-tabs button,.ae-staff-card button,.ae-staff-search button{height:34px;border-radius:999px;border:1px solid rgba(238,229,203,.13);background:rgba(255,255,255,.035);color:#eee5cb;padding:0 12px;cursor:pointer;font:800 11px/1 "IBM Plex Mono",monospace;text-transform:uppercase;letter-spacing:.06em}
      .ae-staff-tabs button.active,.ae-staff-card button.primary,.ae-staff-search button{border-color:transparent;background:#d9b14e;color:#090909}
      .ae-staff-grid{display:grid;gap:10px}
      .ae-staff-card{border:1px solid rgba(238,229,203,.08);border-radius:16px;background:rgba(255,255,255,.03);padding:13px;color:#eee5cb}
      .ae-staff-card b{display:block;font:800 14px/1.25 "DM Sans",system-ui,sans-serif;color:#fff6df;margin-bottom:5px}
      .ae-staff-card p{margin:6px 0;color:#bdb7d4;font:500 13px/1.45 "DM Sans",system-ui,sans-serif}
      .ae-staff-meta{font:700 10px/1.4 "IBM Plex Mono",monospace;letter-spacing:.08em;text-transform:uppercase;color:#d9c15f}
      .ae-staff-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}
      .ae-staff-search{display:flex;gap:8px;margin:12px 0}
      .ae-staff-search input{flex:1;min-width:0;border-radius:14px;border:1px solid rgba(238,229,203,.13);background:#0c0c13;color:#eee5cb;padding:0 12px;height:40px}
      .ae-chat-song-card{min-width:min(360px,70vw);display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:13px;border:1px solid rgba(217,193,95,.20);background:radial-gradient(circle at 0 0,rgba(217,193,95,.16),transparent 34%),rgba(9,9,11,.46);border-radius:18px;padding:13px 14px;margin:-2px 0;color:#eee5cb;cursor:pointer}
      .ae-chat-song-art{width:42px;height:42px;border-radius:12px;background:linear-gradient(135deg,rgba(217,193,95,.28),rgba(255,255,255,.05));display:flex;align-items:center;justify-content:center;color:#ead95f;font-size:19px}
      .ae-chat-song-k{font:600 10px/1 "IBM Plex Mono",monospace;letter-spacing:.18em;text-transform:uppercase;color:#d9c15f;margin-bottom:5px}
      .ae-chat-song-title{font:700 15px/1.25 "DM Sans",system-ui,sans-serif;color:#fff6df}
      .ae-chat-song-artist{font:500 12px/1.35 "IBM Plex Mono",monospace;color:#9b96bb;margin-top:3px}
      .ae-chat-song-go{font-size:18px;color:#d9c15f}
      .ae-song-trigger{height:52px;width:52px;border-radius:18px;border:1px solid rgba(238,229,203,.14);background:rgba(255,255,255,.04);color:#d9c15f;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;flex:0 0 auto;font-size:20px}
      .ae-song-trigger:hover{background:rgba(217,193,95,.13)}
      .ae-song-modal{position:fixed;inset:0;z-index:2147483640;background:rgba(3,3,6,.72);backdrop-filter:blur(12px);display:flex;align-items:flex-end;justify-content:center;padding:18px}
      .ae-song-sheet{width:min(620px,100%);max-height:min(720px,88dvh);overflow:hidden;border:1px solid rgba(238,229,203,.13);border-radius:28px;background:linear-gradient(180deg,rgba(20,20,28,.97),rgba(8,8,12,.98));box-shadow:0 30px 90px rgba(0,0,0,.56);display:flex;flex-direction:column}
      .ae-song-head{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:18px 20px;border-bottom:1px solid rgba(238,229,203,.08)}
      .ae-song-head b{font:700 16px/1 "DM Sans",system-ui,sans-serif;color:#fff6df}
      .ae-song-head small{display:block;margin-top:5px;font:500 10px/1 "IBM Plex Mono",monospace;letter-spacing:.16em;text-transform:uppercase;color:#9b96bb}
      .ae-song-close{width:34px;height:34px;border-radius:999px;border:1px solid rgba(238,229,203,.12);background:rgba(255,255,255,.04);color:#eee5cb;cursor:pointer}
      .ae-song-search{display:flex;gap:10px;padding:16px 20px;border-bottom:1px solid rgba(238,229,203,.08)}
      .ae-song-search input{flex:1;min-width:0;height:46px;border-radius:16px;border:1px solid rgba(238,229,203,.13);background:#0c0c13;color:#eee5cb;padding:0 14px;font:500 14px/1 "DM Sans",system-ui,sans-serif}
      .ae-song-search button{height:46px;border-radius:16px;border:0;background:#d9b14e;color:#090909;padding:0 18px;font:800 12px/1 "IBM Plex Mono",monospace;letter-spacing:.1em;text-transform:uppercase;cursor:pointer}
      .ae-song-results{padding:10px;overflow:auto}
      .ae-song-result{width:100%;display:grid;grid-template-columns:48px 1fr auto;align-items:center;gap:12px;border:1px solid transparent;background:transparent;color:#eee5cb;text-align:left;padding:10px;border-radius:16px;cursor:pointer}
      .ae-song-result:hover{background:rgba(255,255,255,.045);border-color:rgba(217,193,95,.16)}
      .ae-song-result img{width:48px;height:48px;border-radius:13px;object-fit:cover;background:#151515}
      .ae-song-result-title{font:700 14px/1.25 "DM Sans",system-ui,sans-serif;color:#fff6df}
      .ae-song-result-artist{font:500 12px/1.35 "IBM Plex Mono",monospace;color:#9b96bb;margin-top:3px}
      .ae-song-result-send{font:800 11px/1 "IBM Plex Mono",monospace;letter-spacing:.08em;color:#d9c15f;text-transform:uppercase}
      .ae-song-note{padding:18px 20px;font:500 13px/1.45 "DM Sans",system-ui,sans-serif;color:#9b96bb;text-align:center}
      @media(max-width:640px){
        .ae-quick-react{gap:5px;margin-top:10px}
        .ae-quick-react button{width:30px;height:28px;font-size:14px}
        .ae-chat-song-card{min-width:min(310px,76vw);grid-template-columns:auto 1fr;padding:12px}
        .ae-chat-song-go{display:none}
        .ae-song-trigger{height:48px;width:48px;border-radius:16px}
        .ae-song-modal{padding:10px;align-items:flex-end}
        .ae-song-sheet{border-radius:24px;max-height:86dvh}
      }
      #ae-waiting-lounge{display:none!important}
      body.ae-chat-route .min-h-screen.bg-night-950.flex.flex-col.pt-16.px-2{min-height:100dvh!important;padding-top:74px!important;padding-left:clamp(12px,2.4vw,48px)!important;padding-right:clamp(12px,2.4vw,48px)!important;background:radial-gradient(circle at 50% 0%,rgba(217,155,66,.08),transparent 34%),#080810!important;overflow-x:hidden!important}
      body.ae-chat-route .min-h-screen.bg-night-950.flex.flex-col.pt-16.px-2 > .glass{position:relative!important;z-index:2!important;display:flex!important;visibility:visible!important;opacity:1!important}
      body.ae-chat-route .max-w-3xl{width:min(100%,820px)!important;margin-left:auto!important;margin-right:auto!important}
      body.ae-chat-route .flex-1.overflow-y-auto{position:relative!important;z-index:1!important;visibility:visible!important;opacity:1!important;min-height:0!important;max-height:none!important;width:min(100%,820px)!important;margin-left:auto!important;margin-right:auto!important;overflow-x:visible!important;background:linear-gradient(180deg,rgba(255,255,255,.026),rgba(0,0,0,.12))!important}
      body.ae-chat-route .rounded-t-2xl{width:min(100%,820px)!important;margin-left:auto!important;margin-right:auto!important}
      body.ae-chat-route .chat-bubble-me,body.ae-chat-route .chat-bubble-stranger{max-width:min(74vw,520px)!important}
      body.ae-chat-route .flex-1.overflow-y-auto .h-64{min-height:360px!important;height:auto!important;border:1px solid rgba(238,229,203,.11)!important;background:radial-gradient(circle at 50% 0%,rgba(217,193,95,.13),transparent 34%),rgba(10,10,10,.62)!important}
      @media(max-width:640px){
        body.ae-chat-route .min-h-screen.bg-night-950.flex.flex-col.pt-16.px-2{padding-top:70px!important;padding-left:10px!important;padding-right:10px!important}
        body.ae-chat-route .max-w-3xl,body.ae-chat-route .flex-1.overflow-y-auto,body.ae-chat-route .rounded-t-2xl{width:100%!important}
        body.ae-chat-route .chat-bubble-me,body.ae-chat-route .chat-bubble-stranger{max-width:calc(100vw - 46px)!important}
        body.ae-chat-route .flex-1.overflow-y-auto .h-64{min-height:320px!important}
      }
    `;
    document.head.appendChild(style);
  }

  function syncRouteClasses(){
    const home=isHome();
    document.documentElement.classList.toggle('ae-home-boot', home);
    document.body.classList.toggle('ae-cinema-home', home);
    document.body.classList.toggle('ae-chat-route', location.pathname.startsWith('/chat'));
  }

  function homePhase(){
    const parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Dhaka',hour12:false,hour:'2-digit'}).formatToParts(new Date()).reduce((a,p)=>(a[p.type]=p.value,a),{});
    const h=+parts.hour;
    return h>=19||h<5?'live':h>=17?'pre':'off';
  }

  function bdClock(){
    const parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Dhaka',hour12:false,hour:'2-digit',minute:'2-digit',second:'2-digit'}).formatToParts(new Date()).reduce((a,p)=>(a[p.type]=p.value,a),{});
    return `${parts.hour}:${parts.minute}:${parts.second}`;
  }

  function ensureCinemaHome(){
    syncRouteClasses();
    document.getElementById('ae-opening')?.remove();
    if(!isHome()){
      document.getElementById('ae-regeneration-home')?.remove();
      return;
    }
    let home=document.getElementById('ae-regeneration-home');
    if(!home){
      home=document.createElement('div');
      home.id='ae-regeneration-home';
      home.innerHTML=`<main class="rg-page"><div class="rg-grain"></div><div class="rg-wrap"><header class="rg-nav"><a class="rg-mark" href="/"><b>AAGONTUK EXPRESS</b></a><nav class="rg-menu"><a href="/board">Board</a><a href="/confessions">Confessions</a><a href="/games">Games</a><a href="/about">Info</a></nav><div class="rg-right"><div class="rg-status"><i class="rg-dot"></i><span class="rg-status-text">Moonline Active</span></div><a class="rg-pass" href="/login">Pass</a></div></header><section class="rg-hero"><div><div class="rg-kicker">Platform 01 / Bangladesh Time</div><h1 class="rg-title" aria-label="Aagontuk Express"><span class="ae-word-a">AAGONTUK</span><span class="ae-word-b">EXPRESS</span></h1><h2 class="rg-state">IS LIVE</h2><div class="rg-actions"><a class="rg-action primary rg-main-cta" href="/board">Board</a><a class="rg-action" href="/confessions">Ticket Wall</a><a class="rg-action" href="/games">Table Tray</a></div></div></section></div></main>`;
      document.body.prepend(home);
    }
    updateHomeShell();
  }

  function updateHomeShell(){
    const home=document.getElementById('ae-regeneration-home');
    if(!home) return;
    const phase=homePhase();
    const cfg={live:{state:'IS LIVE',nav:'Moonline Active',dot:'',cta:'Board',href:'/board'},pre:{state:'PRE-BOARDING',nav:'Pre-Boarding',dot:'pre',cta:'Wait',href:'/board'},off:{state:'RETURNS 19:00',nav:'Off Platform',dot:'off',cta:'Info',href:'/about'}}[phase];
    const state=home.querySelector('.rg-state');
    if(state && !lastConfig) state.textContent=cfg.state;
    const statusText=home.querySelector('.rg-status-text');
    if(statusText && !lastConfig) statusText.textContent=cfg.nav;
    const dot=home.querySelector('.rg-dot');
    if(dot && !lastConfig) dot.className='rg-dot '+cfg.dot;
    const cta=home.querySelector('.rg-main-cta');
    if(cta && !lastConfig){ cta.textContent=cfg.cta; cta.href=cfg.href; }
    const mark=home.querySelector('.rg-mark b');
    if(mark) mark.textContent='AAGONTUK EXPRESS';
    const title=home.querySelector('.rg-title');
    if(title) title.innerHTML='<span class="ae-word-a">AAGONTUK</span><span class="ae-word-b">EXPRESS</span>';
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

  function chatInput(){
    const input=document.querySelector('input[placeholder="Type a message..."]');
    const sendBtn=input&&input.parentElement&&input.parentElement.querySelector('button:last-child');
    return { input, sendBtn };
  }

  function setNativeInputValue(input,value){
    const setter=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value')?.set;
    if(setter) setter.call(input,value);
    else input.value=value;
    input.dispatchEvent(new Event('input',{bubbles:true}));
    input.dispatchEvent(new Event('change',{bubbles:true}));
  }

  function sendChatProtocol(text){
    const { input, sendBtn }=chatInput();
    if(!input||!sendBtn) return false;
    setNativeInputValue(input,text);
    aeBypassSend=true;
    setTimeout(()=>{sendBtn.click(); setTimeout(()=>{aeBypassSend=false;},60);},80);
    return true;
  }

  function chatBubbleLine(b){
    return (b.innerText||b.textContent||'').split('\n').map(x=>x.trim()).filter(Boolean)[0]||'';
  }

  function parseReactionProtocol(text){
    const m=String(text||'').match(/\[\[AE_REACTION\|([^|]+)\|(\d+)\|(.+?)\]\]/);
    if(!m) return null;
    try{return { side:m[1], index:+m[2], emoji:decodeURIComponent(m[3]) };}catch{return null;}
  }

  function parseSongProtocol(text){
    const m=String(text||'').match(/\[\[AE_SONG\|([^|]*)\|([^|]*)\|([^|]*)\]\]/);
    if(!m) return null;
    try{
      return {
        title:decodeURIComponent(m[1]||''),
        artist:decodeURIComponent(m[2]||''),
        url:decodeURIComponent(m[3]||'')
      };
    }catch{return null;}
  }

  function parseReplyProtocol(text){
    const m=String(text||'').match(/\[\[AE_REPLY\|([^|]*)\|([^]*?)\]\]/);
    if(!m) return null;
    try{
      return {
        quote:decodeURIComponent(m[1]||''),
        body:decodeURIComponent(m[2]||'')
      };
    }catch{return null;}
  }

  function sideForBubble(b){
    return b.classList.contains('chat-bubble-me')?'me':'stranger';
  }

  function indexForBubble(b){
    const side=sideForBubble(b);
    return [...document.querySelectorAll('.chat-bubble-'+side)].filter(x=>!x.classList.contains('ae-protocol-hidden')).indexOf(b);
  }

  function targetSideForProtocol(protocolSide, protocolBubble){
    if(sideForBubble(protocolBubble)==='me') return protocolSide;
    return protocolSide==='me'?'stranger':'me';
  }

  function addReactionToBubble(target, emoji, source='me'){
    if(!target) return;
    let bar=target.querySelector(':scope > .ae-reaction-bar');
    if(!bar){ bar=document.createElement('div'); bar.className='ae-reaction-bar'; target.appendChild(bar); }
    let pill=bar.querySelector(`[data-source="${source}"]`);
    if(!pill){ pill=document.createElement('span'); pill.className='ae-reaction-pill'; pill.dataset.source=source; bar.appendChild(pill); }
    pill.className='ae-reaction-pill';
    pill.textContent=emoji;
  }

  function placeFloating(el,anchor,preferred='menu'){
    const rect=anchor.getBoundingClientRect();
    const vw=Math.max(document.documentElement.clientWidth,window.innerWidth||0);
    const vh=Math.max(document.documentElement.clientHeight,window.innerHeight||0);
    const width=preferred==='react'?Math.min(340,vw-20):148;
    el.style.width=preferred==='react'?'auto':width+'px';
    document.body.appendChild(el);
    const box=el.getBoundingClientRect();
    let left=rect.left;
    if(left+box.width>vw-10) left=vw-box.width-10;
    if(left<10) left=10;
    let top=rect.bottom+8;
    if(top+box.height>vh-10) top=rect.top-box.height-8;
    if(top<10) top=10;
    el.style.left=Math.round(left)+'px';
    el.style.top=Math.round(top)+'px';
  }

  function closeChatFloaters(){
    document.querySelectorAll('.ae-bubble-menu,.ae-react-pop').forEach(x=>x.remove());
    document.querySelectorAll('.ae-bubble-more').forEach(x=>x.setAttribute('aria-expanded','false'));
  }

  function renderProtocolBubbles(){
    document.querySelectorAll('.chat-bubble-me,.chat-bubble-stranger').forEach(b=>{
      const line=chatBubbleLine(b);
      const reaction=parseReactionProtocol(line);
      if(reaction){
        if(!b.dataset.aeProtocolDone){
          b.dataset.aeProtocolDone='1';
          b.classList.add('ae-protocol-hidden');
          if(sideForBubble(b)!=='me'){
            const targetSide=targetSideForProtocol(reaction.side,b);
            const target=[...document.querySelectorAll('.chat-bubble-'+targetSide)].filter(x=>!x.classList.contains('ae-protocol-hidden'))[reaction.index];
            addReactionToBubble(target,reaction.emoji,'stranger');
          }
        }
        return;
      }
      const reply=parseReplyProtocol(line);
      if(reply&&!b.dataset.aeReplyCard){
        b.dataset.aeReplyCard='1';
        b.innerHTML=`<div class="ae-reply-card"><small>Replying to</small><span>${escapeHtml(reply.quote||'Message')}</span></div><div>${escapeHtml(reply.body||'')}</div>`;
      }
      const song=parseSongProtocol(line);
      if(song&&!b.dataset.aeSongCard){
        b.dataset.aeSongCard='1';
        const url=song.url||`https://open.spotify.com/search/${encodeURIComponent([song.title,song.artist].filter(Boolean).join(' '))}`;
        b.innerHTML=`<div class="ae-chat-song-card" role="button" tabindex="0"><div class="ae-chat-song-art">♪</div><div><div class="ae-chat-song-k">Song Dedication</div><div class="ae-chat-song-title">${escapeHtml(song.title||'Untitled song')}</div><div class="ae-chat-song-artist">${escapeHtml(song.artist||'Open music')}</div></div><div class="ae-chat-song-go">↗</div></div>`;
        b.querySelector('.ae-chat-song-card').addEventListener('click',()=>window.open(url,'_blank','noopener'));
      }
    });
  }

  function enhanceChatReactions(){
    const { input, sendBtn }=chatInput();
    document.querySelectorAll('.chat-bubble-me,.chat-bubble-stranger').forEach(b=>{
      b.querySelectorAll(':scope > .ae-quick-react').forEach(x=>x.remove());
      if(b.classList.contains('ae-protocol-hidden')||b.dataset.aeSongCard) return;
      if(!b.dataset.aeMenu){
        b.dataset.aeMenu='1';
        const more=document.createElement('button');
        more.className='ae-bubble-more';
        more.type='button';
        more.title='Message options';
        more.setAttribute('aria-expanded','false');
        more.textContent='⋯';
        more.onclick=ev=>{
          ev.preventDefault(); ev.stopPropagation();
          closeChatFloaters();
          const open=more.getAttribute('aria-expanded')==='true';
          if(open) return;
          more.setAttribute('aria-expanded','true');
          const menu=document.createElement('div');
          menu.className='ae-bubble-menu';
          menu.innerHTML='<button type="button" data-action="reply">↩ Reply</button><button type="button" data-action="react">♡ React</button><button type="button" data-action="report">⚑ Report</button>';
          menu.onclick=e=>{
            const action=e.target.closest('button')?.dataset.action;
            if(!action) return;
            e.preventDefault(); e.stopPropagation();
            if(action==='reply') startReply(b);
            if(action==='react') showReactPicker(b,more);
            if(action==='report') openReportModal(b);
            if(action!=='react') closeChatFloaters();
          };
          placeFloating(menu,more,'menu');
        };
        b.appendChild(more);
      }
    });
  }

  function cleanBubbleText(b){
    const clone=b.cloneNode(true);
    clone.querySelectorAll('.ae-bubble-more,.ae-bubble-menu,.ae-react-pop,.ae-reaction-bar,.ae-quick-react').forEach(x=>x.remove());
    return (clone.innerText||clone.textContent||'').split('\n').map(x=>x.trim()).filter(x=>x&&!x.match(/^\d{1,2}:\d{2}\s*(AM|PM)?$/i)).join(' ').replace(/\[\[AE_[^\]]+\]\]/g,'').trim().substring(0,280);
  }

  function showReactPicker(b,more){
    document.querySelectorAll('.ae-bubble-menu,.ae-react-pop').forEach(x=>x.remove());
    const pop=document.createElement('div');
    pop.className='ae-react-pop';
    pop.innerHTML=EMOJIS.slice(0,8).map(e=>`<button type="button">${e}</button>`).join('');
    pop.onclick=ev=>{
      const btn=ev.target.closest('button');
      if(!btn) return;
      ev.preventDefault(); ev.stopPropagation();
      const emoji=btn.textContent;
      const side=sideForBubble(b);
      const index=indexForBubble(b);
      addReactionToBubble(b,emoji,'me');
      sendChatProtocol(`[[AE_REACTION|${side}|${index}|${encodeURIComponent(emoji)}]]`);
      closeChatFloaters();
    };
    placeFloating(pop,more,'react');
  }

  function startReply(b){
    aeReplyTarget={ quote:cleanBubbleText(b)||'Message' };
    renderReplyPreview();
    const { input }=chatInput();
    if(input) input.focus();
  }

  function renderReplyPreview(){
    document.getElementById('ae-reply-preview')?.remove();
    if(!aeReplyTarget) return;
    const { input }=chatInput();
    if(!input||!input.parentElement) return;
    const box=document.createElement('div');
    box.id='ae-reply-preview';
    box.className='ae-reply-preview';
    box.innerHTML=`<div><b>Reply</b><span>${escapeHtml(aeReplyTarget.quote)}</span></div><button type="button">×</button>`;
    box.querySelector('button').onclick=()=>{aeReplyTarget=null;box.remove();};
    input.parentElement.parentElement?.insertBefore(box,input.parentElement);
  }

  function wireReplySend(){
    const { input, sendBtn }=chatInput();
    if(!input||!sendBtn||sendBtn.dataset.aeReplyWire) return;
    sendBtn.dataset.aeReplyWire='1';
    sendBtn.addEventListener('click',ev=>{
      if(aeBypassSend||!aeReplyTarget) return;
      const body=input.value.trim();
      if(!body) return;
      ev.preventDefault();
      ev.stopImmediatePropagation();
      const quote=aeReplyTarget.quote;
      aeReplyTarget=null;
      document.getElementById('ae-reply-preview')?.remove();
      sendChatProtocol(`[[AE_REPLY|${encodeURIComponent(quote)}|${encodeURIComponent(body)}]]`);
    },true);
  }

  function openReportModal(b){
    if(document.getElementById('ae-report-modal')) return;
    const text=cleanBubbleText(b)||'Message';
    const isOwn=sideForBubble(b)==='me';
    const modal=document.createElement('div');
    modal.id='ae-report-modal';
    modal.className='ae-report-modal';
    modal.innerHTML=`<div class="ae-report-sheet"><h3>Report ${isOwn?'message':'passenger'}</h3><p>${escapeHtml(text)}</p><textarea placeholder="Tell station staff what happened"></textarea><div class="ae-report-actions"><button type="button" data-close>Cancel</button><button class="primary" type="button" data-send>Send</button></div></div>`;
    document.body.appendChild(modal);
    const close=()=>modal.remove();
    modal.addEventListener('click',ev=>{if(ev.target===modal)close();});
    modal.querySelector('[data-close]').onclick=close;
    modal.querySelector('[data-send]').onclick=async()=>{
      const reason=modal.querySelector('textarea').value.trim();
      if(reason.length<5){modal.querySelector('textarea').focus();return;}
      try{
        const r=await fetch('/api/reports',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+token()},body:JSON.stringify({type:isOwn?'message':'passenger',messageText:text,messageSide:sideForBubble(b),reportedUser:isOwn?'Own message':'Stranger passenger',reason})});
        const d=await r.json().catch(()=>({}));
        if(!r.ok) throw new Error(d.message||'Report failed');
        close();
        showToast('Report sent to station staff.');
      }catch(e){showToast(e.message||'Report failed.');}
    };
  }

  function showToast(message){
    const old=document.getElementById('ae-toast'); if(old) old.remove();
    const el=document.createElement('div');
    el.id='ae-toast';
    el.style.cssText='position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:2147483642;background:#101018;color:#eee5cb;border:1px solid rgba(217,193,95,.22);border-radius:999px;padding:10px 15px;font:700 12px/1 DM Sans,system-ui,sans-serif;box-shadow:0 18px 45px rgba(0,0,0,.35)';
    el.textContent=message;
    document.body.appendChild(el);
    setTimeout(()=>el.remove(),2400);
  }

  async function apiJson(url,opts={}){
    const headers={...(opts.headers||{}),Authorization:'Bearer '+token()};
    if(opts.body&&!headers['Content-Type']) headers['Content-Type']='application/json';
    const r=await fetch(url,{...opts,headers});
    const d=await r.json().catch(()=>({}));
    if(!r.ok) throw new Error(d.message||'Request failed');
    return d;
  }

  function renderStaffTriage(){
    if(!['/moderator','/admin'].includes(location.pathname)||!authed()) { document.getElementById('ae-staff-triage')?.remove(); return; }
    if(document.getElementById('ae-staff-triage')) return;
    const root=document.querySelector('main section')||document.querySelector('main')||document.getElementById('root');
    if(!root) return;
    const box=document.createElement('section');
    box.id='ae-staff-triage';
    box.className='ae-staff-triage';
    box.innerHTML=`<div class="ae-staff-head"><h2>Staff Triage</h2><div class="ae-staff-tabs"><button data-tab="confessions" class="active">Confessions</button><button data-tab="messages">Msg Reports</button><button data-tab="people">People Reports</button></div></div><div class="ae-staff-body"><div class="ae-song-note">Loading queue...</div></div>`;
    root.prepend(box);
    box.querySelector('.ae-staff-tabs').onclick=ev=>{
      const btn=ev.target.closest('button'); if(!btn) return;
      box.querySelectorAll('.ae-staff-tabs button').forEach(b=>b.classList.toggle('active',b===btn));
      loadStaffTab(btn.dataset.tab);
    };
    loadStaffTab('confessions');
  }

  async function loadStaffTab(tab){
    const body=document.querySelector('#ae-staff-triage .ae-staff-body');
    if(!body) return;
    body.innerHTML='<div class="ae-song-note">Loading queue...</div>';
    try{
      if(tab==='confessions'){
        const d=await apiJson('/api/moderator/confessions/pending');
        const items=d.confessions||[];
        body.innerHTML=items.length?`<div class="ae-staff-grid">${items.map(c=>`<article class="ae-staff-card"><div class="ae-staff-meta">Confession approve/reject</div><b>${escapeHtml(c.from||'Someone')} → ${escapeHtml(c.to||'Someone')}</b><p>${escapeHtml(c.message||'')}</p><div class="ae-staff-actions"><button class="primary" data-conf="${c._id}" data-action="approve">Approve</button><button data-conf="${c._id}" data-action="reject">Reject</button></div></article>`).join('')}</div>`:'<div class="ae-song-note">No pending confessions.</div>';
        body.querySelectorAll('[data-conf]').forEach(btn=>btn.onclick=async()=>{await apiJson(`/api/moderator/confessions/${btn.dataset.conf}/review`,{method:'PUT',body:JSON.stringify({action:btn.dataset.action})});showToast('Confession updated.');loadStaffTab('confessions');});
        return;
      }
      const type=tab==='people'?'people':'message';
      const d=await apiJson('/api/moderator/reports?status=pending&type='+type+'&limit=30');
      const reports=d.reports||[];
      let html=tab==='people'?'<div class="ae-staff-search"><input placeholder="Search passenger to temporarily suspend"><button data-user-search>Search</button></div><div id="ae-user-results"></div>':'';
      html+=reports.length?`<div class="ae-staff-grid">${reports.map(r=>`<article class="ae-staff-card"><div class="ae-staff-meta">${escapeHtml(r.type||type)} report · ${escapeHtml(r.status||'pending')}</div><b>${escapeHtml(r.reportedUser||'Chat report')}</b>${r.messageText?`<p>${escapeHtml(r.messageText)}</p>`:''}<p>${escapeHtml(r.reason||'')}</p><div class="ae-staff-actions"><button class="primary" data-report="${r._id}" data-status="reviewed">Reviewed</button><button data-report="${r._id}" data-status="actioned">Actioned</button><button data-report="${r._id}" data-status="dismissed">Dismiss</button></div></article>`).join('')}</div>`:'<div class="ae-song-note">No pending reports.</div>';
      body.innerHTML=html;
      body.querySelectorAll('[data-report]').forEach(btn=>btn.onclick=async()=>{await apiJson(`/api/moderator/reports/${btn.dataset.report}`,{method:'PUT',body:JSON.stringify({status:btn.dataset.status})});showToast('Report updated.');loadStaffTab(tab);});
      const search=body.querySelector('[data-user-search]');
      if(search) search.onclick=async()=>{
        const q=body.querySelector('.ae-staff-search input').value.trim();
        const d=await apiJson('/api/moderator/users?search='+encodeURIComponent(q));
        const users=d.users||[];
        body.querySelector('#ae-user-results').innerHTML=users.length?`<div class="ae-staff-grid">${users.map(u=>`<article class="ae-staff-card"><div class="ae-staff-meta">${escapeHtml(u.role)} ${u.isBanned?'· suspended':''}</div><b>${escapeHtml(u.name||'Passenger')}</b><p>${escapeHtml(u.email||'')}</p><div class="ae-staff-actions"><button class="primary" data-suspend="${u._id}">Temp suspend 24h</button>${admin()?`<button data-unban="${u._id}">Unban</button><button data-perm="${u._id}">Permanent ban</button>`:''}</div></article>`).join('')}</div>`:'<div class="ae-song-note">No passengers found.</div>';
        body.querySelectorAll('[data-suspend]').forEach(btn=>btn.onclick=async()=>{await apiJson(`/api/moderator/users/${btn.dataset.suspend}/suspend`,{method:'PUT',body:JSON.stringify({hours:24,reason:'Temporary moderator suspension after people report.'})});showToast('Passenger temporarily suspended.');});
        body.querySelectorAll('[data-unban]').forEach(btn=>btn.onclick=async()=>{await apiJson(`/api/admin/users/${btn.dataset.unban}/ban`,{method:'PUT',body:JSON.stringify({banned:false})});showToast('Passenger unbanned.');});
        body.querySelectorAll('[data-perm]').forEach(btn=>btn.onclick=async()=>{await apiJson(`/api/admin/users/${btn.dataset.perm}/ban`,{method:'PUT',body:JSON.stringify({banned:true,reason:'Permanent admin ban after review.'})});showToast('Passenger permanently banned.');});
      };
    }catch(e){
      body.innerHTML=`<div class="ae-song-note">${escapeHtml(e.message||'Queue failed.')}</div>`;
    }
  }

  function openSongModal(){
    if(document.getElementById('ae-song-modal')) return;
    const modal=document.createElement('div');
    modal.id='ae-song-modal';
    modal.className='ae-song-modal';
    modal.innerHTML=`<div class="ae-song-sheet"><div class="ae-song-head"><div><b>Send a song</b><small>Search live music</small></div><button class="ae-song-close" type="button">×</button></div><form class="ae-song-search"><input type="search" placeholder="Search any song or artist" autocomplete="off"><button>Search</button></form><div class="ae-song-results"><div class="ae-song-note">Search a song, then send it as a dedication card.</div></div></div>`;
    document.body.appendChild(modal);
    const close=()=>modal.remove();
    modal.addEventListener('click',ev=>{ if(ev.target===modal) close(); });
    modal.querySelector('.ae-song-close').onclick=close;
    const form=modal.querySelector('form');
    const input=form.querySelector('input');
    const results=modal.querySelector('.ae-song-results');
    form.onsubmit=async ev=>{
      ev.preventDefault();
      const q=input.value.trim();
      if(q.length<2){ results.innerHTML='<div class="ae-song-note">Type at least 2 letters.</div>'; return; }
      results.innerHTML='<div class="ae-song-note">Searching live songs...</div>';
      try{
        const r=await fetch('/api/songs/search?q='+encodeURIComponent(q),{cache:'no-store'});
        const d=await r.json();
        if(!r.ok) throw new Error(d.message||'Search failed');
        const songs=d.songs||[];
        if(!songs.length){ results.innerHTML='<div class="ae-song-note">No songs found. Try another title.</div>'; return; }
        results.innerHTML=songs.map((s,i)=>`<button class="ae-song-result" type="button" data-i="${i}"><img src="${escapeHtml(s.artwork||'')}" alt=""><div><div class="ae-song-result-title">${escapeHtml(s.title)}</div><div class="ae-song-result-artist">${escapeHtml(s.artist||'Unknown artist')}</div></div><span class="ae-song-result-send">Send</span></button>`).join('');
        results.querySelectorAll('.ae-song-result').forEach(btn=>{
          btn.onclick=()=>{
            const s=songs[+btn.dataset.i];
            const url=s.spotifyUrl||s.itunesUrl||`https://open.spotify.com/search/${encodeURIComponent(s.searchQuery||`${s.title} ${s.artist||''}`)}`;
            sendChatProtocol(`[[AE_SONG|${encodeURIComponent((s.title||'').slice(0,90))}|${encodeURIComponent((s.artist||'').slice(0,80))}|${encodeURIComponent(url)}]]`);
            close();
          };
        });
      }catch(e){
        results.innerHTML=`<div class="ae-song-note">${escapeHtml(e.message||'Search failed.')}</div>`;
      }
    };
    setTimeout(()=>input.focus(),80);
  }

  function ensureSongTool(){
    const { input }=chatInput();
    if(!input||!input.parentElement||document.getElementById('ae-song-trigger')) return;
    const btn=document.createElement('button');
    btn.id='ae-song-trigger';
    btn.className='ae-song-trigger';
    btn.type='button';
    btn.title='Send song';
    btn.textContent='♫';
    btn.onclick=openSongModal;
    input.parentElement.insertBefore(btn,input);
  }

  function enhanceChat(){
    if(location.pathname!=='/chat') return;
    renderProtocolBubbles();
    enhanceChatReactions();
    renderReplyPreview();
    wireReplySend();
    ensureSongTool();
  }
  function syncWaitingLounge(){
    const old=document.getElementById('ae-waiting-lounge');
    document.body.classList.remove('ae-chat-searching');
    if(old) old.remove();
  }
  function escapeHtml(s){return String(s||'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
  function tick(){try{injectPolishStyles();ensureCinemaHome();fetchConfig();enhanceChat();renderStaffTriage();syncWaitingLounge();}catch(e){}}
  ['pushState','replaceState'].forEach(k=>{const o=history[k];history[k]=function(){const r=o.apply(this,arguments);setTimeout(tick,80);return r;};});
  addEventListener('popstate',()=>setTimeout(tick,80));
  addEventListener('resize',closeChatFloaters,{passive:true});
  addEventListener('scroll',closeChatFloaters,{passive:true,capture:true});
  document.addEventListener('click',ev=>{if(!ev.target.closest('.ae-bubble-menu,.ae-react-pop,.ae-bubble-more')) closeChatFloaters();});
  setInterval(()=>{try{injectPolishStyles();ensureCinemaHome();updateHomeShell();if(lastConfig&&lastConfig.config) applyHome(lastConfig.config);enhanceChat();renderStaffTriage();syncWaitingLounge();}catch(e){}},700);
  setInterval(fetchConfig,15000);
  injectPolishStyles();
  ensureCinemaHome();
  setTimeout(tick,300);
  setTimeout(tick,1200);
})();
