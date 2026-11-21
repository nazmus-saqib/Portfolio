// Project presentation only. Selection, focus management, and dialogs belong
// to the application shell so the entire portfolio stays in one viewport.
import { renderCoordinationCase } from './coordination-case-view.js';
import { renderProjectTools } from './project-tools.js';
import './coordination-case-view.css';
import { renderStudySection, renderStudyPictures, renderStudyPortals } from './case-study-sections.js';
const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[character]));

const arrow = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" stroke-width="1.5"/></svg>';
const projectKind = project => project.coordinationCaseStudy?.kind || (project.id === 'identify' ? 'Role overview' : 'Project case study');
const isAcademic = project => /academic|centennial/i.test(`${project.category} ${project.company}`);
const resolveAsset = (path, options) => (options.assetUrl || (value => value))(path);

function renderPrototypeLink(link) {
  if (!link?.url) return '';
  let url;
  try { url = new URL(link.url); } catch { return ''; }
  if (url.protocol !== 'https:' || url.username || url.password) return '';
  return `<aside class="case-prototype-entry" aria-label="Interactive prototype"><a class="case-prototype-launch" href="${escapeHtml(url.href)}" target="_blank" rel="noopener noreferrer"><span>${escapeHtml(link.label || 'Open Figma prototype')}</span>${arrow}<span class="case-prototype-new-tab">Opens in a new tab</span></a>${link.description ? `<div class="case-prototype-description">${paragraphs(link.description)}</div>` : ''}</aside>`;
}

