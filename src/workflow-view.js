const workflowStages = [
  { label: 'Understand', symbol: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/>' },
  { label: 'Design & source', symbol: '<circle cx="10" cy="10" r="5"/><path d="m14 14 5 5M8 10h4M10 8v4"/>' },
  { label: 'Coordinate', symbol: '<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>' },
  { label: 'Deliver', symbol: '<path d="m5 12 4 5L19 6"/>' },
];

/** A readable, local illustration of the current coordination workflow. */
export function renderIdentifyWorkflow() {
  return `<figure class="identify-workflow-preview" aria-label="From request to delivery">
    <ol class="identify-workflow-stages" aria-label="Coordination workflow">${workflowStages.map(stage => `<li class="identify-workflow-stage${stage.label === 'Deliver' ? ' is-delivery' : ''}"><span class="identify-workflow-symbol" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${stage.symbol}</svg></span><span class="identify-workflow-label">${stage.label.replaceAll('&', '&amp;')}</span></li>`).join('')}</ol>
    <figcaption>When artwork is needed, I brief designers, relay client feedback, coordinate revisions, and obtain final artwork approval while sourcing vendors.</figcaption>
  </figure>`;
}
