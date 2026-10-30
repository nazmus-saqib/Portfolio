// Project presentation only. Selection, focus management, and dialogs belong
// to the application shell so the entire portfolio stays in one viewport.
const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[character]));

const arrow = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" stroke-width="1.5"/></svg>';
const plus = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="1.5"/></svg>';
const isAcademic = project => /academic|centennial/i.test(`${project.category} ${project.company}`);
const resolveAsset = (path, options) => (options.assetUrl || (value => value))(path);

function illustration(project) {
  const open = '<svg class="case-illustration" viewBox="0 0 640 280" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">';
  if (project.id === 'identify') {
    return `${open}
      <rect width="640" height="280" rx="12" fill="#dfe8d4"/>
      <text x="30" y="39" fill="#304d36" font-family="sans-serif" font-size="21" font-weight="500">Identify BDA</text>
      <text x="610" y="36" text-anchor="end" fill="#647c52" font-family="sans-serif" font-size="7" letter-spacing="1.3">FROM REQUEST TO DELIVERY</text>
      <path d="M100 144H540" fill="none" stroke="#a5b98f" stroke-width="1.5" stroke-dasharray="4 6"/>
      ${[['Understand', '◎', 55, 93], ['Source', '⌕', 190, 117], ['Coordinate', '↔', 325, 93], ['Deliver', '✓', 460, 117]].map(([label, symbol, x, y], index) => `
        <rect x="${x + 5}" y="${y + 6}" width="112" height="102" rx="10" fill="#a7b993" opacity=".3"/>
        <rect x="${x}" y="${y}" width="112" height="102" rx="10" fill="${index === 3 ? '#3d5b3e' : '#f5f8ee'}" stroke="#b6c9a4"/>
        <text x="${x + 56}" y="${y + 42}" text-anchor="middle" fill="${index === 3 ? '#d6e8b6' : '#718c55'}" font-family="Arial,sans-serif" font-size="28">${symbol}</text>
        <text x="${x + 56}" y="${y + 77}" text-anchor="middle" fill="${index === 3 ? '#f0f6e8' : '#3c573b'}" font-family="sans-serif" font-size="10">${label}</text>`).join('')}
      <text x="30" y="251" fill="#61784f" font-family="sans-serif" font-size="10">People, plans, and every moving part.</text>
    </svg>`;
  }
  if (project.id === 'odin') {
    const boxes = (offset, row) => [0, 1, 2, 3].map(column => `<g transform="translate(${offset + column * 42} ${row})"><rect width="31" height="29" rx="2" fill="#c5a776"/><rect x="13" width="5" height="12" fill="#eadbb9"/></g>`).join('');
    return `${open}
      <rect width="640" height="280" rx="12" fill="#e5e8dd"/>
      <text x="30" y="39" fill="#354f42" font-family="sans-serif" font-size="25" font-weight="600" letter-spacing="1">ODIN</text>
      <text x="610" y="36" text-anchor="end" fill="#667d65" font-family="sans-serif" font-size="7" letter-spacing="1.2">WAREHOUSE &amp; FULFILLMENT</text>
      ${[100, 370].map(offset => `<g><rect x="${offset}" y="75" width="179" height="140" rx="5" fill="#d2dcca"/><path d="M${offset} 75v145m179-145v145M${offset} 117h179M${offset} 162h179M${offset} 207h179" fill="none" stroke="#3d5a4a" stroke-width="8"/>${[83,128,173].map(row => boxes(offset+10,row)).join('')}</g>`).join('')}
      <path d="M210 236h210" fill="none" stroke="#9cb386" stroke-width="2" stroke-dasharray="5 6"/>
      <g transform="translate(300 190) rotate(-8 20 20)"><rect width="44" height="44" rx="3" fill="#b99363"/><path d="M19 0v18h7V0" fill="#ead9b8"/><path d="m12 30 19-13m-13 0h13v13" fill="none" stroke="#f4ead4" stroke-width="2"/></g>
      <text x="30" y="260" fill="#647a5f" font-family="sans-serif" font-size="10">Where digital systems meet operational work.</text>
    </svg>`;
  }
  if (project.id === 'quantibly') {
    return `${open}
      <rect width="640" height="280" rx="12" fill="#e9e3ed"/>
      <text x="30" y="39" fill="#655176" font-family="sans-serif" font-size="24">quantibly</text>
      <text x="610" y="36" text-anchor="end" fill="#887392" font-family="sans-serif" font-size="7" letter-spacing="1.2">ORGANIZATION MANAGEMENT</text>
      <path d="M320 115v39M165 183v-29h310v29M320 154v29" fill="none" stroke="#b29dc2" stroke-width="1.5"/>
      <rect x="288" y="66" width="64" height="64" rx="15" fill="#71538c"/>
      <text x="320" y="111" text-anchor="middle" fill="#faf6fd" font-family="Georgia,serif" font-size="38">Q</text>
      ${[['People',105],['Projects',260],['Purpose',415]].map(([label,x])=>`<rect x="${x+4}" y="187" width="120" height="44" rx="9" fill="#d8cce3"/><rect x="${x}" y="183" width="120" height="44" rx="9" fill="#faf7fc" stroke="#cbbbd7"/><text x="${x+60}" y="210" text-anchor="middle" fill="#705a7f" font-family="sans-serif" font-size="11">${label}</text>`).join('')}
      <text x="30" y="260" fill="#877392" font-family="sans-serif" font-size="10">A clearer structure for the bigger picture.</text>
    </svg>`;
  }
  if (project.id === 'cozey') {
    return `${open}
      <rect width="640" height="280" rx="12" fill="#e9e2d7"/>
      <text x="30" y="39" fill="#71614a" font-family="sans-serif" font-size="25">cozey</text>
      <text x="610" y="36" text-anchor="end" fill="#8b7a62" font-family="sans-serif" font-size="7" letter-spacing="1.2">ACADEMIC REDESIGN PITCH</text>
      <ellipse cx="320" cy="229" rx="172" ry="11" fill="#d3ccbb"/>
      <g transform="translate(165 77)"><rect x="15" y="0" width="280" height="115" rx="28" fill="#a4a38a" stroke="#92967b"/><path d="M155 15v70" stroke="#8a8e72"/><rect x="20" y="74" width="270" height="69" rx="12" fill="#b1ad93" stroke="#95967a"/><path d="M155 79v55" stroke="#94977a"/><rect x="0" y="51" width="43" height="93" rx="15" fill="#999d80"/><rect x="267" y="51" width="43" height="93" rx="15" fill="#999d80"/><rect x="26" y="143" width="13" height="14" rx="2" fill="#7c735a"/><rect x="272" y="143" width="13" height="14" rx="2" fill="#7c735a"/><rect x="200" y="34" width="55" height="55" rx="10" fill="#d1b695" transform="rotate(14 227 61)"/></g>
      <text x="30" y="260" fill="#8a7960" font-family="sans-serif" font-size="10">Making room for a better shopping experience.</text>
    </svg>`;
  }
  return `${open}<rect width="640" height="280" rx="12" fill="#e1e8da"/><circle cx="320" cy="141" r="76" fill="none" stroke="#b7c9a5"/><circle cx="320" cy="141" r="105" fill="none" stroke="#c5d2b8"/><text x="320" y="140" text-anchor="middle" fill="#4a683e" font-family="Georgia,serif" font-style="italic" font-size="40">${escapeHtml(project.title)}</text><text x="320" y="167" text-anchor="middle" fill="#748865" font-family="sans-serif" font-size="10">An idea worth exploring.</text></svg>`;
}

