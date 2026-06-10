import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Fix mobile height of proofSec
html = html.replace('.marquee-track img, .marquee-track video { height: 250px !important; }', '.marquee-track img, .marquee-track video { height: 200px !important; }')

# Fix CTA Text
html = html.replace('Only <em>3 Spots</em><br>Left This Month.', 'Crowd at your store matters,<br><em>not just a following list.</em>')
html = html.replace('We only take on 5 clients per month to ensure', 'We accept only a few clients to ensure')

# Extract sections
# We will use simple regex matching with <section id="...">.*?</section>
def get_sec(sec_id):
    pattern = r'(<section id="' + sec_id + r'".*?</section>)'
    match = re.search(pattern, html, flags=re.DOTALL)
    if match:
        # Check if there is a preceding comment block
        # For simplicity, just return the matched section. We might lose comments, but the code is clean.
        # Wait, the comments are useful. Let's just grab the whole block between sections.
        pass
    return match

# A better way is to split by `<section id="`
sections_to_extract = ['proofSec', 'diffSec', 'platformSec', 'svcSec', 'procSec', 'baSec', 'testiSec', 'rushSec']

# Let's find the starting positions of all sections
positions = []
for sid in sections_to_extract:
    match = re.search(r'<!--.*?-->\s*<section id="' + sid + '"|<section id="' + sid + '"', html)
    if match:
        positions.append((match.start(), sid))
    else:
        # Fallback to just the ID
        match2 = html.find(f'<section id="{sid}"')
        if match2 != -1:
            positions.append((match2, sid))

# Also need to find the END of the last section (rushSec)
end_of_rush = html.find('</section>', html.find('<section id="rushSec"')) + len('</section>')

# Sort by position
positions.sort(key=lambda x: x[0])

# Extract each chunk
chunks = {}
for i in range(len(positions)):
    start = positions[i][0]
    if i < len(positions) - 1:
        end = positions[i+1][0]
    else:
        end = end_of_rush
    chunks[positions[i][1]] = html[start:end]

start_of_main = positions[0][0]

# Now build the new main content!
# Order:
# 1. proofSec
# 2. platformSec
# 3. svcSec
# 4. procSec
# 5. diffSec
# 6. testiSec
# 7. rushSec
# baSec is EXCLUDED!

new_order = [
    chunks.get('proofSec', ''),
    chunks.get('platformSec', ''),
    chunks.get('svcSec', ''),
    chunks.get('procSec', ''),
    chunks.get('diffSec', ''),
    chunks.get('testiSec', ''),
    chunks.get('rushSec', '')
]

new_html = html[:start_of_main] + ''.join(new_order) + html[end_of_rush:]

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_html)

print('Reordered cleanly!')
