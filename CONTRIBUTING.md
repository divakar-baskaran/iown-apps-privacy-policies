# Contributing

How to add or update content on the iOwn Apps GitHub Pages site.

## Repository

- GitHub: `iown-apps/iown-apps-web-page`
- Live base: `https://iown-apps.github.io/iown-apps-web-page/`

## Adding a privacy policy

1. Create a folder at the repo root, e.g. `my-app-privacy-policy/`.
2. Add `index.html` using the shared styles in `assets/css/styles.css`.
3. Link assets with `../assets/...` and set `data-asset-base="../assets/"` on `<body>`.
4. Register the app in `assets/js/apps-registry.js` (paths relative to `privacy/`).
5. Add cards/links on the homepage (`index.html`) and under `#privacy` if the app is public.
6. Keep claims limited to practices you can verify in the app source.

## Homepage vs privacy listing

- `index.html` — developer home (apps, about, privacy summary, contact)
- `privacy/index.html` — full directory of published policies (uses the registry)

## Design assets

- Homepage styles: `assets/css/site.css` + `assets/js/site.js`
- Policy pages: `assets/css/styles.css` + `assets/js/main.js`
- Font: self-hosted Sora under `assets/fonts/`
- Contact email: `iownapps.26@gmail.com`

## Do not invent data practices

Public privacy text must match the product. Prefer omitting a claim over guessing.