function illustration(project) {
  const open = '<svg class="case-illustration" viewBox="0 0 640 280" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">';
  if (project.id === 'multi-city-event') {
    const accessibleOpen = open.replace('aria-hidden="true"', 'role="img" aria-label="Two location workstreams share approvals and production instructions; supplier readiness is checked separately from final receipt."');
    return `${accessibleOpen}<rect width="640" height="280" rx="12" fill="#EAF6FD"/>
      <text x="32" y="43" fill="#173A55" font-family="sans-serif" font-size="21">Two locations. Clear handoffs.</text>
      <rect x="230" y="64" width="180" height="44" rx="9" fill="#1072AE"/><text x="320" y="91" text-anchor="middle" fill="#FFFFFF" font-family="sans-serif" font-size="16">Approved instructions</text>
      <path d="M320 108v19H166v18m154-18h154v18" fill="none" stroke="#1072AE" stroke-width="2"/>
      ${[['Location A',64],['Location B',372]].map(([label,x])=>`<rect x="${x}" y="145" width="204" height="78" rx="10" fill="#FFFFFF" stroke="#D2E6F2"/><text x="${x+20}" y="174" fill="#173A55" font-family="sans-serif" font-size="18">${label}</text><text x="${x+20}" y="200" fill="#526E82" font-family="sans-serif" font-size="14">Check supplier readiness</text>`).join('')}
      <text x="32" y="254" fill="#526E82" font-family="sans-serif" font-size="13">Ready for collection and final receipt are separate checkpoints.</text></svg>`;
  }
  if (project.id === 'invoice-investigation') {
    const accessibleOpen = open.replace('aria-hidden="true"', 'role="img" aria-label="Compare order dates, scope and quantities with invoice details, then clarify the findings with the administrator."');
    return `${accessibleOpen}<rect width="640" height="280" rx="12" fill="#EAF6FD"/>
      <text x="32" y="43" fill="#173A55" font-family="sans-serif" font-size="21">Match each invoice to its order.</text>
      ${[['Order details',42],['Invoice details',364]].map(([label,x])=>`<rect x="${x}" y="70" width="234" height="130" rx="10" fill="#FFFFFF" stroke="#D2E6F2"/><text x="${x+18}" y="100" fill="#173A55" font-family="sans-serif" font-size="18">${label}</text>${['Date','Scope','Quantity'].map((field,i)=>`<text x="${x+18}" y="${127+i*25}" fill="#526E82" font-family="sans-serif" font-size="14">${field}</text><path d="M${x+100} ${122+i*25}h112" stroke="#D2E6F2" stroke-width="3"/>`).join('')}`).join('')}
      <path d="M285 135h70m-9-7 9 7-9 7m-52-14-9 7 9 7" fill="none" stroke="#1072AE" stroke-width="2"/>
      <rect x="164" y="220" width="312" height="38" rx="9" fill="#1072AE"/><text x="320" y="245" text-anchor="middle" fill="#FFFFFF" font-family="sans-serif" font-size="16">Clarify findings with the administrator</text></svg>`;
  }
  if (project.coordinationCaseStudy) {
    const labels = project.id === 'conference' ? ['8 vendors', '3 weeks', 'Event setup'] : project.id === 'supplier-coordination' ? ['Compare', 'Approve', 'Coordinate'] : ['Assess', 'Agree', 'Follow up'];
    const title = project.id === 'conference' ? 'A fixed date. Many moving parts.' : project.id === 'supplier-coordination' ? 'Turn options into an agreed plan.' : 'Keep the next step clear.';
    return `${open}<rect width="640" height="280" rx="12" fill="#EAF6FD"/><text x="32" y="48" fill="#173A55" font-family="sans-serif" font-size="21">${title}</text><path d="M95 150H545" stroke="#1072AE" stroke-width="2" stroke-dasharray="5 6"/>${labels.map((label,index)=>`<g transform="translate(${32+index*196} 96)"><rect width="176" height="108" rx="12" fill="${index===2?'#1072AE':'#FFFFFF'}" stroke="#D2E6F2"/><text x="18" y="34" fill="${index===2?'#FFFFFF':'#1072AE'}" font-family="sans-serif" font-size="13">0${index+1}</text><text x="18" y="76" fill="${index===2?'#FFFFFF':'#173A55'}" font-family="sans-serif" font-size="18">${label}</text></g>`).join('')}<text x="32" y="250" fill="#526E82" font-family="sans-serif" font-size="12">Identify BDA · Project coordination</text></svg>`;
  }
  if (project.id === 'identify') {
    return `${open}
      <rect width="640" height="280" rx="12" fill="#F2F9FE"/>
      <text x="30" y="39" fill="#173A55" font-family="sans-serif" font-size="21" font-weight="500">Identify BDA</text>
      <text x="610" y="36" text-anchor="end" fill="#0D6296" font-family="sans-serif" font-size="7" letter-spacing="1.3">FROM REQUEST TO DELIVERY</text>
      <path d="M100 144H540" fill="none" stroke="#E5C79E" stroke-width="1.5" stroke-dasharray="4 6"/>
      ${[['Understand', '◎', 55, 93], ['Design &amp; source', '⌕', 190, 117], ['Coordinate', '↔', 325, 93], ['Deliver', '✓', 460, 117]].map(([label, symbol, x, y], index) => `
        <rect x="${x + 5}" y="${y + 6}" width="112" height="102" rx="10" fill="#E5C79E" opacity=".3"/>
        <rect x="${x}" y="${y}" width="112" height="102" rx="10" fill="${index === 3 ? '#173A55' : '#FFFFFF'}" stroke="#D2E6F2"/>
        <text x="${x + 56}" y="${y + 42}" text-anchor="middle" fill="${index === 3 ? '#D2E6F2' : '#1072AE'}" font-family="Arial,sans-serif" font-size="28">${symbol}</text>
        <text x="${x + 56}" y="${y + 77}" text-anchor="middle" fill="${index === 3 ? '#F2F9FE' : '#173A55'}" font-family="sans-serif" font-size="10">${label}</text>`).join('')}
      <text x="30" y="251" fill="#0D6296" font-family="sans-serif" font-size="10">Artwork reviews, when needed, run alongside vendor sourcing.</text>
    </svg>`;
  }
  if (project.id === 'odin') {
    const boxes = (offset, row) => [0, 1, 2, 3].map(column => `<g transform="translate(${offset + column * 42} ${row})"><rect width="31" height="29" rx="2" fill="#E5C79E"/><rect x="13" width="5" height="12" fill="#F2F9FE"/></g>`).join('');
    return `${open}
      <rect width="640" height="280" rx="12" fill="#F2F9FE"/>
      <text x="30" y="39" fill="#173A55" font-family="sans-serif" font-size="25" font-weight="600" letter-spacing="1">ODIN</text>
      <text x="610" y="36" text-anchor="end" fill="#0D6296" font-family="sans-serif" font-size="7" letter-spacing="1.2">WAREHOUSE &amp; FULFILLMENT</text>
      ${[100, 370].map(offset => `<g><rect x="${offset}" y="75" width="179" height="140" rx="5" fill="#D2E6F2"/><path d="M${offset} 75v145m179-145v145M${offset} 117h179M${offset} 162h179M${offset} 207h179" fill="none" stroke="#173A55" stroke-width="8"/>${[83,128,173].map(row => boxes(offset+10,row)).join('')}</g>`).join('')}
      <path d="M210 236h210" fill="none" stroke="#E5C79E" stroke-width="2" stroke-dasharray="5 6"/>
      <g transform="translate(300 190) rotate(-8 20 20)"><rect width="44" height="44" rx="3" fill="#E5C79E"/><path d="M19 0v18h7V0" fill="#F2F9FE"/><path d="m12 30 19-13m-13 0h13v13" fill="none" stroke="#F2F9FE" stroke-width="2"/></g>
      <text x="30" y="260" fill="#0D6296" font-family="sans-serif" font-size="10">Where digital systems meet operational work.</text>
    </svg>`;
  }
  if (project.id === 'quantibly') {
    return `${open}
      <rect width="640" height="280" rx="12" fill="#F2F9FE"/>
      <text x="30" y="39" fill="#0D6296" font-family="sans-serif" font-size="24">quantibly</text>
      <text x="610" y="36" text-anchor="end" fill="#526E82" font-family="sans-serif" font-size="7" letter-spacing="1.2">ORGANIZATION MANAGEMENT</text>
      <path d="M320 115v39M165 183v-29h310v29M320 154v29" fill="none" stroke="#E5C79E" stroke-width="1.5"/>
      <rect x="288" y="66" width="64" height="64" rx="15" fill="#1072AE"/>
      <text x="320" y="111" text-anchor="middle" fill="#FFFFFF" font-family="Georgia,serif" font-size="38">Q</text>
      ${[['People',105],['Projects',260],['Purpose',415]].map(([label,x])=>`<rect x="${x+4}" y="187" width="120" height="44" rx="9" fill="#F2F9FE"/><rect x="${x}" y="183" width="120" height="44" rx="9" fill="#FFFFFF" stroke="#D2E6F2"/><text x="${x+60}" y="210" text-anchor="middle" fill="#526E82" font-family="sans-serif" font-size="11">${label}</text>`).join('')}
      <text x="30" y="260" fill="#526E82" font-family="sans-serif" font-size="10">A clearer structure for the bigger picture.</text>
    </svg>`;
  }
  if (project.id === 'cozey') {
    return `${open}
      <rect width="640" height="280" rx="12" fill="#F2F9FE"/>
      <text x="30" y="39" fill="#0D6296" font-family="sans-serif" font-size="25">cozey</text>
      <text x="610" y="36" text-anchor="end" fill="#526E82" font-family="sans-serif" font-size="7" letter-spacing="1.2">ACADEMIC REDESIGN PITCH</text>
      <ellipse cx="320" cy="229" rx="172" ry="11" fill="#D2E6F2"/>
      <g transform="translate(165 77)"><rect x="15" y="0" width="280" height="115" rx="28" fill="#E5C79E" stroke="#1072AE"/><path d="M155 15v70" stroke="#1072AE"/><rect x="20" y="74" width="270" height="69" rx="12" fill="#E5C79E" stroke="#1072AE"/><path d="M155 79v55" stroke="#1072AE"/><rect x="0" y="51" width="43" height="93" rx="15" fill="#E5C79E"/><rect x="267" y="51" width="43" height="93" rx="15" fill="#E5C79E"/><rect x="26" y="143" width="13" height="14" rx="2" fill="#1072AE"/><rect x="272" y="143" width="13" height="14" rx="2" fill="#1072AE"/><rect x="200" y="34" width="55" height="55" rx="10" fill="#D2E6F2" transform="rotate(14 227 61)"/></g>
      <text x="30" y="260" fill="#526E82" font-family="sans-serif" font-size="10">Making room for a better shopping experience.</text>
    </svg>`;
  }
  return `${open}<rect width="640" height="280" rx="12" fill="#F2F9FE"/><circle cx="320" cy="141" r="76" fill="none" stroke="#D2E6F2"/><circle cx="320" cy="141" r="105" fill="none" stroke="#D2E6F2"/><text x="320" y="140" text-anchor="middle" fill="#0D6296" font-family="Georgia,serif" font-style="italic" font-size="40">${escapeHtml(project.title)}</text><text x="320" y="167" text-anchor="middle" fill="#526E82" font-family="sans-serif" font-size="10">An idea worth exploring.</text></svg>`;
}

