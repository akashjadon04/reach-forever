import sys

def fix_all():
    # 1. Fix global-ui.css top navbar overlapping logo
    try:
        with open('public/css/global-ui.css', 'r', encoding='utf-8') as f:
            css = f.read()
        if '/* Mobile Navbar Logo Fix */' not in css:
            css += """\n/* Mobile Navbar Logo Fix */\n@media(max-width:800px) {\n  .ncta { display: none !important; }\n}\n"""
            with open('public/css/global-ui.css', 'w', encoding='utf-8') as f:
                f.write(css)
            print("Fixed global-ui.css ncta overlap")
    except Exception as e:
        print(f"Error global-ui: {e}")

    # 2. Fix services.html SVG hero graphic
    try:
        with open('public/services.html', 'r', encoding='utf-8') as f:
            html = f.read()
        if '/* Hero SVG Fix */' not in html:
            css_add = """\n/* Hero SVG Fix */\n@media(max-width:800px) {\n  .hero-visuals svg { position: relative !important; right: auto !important; left: 0 !important; transform: scale(1.1) !important; transform-origin: center !important; margin: 0 auto !important; display: block !important; }\n  .hero-visuals { height: auto !important; min-height: 350px !important; display: flex !important; justify-content: center !important; align-items: center !important; overflow: hidden !important; }\n}\n</style>"""
            html = html.replace('</style>', css_add)
            with open('public/services.html', 'w', encoding='utf-8') as f:
                f.write(html)
            print("Fixed services.html hero SVG position")
    except Exception as e:
        print(f"Error services: {e}")

    # 3. Fix reviews.html massive scroll lag
    try:
        with open('public/reviews.html', 'r', encoding='utf-8') as f:
            html = f.read()
        if '/* Anti-Lag Hardcore Fix */' not in html:
            css_add = """\n/* Anti-Lag Hardcore Fix */\n@media(max-width:800px) {\n  .ambient-glow, #particle-canvas, .roi-bg-graphic, .glow-card::before, .dashboard-ui-showcase::before { display: none !important; animation: none !important; }\n  * { filter: none !important; backdrop-filter: none !important; -webkit-backdrop-filter: none !important; box-shadow: none !important; }\n  .dash-glass-panel, .roi-graph-box, .roi-results, .cs-card, .wol-card { background: var(--rf-surface) !important; border: 1px solid var(--glass-border) !important; }\n}\n</style>"""
            html = html.replace('</style>', css_add)
            with open('public/reviews.html', 'w', encoding='utf-8') as f:
                f.write(html)
            print("Fixed reviews.html scroll lag by nuking expensive filters/blurs on mobile")
    except Exception as e:
        print(f"Error reviews: {e}")

if __name__ == '__main__':
    fix_all()
