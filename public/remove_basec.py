import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Remove baSec completely
html = re.sub(r'<!-- B/A -->\s*<section id="baSec".*?</section>', '', html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Removed baSec')
