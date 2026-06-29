import re

def clean_js(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove block dividers like // ======... or // ────...
    content = re.sub(r'//\s*[=─*]{5,}.*\n', '', content)
    # Remove /** block dividers **/
    content = re.sub(r'/\*\*\s*\n\s*\*\s*[=─*]{5,}.*\n\s*\*\s*.*\n\s*\*\s*[=─*]{5,}.*\n\s*\*/', '', content)
    # Remove Zyrova/ZYROVA branding from comments
    content = re.sub(r'//\s*ZYROVA.*\n', '', content)
    content = re.sub(r'/\* ZYROVA.*\*/', '', content)
    # Remove the console.log with Zyrova branding
    content = re.sub(r'console\.log\("%c Zyrova.*?\);\n', '', content, flags=re.DOTALL)
    # Remove [CMS] emoji console.log
    content = re.sub(r'console\.log\("[^"]*📡[^"]*"\);\n', '', content)
    # Remove emoji section headers in comments like /* 🎨 Title 🎨 */
    content = re.sub(r'/\*\s*[^\w\s]{1,3}\s*[\w\s]+\s*[^\w\s]{1,3}\s*\*/', '', content)
    # Remove top-level class rename comments like // MODULE X: ...
    content = re.sub(r'//\s*MODULE\s+\d+:.*\n', '', content)
    # Remove top-of-file comment block if it has "ENTERPRISE / BUILD"
    content = re.sub(r'/\*\*[\s\S]*?(ENTERPRISE|TITANIUM|ZYROVA|BUILD)[\s\S]*?\*/', '', content)

    # Clean up excessive blank lines (3+ → 2)
    content = re.sub(r'\n{3,}', '\n\n', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Cleaned: {filepath}")


def clean_html(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove HTML comment dividers like <!-- ====== -->
    content = re.sub(r'<!--\s*[=─*]{5,}.*?-->', '', content)
    # Remove Zyrova/EVOLNEX branding comments in HTML
    content = re.sub(r'<!--\s*(EVOLNEX|ZYROVA).*?-->', '', content, flags=re.DOTALL)
    # Remove "AI-style" section comment blocks like <!-- SECTION NAME -->
    # but keep real functional comments
    # Remove comments with all-caps block names that are purely decorative
    content = re.sub(r'<!--\s*[A-Z\s&]{8,}\s*-->', '', content)

    # Remove <!-- ======= EVOLNEX MAINTENANCE SHIELD ... -->
    content = re.sub(r'<!--\s*=+\s*-->', '', content)

    # Clean up excessive blank lines
    content = re.sub(r'\n{3,}', '\n\n', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Cleaned: {filepath}")


if __name__ == '__main__':
    clean_js('public/js/main.js')
    clean_js('public/js/cms.js')
    clean_js('public/js/chatbot.js')
    clean_html('public/index.html')
    print("\nDone — all AI traces removed.")
