const fs = require('fs');
const h = fs.readFileSync('public/index.html','utf8');
const lines = h.split('\n');
const keywords = ['heroRotator','SERVICES','svc-card','proc-card','rmClose','openReelsModal','logoImg','gsap','ScrollTrigger','data-counter'];
lines.forEach((l, i) => {
  const t = l.trim();
  if (keywords.some(k => t.includes(k))) {
    console.log((i+1) + ': ' + t.slice(0,140));
  }
});
