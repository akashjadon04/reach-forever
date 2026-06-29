with open('public/about.html', 'r', encoding='utf-8') as f:
    html = f.read()
    
html = html.replace('About Us ?" Reach Forever', 'About Us — Reach Forever')
html = html.replace('', '')

with open('public/about.html', 'w', encoding='utf-8') as out:
    out.write(html)
