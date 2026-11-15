const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));

const arrow = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" stroke-width="1.5"/></svg>';

export function renderOpportunityStatement(summary) {
  const roles = summary.targets.map(esc);
  const roleList = `${roles.slice(0, -1).join(', ')} or ${roles.at(-1)}`;
  return `${esc(summary.opportunityLead)}<strong>${roleList}</strong>${esc(summary.opportunityContext)}`;
}

export function renderProfessionalOverview({ aboutMe, professionalSummary }) {
  return `<section class="professional-overview" aria-label="Quick professional overview">
    <p class="eyebrow">PROFESSIONAL PORTFOLIO · ${esc(professionalSummary.location)}</p>
    <h1 id="about-title">${esc(aboutMe.name)}</h1>
    <p class="professional-position">${esc(professionalSummary.headline)}</p>
    <button class="professional-current" type="button" data-current-experience>Current experience at Identify BDA ${arrow}</button>
    <div class="professional-summary"><p>${esc(professionalSummary.body)}</p><p>${esc(professionalSummary.background)}</p><p>${renderOpportunityStatement(professionalSummary)}</p></div>
    <ul class="professional-evidence" aria-label="Current Identify BDA experience"><li><strong>25+</strong><span>Clients supported</span><small>Identify BDA</small></li><li><strong>20+</strong><span>Suppliers coordinated</span><small>Canada &amp; international</small></li></ul>
    <p class="professional-credential">Project Management graduate certificate · Fleming College · 2024</p>
    <details class="professional-quick-view"><summary><span class="profile-preview-title">My work in 30 seconds</span><span class="profile-preview-excerpt"><strong>Today:</strong> Project Coordinator at Identify BDA. I coordinate requirements, schedules, approvals, suppliers and deliverables, and keep the next action clear.</span><span class="profile-preview-toggle"><span class="profile-preview-expand">Read more</span><span class="profile-preview-collapse">Show less</span><span class="profile-preview-icon" aria-hidden="true">+</span></span></summary><div>
      <ul><li><strong>Complex delivery:</strong> coordinated an approximately $55,000 conference project with eight vendors over three weeks.</li><li><strong>Continuity:</strong> supported 25+ clients, including approximately 15 repeat clients.</li><li><strong>Issue resolution:</strong> helped resolve an incorrect item without delaying the conference.</li></ul>
      <p><strong>Risk awareness:</strong> I note relevant concerns in Trello card descriptions and discuss dependencies or practical options with the CEO or suppliers when needed.</p>
      <p><strong>Tools:</strong> Trello for follow-up, Excel for comparisons and tracking, Wave for financial follow-up.</p>
      <p><strong>Foundation:</strong> Computer Science &amp; Engineering, Interactive Media Management, and Project Management.</p>
      <div class="professional-inline-actions"><button type="button" data-current-experience>Current experience ${arrow}</button><button type="button" data-panel="projects">All case studies ${arrow}</button></div>
    </div></details>
  </section>`;
}
