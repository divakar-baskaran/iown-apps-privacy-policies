# Privacy Audit — iOwn QR & Barcode Scanner

**App package:** `com.iown.qrscanner`  
**Source project:** `qr-scanner-generator-flutter-app`  
**Audit date:** 15 October 2026  
**Auditor note:** Findings are based on inspected Flutter source, manifests, and configuration. SDK capability notes are separated from confirmed app behaviour.

---

## 1. Confirmed app functionality

| Feature | Evidence |
|--------|----------|
| Live camera QR/barcode scanning | `lib/features/scanner/`, `mobile_scanner` |
| Home dashboard live preview scan | `lib/features/home/presentation/widgets/hero_scan_card.dart` |
| Gallery image decode for scanning | `scanner_screen.dart` → `ImagePicker` |
| QR generation (URL, text, contact, email, SMS, location, phone, calendar, Wi‑Fi, etc.) | `lib/features/qr_generator/` |
| Custom QR styling + logo from gallery | `lib/features/custom_qr/`, `image_editor/` |
| Barcode generation + customization | `lib/features/barcode_generator/` |
| Local history of scanned/generated codes | `HistoryRepository` + `HistoryItem` |
| Share text/images/vCards via system share sheet | `lib/services/sharing_service.dart` |
| Save/export images to Downloads/Pictures/app storage | `SharingService.saveImageBytes` |
| Open URLs, tel, mailto, maps externally | `url_launcher` via `SharingService` |
| Banner + interstitial ads (Google Mobile Ads) | `lib/core/ads/` |
| Firebase Analytics + Crashlytics (Android) | `main.dart`, `analytics_service.dart`, `firebase_options.dart` |
| Theme preference persistence | `theme_provider.dart` + SharedPreferences |
| In-app Privacy Policy & Terms screens | `privacy_policy_screen.dart`, `terms_of_use_screen.dart` |
| Clear history / delete individual items | `settings_screen.dart`, `history_provider.dart` |

**Not found:** user accounts, login, password reset, cloud sync of scan history, custom backend API, in-app browser for ads consent (UMP), iOS Firebase configuration.

---

## 2. Permissions and purposes

### Android (`android/app/src/main/AndroidManifest.xml` + merged release)

| Permission | Declared where | Purpose (from code) |
|------------|----------------|---------------------|
| `CAMERA` | Main manifest | Live QR/barcode scanning |
| `VIBRATE` | Main manifest | Haptic feedback on scan |
| `WRITE_EXTERNAL_STORAGE` (maxSdk 28) | Main manifest | Legacy save/export on older Android |
| `READ_EXTERNAL_STORAGE` (maxSdk 32) | Main manifest | Legacy gallery/read on older Android |
| `INTERNET` | Merged release (plugins / debug/profile manifests) | Ads, Analytics, Crashlytics, URL opening |
| `com.google.android.gms.permission.AD_ID` | Merged from Google Mobile Ads | Advertising ID for AdMob |
| `ACCESS_ADSERVICES_AD_ID` | Merged from Google Mobile Ads | Advertising ID (Android Ad Services) |

Camera hardware features are declared `required="false"`.

### iOS (`ios/Runner/Info.plist`)

| Key | Stated purpose |
|-----|----------------|
| `NSCameraUsageDescription` | Scan QR codes and barcodes |
| `NSPhotoLibraryUsageDescription` | Import photos for scanning, logos, custom QR designs |
| `NSPhotoLibraryAddUsageDescription` | Save generated QR codes and barcodes |
| `GADApplicationIdentifier` | AdMob App ID configured |

---

## 3. Data collected, processed, stored, or shared (evidence-based)

### A. Processed on-device only (confirmed)

- Camera frames for real-time decoding via `mobile_scanner` (no code path found that uploads frames).
- Gallery images selected by the user for decode or logo embedding (processed locally).
- Generated QR/barcode bitmaps rendered on-device (`qr_flutter`, `barcode_widget`, `screenshot`).

