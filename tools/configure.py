#!/usr/bin/env python3
"""Apply public URL and public Formspree endpoint from site-settings.json. No secrets."""
from pathlib import Path
from urllib.parse import urlsplit
import json,re,html,hashlib
ROOT=Path(__file__).resolve().parents[1]
settings=json.loads((ROOT/'site-settings.json').read_text())
base=settings.get('publicURL','').strip().rstrip('/')
endpoint=settings.get('formspreeEndpoint','').strip()
if base:
 u=urlsplit(base)
 if u.scheme!='https' or not u.hostname or u.username or u.password or u.query or u.fragment:
  raise SystemExit('publicURL must be the real HTTPS website URL, without query, fragment or credentials.')
if endpoint and not re.fullmatch(r'https://formspree\.io/f/[a-zA-Z0-9]+',endpoint):
 raise SystemExit('Use the public https://formspree.io/f/FORM_ID endpoint; do not enter an API key.')
config={'publicURL':base,'formspreeEndpoint':endpoint}
(ROOT/'site-config.js').write_text("'use strict';\nwindow.WINGSCRAFT_CONFIG = Object.freeze("+json.dumps(config)+");\n")
revision=hashlib.sha256(json.dumps(config,sort_keys=True).encode()).hexdigest()[:10]
public_pages=[]
for file in ROOT.glob('*.html'):
 text=file.read_text()
 text=re.sub(r'src="site-config\.js(?:\?[^"]*)?"',lambda m:'src="site-config.js?v='+revision+'"',text)
 text=re.sub(r'<link rel="canonical"[^>]*>','',text)
 text=re.sub(r'<meta property="og:url"[^>]*>','',text)
 text=re.sub(r'(<meta property="og:image" content=")[^"]*',lambda m:m[1]+html.escape(base+'/assets/og.png' if base else 'assets/og.png',quote=True),text)
 if base and file.name!='sample-coffee.html':
  url=base+'/'+('' if file.name=='index.html' else file.name)
  text=text.replace('</head>','<link rel="canonical" href="'+html.escape(url,quote=True)+'"><meta property="og:url" content="'+html.escape(url,quote=True)+'"></head>')
  public_pages.append(url)
 file.write_text(text)
robots='User-agent: *\nAllow: /\n'
if base:
 robots+='Sitemap: '+base+'/sitemap.xml\n'
 xml='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
 xml+=''.join('  <url><loc>'+html.escape(url)+'</loc></url>\n' for url in sorted(public_pages))+'</urlset>\n'
 (ROOT/'sitemap.xml').write_text(xml)
elif (ROOT/'sitemap.xml').exists():
 (ROOT/'sitemap.xml').unlink()
(ROOT/'robots.txt').write_text(robots)
print('Public URL: '+('configured' if base else 'not set; no invented canonical or sitemap URLs'))
print('Contact: '+('Formspree direct submission enabled; verify recipient and spam settings in dashboard' if endpoint else 'mail-app fallback; no direct submission configured'))
