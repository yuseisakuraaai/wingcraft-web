#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Comprehensive site validator for Wingscraft."""
import os
import re
import json

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HTML_FILES = [f for f in os.listdir(ROOT) if f.endswith(".html")]

errors = []
warnings = []

print("=" * 50)
print(f"🔍 Validating Wingscraft ({len(HTML_FILES)} HTML files)")
print("=" * 50)

for f in sorted(HTML_FILES):
    path = os.path.join(ROOT, f)
    with open(path, "r", encoding="utf-8") as file:
        content = file.read()

    # 1. Structural Tags
    for tag in ["html", "head", "body"]:
        if f"<{tag}" not in content or f"</{tag}>" not in content:
            errors.append(f"{f}: Missing <{tag}> or </{tag}>")

    # 2. Key Metadata on main pages
    if f not in ["sample-coffee.html", "demo-booking.html", "demo-inquiries.html", "404.html"]:
        if "https://wingscraft.dev/assets/og.png" not in content:
            errors.append(f"{f}: og:image must be absolute URL")
        if 'property="og:url"' not in content:
            errors.append(f"{f}: Missing og:url")
        if 'rel="canonical"' not in content:
            errors.append(f"{f}: Missing canonical link")
        if 'hreflang="ja"' not in content or 'hreflang="en"' not in content:
            errors.append(f"{f}: Missing hreflang alternates")

    # 3. JSON-LD validation
    json_ld_blocks = re.findall(r'<script type="application/ld\+json">(.*?)</script>', content, re.DOTALL)
    for j in json_ld_blocks:
        try:
            parsed = json.loads(j)
            if "@context" not in parsed or "@type" not in parsed:
                errors.append(f"{f}: JSON-LD missing @context or @type")
        except Exception as e:
            errors.append(f"{f}: Malformed JSON-LD: {e}")

    # 4. Internal Link Check
    internal_links = re.findall(r'href="([a-zA-Z0-9_\-]+\.html)(?:#[a-zA-Z0-9_\-]*)?"', content)
    for link in internal_links:
        target_path = os.path.join(ROOT, link)
        if not os.path.exists(target_path):
            errors.append(f"{f}: Broken internal link to '{link}'")

print()
if errors:
    print("❌ ERRORS:")
    for err in errors:
        print("  -", err)
    exit(1)
else:
    print("✅ All checks passed successfully! Everything is consistent.")
    print("=" * 50)