function cover(project, options = {}) {
  const image = project.image
    ? `<img class="case-cover-image" src="${escapeHtml(resolveAsset(project.image, options))}" alt="${escapeHtml(project.title)} project preview" decoding="async">`
    : illustration(project);
  return `<div class="case-cover case-cover-${escapeHtml(project.id)}" style="--case-accent:${escapeHtml(project.accent || '#EAF6FD')}">${image}</div>`;
}

/** Compact project chooser for a scrollable panel inside the viewport shell. */
export function renderProjectCard(project, options = {}) {
  const thumbnail = project.image
    ? `<img src="${escapeHtml(resolveAsset(project.image, options))}" alt="" loading="lazy" decoding="async">`
    : illustration(project);
  return `<article class="case-card"><button class="case-open" type="button" data-project="${escapeHtml(project.id)}"><span class="case-thumb" aria-hidden="true" style="--case-accent:${escapeHtml(project.accent || '#EAF6FD')}">${thumbnail}</span><span class="case-card-copy"><span class="case-card-company">${escapeHtml(project.company)}</span><span class="case-card-kind">${escapeHtml(projectKind(project))}</span><strong>${escapeHtml(project.title)}</strong><span class="case-card-summary">${escapeHtml(project.summary)}</span><span class="case-card-context">${escapeHtml(project.collaboration)}</span></span><span class="case-card-arrow">${arrow}</span></button></article>`;
}

