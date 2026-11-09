const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));

const iconPaths = {
  about: '<circle cx="12" cy="8" r="4"/><path d="M4 22v-2a8 8 0 0 1 16 0v2"/>',
  work: '<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V4h8v3M3 12c5 4 13 4 18 0m-11 1h4v4h-4z"/>',
  skills: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2"/>',
  learning: '<path d="m2 8 10-5 10 5-10 5L2 8Zm4 2v7c4 4 8 4 12 0v-7m4-2v9"/>',
  plan: '<rect x="4" y="4" width="16" height="17" rx="2"/><path d="M8 2v4m8-4v4M8 10h8m-8 4h8m-8 4h4"/>',
  people: '<circle cx="9" cy="8" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3m2-16a3 3 0 0 1 0 6m1 4a5 5 0 0 1 3 4v2"/>',
  delivery: '<path d="m3 7 9-4 9 4-9 4-9-4Zm0 0v10l9 4 9-4V7M12 11v10m-5-16 9 4"/>',
  vendor: '<path d="m3 12 5-7h8l5 7-9 9-9-9Zm0 0h18M8 5l4 16 4-16"/>',
  download: '<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',
};
const icon = name => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name] || iconPaths.work}</svg>`;
const tabs = [
  { label: 'Profile', icon: 'about' },
  { label: 'Skills', icon: 'skills' },
  { label: 'Learning', icon: 'learning' },
];

export function renderCoordinationMetrics() {
  return `<div class="profile-stat-grid" aria-label="Current coordination experience">
    <div class="profile-stat"><span class="profile-stat-icon">${icon('plan')}</span><strong>6–10</strong><span>Projects / month</span></div>
    <div class="profile-stat"><span class="profile-stat-icon">${icon('people')}</span><strong>20+</strong><span>External vendors</span></div>
  </div>`;
}

export function renderProfile({ skills = [], education = [], certificates = [], teaching = {} } = {}, { selectedIndex = 0, assetUrl = path => path, aboutHtml = '' } = {}) {
  const selected = Number.isInteger(selectedIndex) ? Math.max(0, Math.min(tabs.length - 1, selectedIndex)) : 0;
  return `<section class="profile-detail" aria-label="About Me &amp; My Story">
    <div class="profile-explorer" id="profile-explorer" data-profile-view="${selected}">
      <div class="profile-tabs" role="tablist" aria-label="Explore About Me">${tabs.map((tab, index) => `<button type="button" class="profile-tab" id="profile-tab-${index}" data-profile-tab="${index}" role="tab" aria-controls="profile-view-${index}" aria-selected="${index === selected}" tabindex="${index === selected ? 0 : -1}"><span class="profile-tab-icon">${icon(tab.icon)}</span><strong>${tab.label}</strong></button>`).join('')}</div>
      <div class="profile-explorer-status"><span class="profile-explorer-count" aria-live="polite">View ${String(selected + 1).padStart(2, '0')} / ${String(tabs.length).padStart(2, '0')}</span><span class="profile-explorer-progress" aria-hidden="true"><i style="width:${((selected + 1) / tabs.length) * 100}%"></i></span></div>
      <section class="profile-view profile-view-about" id="profile-view-0" role="tabpanel" aria-labelledby="profile-tab-0" tabindex="0" ${selected === 0 ? '' : 'hidden'}>${aboutHtml}</section>
      <section class="profile-view" id="profile-view-1" role="tabpanel" aria-labelledby="profile-tab-1" tabindex="0" ${selected === 1 ? '' : 'hidden'}>
        <p class="profile-view-label">WHAT I BRING TO A PROJECT</p><h3>Explore my working strengths.</h3>
        <div class="profile-skill-list">${skills.map((skill, index) => `<article class="profile-skill-card"><h4 class="profile-skill-heading"><span class="profile-skill-symbol">${icon(['plan', 'vendor', 'people', 'delivery'][index])}</span><span>${escapeHtml(skill.title)}</span></h4><div class="profile-skill-body"><p>${escapeHtml(skill.description)}</p><div class="profile-skill-tags">${skill.items.map(item => `<span>${escapeHtml(item)}</span>`).join('')}</div></div></article>`).join('')}</div>
      </section>
      <section class="profile-view" id="profile-view-2" role="tabpanel" aria-labelledby="profile-tab-2" tabindex="0" ${selected === 2 ? '' : 'hidden'}>
        <p class="profile-view-label">TECHNICAL FOUNDATION + PROJECT TRAINING</p><h3>Learning that supports delivery.</h3>
        <div class="profile-education">${education.map(item => `<article class="profile-education-card"><span class="profile-education-icon">${icon('learning')}</span><div><p class="profile-qualification">${escapeHtml(item.qualification)}</p><h4>${escapeHtml(item.title)}</h4><p>${escapeHtml(item.school)}</p></div></article>`).join('')}</div>
        <details class="profile-learning-credentials credentials"><summary>Courses & knowledge sharing <span aria-hidden="true">+</span></summary>${certificates.map(certificate => `<article><h4>${escapeHtml(certificate.title)}</h4><p>${escapeHtml(certificate.issuer)} · <span>${escapeHtml(certificate.date)}</span></p></article>`).join('')}${teaching.description ? `<article><h4>${escapeHtml(teaching.title || 'Knowledge sharing')}</h4><p>${escapeHtml(teaching.description)}</p></article>` : ''}</details>
      </section>
    </div>
    <a class="button button-dark profile-download" href="${escapeHtml(assetUrl('Molla_Nazmus_Saqib_Project_Coordinator_Resume.pdf'))}" download>Download my résumé ${icon('download')}</a>
  </section>`;
}

export function activateProfileTab(container, index, { focus = false } = {}) {
  if (!container) return false;
  const buttons = [...container.querySelectorAll('[data-profile-tab]')];
  if (!Number.isInteger(index) || index < 0 || index >= buttons.length) return false;
  container.dataset.profileView = String(index);
  buttons.forEach((button, buttonIndex) => {
    const selected = buttonIndex === index;
    button.setAttribute('aria-selected', String(selected));
    button.tabIndex = selected ? 0 : -1;
  });
  container.querySelectorAll(':scope > .profile-view').forEach((panel, panelIndex) => { panel.hidden = panelIndex !== index; });
  const progress = container.querySelector('.profile-explorer-progress > i');
  if (progress) progress.style.width = `${((index + 1) / buttons.length) * 100}%`;
  const counter = container.querySelector('.profile-explorer-count');
  if (counter) counter.textContent = `View ${String(index + 1).padStart(2, '0')} / ${String(buttons.length).padStart(2, '0')}`;
  if (focus) buttons[index].focus({ preventScroll: true });
  return true;
}
