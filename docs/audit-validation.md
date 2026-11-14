# Portfolio audit validation

The audit's implementation checklist is supported by repository and browser checks. Those checks do not replace a study with actual visitors or establish a screen-reader or real-world performance result.

## Thirty-second comprehension check — pending

Recruit three people unfamiliar with Saqib's work. Do not coach them or explain the interface. Ask each person to open the published homepage on their usual device, spend 30 seconds reviewing it, and then answer:

1. What role does this person perform or seek?
2. What is the strongest professional example you noticed?
3. Where would you find the résumé and contact information?

Record the participant's device, exact answers, actions and any difficulty locating those items. Do not collect unnecessary personal information. Check whether they identify project coordination, notice a supported current-work example, and locate résumé/contact actions without help. Revise unclear content, then repeat with new participants if needed.

No participant sessions have been conducted or claimed as part of the implementation. Automated tests and agent reviews do not count as participants.

## Evidence boundaries

- The owner-approved résumé supports the conference amount, venue, eight vendors, three-week period, onsite involvement and backdrop-frame issue resolved without delaying the event.
- Supplier and change coordination examples describe recurring responsibilities. They do not claim separate invented projects or measured savings.
- Planning templates explain the documented workflow. They are not confidential client records or historical project logs.
- A LinkedIn link should be added only when the owner supplies or confirms the actual profile URL.
- The existing résumé PDF is retained unchanged; public contact information matches its primary email.

## Release checks

Verify the final build and public deployment for desktop/mobile layout, visible résumé access, email links, direct case URLs, keyboard navigation, reading mode, reduced motion, non-WebGL behavior and JavaScript-disabled professional content. Confirm canonical/social metadata and the published social-preview image. Record measured lab conditions alongside any performance results; do not turn a local synthetic check into a claim about every visitor's experience.

## Verified implementation — 14 November 2026

- Built the production site with its `/Portfolio/` base path using the pinned dependencies.
- Ran the complete 31-test Playwright suite and reran affected flows after correcting navigation and heading selectors. Every distinct test has a passing result. Coverage includes desktop and narrow phones, the centre/character controls, all employer chapters, original project evidence, direct case links and history, clipboard fallback, readable résumé access, reading mode, mobile scene deferral, templates, no WebGL and JavaScript-disabled HTML.
- Ran 22 axe scans covering 20 distinct desktop/mobile views, including all 12 case dialogs with disclosures open. The final results contain zero confirmed violations. Keyboard checks and specific solid-palette contrast calculations supplement the scans; image/canvas contrast still requires contextual manual judgment. This is not a claim of complete WCAG or screen-reader certification.
- Retained the approved résumé unchanged: SHA-256 `7394bf3fc0998450267e41e5d52fa12a27d4bb7c4610caaae381b87c401ff8a5`.
- Captured desktop, phone and case-study screenshots. Added the actual 1200×630 portfolio screenshot for social sharing.
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

The three-person comprehension study above requires real participants. No LinkedIn URL was supplied or inferred. Public-host verification must follow deployment; the current running environment blocks that host until the saved deployment-check network domains are applied by publishing the environment draft.
