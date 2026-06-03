/**
 * MASTERPIECE PATCH — V2
 */
const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

// 1. Hero rotator colors
html = html.replace(
  /<span id="heroRotator"[^>]+>([\s\S]*?)<\/span>\s*<\/span>/,
  (match) => {
    return match
      .replace('color:#C8A96E;font-style:italic">Ad Spend',  'color:#D4AF37!important;font-style:italic;text-shadow:0 0 40px rgba(212,175,55,0.3)">Ad Spend')
      .replace('color:#DB4437;font-style:italic">Clicks',    'color:#FF6B6B!important;font-style:italic;text-shadow:0 0 40px rgba(255,107,107,0.3)">Clicks')
      .replace('color:#9032CC;font-style:italic">Traffic',   'color:#C084FC!important;font-style:italic;text-shadow:0 0 40px rgba(192,132,252,0.3)">Traffic')
      .replace('color:#C8A96E;font-style:italic">Leads',     'color:#6EE7B7!important;font-style:italic;text-shadow:0 0 40px rgba(110,231,183,0.3)">Leads')
      .replace('color:#1877F2;font-style:italic">Sales',     'color:#60A5FA!important;font-style:italic;text-shadow:0 0 40px rgba(96,165,250,0.3)">Sales');
  }
);
html = html.replace(/(<h1[^>]+style="[^"]*?)color:#1A1208([^"]*")/, '$1color:inherit$2');

// 2. Reels modal close sound
html = html.replace(
  "rmClose.addEventListener('click', () => { rmModal.style.opacity='0'; rmModal.style.pointerEvents='none'; document.body.style.overflow=''; });",
  "rmClose.addEventListener('click', () => {\n" +
  "  document.querySelectorAll('#rmModalContainer video').forEach(v => { v.pause(); v.currentTime = 0; v.muted = true; });\n" +
  "  const hv = document.getElementById('heroVideoAd');\n" +
  "  if (hv) { hv.muted = true; hv.play().catch(()=>{}); }\n" +
  "  rmModal.style.opacity = '0';\n" +
  "  rmModal.style.pointerEvents = 'none';\n" +
  "  document.body.style.overflow = '';\n" +
  "});"
);

// 3. Remove doubled SERVICES ghost text
const oldServicesText = "<div style=\"position:absolute;top:0;left:50%;transform:translateX(-50%);font-family:'Cormorant Garamond',serif;font-size:clamp(6rem,18vw,18rem);font-weight:700;color:rgba(247,244,239,0.03);white-space:nowrap;pointer-events:none;letter-spacing:-5px;line-height:1;z-index:0\">SERVICES</div>";
html = html.replace(oldServicesText, '<!-- ghost text removed -->');

