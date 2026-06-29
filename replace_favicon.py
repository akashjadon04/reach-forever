import os
import glob

def replace_in_files():
    directory = 'public'
    files = glob.glob(f"{directory}/**/*.html", recursive=True)
    
    count = 0
    for filepath in files:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if 'href="assets/logo.png"' in content:
            content = content.replace('href="assets/logo.png"', 'href="assets/rf_small.png"')
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated: {filepath}")
            count += 1
            
    print(f"Total files updated: {count}")

if __name__ == "__main__":
    replace_in_files()
