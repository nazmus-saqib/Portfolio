// Portfolio explanations of archived work. Reconstructed diagrams are explicitly
// labelled and never presented as original research or historical sketch files.
const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[character]));
const paragraphs = value => (Array.isArray(value) ? value : value ? [value] : [])
  .map(text => `<p>${escapeHtml(text)}</p>`).join('');
const list = values => values?.length ? `<ul>${values.map(value => `<li>${escapeHtml(value)}</li>`).join('')}</ul>` : '';
const number = index => String(index + 1).padStart(2, '0');
const titles = {
  needs: 'User story, needs, and problem', requirements: 'Requirements analysis and findings',
  research: 'Research, learnings, and findings', challenges: 'From challenges to design solutions',
  personas: 'User personas', process: 'Design thinking process', sitemap: 'Site map',
  inspiration: 'Inspiration board', sketches: 'Initial sketch study',
  wireframe: 'Wireframe exploration', competitive: 'Competitive analysis and findings', productDetails: 'Product details',
  planningArtifacts: 'Planning diagrams from the source files',
  registrationJourneys: 'Registration journeys and service handoffs',
  evaluation: 'Evaluation tasks and success criteria',
};
const labels = {
  needs: 'Start with the need', requirements: 'Make the scope concrete', research: 'Research and understanding',
  challenges: 'Connect the problem and response', personas: 'People and responsibilities',
  process: 'How the work develops', sitemap: 'Information architecture', inspiration: 'Visual direction',
  sketches: 'Explore the structure', wireframe: 'From sketch to layout', competitive: 'A comparative lens',
  productDetails: 'The product in context',
  planningArtifacts: 'Flows and planning material',
  registrationJourneys: 'Follow the access scenarios',
  evaluation: 'Check the design against the task',
};

function section(study, key, projectId, body, intro = '', className = '') {
  if (!body) return '';
  const id = `case-${projectId}-${key}`;
  return `<section class="case-study-section study-expansion ${className}" id="${escapeHtml(id)}" aria-labelledby="${escapeHtml(id)}-heading" data-study-section="${escapeHtml(key)}">
    <header class="study-expansion-heading"><p class="case-study-label">${escapeHtml(study.sectionLabels?.[key] || labels[key] || 'Explore the work')}</p><h3 id="${escapeHtml(id)}-heading">${escapeHtml(study.sectionTitles?.[key] || titles[key] || key)}</h3></header>
    ${intro ? `<div class="case-study-prose study-expansion-intro">${paragraphs(intro)}</div>` : ''}${body}
  </section>`;
}

