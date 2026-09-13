# POCKETFLOW v1.1 — Cash & Bank Wallet Update

A local-first Thai/English income-expense tracker. Plain HTML, CSS and JavaScript with no backend, accounts, cloud sync, dependencies, build step, or external app requests.

## Transaction time and first use
New entries default to the current local date and time. Both can be edited. Optional `time` stores local `HH:mm` alongside the existing `YYYY-MM-DD` date; `createdAt` remains the automatic recorded timestamp and is preserved on edits. Legacy entries without time remain valid, display only their known date, and can still be edited without inventing a time. Recent entries sort by transaction date/time, then recorded timestamp. CSV appends transaction time after the existing columns (blank for legacy entries). JSON v2 backups preserve optional time and still accept older v1/v2 backups.

Only a browser profile with no existing POCKETFLOW data automatically opens the initial-balance modal. Save and start or Skip for now closes it and persists `pocketflow.initialSetupCompleted.v1`. Existing transactions, wallet state, or language/theme preferences silently mark setup completed without changing financial data. Upgrades and restores do not reopen the prompt. The balance-area Edit opening balances control reopens the same modal with the saved baseline; there is no footer entry point. The completion flag is local UI state, separate from the unchanged backup format. Bank precedes Cash in cards, opening fields, and wallet choices.

## Cash, Bank and Total Money
Exactly two wallets are supported: cash and bank. Set the cash and bank money you currently have in the Opening Balance modal, or choose Skip. Deferral is remembered; there is no repeated full-screen setup prompt. Zero opening balances are valid. Opening balances are a baseline, not income. Editing the baseline later recalculates all assigned activity on top; do not enter your new current balance as a baseline unless you intend that adjustment.

Each current wallet balance = opening balance + assigned income − assigned expenses + transfers in − transfers out. Total Money = Cash + Bank. Balances include all recorded assigned activity, regardless of transaction date or the month filter. Negative balances are allowed and displayed correctly. There is no bank connection or reconciliation; the numbers depend on your manual baseline and entries.

The existing monthly balance card is now Net. Month/all-time filters affect the flow statistics and list, not wallet totals. Transfers count as activity but never as income, expense, net flow or category spending. Income/expenses select a wallet after setup; transfers automatically select the other destination wallet. Edits/deletions derive balances again, so there are no cached running totals to drift.

## Safe upgrade from v1.0
The transaction key remains pocketflow.transactions.v1. Existing records without a wallet are treated as Unspecified in memory/UI and are not rewritten to Cash or Bank. Their amounts, dates, categories and notes remain intact. They still contribute to historical flow statistics, but not wallet balances. You can optionally assign a wallet when editing a legacy record; the UI explains that doing so changes wallet balances. No export/import is needed for a same-origin upgrade.

The additive pocketflow.wallets.v1 key stores {setup, dismissed, opening: {cash, bank}}. New normal records have wallet: cash, bank, or null before setup. Transfers have type: transfer, category: null, wallet: null, fromWallet and toWallet. The two endpoints must be different. There is no automatic reset or seed data.

## Run locally
Run `powershell -ExecutionPolicy Bypass -File .\Start-Local.ps1` from this folder and open http://127.0.0.1:8790. Keep the terminal open. Ctrl+C stops the server. The launcher uses Python 3 (python or py) or the dependency-free Node.js server fallback. Opening index.html directly can run the tracker, but service workers and PWA installation require localhost or HTTPS.

## Install / Add to Home Screen
For a hosted copy, publish the complete app over HTTPS. On supported desktop/Android browsers, use the browser's Install app / Add to Home Screen command. On iPhone, open the HTTPS site in Safari, choose Share → Add to Home Screen, and enable Open as Web App if offered. The manifest, standalone display, PNG icons, maskable icon, Apple touch icon, and safe-area support are included. No automatic/fake iOS install button is provided.

A phone's 127.0.0.1 points to that phone, not your PC. Use an HTTPS static host for phone installation; plain HTTP on a PC's LAN address is not sufficient for normal PWA service-worker support. Installation availability varies by browser and device.

## Offline behavior and updates
After one successful online load completes service-worker installation, the app shell and local fonts can load offline. Transactions continue to use localStorage. No financial data or backup files are stored in the service-worker cache. First-time loading needs a connection to the host (or a running local server).

service-worker.js caches an explicit list of 12 local shell assets under pocketflow-shell-v3. Installation fetches fresh files with cache: reload; normal shell requests are cache-first. Activation deletes only obsolete pocketflow-shell-* caches and claims clients. Other requests are not cached. Bump the cache version whenever shell assets change. The worker script is registered with updateViaCache: none; the browser checks on page loads, and the app checks when returning after an hour. New workers wait until old app tabs/windows close. Reopen the app online to pick up an update. There are no forced reloads or refresh loops.

