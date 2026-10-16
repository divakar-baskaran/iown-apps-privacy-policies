# iOwn Apps — Privacy Policies

Static website hosting privacy policies for **iOwn** applications.

This repository is designed for **GitHub Pages** so each app can keep a stable, independently accessible privacy policy URL without creating a separate repository per app.

**Git remote (authoritative):** `iown-apps/iown-apps-privacy-policies`  
**GitHub Pages base:** https://iown-apps.github.io/iown-apps-privacy-policies/

## Published pages

| App | Local path | Expected GitHub Pages URL |
|-----|------------|---------------------------|
| Directory (home) | [`index.html`](./index.html) | https://iown-apps.github.io/iown-apps-privacy-policies/ |
| iOwn QR & Barcode Scanner | [`iown-qr-privacy-policy/`](./iown-qr-privacy-policy/) | https://iown-apps.github.io/iown-apps-privacy-policies/iown-qr-privacy-policy/ |
| AdMob `app-ads.txt` | [`app-ads.txt`](./app-ads.txt) | https://iown-apps.github.io/iown-apps-privacy-policies/app-ads.txt |

Only apps listed in [`assets/js/apps-registry.js`](./assets/js/apps-registry.js) with `status: "published"` appear on the homepage.

## Repository layout

```text
iown-apps-privacy-policies/
├── index.html                          # Homepage / app directory
├── app-ads.txt                         # AdMob authorised sellers (repo root)
├── assets/
│   ├── css/styles.css                  # Shared design system
│   ├── js/apps-registry.js             # Published app registry
│   ├── js/main.js                      # TOC + homepage rendering
│   ├── fonts/                          # Bundled fonts (Sora)
│   └── images/                         # Shared icons / wordmarks
├── iown-qr-privacy-policy/
│   └── index.html
├── docs/audits/                        # Internal source-code audits
├── CONTRIBUTING.md
└── README.md
```

## AdMob `app-ads.txt`

[`app-ads.txt`](./app-ads.txt) lists authorised digital sellers for ads served in iOwn apps (IAB Tech Lab / AdMob).

- **Location:** repository root only (next to `index.html`). Do **not** add copies inside individual `*-privacy-policy/` folders.
- **Shared for all apps:** one root file covers every current and future app that uses the same AdMob publisher ID on this developer website.
- **Current entry:**

  ```text
  google.com, pub-3757721419856588, DIRECT, f08c47fec0942fa0
  ```

### After you push and GitHub Pages deploys

1. Open: https://iown-apps.github.io/iown-apps-privacy-policies/app-ads.txt
2. Confirm the response is **plain text** (not an HTML 404 page) and matches the entry above.
3. Wait **at least 24 hours** for AdMob to crawl the file.
4. In AdMob: open your app → **app-ads.txt** tab → check status.

### Adding more authorised seller lines

Append each new line to the root `app-ads.txt` (one seller entry per line). Keep the file as plain text with UTF-8 encoding and no HTML.

### Developer website domain (manual check required)

AdMob and Google Play require the website domain in store / AdMob settings to match where `app-ads.txt` is hosted.

This site’s public host is:

`https://iown-apps.github.io/iown-apps-privacy-policies/`

You must verify manually that:

1. **Play Console** → App → Store settings / store listing → **Website** (or privacy policy host, as applicable) uses this same GitHub Pages host, **or**
2. **AdMob** → App settings → developer website / app-ads.txt domain matches this host exactly.

If Play/AdMob list a different domain (for example a custom domain), either point that domain at this Pages site or host `app-ads.txt` on the domain you entered in those consoles.

## Design

Visual direction matches **iOwn QR & Barcode Scanner** dark theme:

- Background `#07111F`, surface `#0D1B2A`, primary `#2F8BFF` / `#1677FF`
- Local Sora fonts (no external font CDN, no tracking scripts)
- Relative asset paths for nested GitHub Pages project URLs

## Local preview

From this repository root:

```bash
# Python
python3 -m http.server 8080

# or Node
npx --yes serve -l 8080
```

Then open:

- http://localhost:8080/
- http://localhost:8080/iown-qr-privacy-policy/
- http://localhost:8080/app-ads.txt

## GitHub Pages setup

1. Push `main` to `https://github.com/iown-apps/iown-apps-privacy-policies`
2. In the repository on GitHub: **Settings → Pages**
3. Source: **Deploy from a branch** → `main` → `/ (root)`
4. After deployment, verify the published URLs above (including `app-ads.txt`)

## Related source audits

- [iOwn QR privacy audit](./docs/audits/iown-qr-privacy-audit.md)

## Adding another app

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## QR Scanner policy details

- Effective date: October 2026
- Contact: iownapps.26@gmail.com
