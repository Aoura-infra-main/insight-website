import os
import glob
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    filename = os.path.basename(filepath)
    is_article = 'articles/' in filepath
    
    if filename == 'article.html':
        # Add noindex to legacy redirector
        if '<meta name="robots" content="noindex">' not in content:
            content = content.replace('</head>', '    <meta name="robots" content="noindex">\n</head>')
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return

    # Extract title and description
    title_match = re.search(r'<title>(.*?)</title>', content)
    desc_match = re.search(r'<meta name="description" content="(.*?)">', content)
    
    title = title_match.group(1) if title_match else ""
    desc = desc_match.group(1) if desc_match else ""

    # Check for Canonical
    canonical_url = f"https://aouragrp.com/{filename}" if not is_article else f"https://aouragrp.com/articles/{filename}"
    if filename == "index.html":
        canonical_url = "https://aouragrp.com/"

    if '<link rel="canonical"' not in content:
        content = content.replace('</head>', f'    <!-- Canonical URL -->\n    <link rel="canonical" href="{canonical_url}">\n</head>')

    # Open Graph & Twitter
    og_url = canonical_url
    # Find existing OG image, if none, use default
    og_img_match = re.search(r'<meta property="og:image" content="(.*?)">', content)
    if og_img_match:
        img_url = og_img_match.group(1)
        if not img_url.startswith('http'):
            # Make absolute
            abs_img = img_url.replace('../', '').replace('./', '')
            if not abs_img.startswith('assets'):
                abs_img = f"assets/images/{abs_img}" # Fallback
            new_img = f"https://aouragrp.com/{abs_img}"
            content = content.replace(f'content="{img_url}"', f'content="{new_img}"')
    else:
        # Need to insert OG and Twitter blocks
        img_url = "https://aouragrp.com/assets/logo/logo.jpg"
        meta_block = f"""
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="{"article" if is_article else "website"}">
    <meta property="og:url" content="{og_url}">
    <meta property="og:title" content="{title}">
    <meta property="og:description" content="{desc}">
    <meta property="og:image" content="{img_url}">

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{title}">
    <meta name="twitter:description" content="{desc}">
    <meta name="twitter:image" content="{img_url}">
"""
        content = content.replace('</head>', f'{meta_block}</head>')

    # Add Schema
    if 'application/ld+json' not in content:
        if is_article:
            # Extract author, date, image for article schema
            author_match = re.search(r'<span class="article-author-name">(.*?)</span>', content)
            author = author_match.group(1) if author_match else "Aoura Insights"
            
            date_match = re.search(r'<span class="text-meta"[^>]*>(.*?)&nbsp;•', content)
            date_str = date_match.group(1).strip() if date_match else "2026-06-20"
            # Attempt to find image
            schema_img = img_url if 'img_url' in locals() and img_url else "https://aouragrp.com/assets/logo/logo.jpg"
            if og_img_match:
                schema_img = og_img_match.group(1)
                if not schema_img.startswith('http'):
                    schema_img = f"https://aouragrp.com/{schema_img.replace('../', '')}"

            schema_block = f"""
    <!-- JSON-LD Structured Data Schema -->
    <script type="application/ld+json">
    {{
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "{title}",
      "description": "{desc}",
      "image": "{schema_img}",
      "author": {{
        "@type": "Organization",
        "name": "{author}"
      }},
      "publisher": {{
        "@type": "Organization",
        "name": "Aoura Group",
        "logo": {{
          "@type": "ImageObject",
          "url": "https://aouragrp.com/assets/logo/logo.jpg"
        }}
      }},
      "datePublished": "{date_str}",
      "mainEntityOfPage": {{
        "@type": "WebPage",
        "@id": "{canonical_url}"
      }}
    }}
    </script>
"""
        else:
            schema_block = f"""
    <!-- JSON-LD Structured Data Schema -->
    <script type="application/ld+json">
    {{
      "@context": "https://schema.org",
      "@type": "WebPage",
      "url": "{canonical_url}",
      "name": "{title}",
      "description": "{desc}"
    }}
    </script>
"""
        content = content.replace('</head>', f'{schema_block}</head>')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

# Process root HTML files
for file in glob.glob('*.html'):
    if file != 'index.html': # Already processed manually
        process_file(file)

# Process article HTML files
for file in glob.glob('articles/*.html'):
    process_file(file)

print("SEO update complete.")