function sketchDrawing(variant, wireframe, regionCount) {
  const region = index => `data-sketch-region="${index % Math.max(1, regionCount)}"`;
  const top = '<rect class="study-sketch-paper" x="2" y="2" width="696" height="' + (variant === 'booking' ? '491' : '406') + '" rx="10"/><path class="study-sketch-rule" d="M25 42h650"/><text class="study-sketch-note" x="25" y="29">LAYOUT EXPLORATION / ' + (wireframe ? 'WIREFRAME' : 'SKETCH') + '</text>';
  let content;
  if (variant === 'booking') {
    content = `<g ${region(0)} class="study-sketch-region is-selected"><rect x="27" y="65" width="204" height="310" rx="6"/><text x="42" y="91">01 / Find a journey</text><path d="M42 107h171"/><rect x="43" y="123" width="169" height="34" rx="3"/><text x="54" y="145">From → To</text><rect x="43" y="171" width="169" height="34" rx="3"/><text x="54" y="193">Journey date</text><rect class="study-sketch-button" x="43" y="219" width="169" height="32" rx="3"/><text x="87" y="240">Search</text><path d="M43 273h169m-169 21h133m-133 21h152m-152 21h107"/></g>
      <g ${region(1)} class="study-sketch-region"><rect x="249" y="65" width="204" height="310" rx="6"/><text x="264" y="91">02 / Select a place</text><path d="M264 107h171"/><rect x="277" y="127" width="148" height="173" rx="14"/>${[0,1,2,3].flatMap(row => [0,1,2,3].map(column => `<rect x="${292+column*31}" y="${144+row*36}" width="20" height="25" rx="3" class="${row===1&&column===2?'study-sketch-button':''}"/>`)).join('')}<path d="M274 319h153m-153 20h112"/><text x="279" y="361">Available · Selected</text></g>
      <g ${region(2)} class="study-sketch-region"><rect x="471" y="65" width="204" height="310" rx="6"/><text x="486" y="91">03 / Review the details</text><path d="M486 107h171m-171 25h125m-125 21h152m-152 35h167m-167 21h132"/><rect x="487" y="250" width="171" height="55" rx="4"/><text x="499" y="273">Trip + fare summary</text><path d="M499 287h141"/><rect class="study-sketch-button" x="487" y="324" width="171" height="31" rx="3"/><text x="545" y="345">Continue</text></g>`;
  } else if (variant === 'filing') {
    content = `<g ${region(0)} class="study-sketch-region is-selected"><rect x="27" y="65" width="150" height="310" rx="6"/><text x="43" y="92">Filing sections</text><path d="M43 108h118"/><rect class="study-sketch-button" x="40" y="126" width="124" height="30" rx="3"/><text x="49" y="146">Income</text><text x="49" y="185">Assets / liabilities</text><text x="49" y="224">Rebate</text><text x="49" y="263">Expenditure</text><text x="49" y="302">Tax / payment</text><path d="M43 332h118m-118 17h83"/></g>
      <g ${region(1)} class="study-sketch-region"><rect x="194" y="65" width="290" height="310" rx="6"/><text x="211" y="92">A focused entry form</text><path d="M211 108h255"/><text x="213" y="137">Category</text><rect x="212" y="147" width="254" height="31" rx="3"/><text x="223" y="168">Choose the relevant income type</text><path d="M213 200h110m-110 52h110"/><rect x="213" y="210" width="254" height="29" rx="3"/><rect x="213" y="262" width="254" height="29" rx="3"/><path d="M213 313h116"/><rect class="study-sketch-button" x="347" y="329" width="120" height="28" rx="3"/><text x="385" y="348">Save</text></g>
      <g ${region(2)} class="study-sketch-region"><rect x="501" y="65" width="174" height="310" rx="6"/><text x="517" y="92">Review + summary</text><path d="M517 108h141m-141 25h141m-141 28h141m-141 28h141m-141 28h141m-141 28h141"/><rect x="517" y="268" width="142" height="43" rx="3"/><text x="531" y="294">Information total</text><path d="M517 333h141m-141 18h91"/></g>`;
  } else {
    content = `<g ${region(0)} class="study-sketch-region is-selected"><rect x="27" y="65" width="141" height="310" rx="6"/><text x="43" y="92">Workspace</text><path d="M43 108h108"/><rect class="study-sketch-button" x="40" y="125" width="115" height="29" rx="3"/><text x="49" y="145">Dashboard</text><text x="49" y="185">Users + roles</text><text x="49" y="224">Rooms</text><text x="49" y="263">Licenses</text><text x="49" y="302">Account</text><path d="M43 332h108"/></g>
      <g ${region(1)} class="study-sketch-region"><rect x="185" y="65" width="490" height="96" rx="6"/><text x="202" y="91">Quick meeting actions</text>${[['Start',204],['Join',354],['Schedule',504]].map(([label,x])=>`<rect class="study-sketch-button" x="${x}" y="110" width="132" height="30" rx="3"/><text x="${x+47}" y="131">${label}</text>`).join('')}</g>
      <g ${region(2)} class="study-sketch-region"><rect x="185" y="178" width="490" height="197" rx="6"/><text x="202" y="205">Upcoming meetings and shared resources</text><path d="M203 221h453m-453 34h453m-453 34h453m-453 34h453M491 233v112"/><path d="M214 242h168m-168 34h204m-204 34h144M513 242h122m-122 34h88m-88 34h106"/><text x="214" y="358">Meeting information</text><text x="514" y="358">Room status</text></g>`;
  }
  if (variant === 'booking') content += `<g ${region(3)} class="study-sketch-region"><rect x="27" y="393" width="648" height="78" rx="6"/><text x="43" y="420">04 / Follow-up and recovery</text><path d="M43 431h614"/><text x="44" y="452">Payment failure → retry</text><text x="252" y="452">Ticket changes</text><text x="432" y="452">Cancellation + verification</text></g>`;
  return `${top}${content}`;
}

