const fs = require('fs');
const h = fs.readFileSync('public/index.html','utf8');
const checks = [
  ['Navbar present',       h.includes('class="navbar"')],
  ['Logo in navbar',       h.includes('id="logoImg"')],
  ['Mobile nav',           h.includes('mobile-nav')],
  ['Scroll progress',      h.includes('id="scrollProgress"')],
  ['Hero section',         h.includes('id="home"')],
  ['Hero rotator',         h.includes('id="heroRotator"')],
  ['Stats bar',            h.includes('data-counter')],
  ['Everywhere Online',    h.includes('switchPlatform')],
  ['Platform grid',        h.includes('id="platformGrid"')],
  ['Services section',     h.includes('id="arsenal"')],
  ['Service cards',        h.includes('svc-card')],
  ['Process section',      h.includes('proc-card')],
  ['BA slider',            h.includes('id="baSlider"')],
  ['BA fixed JS',          h.includes('setPos')],
  ['Testimonials',         h.includes('testiTrack')],
  ['Rush section',         h.includes('Get a')],
  ['Footer logo',          h.includes('id="footerLogoImg"')],
  ['WA button',            h.includes('wa.me')],
  ['Reels modal',          h.includes('id="reelsModal"')],
  ['Lightbox',             h.includes('id="fsLightbox"')],
  ['Local video engine',   h.includes('localVideos')],
  ['Tilt JS',              h.includes('mousemove')],
  ['No backend calls',     !h.includes('onrender.com')],
  ['Premium CSS linked',   h.includes('premium-beige.css')],
  ['onerror fallbacks',    h.includes('onerror')],
  ['File size OK',         h.length > 100000],
];
let allPass = true;
checks.forEach(([label, pass]) => {
  if (!pass) { console.log('FAIL: ' + label); allPass = false; }
  else console.log('OK:   ' + label);
});
console.log('\n' + (allPass ? 'ALL CHECKS PASS' : 'SOME CHECKS FAILED'));
console.log('File size: ' + h.length + ' bytes');
