# Portfolio audit validation

This record separates automated browser checks from physical-device and participant reviews. Actual visitor sessions and physical-phone results remain pending until their findings are recorded.

## Thirty-second comprehension check — pending

Review URL: https://nazmus-saqib.github.io/Portfolio/

Recruit three people unfamiliar with Saqib's work. Do not coach them or explain the interface. Ask each person to open the published homepage on their usual device, spend 30 seconds reviewing it, and then answer:

1. What role does this person perform or seek?
2. What is the strongest professional example you noticed?
3. Where would you find the résumé and contact information?

Record the participant's device, exact answers, actions and any difficulty locating those items. Do not collect unnecessary personal information. Check whether they identify project coordination, notice a supported current-work example, and locate résumé/contact actions without help. Revise unclear content, then repeat with new participants if needed.

No participant sessions have been conducted or claimed as part of the implementation. Automated tests and agent reviews do not count as participants.

## Evidence boundaries

- The owner-approved résumé supports the conference amount, venue, eight vendors, three-week period, onsite involvement and help resolving an incorrect item without delaying the conference. The website uses the broader item wording requested by the owner.
- Supplier and change coordination examples describe recurring responsibilities. They do not claim separate invented projects or measured savings.
- Planning templates explain the documented workflow. They are not confidential client records or historical project logs.
- A LinkedIn link is not included. Any future professional-profile link should be active and confirmed by the owner.
- The existing résumé PDF is retained unchanged; public contact information matches its primary email.

## Release checks

Verify the final build and public deployment for desktop/mobile layout, visible résumé access, email links, direct case URLs, keyboard navigation, reading mode, reduced motion, non-WebGL behavior and JavaScript-disabled professional content. Confirm canonical/social metadata and the published social-preview image. Record measured lab conditions alongside any performance results; do not turn a local synthetic check into a claim about every visitor's experience.


## Current audit refinement — browser checks verified

The current refinement applies the industry-neutral opening summary, six-employer journey beginning with Synesis IT, Current Project Work as the default project filter, separate case-study and recurring-example groups, a roughly 50/50 desktop layout and a clearer Focus on Content action. The conference remains the only documented specific current-work project. Additional project case studies require a distinct real brief, personal actions and a supported result; another example has not been invented to increase the count.

The conference's public copy now says “helped resolve an incorrect item without delaying the conference.” The approved résumé PDF is retained unchanged. Tool lists and earlier technical-work descriptions should be checked against the existing résumé and project evidence.

The earlier release results below are a historical record. This six-employer release has its own checks: all 31 browser regressions passed, followed by 12 affected-flow rechecks after the final label fixes; 25 axe scans cover 23 distinct views with zero confirmed violations. 56 desktop/mobile-emulation and no-JavaScript checks passed. These runs use the production build on the local preview, not a physical phone or a human participant study.

### Published-device review

| Review | Status | What to check |
|---|---|---|
| Local desktop Chromium | Passed | Verified 50/50 layout, six employers, current-work grouping, tools, focus mode and case links. |
| Published desktop browser | Pending live-host access | Read the opening summary; use Focus on Content; find current work, résumé and contact; open and refresh a case-study URL. |
| Physical phone | Pending owner/reviewer session | Check readable text, touch targets, scrolling, both preview cards, the optional 3D journey, résumé download and contact links. |

Record the actual device, browser, date, result and any issue before marking either review complete.

### Participant results

| Participant | Device | Target role identified | Strongest example recalled | Résumé/contact found | Observations |
|---|---|---|---|---|---|
| P1 | Pending | Pending | Pending | Pending | No session recorded |
| P2 | Pending | Pending | Pending | Pending | No session recorded |
| P3 | Pending | Pending | Pending | Pending | No session recorded |

Use the 30-second protocol above. Record the participants' actual words and actions; a prepared table is not a completed study.

## Previous release validation — 14 November 2026

- Built the production site with its `/Portfolio/` base path using the pinned dependencies.
- Ran the complete 31-test Playwright suite and reran affected flows after correcting navigation and heading selectors. Every distinct test has a passing result. Coverage includes desktop and narrow phones, the centre/character controls, all employer chapters, original project evidence, direct case links and history, clipboard fallback, readable résumé access, reading mode, mobile scene deferral, templates, no WebGL and JavaScript-disabled HTML.
- Ran 22 axe scans covering 20 distinct desktop/mobile views, including all 12 case dialogs with disclosures open. The final results contain zero confirmed violations. Keyboard checks and specific solid-palette contrast calculations supplement the scans; image/canvas contrast still requires contextual manual judgment. This is not a claim of complete WCAG or screen-reader certification.
- Retained the approved résumé unchanged: SHA-256 `7394bf3fc0998450267e41e5d52fa12a27d4bb7c4610caaae381b87c401ff8a5`.
- Captured desktop, emulated-phone and case-study screenshots. Added the actual 1200×630 portfolio screenshot for social sharing.
- Confirmed the 129-file deployment artifact contains neither uploaded audit documents nor the retired résumé filename. The unwanted generic creation caption is absent from the built scripts.

### Measured mobile lab performance

Lighthouse 13.6.0, local production preview, simulated mobile throttling, headless Chromium with software rendering. These are synthetic local results, not measurements of real visitors or the published hosting network.

| Metric | Before mobile scene deferral | After deferral |
|---|---:|---:|
| First contentful paint | 1.4 s | 1.3 s |
| Largest contentful paint | 1.7 s | 1.6 s |
| Total blocking time | 1,400 ms | 0 ms |
| Cumulative layout shift | 0 | 0 |
| Lighthouse performance score | 74 | 100 |

The mobile scene now loads when requested. Desktop retains the interactive world, and hidden scenes pause. The full Lighthouse and accessibility reports remain outside the public deployment.

### Remaining external checks

The three-person comprehension study above requires real participants. A physical-phone review is also outstanding; mobile viewport emulation does not complete it. Public-host verification must follow deployment and use an allowed connection to the published site.

## Later platform checks and copy-control removal

The subsequent [cross-browser/device-profile report](platform-validation.md) records the completed Chromium and native Firefox checks, the unavailable WebKit runtime, and the unchanged physical-device/participant boundaries. The copy-link control and its hidden fallback were removed from all case studies; browser-address URLs and history remain usable.