let pictureGallerySequence = 0;
function renderPictures(pictures, assetUrl, label) {
  const available = pictures?.filter(picture => picture?.image) || [];
  if (!available.length) return '';
  const galleryId = `study-picture-gallery-${++pictureGallerySequence}`;
  const resolve = value => (typeof assetUrl === 'function' ? assetUrl : path => path)(value);
  const controls = available.length > 1 ? `<div class="study-picture-controls" role="group" aria-label="Choose an image">${available.map((picture,index)=>{
    const title = picture.title || picture.alt || `Project picture ${index+1}`;
    return `<button type="button" data-study-picture-select="${index}" aria-pressed="${index===0}" aria-controls="${galleryId}-image-${index}" aria-label="Show ${escapeHtml(title)}"><img src="${escapeHtml(resolve(picture.image))}" alt="" loading="lazy" decoding="async"><span><span class="study-picture-index">${number(index)}</span><strong>${escapeHtml(title)}</strong></span></button>`;
  }).join('')}</div>` : '';
  return `<div class="study-picture-gallery" role="group" aria-label="${escapeHtml(label)}" data-study-gallery>${controls}<div class="study-picture-panels">${available.map((picture, index) => {
    const image = (typeof assetUrl === 'function' ? assetUrl : value => value)(picture.image);
    const fullSize = (typeof assetUrl === 'function' ? assetUrl : value => value)(picture.fullSize || picture.image);
    const title = picture.title || picture.alt || `Project picture ${index + 1}`;
    return `<figure class="study-picture" id="${galleryId}-image-${index}" data-study-picture-detail="${index}"><a class="study-picture-link case-screen-link" href="${escapeHtml(fullSize)}" target="_blank" rel="noopener noreferrer" aria-label="Open ${escapeHtml(title)} at full size (opens in a new tab)"><img src="${escapeHtml(image)}" alt="${escapeHtml(picture.alt || title)}" loading="lazy" decoding="async"><span class="study-picture-open">View full-size image <span aria-hidden="true">↗</span></span></a><figcaption>${picture.basis ? `<p class="study-picture-basis">${escapeHtml(picture.basis)}</p>` : ''}<h4>${escapeHtml(title)}</h4>${picture.caption ? `<p>${escapeHtml(picture.caption)}</p>` : ''}</figcaption></figure>`;
  }).join('')}</div>${available.length>1?`<p class="study-gallery-status" role="status" aria-live="polite" data-study-picture-status>Image 1 of ${available.length}</p>`:''}</div>`;
}

export const renderStudyPictures = (pictures, assetUrl, label = 'Project images') => renderPictures(pictures, assetUrl, label);

function renderSketch(study, key, projectId, assetUrl) {
  const data = study[key];
  if (!data) return '';
  const wireframe = key === 'wireframe';
  const annotations = data.annotations || [];
  const visualId = `case-${projectId}-${key}-visual`;
  const structure = `<div class="study-reconstruction-tag">Reconstructed structure study <span>${escapeHtml(data.reconstructionNote || `The interactive layout below was created for this portfolio; it is not an archived ${wireframe ? 'wireframe' : 'sketch'}.`)}</span></div>
    <div class="study-sketch-layout" data-study-sketch>
      <figure class="study-sketch-figure ${wireframe ? 'study-wireframe-figure' : ''}"><svg id="${escapeHtml(visualId)}" viewBox="0 0 700 ${data.variant === 'booking' ? 495 : 410}" role="img" aria-label="${escapeHtml(wireframe ? 'Reconstructed wireframe layout study' : 'Reconstructed low-fidelity sketch study')}">${sketchDrawing(data.variant || 'meetings', wireframe, annotations.length)}</svg><figcaption>${wireframe ? 'A clean layout study showing hierarchy, navigation, and working areas.' : 'A low-fidelity structure study showing how the tasks could be organized.'}</figcaption></figure>
      ${annotations.length ? `<div class="study-sketch-annotations" aria-label="Explore the layout">${annotations.map((annotation,index)=>`<button type="button" data-study-sketch-select="${index}" aria-pressed="${index===0}" aria-controls="${escapeHtml(visualId)}"><span class="study-control-number">${number(index)}</span><span><strong>${escapeHtml(annotation.title)}</strong><span>${escapeHtml(annotation.body)}</span></span></button>`).join('')}</div><p class="study-interaction-status" role="status" aria-live="polite" data-study-sketch-status>Focus: ${escapeHtml(annotations[0].title)}</p>` : ''}
    </div>`;
  const body = `${renderPictures(data.pictures, assetUrl, wireframe ? 'Wireframe pictures' : 'Sketch pictures')}${data.pictures?.length ? `<details class="study-disclosure study-structure-details"><summary>Explore the layout <span aria-hidden="true">+</span></summary><div class="study-disclosure-body">${structure}</div></details>` : structure}`;
  return section(study, key, projectId, body, data.intro);
}

