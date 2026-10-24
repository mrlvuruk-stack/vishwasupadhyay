import re

with open(r'C:\Users\MR LV\.gemini\antigravity\brain\65efb389-1990-42d9-8edc-9ec6b6494208\.system_generated\steps\187\content.md', 'r', encoding='utf-8') as f:
    text = f.read()

# Skip head
body_start = text.find('<body')
body_text = text[body_start:]

# Find all img tags in the body
img_tags = re.findall(r'<img[^>]*>', body_text)
print(f"Found {len(img_tags)} img tags in body:")
for tag in img_tags:
    print(tag)
