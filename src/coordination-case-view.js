const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const arrow = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" stroke-width="1.5"/></svg>';
const items = values => `<ul>${values.map(value => `<li>${esc(value)}</li>`).join('')}</ul>`;

export function renderCoordinationCase(project, { coverHtml = '' } = {}) {
  const data = project.coordinationCaseStudy;
  const id = suffix => `coordination-${project.id}-${suffix}`;
  return `<article class="case-detail coordination-case" data-coordination-case="${esc(project.id)}">
    ${coverHtml}<div class="case-body">
      <p class="case-eyebrow">${esc(project.company)} / ${esc(data.kind)}</p>
      <h2 id="dialog-title">${esc(project.title)}</h2><p class="case-summary">${esc(data.lead)}</p>
      <dl class="coordination-facts">${data.facts.map(fact => `<div><dt>${esc(fact.label)}</dt><dd>${esc(fact.value)}</dd></div>`).join('')}</dl>
      <nav class="coordination-jumps" aria-label="Case study sections">${[['brief','The brief'],['actions','My approach'],['result','Result & lessons'],['templates','Working templates']].map(([key,label]) => `<a href="#${id(key)}">${label}</a>`).join('')}</nav>
      <section class="coordination-section" id="${id('brief')}"><p class="case-study-label">01 / THE CONTEXT</p><h3>The brief</h3><p>${esc(data.brief)}</p><div class="coordination-pair"><div><h4>My responsibilities</h4>${items(data.responsibilities)}</div><div><h4>Constraints</h4>${items(data.constraints)}</div></div></section>
      <section class="coordination-section" id="${id('actions')}"><p class="case-study-label">02 / ACTIONS & DECISIONS</p><h3>How I moved the work forward</h3><ol class="coordination-actions">${data.actions.map((action,index) => `<li><span aria-hidden="true">${String(index+1).padStart(2,'0')}</span><div><h4>${esc(action.title)}</h4><p>${esc(action.body)}</p></div></li>`).join('')}</ol><details class="coordination-ownership"><summary>Who did what</summary><dl>${data.ownership.map(owner => `<div><dt>${esc(owner.role)}</dt><dd>${esc(owner.body)}</dd></div>`).join('')}</dl></details></section>
      <section class="coordination-section coordination-result" id="${id('result')}"><p class="case-study-label">03 / RESULT & REFLECTION</p><h3>${data.kind === 'Project example' ? 'What happened' : 'What this approach supports'}</h3><p>${esc(data.result)}</p><h4>What I carry forward</h4>${items(data.lessons)}</section>
      <section class="coordination-section" id="${id('templates')}"><p class="case-study-label">04 / MAKE THE METHOD VISIBLE</p><h3>Explore the working templates</h3><p>Reusable structures based on my coordination workflow. Open a template to see how I organize the next step.</p><div class="coordination-templates">${data.artifacts.map((artifact,index) => `<details class="coordination-template" data-coordination-template="${esc(artifact.id)}" ${index===0?'open':''}><summary>${esc(artifact.title)}</summary><div class="coordination-template-body"><p>${esc(artifact.description)}</p><div class="coordination-table-scroll" tabindex="0" role="region" aria-label="${esc(artifact.title)}"><table><caption>${esc(artifact.title)}</caption><thead><tr>${artifact.columns.map(column => `<th scope="col">${esc(column)}</th>`).join('')}</tr></thead><tbody>${artifact.rows.map(row => `<tr>${row.map((cell,cellIndex) => cellIndex===0?`<th scope="row">${esc(cell)}</th>`:`<td>${esc(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div></div></details>`).join('')}</div></section>
      ${project.id==='change-coordination'?'<button type="button" class="button button-secondary" data-project="conference">See the conference example ${arrow}</button>':''}
      <ul class="case-tools" aria-label="Tools and methods">${project.tools.map(tool => `<li>${esc(tool)}</li>`).join('')}</ul>
      <button class="case-contact" type="button" data-contact>Let’s talk about the work ${arrow}</button>
    </div>
  </article>`;
}
