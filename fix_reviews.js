// fix_reviews.js — surgically removes Lenis, vanilla-tilt, and restores proper JS engine
const fs = require('fs');
const path = require('path');

let html = fs.readFileSync('public/reviews.html', 'utf8');

// 1. Remove Lenis CDN script tag
html = html.replace(/<script\s+src="https:\/\/cdn\.jsdelivr\.net\/npm\/lenis[^"]*"[^>]*><\/script>\s*/gi, '');

// 2. Remove vanilla-tilt CDN script tag
html = html.replace(/<script\s+src="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/vanilla-tilt[^"]*"[^>]*><\/script>\s*/gi, '');

// 3. Fix CSS comment referencing Lenis
html = html.replace(
  /\/\* FIX 1: scroll-behavior:smooth REMOVED - Lenis JS handles smooth scroll\.\s*Keeping both causes a muddy\/stuck feeling as two engines fight for control\. \*\//g,
  '/* scroll-behavior:smooth removed — using native scroll for performance */'
);

// 4. Remove Lenis initialization block from JS
// Find the pattern: let lenis = null; ... requestAnimationFrame(rafLenis);
html = html.replace(/\/\*[\s\S]*?1\. LENIS SMOOTH SCROLL[\s\S]*?requestAnimationFrame\(rafLenis\);[\s\S]*?}\s*\n/gm, function(match) {
  // Replace the entire lenis init block
  return '// Smooth scroll: native\n';
});

// Simpler targeted removal of lenis block
html = html.replace(/let lenis = null;[\s\S]*?requestAnimationFrame\(rafLenis\);\s*\n\s*lenis\.on\('scroll'[^\)]*\)[^;]*;/g, '// Lenis removed — using native scroll');

// 5. Remove any remaining lenis.scrollTo calls
html = html.replace(/if \(lenis\) \{[\s\S]*?lenis\.scrollTo[\s\S]*?\}/g, '');

// 6. Ensure cms.js is loaded (check if missing)
if (!html.includes('js/cms.js')) {
  html = html.replace('</body>', '<script src="js/cms.js" defer></script>\n</body>');
  console.log('[FIX] Added cms.js script tag');
}

// 7. Add the lightweight JS engine right before </body> if not present
const hasEngine = html.includes('// Video Vault Player') || html.includes('playVaultVid');

