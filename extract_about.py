import json

with open(r'C:\Users\Akash\.gemini\antigravity\brain\5636fcbd-35bc-4786-8261-372e4b6befac\.system_generated\logs\transcript.jsonl', 'r', encoding='utf-8') as f:
    for line in f:
        if 'write_to_file' in line and 'about.html' in line:
            try:
                data = json.loads(line)
                tool_calls = data.get('tool_calls', [])
                for call in tool_calls:
                    if call.get('name') == 'write_to_file':
                        args = call.get('args', {})
                        if 'about.html' in args.get('TargetFile', ''):
                            print("FOUND ABOUT.HTML CONTENT!")
                            with open('about_extracted.html', 'w', encoding='utf-8') as out:
                                out.write(args.get('CodeContent', ''))
            except Exception as e:
                pass
