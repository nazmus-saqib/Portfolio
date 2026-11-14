# Cross-browser and device-profile validation

Checked on 14 November 2026 against the production `/Portfolio/` build, including removal of the copy-link controls from every case study.

## Results

- Chromium 154.0.8037.57: 92 grouped checks passed across eight desktop, phone and tablet profiles; zero failures or skipped checks.
- Native Firefox ESR 140.15 with GeckoDriver: 118 checks passed; zero failures. Two Firefox accessibility scans reported zero confirmed violations.
- A separate headed Firefox session on a virtual desktop rendered WebGL 3D and verified company selection and centre return. Headless Firefox correctly used the supported reading fallback when graphics were unavailable.
- Five existing Playwright navigation regressions passed on the final build. These include all 12 case-study URLs, safe invalid URLs, refresh, history, modal closing, focus mode, mobile scene deferral and absence of all case-copy controls.

| Actual browser engine | Profile | Actual viewport | Result |
|---|---|---|---|
| Chromium | Desktop Chromium 1440×1000 | 1440 × 1000 | Passed |
| Chromium | Compact desktop Chromium 1024×800 | 1024 × 800 | Passed |
| Chromium | Small laptop Chromium 900×700 | 900 × 700 | Passed |
| Chromium | Pixel 7 touch profile in Chromium (Android emulation) | 412 × 839 | Passed |
| Chromium | iPhone 13 touch dimensions/UA in Chromium (not Safari) | 390 × 664 | Passed |
| Chromium | iPhone SE 320px touch profile in Chromium (not Safari) | 320 × 568 | Passed |
| Chromium | iPad Mini portrait touch profile in Chromium (not Safari) | 768 × 1024 | Passed |
| Chromium | iPad Mini landscape touch profile in Chromium (not Safari) | 1024 × 768 | Passed |
| Firefox ESR 140.15 | Linux responsive browser | 1440 × 1000 | Passed |
| Firefox ESR 140.15 | Linux responsive browser | 1024 × 768 | Passed |
| Firefox ESR 140.15 | Linux responsive browser | 450 × 844 | Passed |

The Chromium phone/tablet rows use Playwright device emulation. They are not physical Android/iOS devices or actual Safari installations. Firefox's requested 390px narrow window was constrained to 450px; the table records the actual viewport. All engines ran on Linux; no Windows/macOS hardware claim is made.

## What was checked

- Professional summary, visible résumé access, layout containment and label spacing.
- Both preview cards, keyboard/touch interactions and full expanded text.
- Current-work defaults, the documented project/recurring-example distinction and earlier-project filters.
- Tools inventory and Focus on content/Return to 3D behavior.
- All 12 project links, role-specific evidence and modal navigation, with no copy-link control or hidden copy fallback.
- All six employers, semantic workstation content, centre return and character movement when 3D was available.
- Actual PDF download events and the approved résumé's SHA-256; contact links and denied-clipboard email fallback.
- JavaScript-disabled content and supported no-WebGL behavior.

## Coverage boundary

WebKit application tests were **not run**. Official Playwright browser downloads were denied by the workspace's domain policy. An alternative official Debian WebKitGTK package setup was checksum-verified, but its native driver could not start under the supported user-space runtime. Browser protection and artifact verification were retained; no site failure is inferred from that setup limitation.

Physical devices and real human participants tested: 0. This automated matrix does not complete the separate three-person, 30-second comprehension study in [the review sheet](audit-validation.md).

Tests used the exact production files staged for GitHub Pages, served locally at their deployment base path. The restricted workspace could not fetch the public hosting domain directly. GitHub Pages deployment status is verified separately before reporting publication.

Raw browser reports and screenshots are retained outside the public site under `/tmp/platform-qa-plan/chromium-final-results`, `/tmp/firefox-qa/final-results`, `/tmp/firefox-qa/headed-probe` and `/tmp/platform-webkit-qa` in the working environment. No raw source documents or browser-package files enter the deployment.
