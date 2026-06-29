import re

def fix():
    css_path = 'public/css/global-ui.css'
    try:
        with open(css_path, 'r', encoding='utf-8') as f:
            css = f.read()

        chatbot_fix = """
/* Fix Chatbot float overlapping mobile nav */
@media(max-width:800px) {
  #auraFab, .ai-fab-wrap, .ai-fab {
    bottom: 90px !important;
    z-index: 999999 !important;
  }
  
  /* Ensure the chat panel itself also doesn't get obscured */
  #auraPanel, .chat-panel {
    bottom: 150px !important;
  }
}
"""
        if 'Fix Chatbot float' not in css:
            css += chatbot_fix
            with open(css_path, 'w', encoding='utf-8') as f:
                f.write(css)
            print("Fixed chatbot float position")
    except Exception as e:
        print(f"Error CSS: {e}")

if __name__ == '__main__':
    fix()