// 4. Glass Morphism Cards
const glassCards = `
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px" id="servicesGrid">

      <!-- Card 1: Local Ads -->
      <div class="svc-card" data-tilt style="position:relative;border-radius:28px;overflow:hidden;padding:44px 32px;display:flex;flex-direction:column;min-height:400px;background:rgba(15,10,35,0.82);backdrop-filter:blur(32px) saturate(1.4);-webkit-backdrop-filter:blur(32px) saturate(1.4);border:1px solid rgba(100,80,255,0.25);box-shadow:0 4px 24px rgba(0,0,0,0.08),inset 0 1px 0 rgba(255,255,255,0.06);transform-style:preserve-3d;cursor:pointer">
        <div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(100,80,255,0.5),transparent)"></div>
        <div style="position:absolute;top:-80px;right:-80px;width:240px;height:240px;background:radial-gradient(circle,rgba(100,80,255,0.15),transparent 70%);border-radius:50%;pointer-events:none"></div>
        <div style="width:60px;height:60px;border-radius:18px;background:rgba(100,80,255,0.15);border:1px solid rgba(100,80,255,0.3);display:flex;align-items:center;justify-content:center;font-size:2rem;color:#A78BFA;margin-bottom:24px;flex-shrink:0">
          <i class="ri-facebook-circle-fill"></i>
        </div>
        <h3 style="font-family:'Cormorant Garamond',serif;font-size:1.9rem;font-weight:700;color:#F7F4EF;margin-bottom:12px;line-height:1.1">Local Business Ads</h3>
        <p style="font-family:'Outfit',sans-serif;font-size:0.92rem;color:rgba(247,244,239,0.55);line-height:1.7;margin-bottom:24px;flex-grow:1">Hyper-targeted Meta &amp; Google campaigns that capture high-intent customers in your exact area.</p>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:auto">
          <span style="padding:6px 14px;background:rgba(100,80,255,0.12);color:rgba(167,139,250,0.9);border:1px solid rgba(100,80,255,0.2);border-radius:100px;font-family:'Outfit',sans-serif;font-size:0.75rem;font-weight:700;letter-spacing:0.5px">Retargeting</span>
          <span style="padding:6px 14px;background:rgba(100,80,255,0.12);color:rgba(167,139,250,0.9);border:1px solid rgba(100,80,255,0.2);border-radius:100px;font-family:'Outfit',sans-serif;font-size:0.75rem;font-weight:700;letter-spacing:0.5px">4.8× ROAS</span>
          <span style="padding:6px 14px;background:rgba(100,80,255,0.12);color:rgba(167,139,250,0.9);border:1px solid rgba(100,80,255,0.2);border-radius:100px;font-family:'Outfit',sans-serif;font-size:0.75rem;font-weight:700;letter-spacing:0.5px">Lookalikes</span>
        </div>
      </div>

      <!-- Card 2: Websites -->
      <div class="svc-card" data-tilt style="position:relative;border-radius:28px;overflow:hidden;padding:44px 32px;display:flex;flex-direction:column;min-height:400px;background:rgba(10,20,10,0.82);backdrop-filter:blur(32px) saturate(1.4);-webkit-backdrop-filter:blur(32px) saturate(1.4);border:1px solid rgba(200,169,110,0.25);box-shadow:0 4px 24px rgba(0,0,0,0.08),inset 0 1px 0 rgba(255,255,255,0.06);transform-style:preserve-3d;cursor:pointer">
        <div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(200,169,110,0.5),transparent)"></div>
        <div style="position:absolute;top:-80px;right:-80px;width:240px;height:240px;background:radial-gradient(circle,rgba(200,169,110,0.12),transparent 70%);border-radius:50%;pointer-events:none"></div>
        <div style="width:60px;height:60px;border-radius:18px;background:rgba(200,169,110,0.12);border:1px solid rgba(200,169,110,0.25);display:flex;align-items:center;justify-content:center;font-size:2rem;color:#D4AF37;margin-bottom:24px;flex-shrink:0">
          <i class="ri-macbook-fill"></i>
        </div>
        <h3 style="font-family:'Cormorant Garamond',serif;font-size:1.9rem;font-weight:700;color:#F7F4EF;margin-bottom:12px;line-height:1.1">Automated Websites</h3>
        <p style="font-family:'Outfit',sans-serif;font-size:0.92rem;color:rgba(247,244,239,0.55);line-height:1.7;margin-bottom:24px;flex-grow:1">Lightning-fast, booking-optimised landing pages that convert visitors to paying customers 24/7.</p>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:auto">
          <span style="padding:6px 14px;background:rgba(200,169,110,0.1);color:rgba(212,175,55,0.9);border:1px solid rgba(200,169,110,0.2);border-radius:100px;font-family:'Outfit',sans-serif;font-size:0.75rem;font-weight:700;letter-spacing:0.5px">14-Day Launch</span>
          <span style="padding:6px 14px;background:rgba(200,169,110,0.1);color:rgba(212,175,55,0.9);border:1px solid rgba(200,169,110,0.2);border-radius:100px;font-family:'Outfit',sans-serif;font-size:0.75rem;font-weight:700;letter-spacing:0.5px">A/B Tested</span>
        </div>
      </div>

      <!-- Card 3: Google SEO -->
      <div class="svc-card" data-tilt style="position:relative;border-radius:28px;overflow:hidden;padding:44px 32px;display:flex;flex-direction:column;min-height:400px;background:rgba(30,8,8,0.82);backdrop-filter:blur(32px) saturate(1.4);-webkit-backdrop-filter:blur(32px) saturate(1.4);border:1px solid rgba(219,68,55,0.25);box-shadow:0 4px 24px rgba(0,0,0,0.08),inset 0 1px 0 rgba(255,255,255,0.06);transform-style:preserve-3d;cursor:pointer">
        <div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(219,68,55,0.5),transparent)"></div>
        <div style="position:absolute;top:-80px;right:-80px;width:240px;height:240px;background:radial-gradient(circle,rgba(219,68,55,0.12),transparent 70%);border-radius:50%;pointer-events:none"></div>
        <div style="width:60px;height:60px;border-radius:18px;background:rgba(219,68,55,0.12);border:1px solid rgba(219,68,55,0.25);display:flex;align-items:center;justify-content:center;font-size:2rem;color:#FF6B6B;margin-bottom:24px;flex-shrink:0">
          <i class="ri-search-eye-line"></i>
        </div>
        <h3 style="font-family:'Cormorant Garamond',serif;font-size:1.9rem;font-weight:700;color:#F7F4EF;margin-bottom:12px;line-height:1.1">Google SEO</h3>
        <p style="font-family:'Outfit',sans-serif;font-size:0.92rem;color:rgba(247,244,239,0.55);line-height:1.7;margin-bottom:24px;flex-grow:1">Dominate local search. When customers look for your service in Punjab — you're always first.</p>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:auto">
          <span style="padding:6px 14px;background:rgba(219,68,55,0.1);color:rgba(255,107,107,0.9);border:1px solid rgba(219,68,55,0.2);border-radius:100px;font-family:'Outfit',sans-serif;font-size:0.75rem;font-weight:700;letter-spacing:0.5px">GMB #1</span>
          <span style="padding:6px 14px;background:rgba(219,68,55,0.1);color:rgba(255,107,107,0.9);border:1px solid rgba(219,68,55,0.2);border-radius:100px;font-family:'Outfit',sans-serif;font-size:0.75rem;font-weight:700;letter-spacing:0.5px">Backlinks</span>
        </div>
      </div>

      <!-- Card 4: Social Media -->
      <div class="svc-card" data-tilt style="position:relative;border-radius:28px;overflow:hidden;padding:44px 32px;display:flex;flex-direction:column;min-height:400px;background:rgba(20,5,35,0.82);backdrop-filter:blur(32px) saturate(1.4);-webkit-backdrop-filter:blur(32px) saturate(1.4);border:1px solid rgba(228,64,95,0.25);box-shadow:0 4px 24px rgba(0,0,0,0.08),inset 0 1px 0 rgba(255,255,255,0.06);transform-style:preserve-3d;cursor:pointer">
        <div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(228,64,95,0.5),transparent)"></div>
        <div style="position:absolute;top:-80px;right:-80px;width:240px;height:240px;background:radial-gradient(circle,rgba(228,64,95,0.12),transparent 70%);border-radius:50%;pointer-events:none"></div>
        <div style="width:60px;height:60px;border-radius:18px;background:rgba(228,64,95,0.12);border:1px solid rgba(228,64,95,0.25);display:flex;align-items:center;justify-content:center;font-size:2rem;color:#FF8FAB;margin-bottom:24px;flex-shrink:0">
          <i class="ri-megaphone-fill"></i>
        </div>
        <h3 style="font-family:'Cormorant Garamond',serif;font-size:1.9rem;font-weight:700;color:#F7F4EF;margin-bottom:12px;line-height:1.1">Social Media Growth</h3>
        <p style="font-family:'Outfit',sans-serif;font-size:0.92rem;color:rgba(247,244,239,0.55);line-height:1.7;margin-bottom:24px;flex-grow:1">Viral reels, brand authority content, and daily organic enquiries from Instagram &amp; Facebook.</p>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:auto">
          <span style="padding:6px 14px;background:rgba(228,64,95,0.1);color:rgba(255,143,171,0.9);border:1px solid rgba(228,64,95,0.2);border-radius:100px;font-family:'Outfit',sans-serif;font-size:0.75rem;font-weight:700;letter-spacing:0.5px">Viral Reels</span>
          <span style="padding:6px 14px;background:rgba(228,64,95,0.1);color:rgba(255,143,171,0.9);border:1px solid rgba(228,64,95,0.2);border-radius:100px;font-family:'Outfit',sans-serif;font-size:0.75rem;font-weight:700;letter-spacing:0.5px">Brand Identity</span>
        </div>
      </div>

      <!-- Card 5: CRM -->
      <div class="svc-card" data-tilt style="position:relative;border-radius:28px;overflow:hidden;padding:44px 32px;display:flex;flex-direction:column;min-height:400px;background:rgba(5,20,18,0.82);backdrop-filter:blur(32px) saturate(1.4);-webkit-backdrop-filter:blur(32px) saturate(1.4);border:1px solid rgba(20,184,166,0.25);box-shadow:0 4px 24px rgba(0,0,0,0.08),inset 0 1px 0 rgba(255,255,255,0.06);transform-style:preserve-3d;cursor:pointer">
        <div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(20,184,166,0.5),transparent)"></div>
        <div style="position:absolute;top:-80px;right:-80px;width:240px;height:240px;background:radial-gradient(circle,rgba(20,184,166,0.12),transparent 70%);border-radius:50%;pointer-events:none"></div>
        <div style="width:60px;height:60px;border-radius:18px;background:rgba(20,184,166,0.12);border:1px solid rgba(20,184,166,0.25);display:flex;align-items:center;justify-content:center;font-size:2rem;color:#5EEAD4;margin-bottom:24px;flex-shrink:0">
          <i class="ri-mail-send-fill"></i>
        </div>
        <h3 style="font-family:'Cormorant Garamond',serif;font-size:1.9rem;font-weight:700;color:#F7F4EF;margin-bottom:12px;line-height:1.1">CRM &amp; Automation</h3>
        <p style="font-family:'Outfit',sans-serif;font-size:0.92rem;color:rgba(247,244,239,0.55);line-height:1.7;margin-bottom:24px;flex-grow:1">Automated SMS follow-ups and lead tracking so no potential customer ever slips through.</p>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:auto">
          <span style="padding:6px 14px;background:rgba(20,184,166,0.1);color:rgba(94,234,212,0.9);border:1px solid rgba(20,184,166,0.2);border-radius:100px;font-family:'Outfit',sans-serif;font-size:0.75rem;font-weight:700;letter-spacing:0.5px">SMS Nurture</span>
          <span style="padding:6px 14px;background:rgba(20,184,166,0.1);color:rgba(94,234,212,0.9);border:1px solid rgba(20,184,166,0.2);border-radius:100px;font-family:'Outfit',sans-serif;font-size:0.75rem;font-weight:700;letter-spacing:0.5px">Auto Follow-up</span>
        </div>
      </div>

      <!-- Card 6: Video -->
      <div class="svc-card" data-tilt style="position:relative;border-radius:28px;overflow:hidden;padding:44px 32px;display:flex;flex-direction:column;min-height:400px;background:rgba(28,12,5,0.82);backdrop-filter:blur(32px) saturate(1.4);-webkit-backdrop-filter:blur(32px) saturate(1.4);border:1px solid rgba(251,146,60,0.25);box-shadow:0 4px 24px rgba(0,0,0,0.08),inset 0 1px 0 rgba(255,255,255,0.06);transform-style:preserve-3d;cursor:pointer">
        <div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(251,146,60,0.5),transparent)"></div>
        <div style="position:absolute;top:-80px;right:-80px;width:240px;height:240px;background:radial-gradient(circle,rgba(251,146,60,0.12),transparent 70%);border-radius:50%;pointer-events:none"></div>
        <div style="width:60px;height:60px;border-radius:18px;background:rgba(251,146,60,0.12);border:1px solid rgba(251,146,60,0.25);display:flex;align-items:center;justify-content:center;font-size:2rem;color:#FDBA74;margin-bottom:24px;flex-shrink:0">
          <i class="ri-vidicon-fill"></i>
        </div>
        <h3 style="font-family:'Cormorant Garamond',serif;font-size:1.9rem;font-weight:700;color:#F7F4EF;margin-bottom:12px;line-height:1.1">Video Production</h3>
        <p style="font-family:'Outfit',sans-serif;font-size:0.92rem;color:rgba(247,244,239,0.55);line-height:1.7;margin-bottom:24px;flex-grow:1">Professional reels, testimonial videos, and ad creatives that stop the scroll and book appointments.</p>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:auto">
          <span style="padding:6px 14px;background:rgba(251,146,60,0.1);color:rgba(253,186,116,0.9);border:1px solid rgba(251,146,60,0.2);border-radius:100px;font-family:'Outfit',sans-serif;font-size:0.75rem;font-weight:700;letter-spacing:0.5px">Ad Creatives</span>
          <span style="padding:6px 14px;background:rgba(251,146,60,0.1);color:rgba(253,186,116,0.9);border:1px solid rgba(251,146,60,0.2);border-radius:100px;font-family:'Outfit',sans-serif;font-size:0.75rem;font-weight:700;letter-spacing:0.5px">Testimonials</span>
        </div>
      </div>

    </div>`;