## JSON Backup / Restore
Find the compact Data & backups section below the dashboard.

**Backup data** downloads all transactions, wallet opening balances/setup state, and language/theme preferences as `pocketflow-backup-YYYY-MM-DD.json`, including entries outside the current filter. Keep backup files somewhere safe; they contain readable financial records and are not encrypted. This is a file backup, not a cloud backup.

Schema:
```json
{
  "app": "POCKETFLOW",
  "version": 2,
  "exportedAt": "2026-09-07T00:00:00.000Z",
  "transactions": [],
  "wallets": { "setup": false, "dismissed": false, "opening": { "cash": 0, "bank": 0 } },
  "preferences": { "language": "th", "theme": "light" }
}
```
Each transaction retains its id, type, numeric positive amount, category, ISO date, note, optional timestamps, and wallet/transfer fields. Opening balances and setup/deferral are included under wallets.

**Restore data** selects a JSON backup, validates it, then shows an explicit replacement confirmation and transaction counts. Cancel leaves storage unchanged. Confirm **replaces** all current transactions, wallet opening balances/setup state, and language/theme preferences; it does not merge. Back up current data first. After restore, the dashboard shows all restored transactions and recalculated wallets without reloading. Version 1 backups are accepted: history is preserved, no wallets are guessed, and wallet setup becomes available again. Version 2 backups restore the complete wallet state.

Validation rejects invalid JSON, wrong app or unsupported version, missing or malformed fields, invalid types/categories/dates/preferences/timestamps, duplicate/empty IDs, non-positive amounts, amounts above 999,999,999.99 THB, or more than two decimal places. Limits: 10 MB and 50,000 transactions. Unknown transaction fields are rejected. If data changes while the confirmation is open, choose the file again. The transaction array is written last in one localStorage operation; on a write failure, wallet state and preferences are rolled back where storage remains available and failure is reported.

**CSV export** remains available beside Recent transactions. The original CSV columns are retained, with Wallet, From and To appended; transfers have separate endpoints and legacy records show Unspecified. Use CSV to view/analyze transactions in Excel; use JSON for full backup and restoration. CSV is not a restore format. Notes are never translated.

## Data and features
The existing pocketflow.transactions.v1 key is preserved. Financial sums use integer satang. Monthly/all-time income, expense, net and category summaries exclude transfers; the activity count includes transfers. Type filters apply only to the transaction list. Add/edit/delete, fixed categories, language selection, dark mode, local persistence, and Excel-friendly CSV remain available.

Storage belongs to the browser/profile and exact origin (protocol, host, port). Different browsers, devices, installation contexts or deployment URLs may have separate stores. Export before switching and restore in the destination. Clearing site data, private browsing, storage eviction, or uninstalling may remove records or offline assets. PWA installation is not a backup and does not sync data.

## Files / static deployment
Publish index.html, style.css, app.js, manifest.webmanifest, service-worker.js, fonts/, and icons/ together. Keep their relative paths; subdirectory deployment is supported. Serve the manifest as application/manifest+json and service-worker.js as JavaScript with revalidation (no-cache). Keep the service worker in the app root so its scope covers the app. No SPA rewrite, server database, or build is required.

Start-Local.ps1 and server.cjs are local development helpers; README.md documents the app. The icons include 192px, 512px, maskable 512px, and Apple touch 180px PNG files, using the original upward arrow on navy. Locally bundled Noto Sans Thai WOFF2 subsets support weights 400–700; fonts/OFL.txt contains the license. Source: https://github.com/google/fonts/tree/main/ofl/notosansthai.

## Verification / limits
Desktop and 320/375/390/430/650px layouts, backup download, invalid-file rejection, confirmation/cancel, replace restore, quota-failure rollback, preferences, existing-data persistence, CSV, core transaction actions, manifest, service-worker shell cache, offline reload/fonts, and offline entry were browser-tested. iOS Home Screen installation still needs a physical-device check. No cloud backup, synchronization, encryption, or account recovery is provided.

Wallet tests A–H passed: baseline 3,000/27,000; cash expense 120; bank income 5,000; transfer 1,000; deletion reversal; expense reassignment; legacy history; new backup roundtrip and old backup restore. Additional checks covered zero/negative balances, changing activity types, malformed wallet/transfer data, rollback on storage failure, TH/EN, dark mode, mobile sheets and offline wallet activity. Physical iPhone keyboard behavior still needs a device check.
