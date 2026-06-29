import re

def fix_mobile_issues():
    with open('public/index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Fix Before/After Grid (Replace inline grid with class)
    html = html.replace(
        '<div style="max-width:1200px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:40px; position:relative; z-index:2;">',
        '<div class="ba-grid" style="max-width:1200px; margin:0 auto; position:relative; z-index:2;">'
    )

    # 2. Add new CSS for mobile fixes
    css_additions = """
/* Mobile Fixes */
.ba-grid { display:grid; grid-template-columns:1fr 1fr; gap:40px; }
@media(max-width:800px) {
  .ba-grid { grid-template-columns:1fr; gap:24px; }
  #platformSec, #svcSec, #procSec, #diffSec, #testiSec, #rushSec { padding: 4rem 5% !important; }
  .h1 { font-size: clamp(2.5rem, 8vw, 3.5rem); }
  .svc-h2, .plat-h2, .proc-h2, .ba-h2, .testi-h2, .rush-h2 { font-size: clamp(2rem, 7vw, 2.5rem) !important; }
  .proc-grid { grid-template-columns: 1fr !important; gap: 30px !important; }
}
@media(max-width:1000px) {
  #heroPhoneWrap { margin: 40px auto 0 !important; width: 240px !important; height: 500px !important; }
}
</style>
"""
    html = html.replace('</style>', css_additions)

    # 3. Fix the iPhone video black screen (add a poster image)
    # The user says "sometimes the iphone mockup not comes if it comes its black"
    # We will add a poster to the video tag
    video_tag_old = '<video id="heroVideoAd" autoplay muted loop playsinline preload="auto" style="background:#000; width:100%; height:100%; object-fit:cover;">'
    video_tag_new = '<video id="heroVideoAd" autoplay muted loop playsinline preload="auto" poster="assets/poster_1.webp" style="background:#000; width:100%; height:100%; object-fit:cover;">'
    html = html.replace(video_tag_old, video_tag_new)

    with open('public/index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Fixed mobile issues in public/index.html")

if __name__ == "__main__":
    fix_mobile_issues()
