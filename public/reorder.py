with open('index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

def get_section(start_marker, end_marker=None, end_marker_fallback=None):
    start_idx = -1
    for i, line in enumerate(lines):
        if start_marker in line:
            start_idx = i
            break
    if start_idx == -1: return []
    
    end_idx = -1
    if end_marker:
        for i in range(start_idx + 1, len(lines)):
            if end_marker in lines[i]:
                end_idx = i
                break
    
    if end_idx == -1 and end_marker_fallback:
        for i in range(start_idx + 1, len(lines)):
            if end_marker_fallback in lines[i]:
                end_idx = i
                break
                
    if end_idx == -1:
        # Just find the next </section>
        open_sections = 0
        for i in range(start_idx, len(lines)):
            if '<section' in lines[i]:
                open_sections += lines[i].count('<section')
            if '</section>' in lines[i]:
                open_sections -= lines[i].count('</section>')
                if open_sections <= 0:
                    end_idx = i
                    break
    
    if end_idx == -1: return []
    return lines[start_idx:end_idx+1]

# Extract sections
proofSec = get_section('<!-- PROOF NOT PROMISES -->')
diffSec = get_section('<!-- The Reach Difference (Before vs After) -->')
servicesSec = get_section('<!-- OUR SERVICES -->')
procSec = get_section('<!-- PROCESS -->')
baSec = get_section('<!-- B/A -->')
testiSec = get_section('<!-- TESTIMONIALS -->')
rushSec = get_section('<!-- RUSH -->')

print("Extracted lengths:")
print("proof", len(proofSec))
print("diff", len(diffSec))
print("services", len(servicesSec))
print("proc", len(procSec))
print("ba", len(baSec))
print("testi", len(testiSec))
print("rush", len(rushSec))

# Find indices where sections start
start_of_proof = lines.index(proofSec[0])
end_of_rush = lines.index(rushSec[-1])

# Make sure we got them all cleanly
new_lines = lines[:start_of_proof]
new_lines.extend(proofSec)
new_lines.extend(servicesSec)
new_lines.extend(procSec)
new_lines.extend(diffSec)
new_lines.extend(testiSec)
new_lines.extend(rushSec)
new_lines.extend(lines[end_of_rush+1:])

with open('index_new.html', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)
    
print("Created index_new.html")
