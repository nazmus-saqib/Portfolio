const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));

const arrow = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" stroke-width="1.5"/></svg>';

export function renderProfessionalOverview({ aboutMe, assetUrl }) {
  return `<section class="professional-overview" aria-label="Quick professional overview">
    <p class="eyebrow">PROFESSIONAL PORTFOLIO · ONTARIO, CANADA</p>
    <h1 id="about-title">Molla Nazmus Saqib</h1>
    <p class="professional-position">Project &amp; Operations Coordinator</p>
    <button class="professional-current" type="button" data-current-experience>Current role: Project Coordinator at Identify BDA ${arrow}</button>
    <p class="professional-summary">I bring clients, vendors, and teams together—from clear requirements and approvals to production, delivery, and billing follow-up.</p>
    <div class="professional-actions"><button class="button button-dark" type="button" data-project="conference">View my strongest case ${arrow}</button><a class="button button-secondary" href="${esc(assetUrl('Molla_Nazmus_Saqib_Project_Coordinator_Resume.pdf'))}" download>Download résumé <span aria-hidden="true">↓</span></a><button class="professional-text-link" type="button" data-panel="contact">Contact me ${arrow}</button></div>
    <ul class="professional-evidence" aria-label="Experience at a glance"><li><strong>25+</strong><span>clients supported</span></li><li><strong>20+</strong><span>suppliers coordinated</span></li><li><strong>2024</strong><span>Project Management<br>graduate certificate</span></li></ul>
    <details class="professional-quick-view"><summary>My work in 30 seconds <span aria-hidden="true">+</span></summary><div>
      <p><strong>Today:</strong> Project Coordinator at Identify BDA. I clarify requirements, coordinate artwork reviews and vendor orders, track delivery, and follow up on costs and payments.</p>
      <ul><li><strong>Complex delivery:</strong> coordinated an approximately $55,000 conference project with eight vendors over three weeks.</li><li><strong>Continuity:</strong> supported 25+ clients, including approximately 15 repeat clients.</li><li><strong>Issue resolution:</strong> helped resolve an incorrect backdrop frame without delaying the conference.</li></ul>
      <p><strong>Tools:</strong> Trello for stages and follow-up, Excel for comparisons and tracking, Wave for payment follow-up.</p>
      <p><strong>Foundation:</strong> Computer Science &amp; Engineering, Interactive Media Management, and Project Management.</p>
      <div class="professional-inline-actions"><button type="button" data-current-experience>Current experience ${arrow}</button><button type="button" data-panel="projects">All case studies ${arrow}</button></div>
    </div></details>
    <div class="professional-personal-links"><button type="button" data-about-jump="story">My story: Bangladesh to Canada <span aria-hidden="true">→</span></button><button type="button" data-about-jump="learning">Beyond work <span aria-hidden="true">→</span></button></div>
  </section>`;
}