function renderPersona(persona, index, assetUrl, prefix) {
  return `<article class="study-persona ${index===0?'is-selected':''}" id="${prefix}-detail-${index}" data-study-persona-detail="${index}" aria-labelledby="${prefix}-control-${index}">
    <div class="study-persona-copy">
      <h4 class="study-persona-role">${escapeHtml(persona.role)}</h4>
      ${persona.story ? `<div class="study-persona-story"><h4>Their story</h4>${paragraphs(persona.story)}</div>` : ''}
      <h4>Goal</h4><p>${escapeHtml(persona.goal)}</p>
      ${persona.needs?.length ? `<h4>Needs</h4>${list(persona.needs)}` : ''}
      ${persona.designResponse ? `<h4>Design response</h4>${paragraphs(persona.designResponse)}` : ''}
      ${persona.context || persona.userStory || persona.frictions?.length || persona.basis ? `<details class="study-disclosure study-persona-evidence"><summary>Task story and design notes <span aria-hidden="true">+</span></summary><div class="study-disclosure-body">${persona.userStory ? `<h4>Task story</h4><p class="study-persona-user-story">${escapeHtml(persona.userStory)}</p>` : ''}${persona.context ? `<h4>Context</h4><p>${escapeHtml(persona.context)}</p>` : ''}${persona.frictions?.length ? `<h4>Potential friction</h4>${list(persona.frictions)}` : ''}${persona.basis ? `<p class="study-source-note">${escapeHtml(persona.basis)}</p>` : ''}</div></details>` : ''}
      ${renderPictures(persona.pictures,assetUrl,`${persona.role} persona pictures`)}
    </div></article>`;
}

function renderRegistrationJourneys(study, projectId, assetUrl) {
  const data = study.registrationJourneys;
  const routes = data.routes || [];
  if (!routes.length) return '';
  const prefix = `case-${projectId}-registration-journey`;
  const body = `<p class="study-reconstruction-tag">Planned registration scenarios <span>${escapeHtml(data.note || 'Follow the routes represented in the original planning material. This viewer explains the design; it does not perform identity verification.')}</span></p>
    ${renderPictures(data.pictures,assetUrl,'Registration overview diagrams')}
    <div class="study-journeys" data-study-journeys>
      <div class="study-journey-controls" role="group" aria-label="Choose a registration scenario">${routes.map((route,index)=>`<button type="button" id="${escapeHtml(prefix)}-control-${index}" data-study-journey-select="${index}" aria-pressed="${index===0}" aria-controls="${escapeHtml(prefix)}-detail-${index}"><span class="study-control-number">${number(index)}</span><strong>${escapeHtml(route.label || route.title)}</strong></button>`).join('')}</div>
      <div class="study-journey-panels">${routes.map((route,index)=>`<article class="study-journey-panel ${index===0?'is-selected':''}" id="${escapeHtml(prefix)}-detail-${index}" data-study-journey-detail="${index}" aria-labelledby="${escapeHtml(prefix)}-control-${index}"><h4>${escapeHtml(route.title || route.label)}</h4>${route.summary ? `<div class="study-journey-summary">${paragraphs(route.summary)}</div>` : ''}${route.steps?.length ? `<ol class="study-journey-steps">${route.steps.map((step,stepIndex)=>`<li><span class="study-journey-number" aria-hidden="true">${number(stepIndex)}</span><div>${step.actor ? `<p class="study-mini-label">${escapeHtml(step.actor)}</p>` : ''}<h5>${escapeHtml(step.title)}</h5>${step.body ? `<p>${escapeHtml(step.body)}</p>` : ''}</div></li>`).join('')}</ol>` : ''}${route.outcome ? `<div class="study-journey-outcome"><h5>Where this route leads</h5>${paragraphs(route.outcome)}</div>` : ''}${route.basis ? `<p class="study-source-note">${escapeHtml(route.basis)}</p>` : ''}${renderPictures(route.pictures,assetUrl,`${route.label || route.title} source diagrams`)}</article>`).join('')}</div>
      <p class="study-interaction-status" role="status" aria-live="polite" data-study-journey-status>Selected scenario: ${escapeHtml(routes[0].label || routes[0].title)}</p>
    </div>`;
  return section(study,'registrationJourneys',projectId,body,data.intro);
}

function renderMapNodes(nodes, prefix = '') {
  return `<ul>${nodes.map((node,index)=>{
    const nodePath = prefix ? `${prefix}.${index}` : String(index);
    const children = node.children || [];
    return `<li class="study-map-item"><button type="button" data-study-map-select="${escapeHtml(nodePath)}" data-map-label="${escapeHtml(node.label)}" data-map-description="${escapeHtml(node.description || '')}" data-map-count="${children.length}" aria-pressed="${nodePath==='0'}"><span>${escapeHtml(node.label)}${node.external ? '<span class="study-map-external">External handoff</span>' : ''}</span>${children.length ? `<span class="study-map-count" aria-hidden="true">${children.length}</span>` : ''}</button>${children.length ? renderMapNodes(children,nodePath) : ''}</li>`;
  }).join('')}</ul>`;
}

