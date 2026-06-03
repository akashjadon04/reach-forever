const fs = require('fs');

/* ── helpers ── */
const reviews = [
  {n:'Harpreet S.',b:'Dental Clinic, Ludhiana',t:'120 new patients in the first month. Their Meta Ads strategy is absolutely unmatched.',i:'H'},
  {n:'Gurjinder K.',b:'Real Estate, Amritsar',t:'3× leads in 6 weeks. Best ROI I\'ve ever seen in 10 years of running marketing.',i:'G'},
  {n:'Mandeep B.',b:'Salon Chain, Chandigarh',t:'Website bookings literally doubled overnight. Absolutely stunning execution.',i:'M'},
  {n:'Rajveer S.',b:'Restaurant, Jalandhar',t:'Online orders tripled. The reels they made went viral — 2 million+ views!',i:'R'},
  {n:'Parminder H.',b:'Coaching Institute, Patiala',t:'Our Google ranking jumped from page 5 to #1 in just 45 days. Unreal results.',i:'P'},
  {n:'Simran A.',b:'Boutique, Mohali',t:'Instagram following grew 10× and sales followed. Pure gold strategy that works.',i:'S'},
];
const dupReviews = [...reviews, ...reviews];

const testiCards = dupReviews.map(r => `
<div class="tc">
  <div class="tc-stars">★★★★★</div>
  <div class="tc-text">"${r.t}"</div>
  <div class="tc-author">
    <div class="tc-av">${r.i}</div>
    <div><div class="tc-name">${r.n}</div><div class="tc-biz">${r.b}</div></div>
  </div>
</div>`).join('');

const svcCards = [
  {bg:'#0A081E',glow:'100,80,255',ic:'ri-facebook-circle-fill',col:'#A78BFA',title:'Local Business Ads',desc:'Hyper-targeted Meta & Google campaigns that capture high-intent customers in your exact area — precisely when they\'re ready to buy.',tags:['Retargeting','4.8× ROAS','Lookalikes']},
  {bg:'#0D0A05',glow:'200,169,110',ic:'ri-macbook-fill',col:'#D4AF37',title:'Automated Websites',desc:'Lightning-fast, booking-optimised landing pages that convert strangers into paying customers 24/7 — even while you sleep.',tags:['14-Day Launch','A/B Tested','SEO Ready']},
  {bg:'#1A0505',glow:'219,68,55',ic:'ri-search-eye-line',col:'#FF6B6B',title:'Google SEO',desc:'Dominate local search. When customers look for your service in Punjab — you\'re always ranked first, every time.',tags:['GMB #1','Backlinks','Local Pack']},
  {bg:'#160820',glow:'228,64,95',ic:'ri-megaphone-fill',col:'#FF8FAB',title:'Social Media Growth',desc:'Viral reels, brand authority content, and daily organic enquiries from Instagram & Facebook that build lasting trust.',tags:['Viral Reels','Brand Identity','Daily Posts']},
  {bg:'#031412',glow:'20,184,166',ic:'ri-mail-send-fill',col:'#5EEAD4',title:'CRM & Automation',desc:'Automated SMS follow-ups and lead tracking pipelines so no potential customer ever slips through the cracks again.',tags:['SMS Nurture','Auto Follow-up','Pipeline']},
  {bg:'#180C03',glow:'251,146,60',ic:'ri-vidicon-fill',col:'#FDBA74',title:'Video Production',desc:'Professional reels, testimonial videos, and ad creatives that stop the scroll and generate real appointment bookings.',tags:['Ad Creatives','Testimonials','Reels']},
].map(c => `
<div class="svc-card" data-tilt style="background:${c.bg}">
  <div class="svc-glow" style="--gc:${c.glow}"></div>
  <div class="svc-top-line" style="--lc:rgb(${c.glow})"></div>
  <div class="svc-icon" style="background:rgba(${c.glow},0.12);color:${c.col}"><i class="${c.ic}"></i></div>
  <div class="svc-title">${c.title}</div>
  <div class="svc-desc">${c.desc}</div>
  <div class="svc-tags">${c.tags.map(t=>`<span class="svc-tag" style="border-color:rgba(${c.glow},0.25);color:${c.col}">${t}</span>`).join('')}</div>
  <div class="svc-glare"></div>
</div>`).join('');

const procSteps = [
  {n:'01',title:'Deep Audit',desc:'We dissect your market, competitors, and existing digital footprint to uncover hidden revenue opportunities.',grad:'linear-gradient(135deg,#C8A96E,#A67C00)',glow:'200,169,110'},
  {n:'02',title:'Strategy Build',desc:'A bespoke growth blueprint — channels, creatives, funnels — all mapped precisely to your business goals.',grad:'linear-gradient(135deg,#6450FF,#4F3FCC)',glow:'100,80,255'},
  {n:'03',title:'Launch & Scale',desc:'We go live within 14 days and relentlessly optimise for maximum ROI across every active channel simultaneously.',grad:'linear-gradient(135deg,#10B981,#059669)',glow:'16,185,129'},
  {n:'04',title:'Report & Grow',desc:'Weekly transparent reports. You see every rupee spent, every lead generated, every rupee returned — always.',grad:'linear-gradient(135deg,#DB4437,#B91C1C)',glow:'219,68,55'},
].map(s => `
<div class="proc-step">
  <div class="proc-circle" style="background:${s.grad};box-shadow:0 16px 48px rgba(${s.glow},0.4)">
    <span class="proc-num">${s.n}</span>
    <div class="proc-spin"></div>
  </div>
  <div class="proc-title">${s.title}</div>
  <div class="proc-desc">${s.desc}</div>
</div>`).join('');

/* ── HTML ── */
const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Reach Forever — Punjab's #1 Digital Marketing Agency</title>
<meta name="description" content="We engineer full-funnel digital systems — Meta Ads, Google SEO, viral reels & high-converting websites — that flood your business with customers on autopilot.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#F7F4EF;--dark:#0C0A05;--dark2:#1A1208;
  --gold:#C8A96E;--gold2:#D4AF37;--goldd:#A67C00;
  --tx:#1A1208;--tx2:#4A3F30;--tx3:#6B5E4A;--txm:#9B8E7A;
  --sf:'Cormorant Garamond',Georgia,serif;
  --ss:'Outfit',system-ui,sans-serif;
  --ex:cubic-bezier(0.16,1,0.3,1);
  --bk:cubic-bezier(0.34,1.56,0.64,1);
}
html{scroll-behavior:smooth}
body{font-family:var(--ss);background:var(--bg);color:var(--tx);overflow-x:hidden;cursor:none}
@media(max-width:768px){body{cursor:auto}}
::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:var(--bg)}::-webkit-scrollbar-thumb{background:var(--gold);border-radius:3px}

/* ── progress ── */
#prog{position:fixed;top:0;left:0;height:2px;width:0%;background:linear-gradient(90deg,var(--gold),var(--gold2));z-index:2147483647;pointer-events:none}

