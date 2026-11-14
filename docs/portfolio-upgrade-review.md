# Portfolio upgrade — owner review

14 November 2026. Reviewed upgrade based on source commit `ad046d2`.

Both supplied version 3.0 documents were read in full. The upgrade was prepared and tested locally for review, following their content scope and evidence limits. After receiving the review summary, the owner requested: “please update the site.” This authorizes committing and publishing the reviewed changes.

## What changed

| File | Change |
| --- | --- |
| `src/coordination-case-studies.js` | Added the multi-city event and invoice-investigation examples. Strengthened supplier comparison and refocused risk coordination on actual Trello-description notes and discussions when needed. Conference data remains unchanged. |
| `src/content.js` | Updated the homepage summary, Identify story and four contributions; ordered six Operations entries; retained the official title and employment dates. Updated the four existing skills cards. |
| `src/recruiter-view.js` | Added practical risk awareness inside the expandable work summary. The conference CTA remains prominent. |
| `src/profile-view.js` | Added a clearly personal AI-assisted learning example covering Codex, GitHub and review of outputs. |
| `src/main.js` | Default Operations filter; separate Documented Projects, How I Work and Role overview groups; data-driven counts. Fixed a queued dialog-close event that could steal focus from the next selected card. |
| `src/contribution-view.js` | Matched the four Identify contributions to useful, distinct takeaway labels. |
| `src/project-view.js`, `src/project-view.css` | Visible case-type badges and distinct, accessible diagrams for the two new examples. |
| `src/coordination-case-view.js` | Visible case types, recurring-method headings and clearly fictional template introductions. |
| `index.html` | Aligned the meaningful no-JavaScript overview with the updated copy and both new examples. |
| `tests/operations-upgrade.spec.js` and three existing test files | Added regressions for evidence limits, case types, new direct links, keyboard/history, risk illustrations and personal AI; updated counts and content assertions. |

## Local preview

Production preview: `http://localhost:4174/Portfolio/` while the preview server is running.

| Order | Preview query | Visible type |
| --- | --- | --- |
| 1 | `?project=conference` | Project example |
| 2 | [`?project=multi-city-event`](http://localhost:4174/Portfolio/?project=multi-city-event) | Project example |
| 3 | [`?project=invoice-investigation`](http://localhost:4174/Portfolio/?project=invoice-investigation) | Project example |
| 4 | `?project=supplier-coordination` | Recurring workflow |
| 5 | `?project=change-coordination` | Recurring workflow |
| 6 | `?project=identify` | Role overview |

The eight earlier digital projects remain available through Earlier digital work and All work. The total is 14 work stories, comprising three current project examples, two recurring workflows, one role overview and eight earlier digital projects.

Visual review: [desktop homepage](/workspace/portfolio-upgrade-review/home-desktop.png), [multi-city example](/workspace/portfolio-upgrade-review/multi-city-event-desktop.png), [invoice example on a narrow phone layout](/workspace/portfolio-upgrade-review/invoice-phone.png), [reconstructed risk template](/workspace/portfolio-upgrade-review/risk-template-desktop.png). These captures show the draft layout; the final build also restores the existing 20+ vendor count in the role overview.

## Validation

- Production build with `/Portfolio/` base: passed. The existing large 3D chunk warning remains; the world bundle is unchanged.
- Final Playwright suite: all 35 tests passed against the final production build (5.6 minutes). This includes all 14 direct links, both new cases, evidence boundaries, keyboard and history behavior, reduced motion, reading mode, dialog close/focus, mobile layouts, no-JavaScript/no-WebGL fallbacks, the 3D journey and retained UX evidence.
- Chromium visual and accessibility review: 18 scans across 1440px, 390px and 320px; no confirmed WCAG A/AA violations, page errors or page-level horizontal overflow. Screenshots inspected for the homepage, Operations, new cases and risk template.
- Actual Firefox ESR 140.15.0: 110 checks across desktop 1440×1000 and responsive 450×844, plus 32 targeted checks after the focus fix; all passed. Four accessibility scans found no confirmed violations.
- Conference data equality against the previous source version: passed. All 14 IDs are unique; Identify links match the requested six-entry order.
- Original UX assets and the approved résumé PDF are unchanged. The PDF SHA-256 remains `7394bf3fc0998450267e41e5d52fa12a27d4bb7c4610caaae381b87c401ff8a5`.
- Private input documents, source correspondence and original employer records were not added to public assets or the production build. Templates contain fictional placeholders.

Detailed local evidence is in `/tmp/portfolio-upgrade-qa/`. Responsive widths are browser-based checks, not physical phone tests. Safari/WebKit, real devices and the three-person recruiter review were not completed in this update. These automated scans do not establish full accessibility conformance.

## Evidence and publication items

- The owner requested publication after reviewing the anonymized examples and the publication requirements. No original employer records or private correspondence are included. The existing conference example’s factual content was preserved.
- New wording follows the owner-supplied content pack. Underlying private correspondence was not independently re-reviewed in this update.
- The multi-city result establishes supplier readiness for collection; final receipt and acceptance of every item are unconfirmed.
- The invoice result establishes administrative clarification that the jobs were distinct; payment recovery is unconfirmed. Accounting ownership stays with the administrator.
- Actual practice is relevant risk notes in Trello card descriptions and CEO/supplier discussions when needed. The structured Trello illustration is a proposed enhancement, visibly labelled reconstructed, and does not claim a historical standard template or formal risk system.
- No employer AI automation, measured productivity gains, new savings, universal on-time rates or additional negotiation case were added.
- LinkedIn remains omitted, as previously requested. Removed case-link copy controls and generic cover-creation captions remain absent.
- The supplied plan required explicit approval before committing or publishing. The owner subsequently requested the site update; publication proceeds on that authorization.
