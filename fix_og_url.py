import os
import glob
import re

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    filename = os.path.basename(filepath)
    is_article = 'articles/' in filepath
    canonical_url = f"https://aouragrp.com/{filename}" if not is_article else f"https://aouragrp.com/articles/{filename}"
    if filename == "index.html":
        canonical_url = "https://aouragrp.com/"

    # Replace empty og:url or twitter fields if necessary
    content = re.sub(r'<meta property="og:url" content=".*?">', f'<meta property="og:url" content="{canonical_url}">', content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for file in glob.glob('*.html'):
    fix_file(file)

for file in glob.glob('articles/*.html'):
    fix_file(file)

print("Fix applied.")