const paragraphs = value => (Array.isArray(value) ? value : value ? [value] : [])
  .map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join('');

function renderCaseStudy(project, options) {
  const study = project.richCaseStudy;
  const studyOptions = { projectId: project.id, assetUrl: path => resolveAsset(path, options) };
  const sectionId = suffix => `case-${project.id}-${suffix}`;
  const facts = study.facts?.length ? study.facts : [
    { label: 'Context', value: isAcademic(project) ? 'Academic project' : 'Earlier digital work' },
    { label: 'My contribution', value: project.role },
  ];
  const showcase = study.showcase?.length ? study.showcase : (project.gallery || []).map(image => ({
    image: image.src, alt: image.alt, caption: image.alt,
  }));
  const showcasePortals = study.showcasePortals?.filter(portal => portal?.pictures?.some(picture => picture?.image)) || [];
  const prototypeLink = renderPrototypeLink(study.prototypeLink);
  const hasShowcase = showcasePortals.length || showcase.length || Boolean(prototypeLink);
  const navigation = [
    study.personas?.length && { id: 'personas', label: 'Personas' },
    study.process?.length && { id: 'process', label: 'Design thinking' },
    study.challenges?.some(item => item.pictures?.length) && { id: 'challenges', label: 'Design solutions' },
    study.registrationJourneys && { id: 'registrationJourneys', label: 'Registration journeys' },
    study.sketches && { id: 'sketches', label: 'Sketches' },
    hasShowcase && { id: 'showcase', label: 'Explore the prototype screens' },
    study.evaluation?.type === 'documented' && { id: 'evaluation', label: 'Testing and learnings' },
    study.requirements?.length && { id: 'requirements', label: 'Requirements and evidence' },
  ].filter(Boolean);
  const contribution = typeof study.contribution === 'string'
    ? { paragraphs: [study.contribution] } : study.contribution;

  return `<article class="case-detail case-study-detail">${cover(project, options)}
    <header class="case-study-intro">
      <div class="case-study-topline"><p class="case-eyebrow">${escapeHtml(project.company)} / ${escapeHtml(project.collaboration)}</p>${project.year ? `<span class="case-study-year">${escapeHtml(project.year)}</span>` : ''}</div>
      <p class="case-study-label">Project case study</p>
      <h2 id="dialog-title">${escapeHtml(project.title)}</h2>
      <div class="case-study-lead">${paragraphs(study.lead || project.summary)}</div>
      ${renderProjectTools(project)}
      <dl class="case-study-facts">${facts.map(fact => `<div><dt>${escapeHtml(fact.label)}</dt><dd>${escapeHtml(fact.value)}</dd></div>`).join('')}</dl>
      ${navigation.length ? `<nav class="case-study-navigation" aria-label="${escapeHtml(project.title)} case study">${navigation.map(item => `<a data-case-nav href="#${escapeHtml(sectionId(item.id))}"><span>${escapeHtml(item.label)}</span><span aria-hidden="true">↓</span></a>`).join('')}</nav>` : ''}
    </header>
    <div class="case-body case-study-body">
      <section class="case-study-section case-study-brief">
        <p class="case-study-label">The brief</p><h3>${escapeHtml(study.context?.heading || 'The problem and my role')}</h3>
        <div class="case-study-prose">${paragraphs(study.context?.body)}</div>
        ${contribution?.items?.length ? `<div class="case-brief-contribution"><h4>My contribution</h4><ul class="case-contribution-list">${contribution.items.map(item=>`<li>${escapeHtml(item)}</li>`).join('')}</ul></div>` : ''}
      </section>
      ${renderStudySection(study, 'personas', studyOptions)}
      ${renderStudySection(study, 'process', studyOptions)}
      ${renderStudySection(study, 'challenges', studyOptions)}
      ${renderStudySection(study, 'registrationJourneys', studyOptions)}
      ${renderStudySection(study, 'sketches', studyOptions)}
      ${renderStudySection(study, 'inspiration', studyOptions)}
      ${study.storyboard?.length ? `<section class="case-study-section" id="${escapeHtml(sectionId('storyboard'))}" aria-labelledby="${escapeHtml(sectionId('storyboard-heading'))}"><div class="case-study-section-heading"><span class="case-study-section-number" aria-hidden="true">01</span><div><p class="case-study-label">Prototype walkthrough</p><h3 id="${escapeHtml(sectionId('storyboard-heading'))}">How the work connects</h3></div></div><div class="case-study-prose case-storyboard-note">${paragraphs(study.storyboardIntro || 'This sequence follows the tasks represented in the designs.')}</div><ol class="case-storyboard">${study.storyboard.map((step, index) => `<li><span class="case-story-number" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>${step.actor ? `<p class="case-story-actor">${escapeHtml(step.actor)}</p>` : ''}<h4>${escapeHtml(step.title)}</h4><p class="case-story-description">${escapeHtml(step.description)}</p></li>`).join('')}</ol></section>` : ''}
      ${hasShowcase ? `<section class="case-study-section case-study-showcase" id="${escapeHtml(sectionId('showcase'))}" aria-labelledby="${escapeHtml(sectionId('showcase-heading'))}"><p class="case-study-label">The prototype</p><h3 id="${escapeHtml(sectionId('showcase-heading'))}">${escapeHtml(study.sectionTitles?.showcase || 'Prototype screens')}</h3>${study.showcaseNote ? `<div class="case-study-prose case-showcase-note">${paragraphs(study.showcaseNote)}</div>` : ''}${prototypeLink}<div class="project-gallery">${showcasePortals.length ? renderStudyPortals(showcasePortals,path=>resolveAsset(path,options),project.id) : renderStudyPictures(showcase,path=>resolveAsset(path,options),'Prototype screens')}</div></section>` : ''}
      <div class="case-study-evidence"><p class="case-evidence-intro">Supporting research, structure, and source material.</p>${['needs','requirements','research','sitemap','planningArtifacts','wireframe','evaluation','competitive','productDetails'].map(key=>renderStudySection(study,key,studyOptions)).join('')}</div>
      ${study.outcome ? `<section class="case-study-section case-study-outcome"><p class="case-study-label">The work in perspective</p><h3>${escapeHtml(study.outcome.heading || 'Where the work reached')}</h3><div class="case-study-prose">${paragraphs(study.outcome.body)}</div></section>` : ''}
      ${study.reflection ? `<section class="case-study-section case-study-reflection"><span class="case-reflection-symbol" aria-hidden="true">↗</span><div><p class="case-study-label">What I carry forward</p><div class="case-study-prose">${paragraphs(study.reflection)}</div></div></section>` : ''}
      ${project.confidential ? '<p class="case-confidential">A high-level overview. Internal product details stay confidential.</p>' : ''}
      <button class="case-contact" type="button" data-contact>Let’s talk about the work ${arrow}</button>
    </div>
  </article>`;
}