### B. Stored locally on device (confirmed)

| Data | Storage | Contents |
|------|---------|----------|
| Scan / generate history | SharedPreferences key `pref_history_list` | Plain JSON: `id`, `title`, `content` (full payload), type, format, timestamp, style metadata, optional `logoPath` |
| Theme mode | SharedPreferences `pref_theme_mode` | Light / dark / system |

**Important:** History is **not encrypted** in code. `HistoryItem.toJson()` / `json.encode` writes readable JSON to SharedPreferences (`history_repository.dart`). Claims of “encrypted local storage” in the in-app policy are **unsupported**.

Preference keys for haptic / auto-open links / save-history exist in `AppConstants` but **are not persisted** in the current Settings UI (widget-local state only). History is always saved via `addItem` when a code is detected.

### C. Transmitted externally (confirmed app instrumentation)

| Channel | What the app sends | Evidence |
|---------|--------------------|----------|
| Firebase Analytics | Custom events: `scan_completed` (`format`, `type`), `qr_generated` (`qr_type`, `has_logo`), `barcode_generated` (`barcode_format`), `share` (content type + item id); automatic screen/route observation via `FirebaseAnalyticsObserver` | `analytics_service.dart`, call sites |
| Firebase Crashlytics | Fatal/non-fatal errors, stack traces, breadcrumbs; Flutter fatal error wiring in `main.dart` | `main.dart`, `AnalyticsService.recordError` |
| Google Mobile Ads | Ad requests (banner + interstitial). SDK may collect device/ad identifiers per Google’s policies | `AdManager`, `IownAdBanner`, merged `AD_ID` |

**Not confirmed in app code:** upload of raw scan/QR payload strings to Firebase; `setUserId` is defined but **never called**; Firebase Storage is configured in options (`storageBucket`) but **no Storage SDK usage** was found in `lib/`.

### D. Shared by user action (confirmed)

- System share sheet for text, PNG, vCard (`share_plus`).
- External browser / dialer / email / maps via `url_launcher`.
- Files written to Downloads, Pictures, app external storage, or documents directory.

---

## 4. Third-party SDKs and documented data practices

| SDK | Role in app | Notes |
|-----|-------------|-------|
| Google Mobile Ads (`google_mobile_ads`) | Banner + interstitial | AdMob App ID `ca-app-pub-3757721419856588~1937455040`. Production Android units configured; iOS production units are placeholders (fall back to Google test IDs). Google’s advertising/privacy disclosures apply. |
| Firebase Analytics | Usage events | Google Analytics for Firebase data practices apply. |
| Firebase Crashlytics | Crash diagnostics | Crash report data practices apply. |
| `mobile_scanner` | Camera decode | On-device scanning library. |
| `image_picker` | Gallery pick | OS photo picker. |
| `share_plus` / `url_launcher` / `path_provider` / `shared_preferences` | OS utilities | Local or OS-mediated. |
| `google_fonts` | Typography | Runtime HTTP fetching **disabled** in `main.dart`; fonts bundled under `assets/fonts/`. |
| `package_info_plus` | Version display | Local package metadata. |

Official third-party policies (for Play Data safety cross-check):