/** Render an optional expanded section without changing the application shell. */
export function renderStudySection(study, key, { projectId = 'project', assetUrl = value => value } = {}) {
  if (!study?.[key]) return '';
  const data = study[key];
  if (key === 'sketches' || key === 'wireframe') return renderSketch(study,key,projectId,assetUrl);
  if (key === 'registrationJourneys') return renderRegistrationJourneys(study,projectId,assetUrl);
  if (key === 'planningArtifacts') return section(study,key,projectId,
    renderPictures(data.pictures,assetUrl,'Source planning diagrams'),data.intro);
  if (key === 'needs') {
    const body = (data.stories || []).map((story,index)=>`<article class="study-need-card"><span class="study-card-number" aria-hidden="true">${number(index)}</span><div><p class="study-mini-label">${escapeHtml(story.role)}</p><h4>${escapeHtml(story.need)}</h4><p><span class="study-inline-label">So that</span> ${escapeHtml(story.soThat)}</p>${story.basis || story.source ? `<p class="study-source-note">${escapeHtml(story.basis || story.source)}</p>` : ''}</div></article>`).join('');
    return section(study,key,projectId,body ? `<div class="study-needs">${body}</div>` : '',data.intro);
  }
  if (key === 'requirements') {
    const cards = data.map((item,index)=>`<details class="study-requirement study-disclosure"><summary class="study-card-heading"><span class="study-card-number" aria-hidden="true">${number(index)}</span><h4>${escapeHtml(item.need)}</h4><span class="study-disclosure-mark" aria-hidden="true">+</span></summary><dl class="study-disclosure-body"><div><dt>Design response</dt><dd>${escapeHtml(item.response)}</dd></div><div><dt>Source</dt><dd>${escapeHtml(item.evidence)}</dd></div></dl></details>`).join('');
    return section(study,key,projectId,cards ? `<div class="study-requirements">${cards}</div>` : '');
  }
  if (key === 'research') {
    const methods = data.methods?.length ? `<details class="study-disclosure study-research-methods"><summary>Research approach and sources <span aria-hidden="true">+</span></summary><div class="study-methods study-disclosure-body">${data.methods.map(method=>`<article><p class="study-evidence-tag">${escapeHtml(method.status || 'Documented activity')}</p><h4>${escapeHtml(method.title)}</h4><p>${escapeHtml(method.body)}</p></article>`).join('')}</div></details>` : '';
    const renderFinding = (finding,index) => `<article><span class="study-finding-mark" aria-hidden="true">${number(index)}</span><div><h5>${escapeHtml(finding.title)}</h5><p>${escapeHtml(finding.body)}</p>${finding.evidence ? `<details class="study-evidence"><summary>Source</summary><p class="study-source-note">${escapeHtml(finding.evidence)}</p></details>` : ''}</div></article>`;
    const findings = data.findings || [];
    const visible = findings.slice(0,3).map(renderFinding).join('');
    const more = findings.length>3 ? `<details class="study-disclosure study-more-findings"><summary>More findings <span aria-hidden="true">+</span></summary><div class="study-findings study-disclosure-body">${findings.slice(3).map((finding,index)=>renderFinding(finding,index+3)).join('')}</div></details>` : '';
    return section(study,key,projectId,`${visible ? `<div class="study-findings study-findings-primary">${visible}</div>` : ''}${more}${methods}`,data.intro);
  }
  if (key === 'challenges') {
    const cards = data.map((item,index)=>`<details class="study-challenge study-disclosure"><summary><span><span class="study-mini-label">Challenge ${number(index)}</span><h4>${escapeHtml(item.title)}</h4></span><span class="study-disclosure-mark" aria-hidden="true">+</span></summary><div class="study-disclosure-body"><p class="study-challenge-detail">${escapeHtml(item.detail)}</p><div class="study-challenge-response"><span class="study-mini-label">Design response</span><p>${escapeHtml(item.response)}</p></div></div></details>`).join('');
    return section(study,key,projectId,cards ? `<div class="study-challenges">${cards}</div>` : '');
  }
  if (key === 'personas') {
    const first = data[0];
    const prefix = `case-${projectId}-persona`;
    const controls = data.map((persona,index)=>`<button type="button" id="${prefix}-control-${index}" data-study-persona-select="${index}" data-persona-goal="${escapeHtml(persona.goal)}" aria-pressed="${index===0}" aria-controls="${prefix}-detail-${index}"><span class="study-control-number" aria-hidden="true">${number(index)}</span><strong>${escapeHtml(persona.role)}</strong></button>`).join('');
    const body = data.length ? `${renderPictures(study.personasPictures,assetUrl,'Persona overview images')}<p class="study-reconstruction-tag">Reconstructed role profiles <span>Based on the tasks represented in the project artifacts.</span></p><div class="study-personas" data-study-personas><div class="study-persona-controls" role="group" aria-label="Choose a persona">${controls}</div><div class="study-persona-panels">${data.map((persona,index)=>renderPersona(persona,index,assetUrl,prefix)).join('')}</div><p class="study-interaction-status" role="status" aria-live="polite" data-study-persona-status>Selected goal: ${escapeHtml(first.goal)}</p></div>` : '';
    return section(study,key,projectId,body,study.personasIntro);
  }
  if (key === 'process') {
    const body = data.length ? `<p class="study-process-note">A retrospective map of the work, with documented activities and prototype outputs identified at each stage.</p><div class="study-process" data-study-process><div class="study-process-controls" role="group" aria-label="Explore the design process">${data.map((step,index)=>`<button type="button" id="case-${escapeHtml(projectId)}-process-control-${index}" data-study-process-select="${index}" aria-pressed="${index===0}" aria-controls="case-${escapeHtml(projectId)}-process-detail-${index}"><span>${number(index)}</span><strong>${escapeHtml(step.stage)}</strong></button>`).join('')}</div><div class="study-process-panels">${data.map((step,index)=>`<article class="study-process-panel ${index===0?'is-selected':''}" id="case-${escapeHtml(projectId)}-process-detail-${index}" data-study-process-detail="${index}" aria-labelledby="case-${escapeHtml(projectId)}-process-control-${index}"><h4>${escapeHtml(step.stage)}</h4><p>${escapeHtml(step.activity)}</p><dl><div><dt>Output</dt><dd>${escapeHtml(step.output)}</dd></div>${step.basis ? `<div><dt>Basis</dt><dd>${escapeHtml(step.basis)}</dd></div>` : ''}</dl></article>`).join('')}</div><p class="study-interaction-status" role="status" aria-live="polite" data-study-process-status>Selected stage: ${escapeHtml(data[0].stage)}</p></div>` : '';
    return section(study,key,projectId,body);
  }
  if (key === 'sitemap') {
    const nodes = Array.isArray(data) ? data : data.nodes || [];
    const pictures = renderPictures(data.pictures,assetUrl,'Site map pictures');
    const map = nodes.length ? `<div class="study-sitemap" data-study-sitemap>${renderMapNodes(nodes)}<p class="study-interaction-status" role="status" aria-live="polite" data-study-map-status>Select an area to trace its place in the structure.</p></div>` : '';
    return section(study,key,projectId,pictures || map ? `<p class="study-reconstruction-tag">Reconstructed site map <span>${escapeHtml(data.note || 'Organized from the archived screen groups; not an original sitemap export.')}</span></p>${pictures}${map}` : '',data.intro);
  }
  if (key === 'inspiration') {
    const pictures = renderPictures(data.pictures,assetUrl,'Inspiration board pictures');
    const cards = data.cards || [];
    const body = cards.length ? `<p class="study-reconstruction-tag">${pictures ? 'Interpreting the references' : 'Retrospective direction board'} <span>${escapeHtml(data.note || 'A new visual explanation of the design principles.')}</span></p><div class="study-inspiration ${data.showIllustrations === false ? 'study-inspiration--text-only' : ''}" data-study-inspiration>${cards.map((card,index)=>`<button type="button" data-study-inspiration-select="${index}" aria-pressed="${index===0}">${data.showIllustrations === false ? '' : `<span class="study-inspiration-art study-inspiration-art-${index%3}" aria-hidden="true">${index%3===0?'<i></i><i></i><i></i><i></i>':index%3===1?'<b>Aa</b><em>Clear. Calm. Ordered.</em>':'<i></i><i></i><i></i><i></i><i></i><i></i>'}</span>`}<span class="study-inspiration-copy"><strong>${escapeHtml(card.title)}</strong><span class="study-inspiration-principle">${escapeHtml(card.principle)}</span><span>${escapeHtml(card.application)}</span></span></button>`).join('')}<p class="study-interaction-status" role="status" aria-live="polite" data-study-inspiration-status>Selected direction: ${escapeHtml(cards[0].title)}</p></div>` : '';
    return section(study,key,projectId,pictures+body,data.intro);
  }
  if (key === 'competitive') {
    const columns = data.columns?.length===4 ? data.columns.map(column=>typeof column==='object'?column.label:column) : ['Product pattern','Strength','Trade-off','Implication for this work'];
    return section(study,key,projectId,data.rows?.length ? `<p class="study-reconstruction-tag">Retrospective comparison <span>A new explanatory framework, not a recovered competitive-research report.</span></p><div class="study-comparison-wrap"><table class="study-comparison"><caption>Compare approaches to meeting and organization work</caption><thead><tr>${columns.map(column=>`<th scope="col">${escapeHtml(column)}</th>`).join('')}</tr></thead><tbody>${data.rows.map(row=>`<tr>${[row.pattern,row.strength,row.tradeoff,row.implication].map((value,index)=>`<${index===0?'th scope="row"':'td'} data-label="${escapeHtml(columns[index])}">${escapeHtml(value)}</${index===0?'th':'td'}>`).join('')}</tr>`).join('')}</tbody></table></div>${data.takeaways?.length ? `<div class="study-competitive-takeaways"><h4>What this comparison highlights</h4>${list(data.takeaways)}</div>` : ''}` : '',data.intro);
  }
  if (key === 'productDetails') {
    return section(study,key,projectId,data.areas?.length ? `<div class="study-product-areas">${data.areas.map((area,index)=>`<article><span class="study-card-number" aria-hidden="true">${number(index)}</span><h4>${escapeHtml(area.title)}</h4><p>${escapeHtml(area.body)}</p></article>`).join('')}</div>` : '',data.intro);
  }
  if (key === 'evaluation') {
    return section(study,key,projectId,data.tasks?.length ? `<p class="study-analysis-note">Proposed evaluation tasks for this case study; these are not reported historical test results.</p><div class="study-evaluation">${data.tasks.map((task,index)=>`<article><span class="study-card-number" aria-hidden="true">${number(index)}</span><div><h4>${escapeHtml(task.title)}</h4>${paragraphs(task.body)}${task.criteria ? `<h5>What to look for</h5>${paragraphs(task.criteria)}` : ''}</div></article>`).join('')}</div>` : '',data.intro);
  }
  return '';
}

