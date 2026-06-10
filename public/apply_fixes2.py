import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update phone badge to "Results"
html = html.replace('<div class="phone-notch"></div>', '<div class="phone-notch" style="color:white; font-family:var(--ss); font-size:10px; display:flex; align-items:center; justify-content:center; letter-spacing:1px; font-weight:bold;">Results</div>')
html = re.sub(r'<div class="phone-badge".*?</div>', '', html)

# 2. Fix CTA Text
html = html.replace('Only <em>3 Spots</em><br>Left This Month.', 'Crowd at your store matters,<br><em>not just a following list.</em>')
html = html.replace('We only take on 5 clients per month to ensure', 'We accept only a few clients to ensure')

# 3. Remove baSec completely!
html = re.sub(r'<!-- B/A -->\s*<section id="baSec".*?</section>', '', html, flags=re.DOTALL)

# 4. Remove fades from tt-wrap
html = re.sub(r'\.tt-wrap::before\{.*?\}', '', html)
html = re.sub(r'\.tt-wrap::after\{.*?\}', '', html)
html = html.replace('.tt-wrap::before,', '') # just in case

# 5. Move diffSec to be third last
diff_match = re.search(r'<!-- The Reach Difference.*?-->\s*<section id="diffSec".*?</section>', html, re.DOTALL)
if diff_match:
    diff_str = diff_match.group(0)
    html = html.replace(diff_str, '') 
    
    testi_match = html.find('<!-- TESTIMONIALS -->')
    if testi_match != -1:
        html = html[:testi_match] + diff_str + '\n' + html[testi_match:]

with open('index_fixed.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Done index_fixed.html')
