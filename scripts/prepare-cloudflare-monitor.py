#!/usr/bin/env python3
"""Copy current monitor UI to static assets without local-only mutation controls."""
from pathlib import Path
root=Path(__file__).resolve().parents[1]
original=(root/"scripts"/"monitor.html").read_text(encoding="utf-8")
# Read-only cloud UI: prevent users from seeing gate approval controls or expecting local video playback.
original=original.replace("const gate=event.target.closest('[data-g]');if(gate){busy=true;try{const response=await fetch('/api/gate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({video:cur,stage:gate.dataset.g,decision:gate.dataset.d,comment:document.getElementById('c-'+gate.dataset.g)?.value||''})});if(!response.ok)throw new Error(response.status);last=''}finally{busy=false;refresh()}}","")
original=original.replace("</head>", '<style>[data-g],button[data-g],textarea[id^="c-"]{display:none!important}</style></head>')
original=original.replace("setInterval(refresh,2500)", "setInterval(refresh,10000)")
if "fetch('/api/gate'" in original:
    raise SystemExit("unsafe mutation callback still present; update UI adapter")
dst=root/"cloudflare"/"monitor"/"public"/"index.html"
dst.parent.mkdir(parents=True,exist_ok=True)
dst.write_text(original,encoding="utf-8")
print(dst)
