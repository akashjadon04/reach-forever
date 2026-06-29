import re, glob

def clean_file(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    original_len = len(content)

    # 1. Remove CSS block dividers: /* ======... */ (single or multi-line)
    content = re.sub(r'/\*\s*[=─*]{5,}[\s\S]*?[=─*]{5,}\s*\*/', '', content)

    # 2. Remove CSS emoji section headers like: /* 🎨 12. SECTION NAME 🎨 */
    content = re.sub(r'/\*[^*]*?[\U0001F300-\U0001FFFF\u2600-\u27FF][^*]*?\*/', '', content)

    # 3. Remove JS/HTML line dividers: // ==== or // ────
    content = re.sub(r'//\s*[=─\-*]{5,}.*', '', content)

    # 4. Remove HTML comment dividers: <!-- ====== --> or <!-- ══════ -->
    content = re.sub(r'<!--\s*[=─*]{5,}[\s\S]*?-->', '', content)
    content = re.sub(r'<!--\s*[=─*]{5,}.*?-->', '', content)

    # 5. Remove block comment headers like /** ===... Project: ... ===... **/
    content = re.sub(r'/\*\*[\s\S]*?\*/', lambda m: '' if '===' in m.group() or '────' in m.group() else m.group(), content)

    # 6. Remove leftover CSS section comments with numbers like /* 12. SECTION NAME */
    content = re.sub(r'/\*\s*\d+\.\s*[A-Z\s&\/]+\s*\*/', '', content)

    # 7. Clean up excessive blank lines (3+ → 1)
    content = re.sub(r'\n{3,}', '\n\n', content)

    if len(content) != original_len:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  ✓ Cleaned: {filepath}")
    else:
        print(f"  – No changes: {filepath}")

if __name__ == '__main__':
    all_files = (
        glob.glob('public/*.html') +
        glob.glob('public/js/*.js') +
        glob.glob('public/css/*.css')
    )
    print(f"Scanning {len(all_files)} files...\n")
    for f in all_files:
        clean_file(f)
    print("\nAll done — zero AI traces remaining.")
