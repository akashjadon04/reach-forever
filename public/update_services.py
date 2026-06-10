import re

services_data = [
    {
        "title": "Organic Growth Strategy",
        "pointers": [
            "Social Media Strategy",
            "SEO Services",
            "Content Marketing Strategy",
            "Community Growth & Engagement"
        ]
    },
    {
        "title": "Social Media Marketing",
        "pointers": [
            "Social Media Management",
            "Content Calendar Planning",
            "Performance Analytics & Reporting"
        ]
    },
    {
        "title": "Personal Branding Strategy",
        "pointers": [
            "Personal Brand Positioning",
            "Executive & Founder Branding",
            "Thought Leadership Content"
        ]
    },
    {
        "title": "Paid Media",
        "pointers": [
            "Paid Media Strategy",
            "Meta Ads & Google Ads Campaigns",
            "Audience Analysis & Targeting",
            "Conversion Funnel Optimization"
        ]
    },
    {
        "title": "Web Development",
        "pointers": [
            "Website Design & Development",
            "SEO Optimization",
            "CRM & Automation Services",
            "Landing Page Development"
        ]
    },
    {
        "title": "Creative Content Services",
        "pointers": [
            "Viral Hooks & Video Creation",
            "Script Writing & Keyword Research",
            "Brand Identity Design",
            "Graphic Design & Visual Content"
        ]
    }
]

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Extract the entire svc-grid
grid_match = re.search(r'<div class="svc-grid" id="svcGrid">(.*?)</div>\s*</div>\s*</section>', html, re.DOTALL)
if grid_match:
    grid_html = grid_match.group(1)
    
    # Extract the individual cards
    card_pattern = r'<div class="svc-card" data-tilt>.*?</div>\s*</div>\s*(?=<!--|<div class="svc-card|$)'
    
    # We can just split by <div class="svc-card" data-tilt> and reconstruct
    # Actually, a simpler way is to re.findall
    cards = re.findall(r'<div class="svc-card" data-tilt>.*?<div class="svc-glare"></div>\s*</div>', grid_html, re.DOTALL)
    
    if len(cards) == 6:
        new_cards = []
        for i, card in enumerate(cards):
            data = services_data[i]
            
            # Replace title
            card = re.sub(r'<div class="svc-title".*?>.*?</div>', f'<div class="svc-title">{data["title"]}</div>', card)
            
            # Generate pointers HTML
            pointers_html = '<ul style="list-style: none; padding-left: 0; text-align: left; margin: 1rem 0 0 0; display:flex; flex-direction:column; gap:0.5rem; font-size:0.95rem; color:var(--tx2);">'
            for p in data["pointers"]:
                pointers_html += f'<li style="display:flex; align-items:flex-start; gap:8px;"><i class="ri-checkbox-circle-fill" style="color:var(--c1); margin-top:2px;"></i><span>{p}</span></li>'
            pointers_html += '</ul>'
            
            # Replace desc
            card = re.sub(r'<div class="svc-desc".*?>.*?</div>', pointers_html, card)
            
            # Remove tags
            card = re.sub(r'<div class="svc-tags">.*?</div>', '', card)
            
            new_cards.append(card)
        
        new_grid_html = '\n'.join(new_cards)
        html = html.replace(grid_html, new_grid_html)
        
        with open('index_svc_fixed.html', 'w', encoding='utf-8') as f:
            f.write(html)
        print("Success")
    else:
        print(f"Error: Found {len(cards)} cards instead of 6.")
else:
    print("Error: Could not find svc-grid")
