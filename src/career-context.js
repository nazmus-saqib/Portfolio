const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));

export const managementUpdate = {
  title: 'Management Updates & Decision Support',
  subtitle: 'Turning project details into clear next actions.',
  body: 'I keep management informed about progress, upcoming deadlines, supplier concerns and open decisions. I maintain project information in Trello and Excel, follow up on meeting actions and contribute to periodic management reporting. I bring project context to client meetings and financial clarification so the right person can see what is ready, what remains blocked and what should happen next.',
  exampleTitle: 'Illustrative project-update structure',
  fields: [
    { label: 'Current stage', value: 'Awaiting final artwork approval' },
    { label: 'Next milestone', value: 'Release order to supplier' },
    { label: 'Key dependency', value: 'Approved files are required before production' },
    { label: 'Decision or escalation', value: 'Confirm whether a rush option is authorized if approval is late' },
    { label: 'Action owner / next update', value: 'Project coordinator to check approval and confirm production timing' },
  ],
  note: 'Reconstructed example with fictional placeholders. It illustrates how I organize progress, dependencies and next actions; no real client records or company reporting documents are shown.',
};

export const careerBridge = {
  title: 'Connecting Business Requirements with Technical Execution',
  body: 'At Synesis IT, I worked with business and technical stakeholders to turn BIWTA and eReturn requirements into system flows and prototypes for review. At iStoreiSend, ODIN connected warehouse and fulfilment requirements with system-design reviews. In field work at Dynamic Infotech, I confirmed site requirements, supported equipment installations, documented completion or exceptions and escalated unresolved issues.',
  note: 'Across these separate roles and projects, I developed a foundation for implementation-related coordination: clear requirements, technical handoffs and issue follow-up. These experiences are distinct from software rollout or go-live ownership.',
};

export function renderManagementUpdates() {
  return `<section class="career-context management-updates" data-management-updates aria-labelledby="management-updates-title">
    <h3 id="management-updates-title">${esc(managementUpdate.title)}</h3><p class="career-context-subtitle">${esc(managementUpdate.subtitle)}</p><p>${esc(managementUpdate.body)}</p>
    <section class="management-example" aria-labelledby="management-example-title"><h4 id="management-example-title">${esc(managementUpdate.exampleTitle)}</h4><p class="career-context-note">${esc(managementUpdate.note)}</p><dl>${managementUpdate.fields.map(field=>`<div><dt>${esc(field.label)}</dt><dd>${esc(field.value)}</dd></div>`).join('')}</dl></section>
  </section>`;
}

export function renderCareerBridge() {
  return `<section class="career-context career-bridge" data-career-bridge aria-labelledby="career-bridge-title"><h3 id="career-bridge-title">${esc(careerBridge.title)}</h3><p>${esc(careerBridge.body)}</p><p class="career-context-note">${esc(careerBridge.note)}</p></section>`;
}