const startIndex = html.indexOf('<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:28px" id="servicesGrid">');
const endIndex = html.indexOf('</section>', startIndex);
if (startIndex !== -1 && endIndex !== -1) {
  html = html.substring(0, startIndex) + glassCards + '\n  </div>\n</section>\n<style>.svc-card:hover { transform:none; } /* tilt handled by JS only */</style>' + html.substring(endIndex + 10);
}

// 5. Replace logo error handler
const oldLogoStr = "onerror=\"this.style.display='none'\" alt=\"Reach Forever\" id=\"logoImg\"";
const newLogoStr = "onerror=\"this.style.display='none';this.insertAdjacentHTML('afterend','<span style=\\'font-family:\\'Cormorant Garamond\\',serif;font-size:1.6rem;font-weight:700;color:#1A1208;letter-spacing:-1px\\'>Reach Forever</span>')\" alt=\"Reach Forever\" id=\"logoImg\"";
html = html.split(oldLogoStr).join(newLogoStr);

// 6. Platform grid script
const newSwitchPlatform = `
<script>
(function(){
  const platforms = {
    ig:  { prefix:'ig',   count:6, color:'#E4405F', gradient:'linear-gradient(135deg,rgba(228,64,95,0.25),rgba(119,0,255,0.18))', icon:'ri-instagram-fill',   label:'Instagram' },
    fb:  { prefix:'fb',   count:6, color:'#1877F2', gradient:'linear-gradient(135deg,rgba(24,119,242,0.25),rgba(0,40,120,0.18))', icon:'ri-facebook-circle-fill', label:'Facebook' },
    go:  { prefix:'gl',   count:6, color:'#DB4437', gradient:'linear-gradient(135deg,rgba(219,68,55,0.25),rgba(244,160,0,0.18))',  icon:'ri-google-fill',          label:'Google' },
    web: { prefix:'wb',   count:6, color:'#C8A96E', gradient:'linear-gradient(135deg,rgba(200,169,110,0.25),rgba(26,18,8,0.18))',  icon:'ri-window-line',          label:'Website' }
  };

  window.switchPlatform = function(plat) {
    const p = platforms[plat];
    const grid = document.getElementById('platformGrid');
    if (!grid || !p) return;

    document.querySelectorAll('.ptab').forEach(t => {
      const active = t.getAttribute('data-plat') === plat;
      if (active) {
        t.style.border = '2px solid ' + p.color;
        t.style.background = p.gradient;
        t.style.color = '#FFF';
        t.style.transform = 'translateY(-3px)';
        t.style.boxShadow = '0 12px 32px rgba(0,0,0,0.3)';
      } else {
        t.style.border = '2px solid rgba(247,244,239,0.1)';
        t.style.background = 'rgba(247,244,239,0.04)';
        t.style.color = 'rgba(247,244,239,0.6)';
        t.style.transform = '';
        t.style.boxShadow = '';
      }
    });

    grid.style.opacity = '0';
    grid.style.transform = 'translateY(20px)';
    setTimeout(() => {
      grid.innerHTML = '';
      for (let i = 1; i <= p.count; i++) {
        const src = 'assets/' + p.prefix + '_' + i + '.jpg';
        const card = document.createElement('div');
        card.style.cssText = 'border-radius:16px;overflow:hidden;aspect-ratio:1;position:relative;cursor:zoom-in;background:rgba(247,244,239,0.04);border:1px solid rgba(247,244,239,0.08);transition:transform 0.4s cubic-bezier(0.16,1,0.3,1),box-shadow 0.4s;';

        card.addEventListener('mouseenter', () => { card.style.transform = 'scale(1.04) translateY(-4px)'; card.style.boxShadow = '0 24px 60px rgba(0,0,0,0.4)'; });
        card.addEventListener('mouseleave', () => { card.style.transform = ''; card.style.boxShadow = ''; });

        const img = document.createElement('img');
        img.src = src;
        img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;transition:transform 0.6s ease;';
        img.alt = p.label + ' Result ' + i;
        img.loading = 'lazy';

        img.onerror = function() {
          card.innerHTML = '';
          card.style.cursor = 'default';
          card.style.display = 'flex';
          card.style.flexDirection = 'column';
          card.style.alignItems = 'center';
          card.style.justifyContent = 'center';
          card.style.gap = '10px';
          card.style.minHeight = '200px';
          card.innerHTML = '<i class="' + p.icon + '" style="font-size:2.8rem;color:' + p.color + ';opacity:0.35"></i><span style="font-family:Outfit,sans-serif;font-size:0.72rem;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:rgba(247,244,239,0.25)">' + p.label + ' ' + i + '</span>';
        };

        card.addEventListener('click', () => {
          if (img.complete && img.naturalWidth > 0) openImageLightbox(src);
        });

        card.appendChild(img);
        grid.appendChild(card);
      }

      if (window.gsap) {
        gsap.fromTo(grid.children, { opacity: 0, y: 20, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.06, ease: 'power3.out' });
      }
      grid.style.opacity = '1';
      grid.style.transform = '';
    }, 300);
  };
  window.switchCylinder = window.switchPlatform;
  document.addEventListener('DOMContentLoaded', () => switchPlatform('ig'));
})();
</script>
`;

