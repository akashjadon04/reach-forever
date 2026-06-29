import re

def rename_zyrova(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Rename class/function/variable names
    replacements = {
        'syncZyrovaCMS': 'initCMS',
        'ZyrovaPreloader': 'SitePreloader',
        'ZyrovaGuard': 'MobileGuardInst',
        'zyrovaPreloader': 'sitePreloader',
        'zyrova_token': 'rf_token',
        '[Zyrova Error Guard]': '[Error]',
        '[Zyrova Promise Guard]': '[Async Error]',
        'Zyrova Digital Engine v12.0 | Apple-Tier Active': 'App Ready',
        'class ZyrovaPreloader': 'class SitePreloader',
    }

    for old, new in replacements.items():
        content = content.replace(old, new)

    # Remove the styled console.log lines that scream "AI"
    content = re.sub(r'console\.log\("%c.*?"\);\n', '', content)
    content = re.sub(r'console\.log\("%c.*?background[^;]+;[^;]+;.*?"\s*,[^;]+;\n', '', content, flags=re.DOTALL)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Renamed Zyrova references: {filepath}")


if __name__ == '__main__':
    rename_zyrova('public/js/main.js')
    rename_zyrova('public/js/cms.js')
    print("Done.")
