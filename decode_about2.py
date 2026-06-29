with open('about_extracted.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace escaped characters
decoded = content.replace('\\n', '\n').replace('\\"', '"').strip()
if decoded.startswith('"'):
    decoded = decoded[1:]
if decoded.endswith('"'):
    decoded = decoded[:-1]

with open('public/about.html', 'w', encoding='utf-8') as out:
    out.write(decoded)
    
print("Restored original about.html via replace!")