/* ── cursor ── */
#cdot{position:fixed;top:0;left:0;width:8px;height:8px;background:var(--gold);border-radius:50%;pointer-events:none;z-index:2147483646;mix-blend-mode:multiply;transform:translate(-50%,-50%)}
#cring{position:fixed;top:0;left:0;width:38px;height:38px;border:1.5px solid rgba(200,169,110,.5);border-radius:50%;pointer-events:none;z-index:2147483645;transform:translate(-50%,-50%);transition:width .4s var(--ex),height .4s var(--ex),border-color .3s}
@media(max-width:768px){#cdot,#cring{display:none}}

/* ── preloader ── */
#pl{position:fixed;inset:0;background:var(--dark);z-index:2147483640;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px;transition:opacity .7s ease,visibility .7s ease}
#pl.done{opacity:0;visibility:hidden;pointer-events:none}
.pl-logo{font-family:var(--sf);font-size:2.8rem;font-weight:700;color:var(--gold);letter-spacing:-1px;animation:ppulse 1.4s ease-in-out infinite}
.pl-bar{width:180px;height:2px;background:rgba(200,169,110,.15);border-radius:2px;overflow:hidden}
.pl-fill{height:100%;background:linear-gradient(90deg,var(--gold),var(--gold2));animation:pfill 1s ease-out forwards}
@keyframes ppulse{0%,100%{opacity:.4;transform:scale(.97)}50%{opacity:1;transform:scale(1)}}
@keyframes pfill{from{width:0}to{width:100%}}

/* ── navbar ── */
#rfNav{position:fixed;top:14px;left:50%;transform:translateX(-50%);width:calc(100% - 40px);max-width:1320px;background:rgba(247,244,239,.85);backdrop-filter:blur(40px) saturate(1.8);-webkit-backdrop-filter:blur(40px) saturate(1.8);border:1px solid rgba(200,169,110,.18);border-radius:100px;padding:11px 22px;display:flex;align-items:center;justify-content:space-between;z-index:9999990;box-shadow:0 8px 40px rgba(26,18,8,.07);transition:all .4s var(--ex)}
#rfNav.scrolled{background:rgba(247,244,239,.96);box-shadow:0 12px 50px rgba(26,18,8,.12)}
.nl img{height:36px;width:auto;filter:none!important;display:block}
.nl-fb{font-family:var(--sf);font-size:1.45rem;font-weight:700;color:var(--dark2);display:none;letter-spacing:-.5px}
.nlinks{display:flex;align-items:center;gap:2px}
.nlink{font-family:var(--ss);font-size:.84rem;font-weight:600;color:var(--tx2);text-decoration:none;padding:8px 16px;border-radius:100px;text-transform:uppercase;letter-spacing:.5px;transition:all .3s}
.nlink:hover{color:var(--goldd);background:rgba(200,169,110,.08)}
.ncta{font-family:var(--ss);font-size:.84rem;font-weight:700;color:#FFF;background:linear-gradient(135deg,#C8A96E,#A67C00);text-decoration:none;padding:10px 22px;border-radius:100px;text-transform:uppercase;letter-spacing:.5px;box-shadow:0 8px 24px rgba(200,169,110,.38);transition:all .3s var(--ex)}
.ncta:hover{transform:translateY(-2px);box-shadow:0 14px 36px rgba(200,169,110,.55)}
@media(max-width:768px){#rfNav{width:calc(100% - 20px);padding:9px 14px}.nlinks{display:none}}

/* ── section utils ── */
.sec{position:relative;overflow:hidden}
.sin{max-width:1320px;margin:0 auto;padding:0 5%;position:relative;z-index:2}
.sec-lbl{display:inline-flex;align-items:center;gap:8px;padding:8px 20px;border-radius:100px;font-family:var(--ss);font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin-bottom:18px}
.sec-lbl.gold{background:rgba(200,169,110,.1);border:1px solid rgba(200,169,110,.22);color:var(--goldd)}
.sec-lbl.light{background:rgba(247,244,239,.07);border:1px solid rgba(200,169,110,.18);color:var(--gold)}

/* ── grain ── */
.grain::after{content:'';position:absolute;inset:0;pointer-events:none;z-index:1;opacity:.028;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-size:150px}

/* ── hero ── */
#hero{background:var(--bg);padding:160px 5% 100px;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;min-height:100vh;position:relative;overflow:hidden}
.h-orb{position:absolute;border-radius:50%;pointer-events:none;filter:blur(100px)}
.h-orb1{width:600px;height:600px;top:-200px;right:-80px;background:radial-gradient(circle,rgba(200,169,110,.18),transparent 70%)}
.h-orb2{width:380px;height:380px;bottom:-80px;left:-80px;background:radial-gradient(circle,rgba(200,169,110,.1),transparent 70%)}
.h-content{position:relative;z-index:2;opacity:0;transform:translateY(40px)}
.h-tag{display:inline-flex;align-items:center;gap:8px;padding:8px 18px;background:rgba(200,169,110,.1);border:1px solid rgba(200,169,110,.22);border-radius:100px;font-family:var(--ss);font-size:.77rem;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:var(--goldd);margin-bottom:26px}
.h-dot{width:7px;height:7px;background:var(--gold);border-radius:50%;animation:blink 2s ease-in-out infinite}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.25}}
.h1{font-family:var(--sf);font-size:clamp(3rem,5.5vw,6.5rem);font-weight:700;color:var(--dark2);line-height:.98;letter-spacing:-3px;margin-bottom:26px}
.h-rot-wrap{display:inline-block;overflow:hidden;height:1.05em;vertical-align:bottom}
.h-rot{display:flex;flex-direction:column;transition:transform .8s cubic-bezier(.76,0,.24,1)}
.h-rot span{display:block;height:1.05em;font-style:italic}
.h-sub{font-family:var(--ss);font-size:1rem;color:var(--tx3);line-height:1.8;max-width:480px;margin-bottom:38px;border-left:3px solid var(--gold);padding-left:18px}
.h-btns{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:44px}
.btn-g{display:inline-flex;align-items:center;gap:10px;background:linear-gradient(135deg,#C8A96E,#A67C00);color:#FFF;padding:15px 38px;border-radius:100px;font-family:var(--ss);font-size:.9rem;font-weight:700;text-transform:uppercase;letter-spacing:1px;text-decoration:none;box-shadow:0 12px 36px rgba(200,169,110,.38);transition:all .4s var(--ex)}
.btn-g:hover{transform:translateY(-4px);box-shadow:0 20px 50px rgba(200,169,110,.55)}
.btn-o{display:inline-flex;align-items:center;gap:10px;background:rgba(26,18,8,.06);border:1px solid rgba(26,18,8,.1);color:var(--dark2);padding:15px 32px;border-radius:100px;font-family:var(--ss);font-size:.9rem;font-weight:700;text-decoration:none;transition:all .3s var(--ex)}
.btn-o:hover{background:rgba(26,18,8,.1);transform:translateY(-2px)}
.btn-o i{color:var(--gold)}
.h-trust{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.tr-lbl{font-family:var(--ss);font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:var(--txm)}
.tr-b{display:flex;align-items:center;gap:6px;padding:7px 14px;border-radius:100px;background:rgba(26,18,8,.05);border:1px solid rgba(26,18,8,.07);font-family:var(--ss);font-size:.79rem;font-weight:700;color:var(--tx2)}

/* ── phone ── */
.h-visual{position:relative;display:flex;justify-content:center;align-items:center;z-index:2;opacity:0;transform:translateY(40px)}
#heroPhone{width:274px;border-radius:44px;overflow:hidden;box-shadow:0 60px 120px rgba(26,18,8,.25),0 0 0 8px #1A1208;cursor:pointer;position:relative;z-index:2;transform:perspective(1000px) rotateY(-12deg) rotateX(2deg);transition:transform .6s var(--ex)}
#heroPhone:hover{transform:perspective(1000px) rotateY(-6deg) rotateX(0deg) scale(1.03)}
#heroPhone video,#heroPhone img{width:100%;height:500px;object-fit:cover;display:block}
.phone-badge{position:absolute;top:14px;right:14px;z-index:10;background:rgba(255,255,255,.92);backdrop-filter:blur(10px);border-radius:100px;padding:6px 12px;font-family:var(--ss);font-size:.68rem;font-weight:700;color:var(--dark2);display:flex;align-items:center;gap:5px}
.phone-badge::before{content:'';width:6px;height:6px;border-radius:50%;background:#EF4444;animation:blink 1s infinite;flex-shrink:0}

/* ── floating stat cards ── */
.fsc{position:absolute;backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border-radius:20px;padding:14px 18px;z-index:20;display:flex;align-items:center;gap:12px;background:rgba(12,10,5,.88);border:1px solid rgba(200,169,110,.18);box-shadow:0 16px 48px rgba(0,0,0,.32)}
.fsc-1{top:8%;left:-14%;animation:flt 5s ease-in-out infinite alternate}
.fsc-2{bottom:12%;left:-12%;animation:flt 6s ease-in-out infinite alternate-reverse}
@keyframes flt{0%{transform:translateY(0) rotate(-.4deg)}100%{transform:translateY(-16px) rotate(.4deg)}}
.fsc-ic{width:40px;height:40px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0;color:#FFF}
.fsc-num{font-family:var(--sf);font-size:1.9rem;font-weight:700;color:#F7F4EF;line-height:1}
.fsc-lbl{font-family:var(--ss);font-size:.67rem;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-top:2px}
@media(max-width:1000px){#hero{grid-template-columns:1fr;text-align:center;padding:140px 5% 80px}.h-visual{margin-top:0px}.h-sub{margin:0 auto 38px}.h-btns,.h-trust{justify-content:center}.fsc{display:none}}

/* ── stats bar ── */
#statsBar{background:var(--dark);padding:60px 5%;display:grid;grid-template-columns:repeat(4,1fr);position:relative;overflow:hidden}
#statsBar::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 70% 100% at 50% 0%,rgba(200,169,110,.07),transparent 70%);pointer-events:none}
.si{text-align:center;padding:20px;border-right:1px solid rgba(247,244,239,.05);position:relative;z-index:1}
.si:last-child{border-right:none}
.si-num{font-family:var(--sf);font-size:clamp(2.6rem,4vw,4.5rem);font-weight:700;color:var(--gold);letter-spacing:-2px;line-height:1}
.si-lbl{font-family:var(--ss);font-size:.8rem;font-weight:600;color:rgba(247,244,239,.38);text-transform:uppercase;letter-spacing:1.5px;margin-top:6px}
@media(max-width:768px){#statsBar{grid-template-columns:repeat(2,1fr)}.si:nth-child(2){border-right:none}}

/* ── platform sec ── */
#platformSec{background:var(--dark);padding:8rem 5%;position:relative;overflow:hidden}
#platformSec::before{content:'';position:absolute;top:0;left:0;right:0;bottom:0;pointer-events:none;background:radial-gradient(ellipse 80% 60% at 80% 50%,rgba(200,169,110,.055),transparent 70%)}
.plat-h2{font-family:var(--sf);font-size:clamp(2.5rem,5vw,5.2rem);font-weight:700;color:#F7F4EF;line-height:.98;letter-spacing:-2px;margin-bottom:12px}
.plat-h2 em{color:var(--gold);font-style:italic}
.plat-sub{font-family:var(--ss);font-size:1rem;color:rgba(247,244,239,.38);max-width:480px}
.plat-tabs{display:flex;gap:10px;margin:36px 0 28px;flex-wrap:wrap}
.ptab{display:flex;align-items:center;gap:8px;padding:10px 22px;border-radius:100px;border:1.5px solid rgba(247,244,239,.1);background:rgba(247,244,239,.04);color:rgba(247,244,239,.45);font-family:var(--ss);font-size:.84rem;font-weight:700;cursor:pointer;transition:all .4s var(--ex);text-transform:uppercase;letter-spacing:.4px}
.ptab:hover{background:rgba(247,244,239,.08);color:rgba(247,244,239,.75)}
#platformGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;transition:opacity .35s ease,transform .35s ease}
.pgc{border-radius:16px;overflow:hidden;aspect-ratio:4/5;position:relative;cursor:zoom-in;background:rgba(247,244,239,.04);border:1px solid rgba(247,244,239,.07);transition:transform .45s var(--ex),box-shadow .45s}
.pgc:hover{transform:scale(1.05) translateY(-5px);box-shadow:0 32px 64px rgba(0,0,0,.42)}
.pgc img{width:100%;height:100%;object-fit:cover;display:block}
.pgc-ov{position:absolute;inset:0;background:linear-gradient(to top,rgba(12,10,5,.7) 0%,transparent 50%);opacity:0;transition:opacity .3s;display:flex;align-items:flex-end;padding:14px}
.pgc:hover .pgc-ov{opacity:1}
.pgc-ov span{font-family:var(--ss);font-size:.73rem;font-weight:700;color:rgba(247,244,239,.75);text-transform:uppercase;letter-spacing:1px}
@media(max-width:640px){#platformGrid{grid-template-columns:repeat(2,1fr)}}

/* ── services ── */
#svcSec{background:var(--bg);padding:8rem 5%;position:relative;overflow:hidden}
.svc-wm{position:absolute;top:40px;left:50%;transform:translateX(-50%);font-family:var(--sf);font-size:clamp(5rem,18vw,18rem);font-weight:700;color:rgba(26,18,8,.022);white-space:nowrap;pointer-events:none;letter-spacing:-6px;line-height:1;z-index:0;user-select:none}
.svc-hdr{text-align:center;margin-bottom:70px;position:relative;z-index:2}
.svc-h2{font-family:var(--sf);font-size:clamp(2.5rem,4.5vw,5.2rem);font-weight:700;color:var(--dark2);line-height:.98;letter-spacing:-2px;margin-bottom:12px}
.svc-h2 em{color:var(--gold);font-style:italic}
.svc-sub{font-family:var(--ss);font-size:1rem;color:var(--tx3);max-width:500px;margin:0 auto}
.svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;position:relative;z-index:2}
.svc-card{border-radius:28px;padding:44px 32px;display:flex;flex-direction:column;min-height:420px;position:relative;overflow:hidden;cursor:pointer;border:1px solid rgba(255,255,255,.06);box-shadow:0 8px 32px rgba(0,0,0,.14);transition:box-shadow .5s var(--ex),transform .5s var(--ex)}
.svc-card:hover{box-shadow:0 40px 80px rgba(0,0,0,.35)}
.svc-glow{position:absolute;top:-80px;right:-80px;width:260px;height:260px;border-radius:50%;pointer-events:none;background:radial-gradient(circle,rgba(var(--gc),.16),transparent 70%)}
.svc-top-line{position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--lc),transparent);opacity:.35}
.svc-icon{width:60px;height:60px;border-radius:18px;display:flex;align-items:center;justify-content:center;font-size:1.9rem;margin-bottom:24px;flex-shrink:0;border:1px solid rgba(255,255,255,.08)}
.svc-title{font-family:var(--sf);font-size:2rem;font-weight:700;color:#F7F4EF;margin-bottom:12px;line-height:1.1}
.svc-desc{font-family:var(--ss);font-size:.9rem;color:rgba(247,244,239,.48);line-height:1.78;margin-bottom:24px;flex-grow:1}
.svc-tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:auto}
.svc-tag{padding:5px 13px;border-radius:100px;font-family:var(--ss);font-size:.72rem;font-weight:700;letter-spacing:.4px;border:1px solid;background:transparent}
.svc-glare{position:absolute;inset:0;border-radius:28px;pointer-events:none;opacity:0;transition:opacity .3s;z-index:3}
@media(max-width:1000px){.svc-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:600px){.svc-grid{grid-template-columns:1fr}}

/* ── process ── */
#procSec{background:var(--dark);padding:8rem 5%;position:relative;overflow:hidden}
#procSec::before{content:'';position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 80% 60% at 50% 0%,rgba(200,169,110,.07),transparent 70%)}
.proc-hdr{text-align:center;margin-bottom:80px;position:relative;z-index:2}
.proc-h2{font-family:var(--sf);font-size:clamp(2.5rem,5vw,5.5rem);font-weight:700;color:#F7F4EF;line-height:.98;letter-spacing:-2px;margin-bottom:12px}
.proc-h2 em{color:var(--gold);font-style:italic}
.proc-sub{font-family:var(--ss);font-size:1rem;color:rgba(247,244,239,.38);max-width:480px;margin:0 auto}
.proc-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:4px;position:relative;z-index:2}
.proc-line{position:absolute;top:72px;left:12.5%;right:12.5%;height:1px;background:linear-gradient(90deg,transparent,rgba(200,169,110,.22) 20%,rgba(200,169,110,.22) 80%,transparent);z-index:0}
.proc-step{padding:0 18px;text-align:center;position:relative;z-index:1;transition:transform .5s var(--ex)}
.proc-step:hover{transform:translateY(-12px)}
.proc-circle{width:80px;height:80px;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 32px;position:relative}
.proc-num{font-family:var(--sf);font-size:2.2rem;font-weight:700;color:#FFF;position:relative;z-index:1}
.proc-spin{position:absolute;inset:-5px;border-radius:50%;border:1px dashed rgba(255,255,255,.2);animation:spin 20s linear infinite}
@keyframes spin{100%{transform:rotate(360deg)}}
.proc-title{font-family:var(--sf);font-size:1.7rem;font-weight:700;color:#F7F4EF;margin-bottom:12px}
.proc-desc{font-family:var(--ss);font-size:.87rem;color:rgba(247,244,239,.42);line-height:1.78}
@media(max-width:900px){.proc-grid{grid-template-columns:repeat(2,1fr);gap:40px}.proc-line{display:none}}

/* ── before/after ── */
#baSec{background:var(--bg);padding:8rem 5%;position:relative;overflow:hidden}
.ba-hdr{text-align:center;margin-bottom:60px}
.ba-h2{font-family:var(--sf);font-size:clamp(2.5rem,4.5vw,5.2rem);font-weight:700;color:var(--dark2);line-height:.98;letter-spacing:-2px;margin-bottom:12px}
.ba-h2 em{color:var(--gold);font-style:italic}
#baSlider{position:relative;width:100%;max-width:960px;height:500px;border-radius:32px;overflow:hidden;cursor:col-resize;box-shadow:0 40px 100px rgba(26,18,8,.14);border:1px solid rgba(200,169,110,.2);margin:0 auto;user-select:none;touch-action:pan-y}
#baAfter{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:1}
#baBefore{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:2;clip-path:inset(0 50% 0 0)}
#baDivider{position:absolute;top:0;bottom:0;left:50%;z-index:3;width:2px;background:#FFF;cursor:col-resize;transform:translateX(-50%)}
#baDivider::before{content:'';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:50px;height:50px;background:#FFF;border-radius:50%;box-shadow:0 4px 20px rgba(0,0,0,.28)}
#baDivider::after{content:'◀▶';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:.6rem;color:var(--dark2);letter-spacing:-1px;font-weight:900}
.ba-lbl{position:absolute;top:20px;z-index:4;color:#FFF;font-family:var(--ss);font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:2px;padding:6px 14px;border-radius:100px}
.ba-lbl.bef{left:20px;background:rgba(219,68,55,.85)}
.ba-lbl.aft{right:20px;background:rgba(16,185,129,.85)}
.ba-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;max-width:960px;margin:40px auto 0}
.ba-s{text-align:center;padding:28px;border-radius:20px;background:rgba(26,18,8,.04);border:1px solid rgba(26,18,8,.07)}
.ba-sn{font-family:var(--sf);font-size:2.5rem;font-weight:700;color:var(--goldd);letter-spacing:-1px}
.ba-sl{font-family:var(--ss);font-size:.79rem;color:var(--tx3);margin-top:4px;font-weight:600}
@media(max-width:600px){#baSlider{height:320px}.ba-stats{grid-template-columns:1fr;max-width:320px}}

/* ── testimonials ── */
#testiSec{background:var(--bg);padding:8rem 0;overflow:hidden;position:relative}
.testi-hdr{text-align:center;padding:0 5%;margin-bottom:60px}
.testi-h2{font-family:var(--sf);font-size:clamp(2.5rem,4.5vw,5.2rem);font-weight:700;color:var(--dark2);letter-spacing:-2px;line-height:.98;margin-bottom:12px}
.testi-h2 em{color:var(--gold);font-style:italic}
.tt-wrap{overflow:hidden;position:relative}
.tt-wrap::before,.tt-wrap::after{content:'';position:absolute;top:0;bottom:0;z-index:2;width:100px;pointer-events:none}
.tt-wrap::before{left:0;background:linear-gradient(90deg,var(--bg),transparent)}
.tt-wrap::after{right:0;background:linear-gradient(270deg,var(--bg),transparent)}
.tt{display:flex;gap:20px;width:max-content;animation:mq 42s linear infinite}
.tt:hover{animation-play-state:paused}
@keyframes mq{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
.tc{width:360px;flex-shrink:0;padding:30px;background:rgba(255,255,255,.72);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid rgba(200,169,110,.14);border-radius:24px;box-shadow:0 4px 20px rgba(26,18,8,.05);transition:transform .4s var(--ex),box-shadow .4s}
.tc:hover{transform:translateY(-6px);box-shadow:0 20px 50px rgba(26,18,8,.1)}
.tc-stars{color:var(--gold);font-size:.88rem;margin-bottom:14px;letter-spacing:2px}
.tc-text{font-family:var(--ss);font-size:.93rem;color:var(--tx2);line-height:1.72;margin-bottom:18px;font-style:italic}
.tc-author{display:flex;align-items:center;gap:12px}
.tc-av{width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--goldd));display:flex;align-items:center;justify-content:center;font-family:var(--sf);font-size:1.2rem;font-weight:700;color:#FFF;border:2px solid rgba(200,169,110,.3);flex-shrink:0}
.tc-name{font-family:var(--ss);font-size:.87rem;font-weight:700;color:var(--tx)}
.tc-biz{font-family:var(--ss);font-size:.73rem;color:var(--txm);margin-top:2px}

/* ── rush / CTA ── */
#rushSec{background:var(--dark);padding:8rem 5%;position:relative;overflow:hidden}
#rushSec::before{content:'';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:700px;height:700px;border-radius:50%;background:radial-gradient(circle,rgba(200,169,110,.08),transparent 70%);pointer-events:none}
.rush-in{max-width:800px;margin:0 auto;text-align:center;position:relative;z-index:2}
.rush-h2{font-family:var(--sf);font-size:clamp(3rem,6vw,7.5rem);font-weight:700;color:#F7F4EF;letter-spacing:-3px;line-height:.93;margin-bottom:24px}
.rush-h2 em{color:var(--gold);font-style:italic}
.rush-sub{font-family:var(--ss);font-size:1rem;color:rgba(247,244,239,.42);line-height:1.75;max-width:480px;margin:0 auto 44px}
.rush-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
.btn-l{display:inline-flex;align-items:center;gap:10px;background:rgba(247,244,239,.07);border:1px solid rgba(247,244,239,.14);color:rgba(247,244,239,.65);padding:15px 32px;border-radius:100px;font-family:var(--ss);font-size:.88rem;font-weight:700;text-decoration:none;transition:all .3s}
.btn-l:hover{background:rgba(247,244,239,.12);color:#F7F4EF}

/* ── footer ── */
#rfFoot{background:var(--dark);border-top:1px solid rgba(200,169,110,.09);padding:60px 5% 40px}
.foot-in{max-width:1320px;margin:0 auto;display:grid;grid-template-columns:1.6fr 1fr 1fr 1fr;gap:48px;margin-bottom:48px}
.foot-logo img{height:38px;filter:none!important;margin-bottom:14px;display:block}
.foot-logo-fb{font-family:var(--sf);font-size:1.7rem;font-weight:700;color:var(--gold);display:none;margin-bottom:14px;letter-spacing:-.5px}
.foot-desc{font-family:var(--ss);font-size:.87rem;color:rgba(247,244,239,.35);line-height:1.75;max-width:260px}
.foot-col-t{font-family:var(--ss);font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:var(--gold);margin-bottom:16px}
.foot-lk{display:block;font-family:var(--ss);font-size:.87rem;color:rgba(247,244,239,.38);text-decoration:none;margin-bottom:10px;transition:color .3s}
.foot-lk:hover{color:rgba(247,244,239,.75)}
.foot-bot{max-width:1320px;margin:0 auto;padding-top:24px;border-top:1px solid rgba(247,244,239,.05);display:flex;justify-content:space-between;align-items:center;font-family:var(--ss);font-size:.77rem;color:rgba(247,244,239,.2)}
.foot-bot a{color:var(--gold);text-decoration:none;font-weight:700}
@media(max-width:768px){.foot-in{grid-template-columns:1fr 1fr;gap:32px}}
@media(max-width:480px){.foot-in{grid-template-columns:1fr}}

/* ── floats ── */
.wa{position:fixed;bottom:88px;left:20px;width:54px;height:54px;background:#25D366;color:#FFF;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.7rem;z-index:9999960;text-decoration:none;box-shadow:0 6px 20px rgba(37,211,102,.4);transition:transform .3s var(--ex)}
.wa:hover{transform:scale(1.12)}
.scta{position:fixed;bottom:26px;left:50%;transform:translateX(-50%) translateY(100px);opacity:0;z-index:9999950;white-space:nowrap;transition:all .5s var(--ex);display:flex;align-items:center;gap:12px;background:rgba(12,10,5,.92);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(200,169,110,.18);border-radius:100px;padding:12px 18px 12px 22px;box-shadow:0 20px 60px rgba(0,0,0,.38)}
.scta.on{transform:translateX(-50%) translateY(0);opacity:1}
.scta span{font-family:var(--ss);font-size:.8rem;font-weight:600;color:rgba(247,244,239,.6)}
.scta a{font-family:var(--ss);font-size:.8rem;font-weight:700;color:#FFF;text-decoration:none;padding:8px 18px;background:linear-gradient(135deg,#C8A96E,#A67C00);border-radius:100px}
.aifab{position:fixed;bottom:80px;right:20px;width:58px;height:58px;border-radius:50%;background:var(--dark2);border:1px solid rgba(200,169,110,.22);box-shadow:0 10px 40px rgba(26,18,8,.2);display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:9999940;transition:transform .3s var(--ex)}
.aifab:hover{transform:scale(1.1)}
.aifab i{font-size:1.9rem;color:var(--gold)}
.aifab-dot{position:absolute;top:4px;right:4px;width:11px;height:11px;background:#EF4444;border-radius:50%;border:2px solid var(--dark2);animation:blink 1.5s infinite}

/* ── reels modal ── */
#rmModal{position:fixed;inset:0;background:#000;z-index:2147483640;display:flex;justify-content:center;opacity:0;pointer-events:none;transition:opacity .4s ease}
#rmModal.open{opacity:1;pointer-events:auto}
#rmClose{position:absolute;top:26px;left:26px;width:48px;height:48px;background:rgba(255,255,255,.1);backdrop-filter:blur(10px);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#FFF;font-size:1.4rem;cursor:pointer;border:1px solid rgba(255,255,255,.18);z-index:10;transition:.3s}
#rmClose:hover{background:rgba(255,255,255,.2)}
#rmCon{width:100%;max-width:450px;height:100vh;overflow-y:scroll;scroll-snap-type:y mandatory;scrollbar-width:none;-ms-overflow-style:none}
#rmCon::-webkit-scrollbar{display:none}

/* ── lightbox ── */
#fsLb{position:fixed;inset:0;background:rgba(0,0,0,.96);backdrop-filter:blur(20px);z-index:2147483641;display:flex;justify-content:center;align-items:center;opacity:0;pointer-events:none;transition:opacity .4s ease}
#fsLb.open{opacity:1;pointer-events:auto}
#fsClose{position:absolute;top:22px;right:22px;width:48px;height:48px;background:rgba(255,255,255,.1);border-radius:50%;color:#FFF;display:flex;justify-content:center;align-items:center;font-size:1.4rem;cursor:pointer;border:1px solid rgba(255,255,255,.18);z-index:10;transition:.3s}
#fsClose:hover{background:rgba(255,255,255,.2)}
#fsImg{max-width:90vw;max-height:90vh;border-radius:16px;object-fit:contain}

/* ── mobile nav ── */
.mnav{display:none;position:fixed;bottom:14px;left:4%;right:4%;background:rgba(12,10,5,.92);backdrop-filter:blur(22px);-webkit-backdrop-filter:blur(22px);border:1px solid rgba(200,169,110,.14);border-radius:20px;padding:12px 0 max(12px,env(safe-area-inset-bottom));z-index:9999930;justify-content:space-around;align-items:center}
@media(max-width:768px){.mnav{display:flex}}
.mni{display:flex;flex-direction:column;align-items:center;gap:3px;color:rgba(247,244,239,.38);font-family:var(--ss);font-size:.58rem;font-weight:700;text-transform:uppercase;letter-spacing:.5px;text-decoration:none;padding:4px 12px}
.mni i{font-size:1.25rem}
.mni:hover,.mni.on{color:var(--gold)}
</style>
</head>
<body>

<div id="pl"><div class="pl-logo">Reach Forever</div><div class="pl-bar"><div class="pl-fill"></div></div></div>
<div id="prog"></div>
<div id="cdot"></div>
<div id="cring"></div>

<!-- NAV -->
<nav id="rfNav">
  <a href="#" class="nl" id="nl">
    <img src="assets/logo.png" alt="Reach Forever" id="nlImg" style="height:36px;filter:none!important"
      onerror="this.style.display='none';document.getElementById('nlFb').style.display='block'">
    <span class="nl-fb" id="nlFb">Reach Forever</span>
  </a>
  <div class="nlinks">
    <a href="#hero" class="nlink">Home</a>
    <a href="#svcSec" class="nlink">Services</a>
    <a href="reviews.html" class="nlink">Reviews</a>
  </div>
  <a href="form.html" class="ncta">Initiate Project</a>
</nav>

<!-- HERO -->
<section id="hero" class="grain">
  <div class="h-orb h-orb1"></div>
  <div class="h-orb h-orb2"></div>
  <div class="h-content" id="hContent">
    <div class="h-tag"><span class="h-dot"></span> Punjab's #1 Digital Agency</div>
    <h1 class="h1" id="heroH1">
      We turn<br>
      <span class="h-rot-wrap">
        <span class="h-rot" id="hRot">
          <span style="color:#D4AF37">Ad Spend</span>
          <span style="color:#FF6B6B">Clicks</span>
          <span style="color:#C084FC">Traffic</span>
          <span style="color:#6EE7B7">Leads</span>
          <span style="color:#60A5FA">Sales</span>
        </span>
      </span><br>into paying clients.
    </h1>
    <p class="h-sub">We engineer full-funnel digital systems — Meta Ads, Google SEO, viral reels & high-converting websites — that flood your business with customers on autopilot.</p>
    <div class="h-btns">
      <a href="form.html" class="btn-g">Start Growing Now <i class="ri-arrow-right-line"></i></a>
      <a href="#" class="btn-o" onclick="openReel();return false"><i class="ri-play-circle-line"></i> Watch Results</a>
    </div>
    <div class="h-trust">
      <span class="tr-lbl">Trusted by</span>
      <div class="tr-b"><i class="ri-google-fill" style="color:#DB4437"></i> Google</div>
      <div class="tr-b"><i class="ri-facebook-circle-fill" style="color:#1877F2"></i> Meta</div>
      <div class="tr-b"><i class="ri-shield-check-fill" style="color:#C8A96E"></i> Certified</div>
    </div>
  </div>
  <div class="h-visual" id="hVisual">
    <div class="fsc fsc-1">
      <div class="fsc-ic" style="background:linear-gradient(135deg,#C8A96E,#A67C00)"><i class="ri-group-fill"></i></div>
      <div><div class="fsc-num">320+</div><div class="fsc-lbl" style="color:#C8A96E">Happy Clients</div></div>
    </div>
    <div id="heroPhone" onclick="openReel()">
      <div class="phone-badge"><i class="ri-play-circle-fill" style="color:#EF4444;font-size:.78rem"></i> Tap to Watch</div>
      <video id="hVid" autoplay muted loop playsinline onerror="this.style.display='none'">
        <source src="assets/video_1.mp4" type="video/mp4">
      </video>
      <img src="assets/ig_1.jpg" alt="Client result" style="display:none"
        onerror="this.style.display='none'" onload="document.getElementById('hVid').style.display='none';this.style.display='block'">
    </div>
    <div class="fsc fsc-2">
      <div class="fsc-ic" style="background:linear-gradient(135deg,#10B981,#059669)"><i class="ri-line-chart-fill"></i></div>
      <div><div class="fsc-num">4.8×</div><div class="fsc-lbl" style="color:#10B981">Avg ROAS</div></div>
    </div>
  </div>
</section>

<!-- STATS -->
<div id="statsBar">
  <div class="si"><div class="si-num" data-c="320" data-s="+">320+</div><div class="si-lbl">Happy Clients</div></div>
  <div class="si"><div class="si-num" data-c="4.8" data-s="×" data-f="1">4.8×</div><div class="si-lbl">Average ROAS</div></div>
  <div class="si"><div class="si-num" data-c="60" data-s="%">60%</div><div class="si-lbl">Less Cost Per Lead</div></div>
  <div class="si"><div class="si-num" data-c="14" data-s=" Days">14 Days</div><div class="si-lbl">To First Results</div></div>
</div>

<!-- PLATFORM -->
<section id="platformSec" class="sec">
<div class="sin">
  <span class="sec-lbl light"><i class="ri-global-line"></i> Universal Presence</span>
  <h2 class="plat-h2">Be everywhere<br>your <em>customers look.</em></h2>
  <p class="plat-sub">We manage your brand across every platform — simultaneously.</p>
  <div class="plat-tabs" id="platTabs">
    <div class="ptab" data-p="ig" onclick="swPlat('ig')"><i class="ri-instagram-fill"></i> Instagram</div>
    <div class="ptab" data-p="fb" onclick="swPlat('fb')"><i class="ri-facebook-circle-fill"></i> Facebook</div>
    <div class="ptab" data-p="go" onclick="swPlat('go')"><i class="ri-google-fill"></i> Google</div>
    <div class="ptab" data-p="web" onclick="swPlat('web')"><i class="ri-window-line"></i> Website</div>
  </div>
  <div id="platformGrid"></div>
</div>
</section>

<!-- SERVICES -->
<section id="svcSec" class="sec">
  <div class="svc-wm">SERVICES</div>
  <div class="sin">
    <div class="svc-hdr">
      <span class="sec-lbl gold"><i class="ri-stack-fill"></i> Our Arsenal</span>
      <h2 class="svc-h2">Digital Marketing <em>Services.</em></h2>
      <p class="svc-sub">Every service is engineered to generate measurable revenue, not vanity metrics.</p>
    </div>
    <div class="svc-grid" id="svcGrid">${svcCards}</div>
  </div>
</section>

<!-- PROCESS -->
<section id="procSec" class="sec">
<div class="sin">
  <div class="proc-hdr">
    <span class="sec-lbl light"><i class="ri-route-fill"></i> The Reach Process</span>
    <h2 class="proc-h2">Zero to <em>Fully Booked.</em></h2>
    <p class="proc-sub">Our 4-step system gets you results in 30 days or your money back.</p>
  </div>
  <div class="proc-grid" style="position:relative">
    <div class="proc-line"></div>
    ${procSteps}
  </div>
</div>
</section>

<!-- B/A -->
<section id="baSec" class="sec">
<div class="sin">
  <div class="ba-hdr">
    <span class="sec-lbl gold"><i class="ri-magic-line"></i> The Difference</span>
    <h2 class="ba-h2">Before vs <em>After.</em></h2>
    <p style="font-family:var(--ss);font-size:1rem;color:var(--tx3);max-width:520px;margin:0 auto;line-height:1.75">Drag the slider to see how upgrading your digital presence instantly builds trust.</p>
  </div>
  <div id="baSlider">
    <img id="baAfter" src="assets/after.png" alt="After"
      onerror="this.src='https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1260&q=80'">
    <img id="baBefore" src="assets/before.png" alt="Before"
      onerror="this.src='https://images.pexels.com/photos/5632381/pexels-photo-5632381.jpeg?auto=compress&cs=tinysrgb&w=1260&q=80'">
    <div id="baDivider"></div>
    <div class="ba-lbl bef">BEFORE</div>
    <div class="ba-lbl aft">AFTER</div>
  </div>
  <div class="ba-stats">
    <div class="ba-s"><div class="ba-sn">-62%</div><div class="ba-sl">Cost Per Lead Reduced</div></div>
    <div class="ba-s"><div class="ba-sn">4.8×</div><div class="ba-sl">Return on Ad Spend</div></div>
    <div class="ba-s"><div class="ba-sn">14 Days</div><div class="ba-sl">To First Results</div></div>
  </div>
</div>
</section>

<!-- TESTIMONIALS -->
<section id="testiSec" class="sec">
  <div class="testi-hdr">
    <span class="sec-lbl gold"><i class="ri-star-fill"></i> Client Reviews</span>
    <h2 class="testi-h2">Real Results, <em>Real Clients.</em></h2>
  </div>
  <div class="tt-wrap"><div class="tt" id="tt">${testiCards}</div></div>
</section>

<!-- RUSH -->
<section id="rushSec" class="sec">
  <div class="rush-in">
    <span class="sec-lbl light" style="margin-bottom:28px"><i class="ri-fire-fill"></i> Limited Availability</span>
    <h2 class="rush-h2">Only <em>3 Spots</em><br>Left This Month.</h2>
    <p class="rush-sub">We only take on 5 clients per month to ensure every client gets our full, undivided attention and best results.</p>
    <div class="rush-btns">
      <a href="form.html" class="btn-g">Book Your Free Call <i class="ri-arrow-right-line"></i></a>
      <a href="reviews.html" class="btn-l"><i class="ri-star-fill" style="color:var(--gold)"></i> See All Reviews</a>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer id="rfFoot">
  <div class="foot-in">
    <div>
      <div class="foot-logo">
        <img src="assets/logo.png" alt="Reach Forever" style="filter:none!important"
          onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
        <div class="foot-logo-fb">Reach Forever</div>
      </div>
      <p class="foot-desc">Punjab's #1 Digital Marketing Agency — engineering growth through data-driven strategies and creative execution.</p>
    </div>
    <div>
      <div class="foot-col-t">Services</div>
      <a href="#svcSec" class="foot-lk">Local Business Ads</a>
      <a href="#svcSec" class="foot-lk">Automated Websites</a>
      <a href="#svcSec" class="foot-lk">Google SEO</a>
      <a href="#svcSec" class="foot-lk">Social Media Growth</a>
      <a href="#svcSec" class="foot-lk">Video Production</a>
    </div>
    <div>
      <div class="foot-col-t">Company</div>
      <a href="reviews.html" class="foot-lk">Reviews</a>
      <a href="form.html" class="foot-lk">Start a Project</a>
      <a href="#procSec" class="foot-lk">Our Process</a>
      <a href="#baSec" class="foot-lk">Case Studies</a>
    </div>
    <div>
      <div class="foot-col-t">Contact</div>
      <a href="https://wa.me/918146652870" class="foot-lk"><i class="ri-whatsapp-line"></i> WhatsApp Us</a>
      <a href="https://instagram.com/reachforever" class="foot-lk"><i class="ri-instagram-line"></i> Instagram</a>
      <a href="https://facebook.com/reachforever" class="foot-lk"><i class="ri-facebook-circle-line"></i> Facebook</a>
      <a href="mailto:hello@reachforever.in" class="foot-lk"><i class="ri-mail-line"></i> Email Us</a>
    </div>
  </div>
  <div class="foot-bot">
    <span>© 2025 Reach Forever. All rights reserved.</span>
    <span>Made by <a href="https://zyrovadigital.online" target="_blank">zyrova digital</a></span>
  </div>
</footer>

<!-- FLOATS -->
<a href="https://wa.me/918146652870" target="_blank" class="wa"><i class="ri-whatsapp-line"></i></a>
<div class="scta" id="scta"><span>Limited spots left this month</span><a href="form.html">Book a Call →</a></div>
<div class="aifab"><i class="ri-customer-service-2-fill"></i><div class="aifab-dot"></div></div>

<!-- MOBILE NAV -->
<nav class="mnav">
  <a href="#hero" class="mni on"><i class="ri-home-4-fill"></i>Home</a>
  <a href="#svcSec" class="mni"><i class="ri-stack-fill"></i>Services</a>
  <a href="reviews.html" class="mni"><i class="ri-star-fill"></i>Reviews</a>
  <a href="form.html" class="mni" style="color:#C8A96E"><i class="ri-rocket-fill"></i>Start</a>
</nav>

<!-- REELS MODAL -->
<div id="rmModal">
  <div id="rmClose"><i class="ri-arrow-left-line"></i></div>
  <div id="rmCon"></div>
</div>

<!-- LIGHTBOX -->
<div id="fsLb">
  <div id="fsClose"><i class="ri-close-line"></i></div>
  <img id="fsImg" src="" alt="">
</div>

<script>
// ═══ PLATFORM GRID ═══
(function(){
  const P={
    ig:{pre:'ig',n:6,col:'#E4405F',ic:'ri-instagram-fill',lbl:'Instagram',gr:'linear-gradient(135deg,rgba(228,64,95,.3),rgba(119,0,255,.2))'},
    fb:{pre:'fb',n:6,col:'#1877F2',ic:'ri-facebook-circle-fill',lbl:'Facebook',gr:'linear-gradient(135deg,rgba(24,119,242,.3),rgba(0,40,120,.2))'},
    go:{pre:'gl',n:6,col:'#DB4437',ic:'ri-google-fill',lbl:'Google',gr:'linear-gradient(135deg,rgba(219,68,55,.3),rgba(244,160,0,.2))'},
    web:{pre:'wb',n:6,col:'#C8A96E',ic:'ri-window-line',lbl:'Website',gr:'linear-gradient(135deg,rgba(200,169,110,.3),rgba(26,18,8,.2))'}
  };
  window.swPlat=function(key){
    const p=P[key]; if(!p)return;
    const g=document.getElementById('platformGrid');
    document.querySelectorAll('.ptab').forEach(t=>{
      const a=t.getAttribute('data-p')===key;
      t.style.border=a?'1.5px solid '+p.col:'1.5px solid rgba(247,244,239,.1)';
      t.style.background=a?p.gr:'rgba(247,244,239,.04)';
      t.style.color=a?'#FFF':'rgba(247,244,239,.45)';
      t.style.transform=a?'translateY(-3px)':'';
      t.style.boxShadow=a?'0 10px 28px rgba(0,0,0,.26)':'';
    });
    g.style.opacity='0'; g.style.transform='translateY(18px)';
    setTimeout(()=>{
      g.innerHTML='';
      for(let i=1;i<=p.n;i++){
        const c=document.createElement('div'); c.className='pgc';
        const img=document.createElement('img');
        img.src='assets/'+p.pre+'_'+i+'.jpg'; img.alt=p.lbl+' '+i; img.loading='lazy';
        const ov=document.createElement('div'); ov.className='pgc-ov';
        ov.innerHTML='<span>'+p.lbl+' Result '+i+'</span>';
        img.onerror=function(){
          c.innerHTML='<div style="height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px"><i class="'+p.ic+'" style="font-size:2.8rem;color:'+p.col+';opacity:.25"></i><span style="font-family:Outfit,sans-serif;font-size:.68rem;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:rgba(247,244,239,.18)">'+p.lbl+' '+i+'</span></div>';
          c.style.cursor='default';
        };
        c.addEventListener('click',()=>{ if(img.complete&&img.naturalWidth>0) openLb(img.src); });
        c.appendChild(img); c.appendChild(ov); g.appendChild(c);
      }
      if(window.gsap) gsap.fromTo(g.children,{opacity:0,y:22,scale:.94},{opacity:1,y:0,scale:1,duration:.5,stagger:.06,ease:'power3.out'});
      g.style.opacity='1'; g.style.transform='';
    },280);
  };
  window.switchPlatform=window.swPlat;
  document.addEventListener('DOMContentLoaded',()=>swPlat('ig'));
})();
</script>

<script>
// ═══ CORE ═══
document.addEventListener('DOMContentLoaded',()=>{

  // Preloader
  const pl=document.getElementById('pl');
  if(pl) setTimeout(()=>{pl.classList.add('done');setTimeout(()=>pl.remove(),800);},1200);

  // Progress
  const prog=document.getElementById('prog');
  window.addEventListener('scroll',()=>{
    if(prog){const p=window.scrollY/(document.documentElement.scrollHeight-window.innerHeight)*100;prog.style.width=p+'%';}
  },{passive:true});

  // Nav scroll
  const nav=document.getElementById('rfNav');
  window.addEventListener('scroll',()=>{if(nav)nav.classList.toggle('scrolled',window.scrollY>50)},{passive:true});

  // Sticky CTA
  const sc=document.getElementById('scta');
  window.addEventListener('scroll',()=>{if(sc)sc.classList.toggle('on',window.scrollY>600)},{passive:true});

  // Hero rotator
  let ri=0; const rot=document.getElementById('hRot');
  if(rot) setInterval(()=>{ri=(ri+1)%5;rot.style.transform='translateY(-'+(ri*1.05)+'em)';},2800);

  // B/A slider
  const bsl=document.getElementById('baSlider');
  const bb=document.getElementById('baBefore');
  const bd=document.getElementById('baDivider');
  if(bsl&&bb&&bd){
    let drag=false;
    const mv=x=>{const r=bsl.getBoundingClientRect();const p=Math.min(Math.max((x-r.left)/r.width,.04),.96);bb.style.clipPath='inset(0 '+((1-p)*100)+'% 0 0)';bd.style.left=(p*100)+'%';};
    bsl.addEventListener('mousedown',e=>{drag=true;mv(e.clientX);});
    document.addEventListener('mousemove',e=>{if(drag)mv(e.clientX);});
    document.addEventListener('mouseup',()=>{drag=false;});
    bsl.addEventListener('touchstart',e=>{drag=true;mv(e.touches[0].clientX);},{passive:true});
    document.addEventListener('touchmove',e=>{if(drag)mv(e.touches[0].clientX);},{passive:true});
    document.addEventListener('touchend',()=>{drag=false;});
  }

  // Reels modal
  const rm=document.getElementById('rmModal');
  const rmc=document.getElementById('rmClose');
  const rcon=document.getElementById('rmCon');

  window.openReel=function(){
    if(!rm)return;
    document.body.style.overflow='hidden';
    rm.classList.add('open');
    document.querySelectorAll('#rfNav,.mnav,.header-wrap,.navbar').forEach(el=>{el.style.opacity='0';el.style.pointerEvents='none';});
    document.getElementById('hVid')&&document.getElementById('hVid').pause();
    setTimeout(()=>{const fv=rcon&&rcon.querySelector('.rmv');if(fv){fv.muted=false;fv.play().catch(()=>{});}},350);
  };
  window.openReelsModal=window.openReel;

  if(rmc&&rm){
    rmc.addEventListener('click',()=>{
      rm.querySelectorAll('video').forEach(v=>{v.pause();v.currentTime=0;v.muted=true;});
      rm.classList.remove('open');
      document.body.style.overflow='';
      document.querySelectorAll('#rfNav,.mnav,.header-wrap,.navbar').forEach(el=>{el.style.opacity='';el.style.pointerEvents='';});
      const hv=document.getElementById('hVid'); if(hv){hv.muted=true;hv.play().catch(()=>{});}
    });
  }

  // Populate reels
  if(rcon){
    rcon.innerHTML='';
    for(let i=1;i<=10;i++){
      rcon.insertAdjacentHTML('beforeend',
        '<div style="width:100%;height:100vh;scroll-snap-align:start;position:relative;background:#0C0A05">'+
        '<video class="rmv" loop playsinline style="width:100%;height:100%;object-fit:cover" src="assets/video_'+i+'.mp4"></video>'+
        '<div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.9) 0%,transparent 50%);display:flex;flex-direction:column;justify-content:flex-end;padding:40px 24px;pointer-events:none">'+
        '<div style="font-family:Cormorant Garamond,serif;font-size:1.5rem;color:#FFF;font-weight:700">Client Story '+i+'</div>'+
        '<div style="font-family:Outfit,sans-serif;font-size:.87rem;color:rgba(255,255,255,.55);margin-top:6px">Real results from Reach Forever.</div></div></div>'
      );
    }
    if('IntersectionObserver' in window){
      const vio=new IntersectionObserver(entries=>entries.forEach(e=>{
        const open=rm&&rm.classList.contains('open');
        if(e.isIntersecting&&open){e.target.muted=false;e.target.play().catch(()=>{});}
        else{e.target.pause();e.target.currentTime=0;}
      }),{threshold:.6});
      rcon.querySelectorAll('.rmv').forEach(v=>vio.observe(v));
    }
  }

  // Lightbox
  window.openLb=function(src){
    const lb=document.getElementById('fsLb');
    const img=document.getElementById('fsImg');
    if(!lb||!img)return;
    img.src=src; lb.classList.add('open');
  };
  const fsc=document.getElementById('fsClose');
  const fslb=document.getElementById('fsLb');
  if(fsc&&fslb){
    fsc.addEventListener('click',()=>fslb.classList.remove('open'));
    fslb.addEventListener('click',e=>{if(e.target===fslb)fslb.classList.remove('open');});
  }
});
</script>

<script>
// ═══ ANIMATIONS ═══
window.addEventListener('load',function(){

  // GSAP
  if(window.gsap&&window.ScrollTrigger){
    gsap.registerPlugin(ScrollTrigger);

    // Hero
    const ht=gsap.timeline({delay:1.3});
    ht.to('#hContent',{opacity:1,y:0,duration:1,ease:'power4.out'})
      .to('#hVisual',{opacity:1,y:0,duration:1.2,ease:'power4.out'},0.2)
      .fromTo('.fsc',{opacity:0,scale:.7},{opacity:1,scale:1,duration:.8,stagger:.2,ease:'back.out(1.7)'},1);

    // Stats
    ScrollTrigger.create({trigger:'#statsBar',start:'top 80%',once:true,onEnter:()=>{
      document.querySelectorAll('[data-c]').forEach(el=>{
        const t=parseFloat(el.getAttribute('data-c'));
        const s=el.getAttribute('data-s')||'';
        const f=!!el.getAttribute('data-f');
        gsap.fromTo({v:0},{v:t},{duration:2.2,ease:'power2.out',
          onUpdate:function(){el.textContent=(f?this.targets()[0].v.toFixed(1):Math.round(this.targets()[0].v))+s;},
          onComplete:()=>{el.textContent=(f?t.toFixed(1):t)+s;}
        });
      });
      gsap.fromTo('.si',{opacity:0,y:40},{opacity:1,y:0,duration:.7,stagger:.12,ease:'power3.out'});
    }});

    // Platform
    ScrollTrigger.create({trigger:'#platformSec',start:'top 80%',once:true,onEnter:()=>{
      gsap.fromTo('.plat-h2',{opacity:0,y:50},{opacity:1,y:0,duration:.9,ease:'power4.out'});
      gsap.fromTo('.plat-sub',{opacity:0,y:20},{opacity:1,y:0,duration:.7,ease:'power3.out',delay:.2});
      gsap.fromTo('.ptab',{opacity:0,y:20,scale:.9},{opacity:1,y:0,scale:1,duration:.5,stagger:.07,ease:'back.out(1.4)',delay:.35});
    }});

    // Services
    ScrollTrigger.create({trigger:'#svcGrid',start:'top 78%',once:true,onEnter:()=>{
      gsap.fromTo('.svc-card',{opacity:0,y:80,scale:.9},{opacity:1,y:0,scale:1,duration:.8,stagger:.1,ease:'power4.out'});
    }});

    // Process
    ScrollTrigger.create({trigger:'#procSec',start:'top 80%',once:true,onEnter:()=>{
      gsap.fromTo('.proc-h2',{opacity:0,y:50},{opacity:1,y:0,duration:.9,ease:'power4.out'});
      gsap.fromTo('.proc-step',{opacity:0,y:60},{opacity:1,y:0,duration:.7,stagger:.18,ease:'power3.out',delay:.3});
    }});

    // B/A
    ScrollTrigger.create({trigger:'#baSec',start:'top 80%',once:true,onEnter:()=>{
      gsap.fromTo('#baSlider',{opacity:0,scale:.92,y:50},{opacity:1,scale:1,y:0,duration:1.1,ease:'power4.out'});
      gsap.fromTo('.ba-s',{opacity:0,y:30},{opacity:1,y:0,duration:.6,stagger:.1,ease:'power3.out',delay:.6});
      const bb=document.getElementById('baBefore'),bd=document.getElementById('baDivider');
      if(bb&&bd){gsap.fromTo({v:.9},{v:.5},{duration:2.2,ease:'power2.inOut',delay:.9,
        onUpdate:function(){const p=this.targets()[0].v;bb.style.clipPath='inset(0 '+((1-p)*100)+'% 0 0)';bd.style.left=(p*100)+'%';}
      });}
    }});

    // Testi
    ScrollTrigger.create({trigger:'#testiSec',start:'top 85%',once:true,onEnter:()=>{
      gsap.fromTo('.testi-h2',{opacity:0,y:40},{opacity:1,y:0,duration:.9,ease:'power4.out'});
    }});

    // Rush
    ScrollTrigger.create({trigger:'#rushSec',start:'top 80%',once:true,onEnter:()=>{
      gsap.fromTo('.rush-h2,.rush-sub,.rush-btns',{opacity:0,y:50},{opacity:1,y:0,duration:.8,stagger:.14,ease:'power4.out'});
    }});
  }

  // 3D tilt service cards
  document.querySelectorAll('.svc-card[data-tilt]').forEach(c=>{
    c.addEventListener('mousemove',e=>{
      const r=c.getBoundingClientRect();
      const cx=(e.clientX-r.left)/r.width-.5;
      const cy=(e.clientY-r.top)/r.height-.5;
      c.style.transform='perspective(900px) rotateX('+(cy*-18)+'deg) rotateY('+(cx*18)+'deg) translateY(-14px) scale(1.02)';
      c.style.boxShadow='0 40px 80px rgba(0,0,0,.38)';
      const gl=c.querySelector('.svc-glare');
      if(gl){const gx=(e.clientX-r.left)/r.width*100;const gy=(e.clientY-r.top)/r.height*100;gl.style.opacity='1';gl.style.background='radial-gradient(circle at '+gx+'% '+gy+'%,rgba(255,255,255,.07) 0%,transparent 60%)';}
    });
    c.addEventListener('mouseleave',()=>{
      c.style.transform='';c.style.boxShadow='';
      const gl=c.querySelector('.svc-glare');if(gl)gl.style.opacity='0';
    });
  });

  // Phone parallax on desktop
  const ph=document.getElementById('heroPhone');
  if(ph&&window.innerWidth>1000){
    document.addEventListener('mousemove',e=>{
      const cx=(e.clientX/window.innerWidth-.5)*2;
      const cy=(e.clientY/window.innerHeight-.5)*2;
      ph.style.transform='perspective(1000px) rotateY('+(-12+cx*9)+'deg) rotateX('+(2+cy*-5)+'deg)';
    });
  }

  // Custom cursor
  const dot=document.getElementById('cdot');
  const ring=document.getElementById('cring');
  if(dot&&ring&&window.innerWidth>768){
    let mx=0,my=0,rx=0,ry=0;
    document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;});
    (function lr(){
      rx+=(mx-rx)*.12; ry+=(my-ry)*.12;
      dot.style.transform='translate('+mx+'px,'+my+'px) translate(-50%,-50%)';
      ring.style.transform='translate('+rx+'px,'+ry+'px) translate(-50%,-50%)';
      requestAnimationFrame(lr);
    })();
    document.querySelectorAll('a,button,.svc-card,.pgc,#heroPhone,.ptab,.btn-g,.btn-o,.ncta').forEach(el=>{
      el.addEventListener('mouseenter',()=>{ring.style.width='54px';ring.style.height='54px';ring.style.borderColor='rgba(200,169,110,.8)';});
      el.addEventListener('mouseleave',()=>{ring.style.width='38px';ring.style.height='38px';ring.style.borderColor='rgba(200,169,110,.5)';});
    });
  }
});
</script>
</body>
</html>`;

fs.writeFileSync('public/index.html', html, 'utf8');
const sz = html.length;
console.log('BUILD COMPLETE. Size:', sz, 'bytes (', Math.round(sz/1024), 'KB)');
console.log('Sections: Hero, Stats, Platform, Services, Process, B/A, Testimonials, Rush, Footer');
console.log('Features: GSAP ScrollTrigger, 3D tilt, parallax phone, custom cursor, reels modal, lightbox, B/A slider, platform grid, counters');
