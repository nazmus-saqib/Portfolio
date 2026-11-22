# Content review — local validation

Review dated 20 November 2026. The validation below records the local version reviewed before publication.

## Publication approval — 21 November 2026

The owner approved pushing and deploying the reviewed content update and supplied a replacement résumé. The new PDF is used verbatim at the existing résumé download route; the landing page and all download-link markup remain unchanged. This approval supersedes the earlier résumé exclusion for the requested file replacement.

## Changes

The update is content-focused. The existing 3D website, fourteen projects, original project assets, company numbering, navigation, email chooser and overall styling are preserved.

- Management reporting: the Identify role now explains decision support and includes a five-field, clearly fictional status-update example.
- Supplier coordination: comparisons now cover stock, capability, timing, logistics and approval ownership, with anonymous supporting examples and an illustrative release checklist.
- Risk and change: the workflow distinguishes potential risks, active issues and open delivery status, with an artwork-readiness example and a suggested Trello-note format.
- Project controls: the conference case includes a reconstructed milestone/dependency/decision table, without claiming original schedule records or budget ownership.
- Outcomes: multi-city readiness and invoice clarification lead with the supported result; receipt/acceptance and payment-recovery limits remain visible.
- Role connection: one concise bridge connects Synesis requirements work, ODIN system-design collaboration and Dynamic Infotech field documentation, without claiming software rollout leadership.
- Skills, overview and Contact: clearer approval checks, management/finance handoffs and reporting context fit the existing components. All four career targets still come from the existing source of truth.

## Changed files

| File | Purpose |
| --- | --- |
| [src/content.js](../src/content.js) | Clarifies Identify responsibilities, the four skill groups, tool use, overview checks and the bounded ODIN/field-work descriptions. |
| [src/contribution-view.js](../src/contribution-view.js) | Aligns the four Identify contribution headings and takeaways with approvals, supplier decisions, risks and reporting. |
| [src/workflow-view.js](../src/workflow-view.js) | Makes required client approval a visible production-release gate while preserving the four stages. |
| [src/coordination-case-studies.js](../src/coordination-case-studies.js) | Enriches the five current-work cases with dependencies, anonymous examples, fictional templates and explicit outcome limits. |
| [src/coordination-case-view.js](../src/coordination-case-view.js) | Shows supporting examples and separate evidence-boundary notes without hiding case content. |
| [src/coordination-case-view.css](../src/coordination-case-view.css) | Adds matching styles for those visible examples and notes. |
| [src/career-context.js](../src/career-context.js) | Adds the clearly illustrative five-field management update and the short cross-career technical bridge. |
| [src/career-context.css](../src/career-context.css) | Keeps both new panels readable using the existing white/blue palette and responsive definition lists. |
| [src/main.js](../src/main.js) | Places the panels in Identify Journey and earlier digital work, and updates the first two Contact paragraphs. |
| [src/project-view.js](../src/project-view.js) | Renders the six recurring rework-prevention checks in the existing role overview. |
| [index.html](../index.html) | Aligns the no-JavaScript summaries with decision support, approval gates and technical handoffs. |
| [tests/full-content-audit.spec.js](../tests/full-content-audit.spec.js) | Adds three evidence, stable-ID and responsive keyboard-content regressions. |
| [tests/operations-upgrade.spec.js](../tests/operations-upgrade.spec.js) | Updates the existing risk-illustration heading expectation. |
| [tests/portfolio.spec.js](../tests/portfolio.spec.js) | Updates the existing Contact-copy expectation. |
| [public/Molla_Nazmus_Saqib_Project_Coordinator_Resume.pdf](../public/Molla_Nazmus_Saqib_Project_Coordinator_Resume.pdf) | Uses the owner’s 21 November replacement PDF verbatim at the existing public route. |
| [README.md](../README.md) | Documents the new module and the content-review scope. |
| [docs/content-review.md](../docs/content-review.md) | Records the local review changes, evidence limits and actual validation results. |

## Evidence controls

Existing client/supplier counts and conference figures remain owner-provided public-history figures, not independently audited achievements. Management reporting and meeting support are owner-reported responsibilities. The supplied audit package is the evidence source for the anonymous work examples; no private email account or original work correspondence was independently opened during this update.

All new templates/status examples are labelled illustrative, fictional, suggested or reconstructed. No new savings, performance KPI, full-budget authority, formal risk-register deployment, payment-recovery outcome or software go-live leadership is claimed. No private audit files or employer records are included in the site or preview package.

## Validation

- Production build: `npm run build -- --base=/Portfolio/` passed.
- Complete Playwright suite: **45 passed**, zero failed, skipped or flaky tests (6.6 minutes).
- Local Chromium accessibility/visual review: **24 views** at 1440px and 320px, zero detected axe WCAG A/AA violations, page-overflow findings or uncaught errors.
- Keyboard review: Journey and filters, table-region focus, case closing and email-chooser focus return passed.
- Portable preview: launcher syntax, exact build-file inclusion, HTTP 200, all 14 projects, management example and a project deep link passed in Chromium 154.0.8037.57.
- At the 20 November review, the existing 3D/global styles/project assets, résumé files and exact résumé-link markup were unchanged. The owner subsequently authorized the PDF replacement on 21 November; all existing links, the landing page and the other protected areas remain unchanged.

These are local browser/emulated-viewport checks, not physical-phone testing, a human-participant study or full accessibility certification. The existing world-bundle size warning remains non-blocking.



## Replacement résumé checks — 21 November 2026

The production build and four affected browser regressions passed after the PDF replacement. Actual downloads from the header, Profile, Contact and résumé landing page all matched the uploaded PDF byte for byte. Existing download paths and link markup were retained. The earlier 45-test suite and 24-view scan above apply to the reviewed content implementation; no application code changed for the PDF replacement.


## Desktop proportions — 21 November 2026

At the owner’s request, the desktop layout restores the panel widths used immediately before the 50/50 change: 560px by default, 620px on wide desktops, 470px on smaller desktops and 440px from 861–1000px. The animation takes the remaining width. The existing mobile layout and full-width Reading View are retained.


## Position labels — 21 November 2026

Workplace labels now show the recorded position title above the company, retaining the original company numbers. Journey and Reading View use the same job-title-first heading. Titles come from the existing career record; no employment dates, role descriptions or résumé content were changed. Label spacing keeps the centre About Me target available.


## Animation-label correction — 21 November 2026

The animation is restored to the earlier numbered company-only labels and placement. Position titles remain the main headings in Journey and Reading View, with company names and employment details underneath. The wider animation layout and current résumé are retained.

## Dynamic Infotech employment update — 21 November 2026

The owner confirmed the position as Field Technician, Level 1 (On-call), Jan 2023–Present. Both experience records now reflect the ongoing role, and Journey and Reading View calculate its current tenure. The UPS & Staples dates, animation labels and résumé file are unchanged.

## Latest résumé replacement — 21 November 2026

The owner supplied a newer two-page PDF (73,783 bytes), which replaces the previous résumé verbatim at the existing public route. Header, Profile, Contact and landing-page downloads and the View résumé link all returned bytes matching this attachment. The production build and existing Pages browser check passed. No website copy, link markup or application code changed.

## Dynamic Infotech heading — 22 November 2026

At the owner’s request, the position heading now reads Field Technician, Level 1. On-call remains in the employment-type details; Jan 2023–Present and the latest résumé are unchanged.
