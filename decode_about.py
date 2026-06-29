import ast

with open('about_extracted.html', 'r', encoding='utf-8') as f:
    content = f.read()

# content is a Python string literal representation (with \n, \", etc.).
# We can decode it using unicode_escape
# But first, ensure we don't have leading/trailing quotes if it's not a valid literal
if content.startswith('"') and content.endswith('"'):
    pass # it's already a valid literal
else:
    content = f'"{content}"'

content_decoded = ast.literal_eval(content)

# We also need to add the global header and footer, BUT the user wants the exact OLD file.
# The old file INCLUDES the header and footer inside of it! Let's just dump it.
with open('public/about.html', 'w', encoding='utf-8') as out:
    out.write(content_decoded)
    
print("Restored original about.html")