/** Case-study markup; the shell supplies the accessible dialog and close button. */
function renderWorkingControls(project) {
  const controls = project.workingControls;
  if (!controls?.items?.length) return '';
  return `<section class="case-section" data-working-controls><h3>${escapeHtml(controls.heading)}</h3><p>${escapeHtml(controls.note)}</p><ul>${controls.items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul></section>`;
}

export function renderProjectDetail(project, options = {}) {
  if (project.coordinationCaseStudy) return renderCoordinationCase(project, { ...options, coverHtml: cover(project, options) });
  if (project.richCaseStudy) return renderCaseStudy(project, options);
  const context = project.id === 'identify' ? 'Current role' : isAcademic(project) ? 'Academic project' : 'Earlier digital work';
  return `<article class="case-detail">${cover(project, options)}<div class="case-body"><p class="case-eyebrow">${escapeHtml(project.company)} / ${escapeHtml(project.collaboration)}</p><p class="case-study-label">${escapeHtml(projectKind(project))}</p><h2 id="dialog-title">${escapeHtml(project.title)}</h2><p class="case-summary">${escapeHtml(project.summary)}</p>${renderProjectTools(project)}<dl class="case-facts"><div><dt>Context</dt><dd>${context}</dd></div><div><dt>My contribution</dt><dd>${escapeHtml(project.role)}</dd></div></dl><section class="case-section"><h3>The challenge</h3><p>${escapeHtml(project.challenge)}</p></section><section class="case-section"><h3>The approach</h3><ul>${project.approach.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul></section>${renderWorkingControls(project)}<section class="case-section"><h3>The work in perspective</h3><p>${escapeHtml(project.outcome)}</p></section>${project.gallery?.length ? `<section class="case-prototype"><h3>Prototype screens</h3><div class="case-gallery project-gallery">${project.gallery.map(image => `<figure><img src="${escapeHtml(resolveAsset(image.src, options))}" alt="${escapeHtml(image.alt)}" loading="lazy" decoding="async"><figcaption>${escapeHtml(image.alt)}</figcaption></figure>`).join('')}</div></section>` : ''}${project.confidential ? '<p class="case-confidential">A high-level overview. Internal product details stay confidential.</p>' : ''}<button class="case-contact" type="button" data-contact>Let’s talk about the work ${arrow}</button></div></article>`;
}
