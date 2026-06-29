import os
import glob

def replace_in_files():
    directory = 'public'
    files = []
    files.extend(glob.glob(f"{directory}/**/*.html", recursive=True))
    files.extend(glob.glob(f"{directory}/**/*.xml", recursive=True))
    files.extend(glob.glob(f"{directory}/**/*.txt", recursive=True))
    
    count = 0
    for filepath in files:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if 'reachforever.in' in content:
            content = content.replace('reachforever.in', 'reachforever.com')
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated: {filepath}")
            count += 1
            
    print(f"Total files updated: {count}")

if __name__ == "__main__":
    replace_in_files()
