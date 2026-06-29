import re
import sys

def fix_all():
    css_path = 'public/css/global-ui.css'
    try:
        with open(css_path, 'r', encoding='utf-8') as f:
            css = f.read()

        # Remove the previous ncta hiding hack
        css = re.sub(
            r'/\* Mobile Navbar Logo Fix \*/\s*@media\(max-width:800px\)\s*\{\s*\.ncta\s*\{\s*display:\s*none\s*!important;\s*\}\s*\}',
            '',
            css
        )

        # Add the new elegant slim header fix
        slim_header_css = """
/* Mobile Navbar Compact Fix */
@media(max-width:800px) {
  /* Restore CTA but make it ultra-compact */
  .ncta {
    display: inline-block !important;
    padding: 6px 14px !important;
    font-size: 0.7rem !important;
    letter-spacing: 0.5px !important;
    white-space: nowrap !important;
  }
  
  /* Override the bulky inline style on the logo */
  .nl img, #nlImg {
    height: 32px !important;
    max-height: 32px !important;
  }
  
  /* Shrink header container padding to remove bulk */
  #rfNav, .navbar {
    padding: 8px 4% !important;
    height: auto !important;
    min-height: 50px !important;
    gap: 8px !important;
  }
}
"""
        if '/* Mobile Navbar Compact Fix */' not in css:
            css += slim_header_css
            with open(css_path, 'w', encoding='utf-8') as f:
                f.write(css)
            print("Successfully updated global-ui.css for slim mobile header and restored CTA")
        else:
            print("Already fixed")
            
    except Exception as e:
        print(f"Error global-ui: {e}")

if __name__ == '__main__':
    fix_all()
