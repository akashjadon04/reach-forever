import re
import sys

def fix_all():
    # 1. Fix index.html Client Reviews width
    try:
        with open('public/index.html', 'r', encoding='utf-8') as f:
            html = f.read()
        
        # Add a media query for .tc inside the style block if not already there
        if '.tc { width: 280px !important;' not in html:
            css_add = """
@media(max-width:600px) {
  .tc { width: 280px !important; padding: 20px !important; }
}
</style>"""
            html = html.replace('</style>', css_add)
            with open('public/index.html', 'w', encoding='utf-8') as f:
                f.write(html)
            print("Fixed index.html client reviews width")
    except Exception as e:
        print(f"Error fixing index.html: {e}")

    # 2. Fix services.html
    try:
        with open('public/services.html', 'r', encoding='utf-8') as f:
            html = f.read()

        # Reduce horizontal scroll tiles to 3 pointers only
        # We need to find <ul class="hs-panel-list"> and its <li> elements
        # A simple regex to keep the first 3 li elements inside the ul and remove the rest
        # Using a regex substitution
        def repl(match):
            content = match.group(1)
            lis = re.findall(r'<li.*?>.*?</li>', content, flags=re.DOTALL)
            if len(lis) > 3:
                return '<ul class="hs-panel-list">\n' + '\n'.join(lis[:3]) + '\n</ul>'
            return match.group(0)

        html = re.sub(r'<ul class="hs-panel-list">(.*?)</ul>', repl, html, flags=re.DOTALL)

        # SVG Graphic fix for mobile
        if '.eco-wrap { overflow-x: auto;' not in html:
            css_add = """
@media(max-width:800px) {
  .eco-wrap { overflow-x: auto !important; width: 100vw !important; margin-left: -5% !important; padding: 0 5% !important; }
  .eco-svg { min-width: 800px !important; transform: scale(1.1) !important; transform-origin: left top !important; margin-bottom: 60px !important; }
}
</style>"""
            html = html.replace('</style>', css_add)
            
        with open('public/services.html', 'w', encoding='utf-8') as f:
            f.write(html)
        print("Fixed services.html horizontal scroll tiles and SVG conversion graphic")
    except Exception as e:
        print(f"Error fixing services.html: {e}")

    # 3. Fix reviews.html
    try:
        with open('public/reviews.html', 'r', encoding='utf-8') as f:
            html = f.read()

        # Fix body width from 100vw to 100%
        html = html.replace('width:100vw;', 'width:100%;')
        
        # Add massive mobile optimization fixes
        if '/* MASSIVE MOBILE OPTIMIZATION */' not in html:
            css_add = """
/* MASSIVE MOBILE OPTIMIZATION */
@media (max-width: 800px) {
    .reviews-hero { padding: 120px 5% 60px !important; min-height: auto !important; }
    .dashboard-ui-showcase::before { animation: none !important; display: none !important; }
    .dash-glass-panel { animation: none !important; transform: none !important; box-shadow: none !important; }
    .roi-section, .vault-section, .case-studies { padding: 4rem 5% !important; }
    .hero-title { font-size: clamp(2.5rem, 8vw, 3.5rem) !important; }
    h2 { font-size: clamp(2rem, 7vw, 2.5rem) !important; }
    .tc { width: 280px !important; padding: 20px !important; }
    .dash-main-metric h2 { font-size: 3rem !important; }
    .hero-wrapper { grid-template-columns: 1fr !important; gap: 40px !important; }
}
</style>"""
            html = html.replace('</style>', css_add)
        
        with open('public/reviews.html', 'w', encoding='utf-8') as f:
            f.write(html)
        print("Fixed reviews.html lagging and mobile UI")
    except Exception as e:
        print(f"Error fixing reviews.html: {e}")

if __name__ == '__main__':
    fix_all()
