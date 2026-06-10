with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

head_and_header = html.split('</header>')[0] + '</header>'
footer = '<footer id="rfFoot">' + html.split('<footer id="rfFoot">')[1]

# Fix page title for About page
import re
head_and_header = re.sub(r'<title>.*?</title>', '<title>About Us — Reach Forever</title>', head_and_header)

about_content = """
<main>
  <!-- Hero Section -->
  <section class="hero-section" style="padding: 160px 5% 80px 5%; background: var(--dark); position: relative; overflow: hidden; text-align: center;">
    <div style="position:absolute; top:-100px; right:-100px; width:400px; height:400px; background:radial-gradient(circle,rgba(236,72,153,.15) 0%,transparent 70%); border-radius:50%; pointer-events:none;"></div>
    
    <div style="max-width: 1000px; margin: 0 auto; position: relative; z-index: 2;">
      <h1 style="font-family: var(--ss); font-size: clamp(3rem, 6vw, 5rem); font-weight: 800; color: #FFF; line-height: 1.1; margin-bottom: 20px; letter-spacing: -2px;">
        <span style="background: linear-gradient(135deg, #ec4899, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">About Us</span>
      </h1>
      <p style="font-family: var(--sm); font-size: 1.2rem; color: rgba(255,255,255,.7); max-width: 800px; margin: 0 auto; line-height: 1.8;">
        We don't just run ads; we engineer growth. Reach Forever is Punjab's premier digital marketing agency, dedicated to scaling local businesses into industry leaders through data-driven strategies, scroll-stopping content, and relentless execution.
      </p>
    </div>
  </section>

  <!-- Vision & Mission -->
  <section id="visionMissionSec" style="padding: 100px 5%; background: var(--dark); position: relative;">
    <div style="max-width:1200px; margin:0 auto; display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:40px;">
      
      <!-- Vision -->
      <div style="background:var(--dark2); border-radius:24px; padding:50px; border:1px solid rgba(255,255,255,.05); position:relative; overflow:hidden;">
        <div style="width:60px; height:60px; border-radius:16px; background:rgba(236,72,153,.1); display:flex; align-items:center; justify-content:center; font-size:1.8rem; color:#ec4899; margin-bottom:25px;">
          <i class="ri-eye-fill"></i>
        </div>
        <h2 style="font-family:var(--ss); font-size:2rem; font-weight:700; color:#FFF; margin-bottom:20px;">Our Vision</h2>
        <p style="font-family:var(--sb); font-size:1rem; color:rgba(255,255,255,.6); line-height:1.7;">
          To empower ambitious business owners with the tools, visibility, and authoritative brand presence they need to absolutely dominate their local markets. We envision a landscape where superior businesses get the superior attention they deserve.
        </p>
      </div>

      <!-- Mission -->
      <div style="background:var(--dark2); border-radius:24px; padding:50px; border:1px solid rgba(255,255,255,.05); position:relative; overflow:hidden;">
        <div style="width:60px; height:60px; border-radius:16px; background:rgba(139,92,246,.1); display:flex; align-items:center; justify-content:center; font-size:1.8rem; color:#8b5cf6; margin-bottom:25px;">
          <i class="ri-rocket-fill"></i>
        </div>
        <h2 style="font-family:var(--ss); font-size:2rem; font-weight:700; color:#FFF; margin-bottom:20px;">Our Mission</h2>
        <p style="font-family:var(--sb); font-size:1rem; color:rgba(255,255,255,.6); line-height:1.7;">
          To architect flawless, full-funnel digital systems that flood our clients' businesses with high-quality customers on autopilot. We bypass vanity metrics to focus strictly on what matters: your bottom line, aggressive ROI, and sustainable market domination.
        </p>
      </div>

    </div>
  </section>

  <!-- Core Values -->
  <section id="valuesSec" style="padding: 100px 5%; background: var(--dark); position: relative; overflow: hidden;">
    <div style="position:absolute; top:-100px; right:-100px; width:400px; height:400px; background:radial-gradient(circle,rgba(236,72,153,.15) 0%,transparent 70%); border-radius:50%; pointer-events:none;"></div>
    
    <div style="max-width:1200px; margin:0 auto; position:relative; z-index:2; text-align:center; margin-bottom:60px;">
      <h2 style="font-family:var(--ss); font-size:clamp(2.5rem,4vw,3.5rem); font-weight:800; color:#FFF; margin-bottom:15px; letter-spacing:-1px;">The Reach <em style="color:#d81b60; font-style:normal;">Standard</em></h2>
      <p style="font-family:var(--sm); font-size:1.1rem; color:rgba(255,255,255,.7); max-width:600px; margin:0 auto;">We operate differently from traditional agencies. Our entire ecosystem is built around three core pillars.</p>
    </div>

    <div style="max-width:1200px; margin:0 auto; display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:30px; position:relative; z-index:2;">
      <!-- Value 1 -->
      <div style="background:var(--dark2); border-radius:24px; padding:40px; border:1px solid rgba(255,255,255,.05); transition:transform .3s var(--ex);">
        <div style="width:60px; height:60px; border-radius:16px; background:rgba(236,72,153,.1); display:flex; align-items:center; justify-content:center; font-size:1.8rem; color:#ec4899; margin-bottom:25px;"><i class="ri-line-chart-fill"></i></div>
        <h3 style="font-family:var(--ss); font-size:1.5rem; font-weight:700; color:#FFF; margin-bottom:15px;">Proof, Not Promises</h3>
        <p style="font-family:var(--sb); font-size:0.95rem; color:rgba(255,255,255,.6); line-height:1.7;">We believe in transparent metrics and tangible ROI. If we can't measure it and prove its value, we don't do it.</p>
      </div>
      <!-- Value 2 -->
      <div style="background:var(--dark2); border-radius:24px; padding:40px; border:1px solid rgba(255,255,255,.05); transition:transform .3s var(--ex);">
        <div style="width:60px; height:60px; border-radius:16px; background:rgba(16,185,129,.1); display:flex; align-items:center; justify-content:center; font-size:1.8rem; color:#10b981; margin-bottom:25px;"><i class="ri-vip-crown-fill"></i></div>
        <h3 style="font-family:var(--ss); font-size:1.5rem; font-weight:700; color:#FFF; margin-bottom:15px;">Exclusivity</h3>
        <p style="font-family:var(--sb); font-size:0.95rem; color:rgba(255,255,255,.6); line-height:1.7;">We only take on a few select clients. When you work with Reach Forever, you get our full, undivided attention and resources.</p>
      </div>
      <!-- Value 3 -->
      <div style="background:var(--dark2); border-radius:24px; padding:40px; border:1px solid rgba(255,255,255,.05); transition:transform .3s var(--ex);">
        <div style="width:60px; height:60px; border-radius:16px; background:rgba(139,92,246,.1); display:flex; align-items:center; justify-content:center; font-size:1.8rem; color:#8b5cf6; margin-bottom:25px;"><i class="ri-speed-up-fill"></i></div>
        <h3 style="font-family:var(--ss); font-size:1.5rem; font-weight:700; color:#FFF; margin-bottom:15px;">Rapid Execution</h3>
        <p style="font-family:var(--sb); font-size:0.95rem; color:rgba(255,255,255,.6); line-height:1.7;">In the digital space, speed wins. We deploy campaigns, funnels, and content systems faster than anyone in the industry.</p>
      </div>
    </div>
  </section>
</main>
"""

with open('about.html', 'w', encoding='utf-8') as f:
    f.write(head_and_header + about_content + footer)
    
print("Successfully generated perfect about.html!")