function cover(project, options = {}) {
  const image = project.image
    ? `<img class="case-cover-image" src="${escapeHtml(resolveAsset(project.image, options))}" alt="${escapeHtml(project.title)} project preview" decoding="async">`
    : illustration(project);
  return `<div class="case-cover case-cover-${escapeHtml(project.id)}" style="--case-accent:${escapeHtml(project.accent || '#e3e9dd')}">${image}</div>`;
}

/** Compact project chooser for a scrollable panel inside the viewport shell. */
export function renderProjectCard(project, options = {}) {
  const thumbnail = project.image
    ? `<img src="${escapeHtml(resolveAsset(project.image, options))}" alt="" loading="lazy" decoding="async">`
    : illustration(project);
  return `<article class="case-card"><button class="case-open" type="button" data-project="${escapeHtml(project.id)}" aria-label="Read ${escapeHtml(project.title)} project story"><span class="case-thumb" aria-hidden="true" style="--case-accent:${escapeHtml(project.accent || '#e3e9dd')}">${thumbnail}</span><span class="case-card-copy"><span class="case-card-company">${escapeHtml(project.company)}</span><strong>${escapeHtml(project.title)}</strong><span class="case-card-summary">${escapeHtml(project.summary)}</span><span class="case-card-context">${escapeHtml(project.collaboration)}</span></span><span class="case-card-arrow">${arrow}</span></button></article>`;
}

/** Case-study markup; the shell supplies the accessible dialog and close button. */
export function renderProjectDetail(project, options = {}) {
  const context = project.id === 'identify' ? 'Current role' : isAcademic(project) ? 'Academic project' : 'Earlier digital work';
  return `<article class="case-detail">${cover(project, options)}<div class="case-body"><p class="case-eyebrow">${escapeHtml(project.company)} / ${escapeHtml(project.collaboration)}</p><h2 id="dialog-title">${escapeHtml(project.title)}</h2><p class="case-summary">${escapeHtml(project.summary)}</p><dl class="case-facts"><div><dt>Context</dt><dd>${context}</dd></div><div><dt>My contribution</dt><dd>${escapeHtml(project.role)}</dd></div></dl><section class="case-section"><h3>The challenge</h3><p>${escapeHtml(project.challenge)}</p></section><section class="case-section"><h3>The approach</h3><ul>${project.approach.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul></section><section class="case-section"><h3>The work in perspective</h3><p>${escapeHtml(project.outcome)}</p></section>${project.gallery?.length ? `<details class="case-prototype"><summary>Explore the prototype screens ${plus}</summary><div class="case-gallery project-gallery">${project.gallery.map(image => `<figure><img src="${escapeHtml(resolveAsset(image.src, options))}" alt="${escapeHtml(image.alt)}" loading="lazy" decoding="async"><figcaption>${escapeHtml(image.alt)}</figcaption></figure>`).join('')}</div></details>` : ''}${project.confidential ? '<p class="case-confidential">A high-level overview. Internal product details stay confidential.</p>' : ''}${!project.image ? '<p class="case-art-note">Cover illustration created for this portfolio.</p>' : ''}<ul class="case-tools" aria-label="Project tools and methods">${project.tools.map(tool => `<li>${escapeHtml(tool)}</li>`).join('')}</ul><button class="case-contact" type="button" data-contact>Let’s talk about the work ${arrow}</button></div></article>`;
}
