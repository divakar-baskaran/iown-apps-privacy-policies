# iOwn Apps — Privacy Policies

Static website hosting privacy policies for **iOwn** applications.

This repository is designed for **GitHub Pages** so each app can keep a stable, independently accessible privacy policy URL without creating a separate repository per app.

## Published pages

| App | Local path | Expected GitHub Pages URL |
|-----|------------|---------------------------|
| Directory (home) | [`index.html`](./index.html) | https://divakar-baskaran.github.io/iown-apps-privacy-policies/ |
| iOwn QR & Barcode Scanner | [`iown-qr-privacy-policy/`](./iown-qr-privacy-policy/) | https://divakar-baskaran.github.io/iown-apps-privacy-policies/iown-qr-privacy-policy/ |

Only apps listed in [`assets/js/apps-registry.js`](./assets/js/apps-registry.js) with `status: "published"` appear on the homepage.

## Repository layout

```text
iown-apps-privacy-policies/
├── index.html                          # Homepage / app directory
├── assets/
│   ├── css/styles.css                  # Shared design system
│   ├── js/apps-registry.js             # Published app registry
│   ├── js/main.js                      # TOC + homepage rendering
│   ├── fonts/                          # Bundled Inter (from QR app)
│   └── images/                         # Shared icons / wordmarks
├── iown-qr-privacy-policy/
│   └── index.html
├── docs/audits/                        # Internal source-code audits
├── CONTRIBUTING.md
└── README.md
```

## Design

Visual direction matches **iOwn QR & Barcode Scanner** dark theme:

- Background `#07111F`, surface `#0D1B2A`, primary `#2F8BFF` / `#1677FF`
- Local Inter fonts (no external font CDN, no tracking scripts)
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

## GitHub Pages setup

1. Push `main` to `https://github.com/divakar-baskaran/iown-apps-privacy-policies`
2. In the repository on GitHub: **Settings → Pages**
3. Source: **Deploy from a branch** → `main` → `/ (root)`
4. After deployment, verify both URLs above

## Related source audits

- [iOwn QR privacy audit](./docs/audits/iown-qr-privacy-audit.md)

## Adding another app

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## QR Scanner policy details

- Effective date: October 2026
- Contact: iownapps.26@gmail.com
