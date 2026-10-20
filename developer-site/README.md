# iOwn Apps — developer website (copy into `iown-apps.github.io`)

This folder is a **ready-to-deploy static site** for the GitHub user/organisation Pages root:

| Intended public URL | File |
|---------------------|------|
| https://iown-apps.github.io/ | `index.html` |
| https://iown-apps.github.io/app-ads.txt | `app-ads.txt` |

## Why this is a separate package

The repository `iown-apps-privacy-policies` is a **project site**:

- Live today: `https://iown-apps.github.io/iown-apps-privacy-policies/`
- It **cannot** publish files at `https://iown-apps.github.io/` or `https://iown-apps.github.io/app-ads.txt`

Those root URLs require a repository named exactly:

```text
iown-apps.github.io
```

owned by the `iown-apps` GitHub account/organisation, with Pages enabled from that repo’s root.

**Do not rename** `iown-apps-privacy-policies`. Keep existing privacy policy URLs intact.

## What this site links to (preserved policy URLs)

| Resource | URL |
|----------|-----|
| Privacy policies directory | https://iown-apps.github.io/iown-apps-privacy-policies/ |
| QR Scanner privacy policy | https://iown-apps.github.io/iown-apps-privacy-policies/iown-qr-privacy-policy/ |

Only published apps are listed on the homepage. Additional apps (for example Ledger or App Lock) can be added later when ready.

## `app-ads.txt`

Exact content (plain text):

```text
google.com, pub-3757721419856588, DIRECT, f08c47fec0942fa0
```

Intended public URL after deploying **this** package to `iown-apps.github.io`:

`https://iown-apps.github.io/app-ads.txt`

> GitHub Pages URL availability does **not** guarantee AdMob acceptance. Configure the developer website in Google Play Console / AdMob to match this host, then wait for AdMob to crawl (often 24+ hours).

## Local preview

```bash
cd developer-site
python3 -m http.server 8080
```

Open:

- http://localhost:8080/
- http://localhost:8080/app-ads.txt

## Deploy steps (manual — no remotes changed by automation)

1. On GitHub, create a new repository under `iown-apps` named **`iown-apps.github.io`** (empty is fine).
2. Copy **everything inside** `developer-site/` to the root of that new repository (including `index.html`, `app-ads.txt`, and `assets/`).
3. Enable **Settings → Pages** → Deploy from branch `main` → `/ (root)`.
4. Verify:
   - https://iown-apps.github.io/
   - https://iown-apps.github.io/app-ads.txt (plain text, not HTML 404)
5. In **Google Play Console** and **AdMob**, set the developer website to `https://iown-apps.github.io/` (exact host AdMob will crawl for `/app-ads.txt`).
6. Wait for AdMob crawl; check status under each app’s **app-ads.txt** tab.

## Public contact email

`iownapps.26@gmail.com` (already used on the QR privacy policy and this site’s Contact section).

## Stack

Static HTML/CSS/JS, self-hosted Sora fonts, no build step, no analytics scripts, no backend.