- [Google Play Privacy Policy / Ads](https://policies.google.com/privacy)
- [Firebase / Google Analytics](https://firebase.google.com/support/privacy)
- [AdMob](https://support.google.com/admob/answer/6128543)

---

## 5. Local vs external

| Category | Local | External |
|----------|-------|----------|
| Scan/history content | Yes (SharedPreferences) | No upload path found for raw content |
| Theme | Yes | No |
| Analytics event metadata | — | Yes (Firebase) |
| Crash reports | — | Yes (Crashlytics) |
| Ads | — | Yes (AdMob) |
| Exported images | Device storage | Only if user shares externally |

Firebase is configured for **Android only** (`firebase_options.dart` throws on iOS/web).

---

## 6. Retention and deletion

| Behaviour | Status |
|-----------|--------|
| Delete single history item | Confirmed (`removeItem`) |
| Clear all history | Confirmed (Settings → Clear history → `clearAll`) |
| Uninstall removes app-local prefs/files | Typical OS behaviour (not custom-coded) |
| Server-side deletion of Analytics/Crashlytics/Ads data | **Not implemented** in-app; subject to Google retention |
| Account deletion flow | N/A (no accounts) |

---

## 7. Unknowns requiring confirmation

1. **Developer contact email** (and optional legal entity / postal address) for the policy Contact section.
2. **Policy effective / last-updated date** to publish (in-app screen currently says “Effective: March 2026”).
3. Whether **UMP / GDPR consent messaging** or ATT (iOS) will be added before store release.
4. Whether Analytics/Crashlytics should remain **enabled by default**, or whether an opt-out will be offered.
5. Whether Play Console Data safety will declare **Advertising ID** / **App activity** / **Crash logs** / **Diagnostics** as collected (recommended based on this audit).
6. Intended **children’s audience** positioning for Play (target age group).
7. Whether haptic / auto-open / save-history toggles will be wired to persistence (currently non-persistent UI state).
8. iOS shipping timeline and whether Firebase/AdMob production units will be enabled on iOS.
9. Whether `usesCleartextTraffic="true"` is intentional for release (Android main manifest).

---

## 8. Google Play Console — Data safety checklist

Cross-check these categories against this audit before submission:

| Data type / practice | Likely relevant? | Why |
|----------------------|------------------|-----|
| App activity (in-app actions) | Yes | Analytics custom events + screen views |
| Crash logs | Yes | Crashlytics |
| Diagnostics | Yes | Crashlytics / Analytics |
| Device or other IDs | Yes | Advertising ID via AdMob (`AD_ID`) |
| Photos / videos | Collected? Typically **No** for upload; processed on-device for scan/logo — declare carefully (ephemeral / not shared) |
| Personal info from QR payloads | Stored **on device**; not confirmed uploaded — do **not** claim “no data collected” |
| Data encrypted in transit | Third-party SDKs use HTTPS; do not claim app-level encryption of local history |
| Data encrypted at rest (local) | **No** (plain SharedPreferences) |
| Users can request deletion | Partial: local clear only; no self-serve deletion of Google-side data |
| Data shared with third parties | Yes — Google (Ads, Analytics, Crashlytics) |
| Ads | Yes | Banner + interstitial |

---

## 9. Existing in-app policy — gap analysis

Source: `lib/features/settings/presentation/privacy_policy_screen.dart`

| Claim | Verdict |
|-------|---------|
| Offline-first | Partially accurate for core scan/generate; network used for Ads/Analytics/Crashlytics |
| History encrypted | **False** — plain JSON in SharedPreferences |
| Never uploaded / never tracked by us | **Misleading** — Firebase Analytics tracks events; Crashlytics and Ads also transmit data |
| Camera/gallery not sent over internet | Supported for app code paths inspected |
| External links not tracked by the app | Supported for app code; OS browser may have its own tracking |
| Clear history from Settings | Supported |

About screen (`about_screen.dart`) repeats “securely encrypted” / “zero cloud tracking” — also unsupported.

Tests in `test/about_and_legal_test.dart` currently **assert AdMob is absent** from the in-app Privacy Policy UI. The public website policy **must** disclose ads and analytics for accuracy; the Flutter in-app copy should be updated in a separate app change.

---

## 10. Branding references for the website

From `lib/core/theme/app_colors.dart` (dark mode primary brand):

- Background `#07111F`, Surface `#0D1B2A`, Primary `#2F8BFF` / `#1677FF`, Secondary `#7C68EE`
- Typography: Inter (bundled in `assets/fonts/`)
- Assets: `assets/images/app_icon.png`, `assets/images/iown_qr_scanner_wordmark.png`
- App name: `iOwn Qr & Barcode Scanner` (`AppConstants.appName`)