const boundContainers = new WeakSet();

/** Call after rendering into a reused container; event registration is idempotent. */
export function bindStudyInteractions(container) {
  if (!container?.addEventListener) return;
  container.querySelectorAll('[data-study-process]').forEach(process => {
    if (process.dataset.studyEnhanced) return;
    process.dataset.studyEnhanced = 'true';
    process.querySelectorAll('[data-study-process-detail]').forEach((panel,index) => { panel.hidden = index !== 0; });
  });
  container.querySelectorAll('[data-study-journeys]').forEach(journeys => {
    if (journeys.dataset.studyEnhanced) return;
    journeys.dataset.studyEnhanced = 'true';
    journeys.querySelectorAll('[data-study-journey-detail]').forEach((panel,index) => { panel.hidden = index !== 0; });
  });
  container.querySelectorAll('[data-study-personas]').forEach(personas => {
    if (personas.dataset.studyEnhanced) return;
    personas.dataset.studyEnhanced = 'true';
    personas.querySelectorAll('[data-study-persona-detail]').forEach((panel,index) => { panel.hidden = index !== 0; });
  });
  container.querySelectorAll('[data-study-gallery]').forEach(gallery => {
    if (gallery.dataset.studyEnhanced) return;
    gallery.dataset.studyEnhanced = 'true';
    gallery.querySelectorAll('[data-study-picture-detail]').forEach((panel,index) => { panel.hidden = index !== 0; });
  });
  if (boundContainers.has(container)) return;
  boundContainers.add(container);
  container.addEventListener('click', event => {
    const navigation = event.target.closest('a[data-case-nav]');
    if (navigation && container.contains(navigation)) {
      const href = navigation.getAttribute('href') || '';
      if (!href.startsWith('#')) return;
      const target = document.getElementById(href.slice(1));
      if (!target || !container.contains(target)) return;
      event.preventDefault();
      let ancestor = target;
      while (ancestor && container.contains(ancestor)) {
        if (ancestor.tagName === 'DETAILS') ancestor.open = true;
        ancestor = ancestor.parentElement;
      }
      const heading = target.querySelector('h2,h3,h4') || target;
      heading.setAttribute('tabindex','-1');
      target.scrollIntoView({ block:'start', behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      heading.focus({ preventScroll:true });
      return;
    }
    const button = event.target.closest('button');
    if (!button || !container.contains(button)) return;
    if (button.hasAttribute('data-study-picture-select')) {
      const gallery = button.closest('[data-study-gallery]');
      const selected = button.dataset.studyPictureSelect;
      gallery.querySelectorAll('[data-study-picture-select]').forEach(item => item.setAttribute('aria-pressed',String(item===button)));
      const panels = gallery.querySelectorAll('[data-study-picture-detail]');
      panels.forEach(panel => { panel.hidden = panel.dataset.studyPictureDetail !== selected; });
      gallery.querySelector('[data-study-picture-status]').textContent = `Image ${Number(selected)+1} of ${panels.length}: ${button.querySelector('strong').textContent}`;
    } else if (button.hasAttribute('data-study-journey-select')) {
      const journeys = button.closest('[data-study-journeys]');
      const selected = button.dataset.studyJourneySelect;
      journeys.querySelectorAll('[data-study-journey-select]').forEach(item => item.setAttribute('aria-pressed',String(item===button)));
      journeys.querySelectorAll('[data-study-journey-detail]').forEach(panel => { panel.hidden = panel.dataset.studyJourneyDetail !== selected; panel.classList.toggle('is-selected',!panel.hidden); });
      journeys.querySelector('[data-study-journey-status]').textContent = `Selected scenario: ${button.querySelector('strong').textContent}`;
    } else if (button.hasAttribute('data-study-process-select')) {
      const process = button.closest('[data-study-process]');
      const selected = button.dataset.studyProcessSelect;
      process.querySelectorAll('[data-study-process-select]').forEach(item => item.setAttribute('aria-pressed',String(item===button)));
      process.querySelectorAll('[data-study-process-detail]').forEach(panel => { panel.hidden = panel.dataset.studyProcessDetail !== selected; panel.classList.toggle('is-selected',!panel.hidden); });
      process.querySelector('[data-study-process-status]').textContent = `Selected stage: ${button.querySelector('strong').textContent}`;
    } else if (button.hasAttribute('data-study-persona-select')) {
      const personas = button.closest('[data-study-personas]');
      personas.querySelectorAll('[data-study-persona-select]').forEach(item => item.setAttribute('aria-pressed',String(item===button)));
      personas.querySelectorAll('[data-study-persona-detail]').forEach(panel => { panel.hidden = panel.dataset.studyPersonaDetail !== button.dataset.studyPersonaSelect; panel.classList.toggle('is-selected',!panel.hidden); });
      personas.querySelector('[data-study-persona-status]').textContent = `Selected goal: ${button.dataset.personaGoal}`;
    } else if (button.hasAttribute('data-study-sketch-select')) {
      const sketch = button.closest('[data-study-sketch]');
      const selected = button.dataset.studySketchSelect;
      sketch.querySelectorAll('[data-study-sketch-select]').forEach(item => item.setAttribute('aria-pressed',String(item===button)));
      sketch.querySelectorAll('[data-sketch-region]').forEach(region => region.classList.toggle('is-selected',region.dataset.sketchRegion===selected));
      sketch.querySelector('[data-study-sketch-status]').textContent = `Focus: ${button.querySelector('strong').textContent}`;
    } else if (button.hasAttribute('data-study-map-select')) {
      const map = button.closest('[data-study-sitemap]');
      map.querySelectorAll('[data-study-map-select]').forEach(item => item.setAttribute('aria-pressed',String(item===button)));
      map.querySelectorAll('.study-map-item').forEach(item => item.classList.remove('is-path'));
      let item = button.closest('.study-map-item');
      while (item && map.contains(item)) { item.classList.add('is-path'); item = item.parentElement.closest('.study-map-item'); }
      const count = Number(button.dataset.mapCount);
      map.querySelector('[data-study-map-status]').textContent = `${button.dataset.mapLabel}${count ? ` · ${count} subsection${count===1?'':'s'}` : ' · end of this branch'}${button.dataset.mapDescription ? ` — ${button.dataset.mapDescription}` : ''}`;
    } else if (button.hasAttribute('data-study-inspiration-select')) {
      const board = button.closest('[data-study-inspiration]');
      board.querySelectorAll('[data-study-inspiration-select]').forEach(item => item.setAttribute('aria-pressed',String(item===button)));
      board.querySelector('[data-study-inspiration-status]').textContent = `Selected direction: ${button.querySelector('strong').textContent}`;
    }
  });
}
