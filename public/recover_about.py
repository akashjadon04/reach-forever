import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(r'<!-- PROOF NOT PROMISES -->.*?</section>', '', content, flags=re.DOTALL)
content = re.sub(r'<!-- The Reach Difference.*?</section>', '', content, flags=re.DOTALL)
content = re.sub(r'<!-- OUR SERVICES -->.*?</section>', '', content, flags=re.DOTALL)
content = re.sub(r'<!-- TESTIMONIALS -->.*?</section>', '', content, flags=re.DOTALL)

company_html = '''<!-- About The Company -->
<section id="companySec" style="padding: 150px 5% 100px; background: #fff; position: relative; overflow: hidden;">
    <div style="max-width:1200px; margin:0 auto; text-align:center;">
        <h2 style="font-family:var(--rf-font-heading); font-size:clamp(2.5rem,4vw,4rem); color:#111; margin-bottom:20px;">About <span style="color:#d81b60">Reach Forever</span></h2>
        <p style="font-family:var(--rf-font-body); font-size:1.1rem; color:#555; max-width:800px; margin:0 auto; line-height:1.8;">
            We are a performance-driven digital agency obsessed with ROI. We don't just run ads or make posts; we engineer predictable acquisition systems that scale businesses rapidly. Our team combines deep technical expertise with aggressive direct-response marketing to turn your digital presence into a measurable profit center.
        </p>
    </div>
</section>'''

content = re.sub(r'<section class="hero-sec".*?</section>', company_html, content, flags=re.DOTALL)
content = content.replace('<title>Reach Forever | Web & Marketing</title>', '<title>About Us | Reach Forever</title>')

with open('about.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Created about.html")
