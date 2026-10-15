# Contributing — add an app privacy policy

Use this workflow for every new iOwn app. Do **not** invent data practices. Audit the app source first, then write the policy.

**Repository:** `divakar-baskaran/iown-apps-privacy-policies`  
**Git remote (local):** `git@github-personal:divakar-baskaran/iown-apps-privacy-policies.git`  
**GitHub Pages base:** `https://divakar-baskaran.github.io/iown-apps-privacy-policies/`

---

## Checklist (copyable)

```text
[ ] 1. Create folder: <app-slug>-privacy-policy/
[ ] 2. Audit the app (permissions, SDKs, storage, network, ads, analytics)
[ ] 3. Write docs/audits/<app-slug>-privacy-audit.md
[ ] 4. Add <app-slug>-privacy-policy/index.html using shared CSS/JS
[ ] 5. Copy or link brand assets under assets/images/ (no fabricated logos)
[ ] 6. Register the app in assets/js/apps-registry.js (status: "published" only when ready)
[ ] 7. Use relative paths only (../assets/... from nested pages)
[ ] 8. Mark unknowns with placeholders — do not invent email/address/legal claims
[ ] 9. Preview locally at nested URL paths
[ ] 10. Commit + push to main
[ ] 11. Verify GitHub Pages URL
[ ] 12. Paste the policy URL into Google Play Console → App content → Privacy policy
```

---

## Step-by-step

### 1. Create the folder

Example for a new app:

```bash
mkdir -p new-app-privacy-policy
```

Suggested slugs already reserved in the roadmap:

- `iown-ledger-privacy-policy/`
- `app-lock-privacy-policy/`
- `pdf-app-privacy-policy/`
- `resume-builder-privacy-policy/`
- `tic-tac-toe-privacy-policy/`
- `level-devil-privacy-policy/`

Do **not** create empty placeholder pages that appear “published” on the homepage.

### 2. Audit the app before writing

Inspect at minimum:

- `pubspec.yaml` / Gradle / Podfile dependencies
- Android `AndroidManifest.xml` and iOS `Info.plist`
- Actual Dart/Kotlin/Swift call sites (not just dependency names)
- Ads, Analytics, Crashlytics, auth, storage, networking
- Existing in-app privacy copy (compare for accuracy)
- Deletion / clear-data behaviour

Save findings under:

```text
docs/audits/<app-slug>-privacy-audit.md
```

Use the QR audit as a model: `docs/audits/iown-qr-privacy-audit.md`.

### 3. Add `index.html`

Reuse shared styles and scripts:

```html
<link rel="stylesheet" href="../assets/css/styles.css" />
<script src="../assets/js/main.js" defer></script>
```

Link home with `href="../"`.  
Do **not** use absolute paths like `/assets/...` (they break GitHub Pages project sites).

### 4. Match the shared visual design

- Dark navy background / blue primary accents (see `assets/css/styles.css`)
- Prefer the new app’s real icon if available
- If no icon exists, use the neutral CSS placeholder class `app-card__icon--placeholder` — do not invent a logo

### 5. Register on the homepage

Edit `assets/js/apps-registry.js`:

```js
{
  id: "new-app",
  name: "App Display Name",
  description: "One short accurate sentence.",
  path: "new-app-privacy-policy/",
  icon: "assets/images/new-app-icon.png", // or omit / null for placeholder
  status: "published", // only when the page is complete
}
```

Homepage rendering reads this registry from `index.html`.

### 6. Test nested paths locally

```bash
cd /path/to/iown-apps-privacy-policies
python3 -m http.server 8080
```

Verify:

- http://localhost:8080/
- http://localhost:8080/new-app-privacy-policy/
- CSS, JS, fonts, and images load (check DevTools Network)
- Keyboard focus rings and skip link work
- Mobile TOC expands/collapses on policy pages

### 7. Commit and push

```bash
git status
git add .
git commit -m "$(cat <<'EOF'
Add privacy policy page for <App Name>.

EOF
)"
git push -u origin main
```

Only commit when you intend to publish. Do not commit secrets, keystores, or API keys.

### 8. Verify GitHub Pages

After Pages is enabled on `main` / root:

- https://divakar-baskaran.github.io/iown-apps-privacy-policies/
- https://divakar-baskaran.github.io/iown-apps-privacy-policies/new-app-privacy-policy/

### 9. Google Play Console

Paste the **exact** policy URL into:

**Play Console → App → Policy → App content → Privacy policy**

Also update Data safety declarations so they match the audit (ads, analytics, crash logs, device IDs, etc.).

---

## Starter policy section template

Copy into a new `index.html` and replace every `VERIFY:` note after auditing.

```html
<section class="policy-section" id="introduction">
  <h2>1. Introduction</h2>
  <p>
    <!-- VERIFY: app name, package id, platforms -->
  </p>
</section>

<section class="policy-section" id="information-we-process">
  <h2>2. Information we collect or process</h2>
  <ul>
    <li><!-- VERIFY: local vs transmitted; do not claim “no data” without evidence --></li>
  </ul>
</section>

<section class="policy-section" id="permissions">
  <h2>3. Permissions</h2>
  <p><!-- VERIFY: each permission’s real purpose from code --></p>
</section>

<section class="policy-section" id="third-parties">
  <h2>4. Third-party services</h2>
  <p><!-- VERIFY: only SDKs actually initialised / used --></p>
</section>

<section class="policy-section" id="retention">
  <h2>5. Retention and deletion</h2>
  <p><!-- VERIFY: clear-history / account deletion / uninstall behaviour --></p>
</section>

<section class="policy-section" id="contact">
  <h2>6. Contact</h2>
  <p>
    Email:
    <span class="placeholder">[Developer contact email — to be confirmed]</span>
  </p>
</section>
```

### Wording rules

- Distinguish **confirmed behaviour** from **SDK capabilities**
- Do not claim encryption, “no tracking”, or “no data collected” unless the audit proves it
- Do not invent company address, phone, or email
- Preserve accurate commitments from any prior policy; drop unsupported claims
- Prefer plain language over legal theatre

---

## Example URLs (this repository)

| Page | URL |
|------|-----|
| Home | https://divakar-baskaran.github.io/iown-apps-privacy-policies/ |
| QR Scanner | https://divakar-baskaran.github.io/iown-apps-privacy-policies/iown-qr-privacy-policy/ |
