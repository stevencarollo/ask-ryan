# Weekly Altos market refresh for the Roundtable Script Vault.
# Chain: scrape Altos -> Supabase -> build market_local.json -> push -> Vercel auto-deploys.
# Registered as Windows scheduled task "Roundtable Weekly Market Refresh" (Mondays 6:00 AM).
# Run by hand any time:  powershell -NoProfile -ExecutionPolicy Bypass -File scripts\weekly_market_refresh.ps1

$FI  = 'C:\Users\Steve Carollo.MiniReem\Desktop\farm-intelligence'
$RT  = 'C:\Users\Steve Carollo.MiniReem\Downloads\ryan-serhant-tool'
$Log = Join-Path $RT 'logs\market_refresh.log'

New-Item -ItemType Directory -Force (Split-Path $Log) | Out-Null
function Say($m) {
    $line = "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')  $m"
    Add-Content -Path $Log -Value $line
    Write-Host $line
}

Say '===== weekly market refresh start ====='

# 1) Scrape fresh Altos data into Supabase (~10-15 min, polite 600ms/request)
Set-Location $FI
Say 'scraping Altos -> Supabase...'
npx tsx scripts/scrape-altos.ts 2>&1 | Select-Object -Last 5 | ForEach-Object { Say "  $_" }
if ($LASTEXITCODE -ne 0) { Say "WARN: scrape exited $LASTEXITCODE - building from existing Supabase data" }

# 2) Rebuild the static market_local.json the Script Vault fetches
Set-Location $RT
Say 'building market_local.json...'
python scripts\build_market_local.py 2>&1 | ForEach-Object { Say "  $_" }
if ($LASTEXITCODE -ne 0) { Say 'ERROR: build failed - aborting (site keeps last good data)'; exit 1 }

# 3) Commit + push only if the data actually changed (Vercel deploys on push)
git -C $RT add market_local.json
git -C $RT diff --cached --quiet -- market_local.json
if ($LASTEXITCODE -ne 0) {
    $stamp = Get-Date -Format 'yyyy-MM-dd'
    git -C $RT commit -m "chore: weekly Altos market data refresh $stamp" -- market_local.json 2>&1 | ForEach-Object { Say "  $_" }
    git -C $RT push origin main 2>&1 | ForEach-Object { Say "  $_" }
    if ($LASTEXITCODE -eq 0) { Say 'pushed - Vercel will deploy the fresh data' }
    else { Say 'ERROR: push failed - data committed locally, push manually' }
} else {
    Say 'no change in market data this week - nothing to push'
}

Say '===== weekly market refresh done ====='