if (!hasEngine) {
  const engine = `
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
<script>
(function(){
  'use strict';
  // Preloader
  window.addEventListener('load',function(){
    var pl=document.getElementById('preloader');
    if(pl){setTimeout(function(){pl.classList.add('hidden');setTimeout(function(){if(pl.parentNode)pl.parentNode.removeChild(pl);},700);},900);}
  });
  // Scroll Progress
  var prog=document.getElementById('scrollProgress');
  if(prog){window.addEventListener('scroll',function(){prog.style.width=(window.scrollY/(document.documentElement.scrollHeight-window.innerHeight)*100)+'%';},{passive:true});}
  // Custom Cursor (desktop only)
  if(window.matchMedia('(hover:hover) and (pointer:fine)').matches){
    var dot=document.querySelector('.cursor-dot');
    var ring=document.querySelector('.cursor-ring');
    if(dot&&ring){
      var mx=0,my=0,rx=0,ry=0;
      document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px';},{passive:true});
      (function lr(){rx+=(mx-rx)*.1;ry+=(my-ry)*.1;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(lr);})();
      document.querySelectorAll('a,button,.vid-thumb,.cs-card').forEach(function(el){
        el.addEventListener('mouseenter',function(){ring.classList.add('hovering');dot.classList.add('hovering');});
        el.addEventListener('mouseleave',function(){ring.classList.remove('hovering');dot.classList.remove('hovering');});
      });
    }
  }
  document.addEventListener('DOMContentLoaded',function(){
    // GSAP reveal animations
    if(window.gsap&&window.ScrollTrigger){
      gsap.registerPlugin(ScrollTrigger);
      document.querySelectorAll('.reveal-up').forEach(function(el){
        ScrollTrigger.create({trigger:el,start:'top 88%',once:true,onEnter:function(){gsap.to(el,{opacity:1,y:0,duration:.8,ease:'power3.out'});}});
      });
    }
    // Video Vault Player
    var vaultVids=document.querySelectorAll('.vault-video');
    var vidThumbs=document.querySelectorAll('.vid-thumb');
    function playVaultVid(idx){
      vaultVids.forEach(function(v){v.classList.remove('active');v.pause();});
      vidThumbs.forEach(function(t){t.classList.remove('active');});
      if(vaultVids[idx]){vaultVids[idx].classList.add('active');vaultVids[idx].play().catch(function(){});}
      if(vidThumbs[idx])vidThumbs[idx].classList.add('active');
    }
    vidThumbs.forEach(function(t,i){t.addEventListener('click',function(){playVaultVid(i);});});
    if(vaultVids.length)playVaultVid(0);
    // Case Studies Observer
    var csCards=document.querySelectorAll('.cs-card');
    var csImgs=document.querySelectorAll('.cs-img');
    var csBadge=document.querySelector('.cs-badge');
    if(csCards.length&&window.IntersectionObserver){
      var obs=new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if(e.isIntersecting){
            var idx=Array.from(csCards).indexOf(e.target);
            csCards.forEach(function(c){c.classList.remove('active-card');});
            csImgs.forEach(function(img){img.classList.remove('active');});
            e.target.classList.add('active-card');
            if(csImgs[idx])csImgs[idx].classList.add('active');
            if(csBadge){
              var bv=e.target.getAttribute('data-badge-val');
              var bl=e.target.getAttribute('data-badge-lbl');
              if(bv&&bl){var sp=csBadge.querySelector('span');var pp=csBadge.querySelector('p');if(sp)sp.textContent=bv;if(pp)pp.textContent=bl;}
              csBadge.classList.add('badge-visible');
            }
          }
        });
      },{threshold:0.5});
      csCards.forEach(function(c){obs.observe(c);});
    }
    // ROI Slider
    var slider=document.getElementById('roiSlider');
    if(slider){
      function updateROI(v){
        var spend=parseInt(v);
        var leads=Math.round(spend*0.8);
        var revenue=Math.round(spend*4.8);
        var roi=Math.round(((revenue-spend)/spend)*100);
        function el(id){return document.getElementById(id);}
        if(el('roiSpend'))el('roiSpend').textContent='\\u20b9'+spend.toLocaleString('en-IN');
        if(el('roiLeads'))el('roiLeads').textContent=leads;
        if(el('roiRevenue'))el('roiRevenue').textContent='\\u20b9'+revenue.toLocaleString('en-IN');
        if(el('roiPercent'))el('roiPercent').textContent='+'+roi+'%';
      }
      slider.addEventListener('input',function(){updateROI(this.value);});
      updateROI(slider.value||'50000');
    }
    // Chatbot
    var fab=document.getElementById('auraFab'),panel=document.getElementById('auraPanel'),closeBtn=document.getElementById('auraClose'),chatBody=document.getElementById('auraBody'),inp=document.getElementById('auraInput'),send=document.getElementById('auraSend');
    var replies=['Thanks! Our team will contact you within 24 hours.','We would love to help! Share more details.','Book a free strategy call at the top of this page.','Most clients see real results within 14-30 days.'];
    function addMsg(t,type){var d=document.createElement('div');d.style.cssText='margin-bottom:12px;padding:14px 18px;border-radius:18px;font-size:.9rem;line-height:1.5;max-width:85%;'+(type==='bot'?'background:rgba(85,107,47,.12);border:1px solid rgba(85,107,47,.3);':'background:var(--accent-olive);color:#FFF;margin-left:auto;');d.textContent=t;if(chatBody){chatBody.appendChild(d);chatBody.scrollTop=chatBody.scrollHeight;}}
    function openBot(){if(panel){panel.style.opacity='1';panel.style.transform='translateY(0) scale(1)';panel.style.pointerEvents='auto';if(chatBody&&!chatBody.children.length)addMsg('Hello! How can Reach Forever help your business grow today?','bot');}}
    function closeBot(){if(panel){panel.style.opacity='0';panel.style.transform='translateY(40px) scale(.95)';panel.style.pointerEvents='none';}}
    if(fab)fab.addEventListener('click',function(){panel&&panel.style.opacity==='1'?closeBot():openBot();});
    if(closeBtn)closeBtn.addEventListener('click',closeBot);
    function sendMsg(){if(!inp||!inp.value.trim())return;addMsg(inp.value.trim(),'user');inp.value='';setTimeout(function(){addMsg(replies[Math.floor(Math.random()*replies.length)],'bot');},800);}
    if(send)send.addEventListener('click',sendMsg);
    if(inp)inp.addEventListener('keydown',function(e){if(e.key==='Enter')sendMsg();});
    // Sticky Nav shadow
    var nav=document.querySelector('.navbar');
    if(nav){window.addEventListener('scroll',function(){nav.style.boxShadow=window.scrollY>60?'0 0 40px rgba(200,169,110,.25)':'0 0 25px rgba(200,169,110,.15)';},{passive:true});}
    // Fullscreen image lightbox for vault thumbnails
    var lb=document.getElementById('vaultLightbox');
    var lbImg=document.getElementById('vaultLbImg');
    var lbClose=document.getElementById('vaultLbClose');
    document.querySelectorAll('.vt-img').forEach(function(img){
      img.style.cursor='zoom-in';
      img.addEventListener('click',function(e){
        e.stopPropagation();
        if(lb&&lbImg){lbImg.src=img.src;lb.style.opacity='1';lb.style.pointerEvents='auto';document.body.style.overflow='hidden';}
      });
    });
    if(lbClose)lbClose.addEventListener('click',function(){if(lb){lb.style.opacity='0';lb.style.pointerEvents='none';document.body.style.overflow='';}});
    if(lb)lb.addEventListener('click',function(e){if(e.target===lb){lb.style.opacity='0';lb.style.pointerEvents='none';document.body.style.overflow='';}});
  });
})();
</script>
`;
  html = html.replace('</body>', engine + '\n</body>');
  console.log('[FIX] Added JS engine');
}

fs.writeFileSync('public/reviews.html', html, 'utf8');
console.log('[DONE] reviews.html cleaned and fixed');
console.log('[INFO] File size:', fs.statSync('public/reviews.html').size, 'bytes');
