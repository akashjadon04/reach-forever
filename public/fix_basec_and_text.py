import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Remove baSec completely
html = re.sub(r'<!-- B/A -->\s*<section id="baSec".*?</section>', '', html, flags=re.DOTALL)

# 2. Fix CTA Text
html = html.replace('not just a following list.', 'not just at following list.')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Done fixing baSec and text')