const spScriptStart = html.indexOf('<script>\n(function(){');
const spScriptEnd = html.indexOf('})();\n</script>', spScriptStart);
if (spScriptStart !== -1 && spScriptEnd !== -1) {
  html = html.substring(0, spScriptStart) + newSwitchPlatform + html.substring(spScriptEnd + 15);
}

// 7. Tilt JS to GSAP 
const gsapAnimScript = `
<script>
window.addEventListener('load', function() {
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    const heroTL = gsap.timeline({ delay: 0.9 });
    heroTL
      .fromTo('#home .tag-pill, #home span[style*="border-radius:100px"]', { opacity:0, y:30 }, { opacity:1, y:0, duration:0.7, ease:'power3.out' }, 0)
      .fromTo('#home h1', { opacity:0, y:60, clipPath:'inset(0 0 100% 0)' }, { opacity:1, y:0, clipPath:'inset(0 0 0% 0)', duration:1, ease:'power4.out' }, 0.2)
      .fromTo('#home p[style*="border-left"]', { opacity:0, x:-30 }, { opacity:1, x:0, duration:0.8, ease:'power3.out' }, 0.5)
      .fromTo('#home [style*="display:flex;gap:14px"]', { opacity:0, y:20 }, { opacity:1, y:0, duration:0.7, ease:'power3.out' }, 0.7)
      .fromTo('#home [style*="display:flex;align-items:center;gap:12px"]', { opacity:0, y:20 }, { opacity:1, y:0, duration:0.6, ease:'power3.out' }, 0.9)
      .fromTo('#heroIphoneScroll', { opacity:0, y:60, rotateY:-25 }, { opacity:1, y:0, rotateY:-12, duration:1.2, ease:'power4.out' }, 0.3)
      .fromTo('#heroVisuals > div:not(#heroIphoneScroll)', { opacity:0, scale:0.8 }, { opacity:1, scale:1, duration:0.8, stagger:0.15, ease:'back.out(1.7)' }, 0.8)
      .fromTo('#home [style*="background:#1A1208"][style*="border-radius:20px"]', { opacity:0, y:40 }, { opacity:1, y:0, duration:0.9, ease:'power3.out' }, 1.1);

    ScrollTrigger.create({ trigger: '#platformTabs', start: 'top 80%', onEnter: () => {
        gsap.fromTo('#platformTabs .ptab', { opacity:0, y:30, scale:0.9 }, { opacity:1, y:0, scale:1, duration:0.5, stagger:0.1, ease:'back.out(1.4)' });
        gsap.fromTo('#platformGrid', { opacity:0, y:40 }, { opacity:1, y:0, duration:0.7, ease:'power3.out', delay:0.4 });
    }});

    ScrollTrigger.create({ trigger: '#servicesGrid', start: 'top 75%', onEnter: () => {
        gsap.fromTo('.svc-card', { opacity:0, y:80, scale:0.92 }, { opacity:1, y:0, scale:1, duration:0.75, stagger:0.12, ease:'power4.out' });
    }});

    ScrollTrigger.create({ trigger: '.proc-card', start: 'top 80%', onEnter: () => {
        gsap.fromTo('.proc-card', { opacity:0, y:60 }, { opacity:1, y:0, duration:0.7, stagger:0.18, ease:'power3.out' });
    }});

    ScrollTrigger.create({ trigger: '#baSlider', start: 'top 80%', onEnter: () => {
        gsap.fromTo('#baSlider', { opacity:0, scale:0.95, y:50 }, { opacity:1, scale:1, y:0, duration:1, ease:'power4.out' });
        gsap.to({ v: 0.15 }, { v: 0.85, duration: 2, ease: 'power2.inOut', delay: 0.5, onUpdate: function() {
            const pct = this.targets()[0].v;
            const before = document.getElementById('baBefore');
            const divider = document.getElementById('baDivider');
            if (before) before.style.clipPath = 'inset(0 ' + ((1 - pct) * 100) + '% 0 0)';
            if (divider) divider.style.left = (pct * 100) + '%';
        }});
    }});

    ScrollTrigger.create({ trigger: '[data-counter]', start: 'top 80%', once: true, onEnter: () => {
        document.querySelectorAll('[data-counter]').forEach(el => {
          const target = parseFloat(el.getAttribute('data-counter'));
          const suffix = el.getAttribute('data-suffix') || '';
          const isFloat = String(target).includes('.');
          gsap.fromTo({ v: 0 }, { v: target }, { duration: 2, ease: 'power2.out', onUpdate: function() {
              const cur = this.targets()[0].v;
              el.textContent = (isFloat ? cur.toFixed(1) : Math.round(cur)) + suffix;
            }, onComplete: () => { el.textContent = (isFloat ? target.toFixed(1) : target) + suffix; }
          });
        });
    }});

    ScrollTrigger.create({ trigger: '#testiTrack', start: 'top 85%', onEnter: () => {
        gsap.fromTo('#testiTrack', { opacity:0 }, { opacity:1, duration:0.8, ease:'power2.out' });
    }});

    ScrollTrigger.create({ trigger: 'section[style*="padding:10rem"]', start: 'top 80%', onEnter: () => {
        const el = document.querySelector('section[style*="padding:10rem"]');
        if (!el) return;
        gsap.fromTo(el.querySelectorAll('h2, p, a'), { opacity:0, y:40 }, { opacity:1, y:0, duration:0.8, stagger:0.12, ease:'power3.out' });
    }});

    ScrollTrigger.create({ trigger: 'footer', start: 'top 90%', onEnter: () => {
        gsap.fromTo('footer', { opacity:0, y:30 }, { opacity:1, y:0, duration:0.9, ease:'power3.out' });
    }});
  }

  const phone = document.getElementById('heroIphoneScroll');
  if (phone && window.innerWidth > 768) {
    document.addEventListener('mousemove', e => {
      const cx = (e.clientX / window.innerWidth - 0.5) * 2;
      const cy = (e.clientY / window.innerHeight - 0.5) * 2;
      phone.style.transform = 'perspective(1000px) rotateY(' + (-12 + cx * 9) + 'deg) rotateX(' + (3 + cy * -6) + 'deg)';
    });
  }

  document.querySelectorAll('.svc-card[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const cx = (e.clientX - r.left) / r.width - 0.5;
      const cy = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = 'perspective(900px) rotateY(' + (cx * 16) + 'deg) rotateX(' + (-cy * 16) + 'deg) translateY(-16px) scale(1.02)';
      card.style.boxShadow = '0 40px 80px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.08)';
      const gx = (e.clientX - r.left) / r.width * 100;
      const gy = (e.clientY - r.top) / r.height * 100;
      card.style.backgroundImage = card.style.backgroundImage.replace(/,radial-gradient\\([^)]+\\)/,'') + ',radial-gradient(circle at ' + gx + '% ' + gy + '%, rgba(255,255,255,0.06) 0%, transparent 60%)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.boxShadow = '';
    });
  });

  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (dot && ring && window.innerWidth > 768) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    (function lerp() {
      rx += (mx - rx) * 0.11; ry += (my - ry) * 0.11;
      dot.style.transform = 'translate(' + (mx - 4) + 'px,' + (my - 4) + 'px)';
      ring.style.transform = 'translate(' + (rx - 18) + 'px,' + (ry - 18) + 'px)';
      requestAnimationFrame(lerp);
    })();
    document.querySelectorAll('a, button, .svc-card, #baSlider').forEach(el => {
      el.addEventListener('mouseenter', () => { ring.style.width = '54px'; ring.style.height = '54px'; ring.style.borderColor = 'rgba(200,169,110,0.8)'; });
      el.addEventListener('mouseleave', () => { ring.style.width = '36px'; ring.style.height = '36px'; ring.style.borderColor = 'rgba(200,169,110,0.5)'; });
    });
  }

  const prog = document.getElementById('scrollProgress');
  if (prog) {
    window.addEventListener('scroll', () => {
      const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
      prog.style.width = pct + '%';
    }, { passive: true });
  }

  const cta = document.getElementById('stickyCTA');
  if (cta) {
    window.addEventListener('scroll', () => {
      const show = window.scrollY > 600;
      cta.style.transform = show ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(120px)';
      cta.style.opacity = show ? '1' : '0';
    }, { passive: true });
  }

  const pl = document.getElementById('preloader');
  if (pl) {
    setTimeout(() => { pl.style.opacity = '0'; setTimeout(() => pl.remove(), 600); }, 900);
  }

  const nav = document.querySelector('.navbar');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        nav.style.background = 'rgba(247,244,239,0.96)';
        nav.style.boxShadow = '0 8px 40px rgba(26,18,8,0.1)';
      } else {
        nav.style.background = 'rgba(247,244,239,0.88)';
        nav.style.boxShadow = '0 8px 32px rgba(26,18,8,0.07)';
      }
    }, { passive: true });
  }

});
</script>
`;

const tiltStart = html.indexOf('<script>\n// Service card 3D tilt');
const tiltEnd = html.indexOf('</script>', tiltStart);
if (tiltStart !== -1 && tiltEnd !== -1) {
  html = html.substring(0, tiltStart) + gsapAnimScript + html.substring(tiltEnd + 9);
}

// 8. Add ScrollTrigger
html = html.replace(
  '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>',
  '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>\n<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>'
);

// 9. Platform grid sizing
html = html.replace(
  /id="platformGrid" style="display:grid;grid-template-columns:repeat\(3,1fr\);gap:16px[^"]*"/,
  'id="platformGrid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;max-width:980px;margin:0 auto;transition:opacity 0.4s ease,transform 0.4s ease"'
);

fs.writeFileSync('public/index.html', html);
console.log('PATCH COMPLETE. Size:', html.length, 'bytes');
