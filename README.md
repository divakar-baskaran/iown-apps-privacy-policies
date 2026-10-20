# iOwn Apps — Website

Static GitHub Pages site for iOwn Apps: developer homepage, privacy policies, and `app-ads.txt`.

**Live site (project Pages):** [https://iown-apps.github.io/iown-apps-web-page/](https://iown-apps.github.io/iown-apps-web-page/)

## URLs

| Page | URL |
|------|-----|
| Home | https://iown-apps.github.io/iown-apps-web-page/ |
| Privacy directory | https://iown-apps.github.io/iown-apps-web-page/privacy/ |
| QR Scanner policy | https://iown-apps.github.io/iown-apps-web-page/iown-qr-privacy-policy/ |
| app-ads.txt | https://iown-apps.github.io/iown-apps-web-page/app-ads.txt |

## Repository layout

```
index.html                 # Developer homepage
privacy/                   # Privacy policies directory
iown-qr-privacy-policy/    # QR Scanner privacy policy
app-ads.txt                # AdMob authorized sellers
assets/                    # Shared CSS, JS, fonts, images
```

## Local preview

From this directory:

```bash
python3 -m http.server 8080
```

Then open [http://localhost:8080/](http://localhost:8080/).

## GitHub Pages

1. Settings → Pages → Source: Deploy from a branch
2. Branch: `main` / root (`/`)
3. Site serves at `https://iown-apps.github.io/iown-apps-web-page/`

For AdMob, set the app website / authorized domain to match the host that serves `app-ads.txt` (this project URL path).

## Adding another app policy

See [CONTRIBUTING.md](CONTRIBUTING.md).
