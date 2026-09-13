$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot
Write-Host 'POCKETFLOW: http://127.0.0.1:8790 (Ctrl+C to stop)'
if (Get-Command python -ErrorAction SilentlyContinue) { & python -m http.server 8790 --bind 127.0.0.1 }
elseif (Get-Command py -ErrorAction SilentlyContinue) { & py -3 -m http.server 8790 --bind 127.0.0.1 }
elseif (Get-Command node -ErrorAction SilentlyContinue) { & node server.cjs }
else { Write-Error 'Install Python 3 or Node.js, or open index.html directly.' }
