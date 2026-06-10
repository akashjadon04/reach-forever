with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# The global head and header ends at </header>
head_and_header = html.split('</header>')[0] + '</header>'

# The global footer starts at <footer id="rfFoot">
footer = '<footer id="rfFoot">' + html.split('<footer id="rfFoot">')[1]

# We need the <main> tag to wrap the content
about_content = """
<main>
<section class="hero" style="min-height:50vh; padding-top:160px; padding-bottom:60px; display:flex; align-items:center; justify-content:center; text-align:center;">
  <div class="container">
    <h1 class="hero-h1" style="font-size:3.5rem;">About <span class="gr-tx">Reach Forever</span></h1>
    <p class="hero-p" style="max-width:800px; margin: 1.5rem auto;">We don't just run ads; we engineer growth. Reach Forever is Punjab's premier digital marketing agency, dedicated to scaling local businesses into industry leaders through data-driven strategies, scroll-stopping content, and relentless execution.</p>
  </div>
</section>

<section class="procSec" style="padding: 60px 0 100px 0;">
  <div class="container">
    <div class="proc-grid">
      <div class="proc-step">
        <div class="proc-num">01</div>
        <div class="proc-title">Our Mission</div>
        <div class="proc-desc">To empower ambitious business owners with the tools, visibility, and authoritative brand presence they need to dominate their local markets.</div>
      </div>
      <div class="proc-step">
        <div class="proc-num">02</div>
        <div class="proc-title">Our Philosophy</div>
        <div class="proc-desc">Proof, not just promises. We believe in transparent metrics, tangible ROI, and building long-term partnerships based on measurable success.</div>
      </div>
      <div class="proc-step">
        <div class="proc-num">03</div>
        <div class="proc-title">Our Approach</div>
        <div class="proc-desc">We combine psychological marketing with cutting-edge technical SEO and automation to create a predictable pipeline of high-quality leads.</div>
      </div>
    </div>
  </div>
</section>
</main>
"""

# Fix page title for About page
import re
head_and_header = re.sub(r'<title>.*?</title>', '<title>About Us — Reach Forever</title>', head_and_header)

with open('about.html', 'w', encoding='utf-8') as f:
    f.write(head_and_header + about_content + footer)
    
print("Successfully generated about.html!")
