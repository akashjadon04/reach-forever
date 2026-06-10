import os
import glob
import re

html_files = glob.glob('*.html')

seo_head = """
    <meta name="description" content="Reach Forever is a premium digital marketing and web development agency. We help businesses grow with SEO, social media, paid ads, and automation.">
    <meta property="og:type" content="website">
    <meta property="og:title" content="Reach Forever - Premium Digital Marketing Agency">
    <meta property="og:description" content="Expert digital marketing, web development, SEO, and paid media to scale your business.">
    <meta property="og:image" content="https://reachforever.in/assets/poster_1.webp">
    <meta property="og:url" content="https://reachforever.in/">
    <meta name="twitter:card" content="summary_large_image">
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Reach Forever",
      "url": "https://reachforever.in",
      "logo": "https://reachforever.in/assets/logo.png",
      "description": "Premium Digital Marketing Agency specializing in SEO, Web Development, Social Media, and Paid Ads.",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-81466-52870",
        "contactType": "customer service",
        "areaServed": "IN",
        "availableLanguage": "en"
      }
    }
    </script>
"""

for file_path in html_files:
    # Skip dashboard/admin files if needed, but the prompt says "whole webpages"
    if 'dashboard' in file_path or 'admin' in file_path:
        continue

    with open(file_path, 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Fallback removals
    html = html.replace(' onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\'"', '')
    html = html.replace(' onerror="this.style.display=\'none\'"', '')
    html = re.sub(r'<div class="foot-logo-fb".*?>.*?</div>', '', html)
    html = re.sub(r'<div class="logo-fb".*?>.*?</div>', '', html)

    # 2. Copyright
    html = re.sub(r'&copy;\s*\d{4}\s*Reach\s*Forever.*?<', '&copy; 2026 Reach Forever. All rights reserved.<', html, flags=re.IGNORECASE)
    # Just in case the format is different:
    html = re.sub(r'©\s*\d{4}\s*Reach\s*Forever.*?<', '&copy; 2026 Reach Forever. All rights reserved.<', html, flags=re.IGNORECASE)
    if '2026 Reach Forever. All rights reserved' not in html:
        # Hard replace specific known footer line
        html = re.sub(r'<div class="foot-bot-left">.*?</div>', '<div class="foot-bot-left">&copy; 2026 Reach Forever. All rights reserved.</div>', html)

    # 3. Add About to navbar (header)
    # Find Services link and insert About after or before it.
    if '<a href="about.html"' not in html:
        # Desktop Nav
        html = re.sub(r'(<a href="services.html" class="nlink.*?>Services</a>)', r'\1\n    <a href="about.html" class="nlink">About</a>', html)
        
        # Footer Links
        html = re.sub(r'(<a href="index.html" class="foot-lk">Home</a>)', r'\1\n      <a href="about.html" class="foot-lk">About</a>', html)
        
        # Mobile Nav
        html = re.sub(r'(<a href="services.html" class="mni.*?>.*?Services</a>)', r'\1\n  <a href="about.html" class="mni"><i class="ri-information-fill"></i>About</a>', html)

    # 4. SEO
    if 'application/ld+json' not in html:
        # Insert before </head>
        html = html.replace('</head>', seo_head + '\n</head>')

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(html)

print("Applied global changes.")
