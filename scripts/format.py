#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Format HTML files in Wingscraft for readability while preserving inline flow."""
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HTML_FILES = [f for f in os.listdir(ROOT) if f.endswith(".html")]

# Tags that open/close a structural block
BLOCK_TAGS = {
    'html', 'head', 'body', 'header', 'nav', 'main', 'section', 'article',
    'aside', 'footer', 'div', 'ul', 'ol', 'dl', 'table', 'thead', 'tbody',
    'tr', 'fieldset', 'form', 'details', 'dialog'
}

def format_html(html_str):
    # Ensure doctype is first line
    html_str = re.sub(r'<!DOCTYPE\s+html>', '<!DOCTYPE html>\n', html_str, flags=re.IGNORECASE)
    
    # Break between adjacent tags of block nature
    # e.g., </header><main> -> </header>\n<main>
    # e.g., </section><section> -> </section>\n<section>
    for tag in BLOCK_TAGS:
        html_str = re.sub(rf'(</{tag}>)(<(?!(span|a|em|strong|small|b|i|time|code|br)\b)[a-zA-Z0-9_-]+)', r'\1\n\2', html_str)
        html_str = re.sub(rf'(<div[^>]*>)(<(?!(span|a|em|strong|small|b|i|time|code|br)\b)[a-zA-Z0-9_-]+)', r'\1\n\2', html_str)
        html_str = re.sub(rf'(<section[^>]*>)(<(?!(span|a|em|strong|small|b|i|time|code|br)\b)[a-zA-Z0-9_-]+)', r'\1\n\2', html_str)

    # Indentation logic
    lines = [line.strip() for line in html_str.split('\n') if line.strip()]
    formatted = []
    indent = 0
    
    for line in lines:
        # Check closing tag at start
        closing_match = re.match(r'^</([a-zA-Z0-9_-]+)>', line)
        if closing_match and closing_match.group(1).lower() in BLOCK_TAGS:
            indent = max(0, indent - 1)
        
        formatted.append(('  ' * indent) + line)
        
        # Check opening tag that doesn't close on the same line
        open_matches = re.findall(r'<([a-zA-Z0-9_-]+)(?:\s+[^>]*)?>', line)
        close_matches = re.findall(r'</([a-zA-Z0-9_-]+)>', line)
        
        diff = 0
        for tag in open_matches:
            tag_l = tag.lower()
            if tag_l in BLOCK_TAGS and not line.endswith('/>'):
                diff += 1
        for tag in close_matches:
            tag_l = tag.lower()
            if tag_l in BLOCK_TAGS:
                diff -= 1
        
        indent = max(0, indent + max(0, diff))

    return '\n'.join(formatted) + '\n'

print("Formatting HTML files...")
for fname in sorted(HTML_FILES):
    fpath = os.path.join(ROOT, fname)
    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Pre-clean excessive consecutive newlines
    new_content = format_html(content)
    with open(fpath, "w", encoding="utf-8") as f:
        f.write(new_content)
    print(f"  ✓ {fname} formatted.")

print("All HTML files formatted cleanly!")
