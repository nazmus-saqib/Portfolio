const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));

const icons = {
  code: '<path d="m8 8-4 4 4 4m8-8 4 4-4 4m-3-10-2 16"/>',
  plane: '<path d="m21 3-7 18-3-8-8-3L21 3Zm-10 10L21 3"/>',
  checklist: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V2h6v2M8 10l1.5 1.5L12 9m1 2h3m-8 5 1.5 1.5L12 15m1 2h3"/>',
};
const icon = name => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.checklist}</svg>`;
const tabLabels = ['Roots', 'Canada', 'Today'];
const tabPeriods = ['Bangladesh', '2022', '2024–now'];

export function renderStoryJourney(aboutMe, { selectedIndex = 0 } = {}) {
  const milestones = aboutMe.storyMilestones || [];
  const selected = Math.max(0, Math.min(milestones.length - 1, Number(selectedIndex) || 0));
  return `<section class="about-narrative" aria-labelledby="about-story-title">
    <p class="eyebrow">BANGLADESH → CANADA</p>
    <h3 id="about-story-title" tabindex="-1">${escapeHtml(aboutMe.storyTitle)}</h3>
    <div class="story-journey" id="story-journey" data-story-step="${selected}">
      <div class="story-route" aria-hidden="true">
        <span class="story-country"><span class="story-flag story-flag-bd"><i></i></span><span>Bangladesh</span></span>
        <div class="story-flight"><svg class="story-flight-path" viewBox="0 0 180 54" preserveAspectRatio="none" fill="none"><path d="M8 42C43 4 126 4 172 42" stroke="currentColor" stroke-width="1.7" stroke-dasharray="3 6" stroke-linecap="round"/></svg><span class="story-flight-marker">${icon('plane')}</span></div>
        <span class="story-country"><span class="story-flag story-flag-ca"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 2 2.1 4.2 2.1-1.1-.5 5.2 3.7-1.7-.8 3 2.4 1-5.4 4.2.7 2.2-3.6-.5V22h-1.4v-3.5l-3.6.5.7-2.2L3.1 12.6l2.4-1-.8-3 3.7 1.7-.5-5.2 2.1 1.1L12 2Z"/></svg></span><span>Canada</span></span>
      </div>
      <div class="story-tabs" role="tablist" aria-label="My story milestones">${milestones.map((milestone, index) => `<button type="button" class="story-tab" id="story-tab-${index}" role="tab" aria-controls="story-panel-${index}" aria-selected="${index === selected}" tabindex="${index === selected ? 0 : -1}" data-story-milestone="${index}" aria-label="${escapeHtml(tabLabels[index] || milestone.label)}: ${escapeHtml(milestone.period)}"><span class="story-tab-icon">${icon(milestone.icon)}</span><strong>${escapeHtml(tabLabels[index] || milestone.label)}</strong><small>${escapeHtml(tabPeriods[index] || milestone.period)}</small></button>`).join('')}</div>
      <div class="story-moment-progress"><span class="story-moment-number" aria-live="polite">Moment ${String(selected + 1).padStart(2, '0')} / ${String(milestones.length).padStart(2, '0')}</span><span class="story-progress-track" aria-hidden="true"><i style="width:${((selected + 1) / milestones.length) * 100}%"></i></span></div>
      ${milestones.map((milestone, index) => `<section class="story-panel" id="story-panel-${index}" role="tabpanel" aria-labelledby="story-tab-${index}" tabindex="0" ${index === selected ? '' : 'hidden'}><p class="story-period">${escapeHtml(milestone.period)}</p><h4>${escapeHtml(milestone.title)}</h4><p class="about-story-paragraph">${escapeHtml(milestone.body)}</p><span class="story-skill">${icon('checklist')}${escapeHtml(milestone.skill)}</span></section>`).join('')}
    </div>
  </section>`;
}

export function activateStoryMilestone(container, index, { focus = false } = {}) {
  if (!container) return false;
  const tabs = [...container.querySelectorAll('[data-story-milestone]')];
  if (!Number.isInteger(index) || index < 0 || index >= tabs.length) return false;
  container.dataset.storyStep = String(index);
  tabs.forEach((tab, tabIndex) => {
    const selected = tabIndex === index;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });
  container.querySelectorAll('.story-panel').forEach((panel, panelIndex) => { panel.hidden = panelIndex !== index; });
  const progress = container.querySelector('.story-progress-track > i');
  if (progress) progress.style.width = `${((index + 1) / tabs.length) * 100}%`;
  const counter = container.querySelector('.story-moment-number');
  if (counter) counter.textContent = `Moment ${String(index + 1).padStart(2, '0')} / ${String(tabs.length).padStart(2, '0')}`;
  if (focus) tabs[index].focus({ preventScroll: true });
  return true;
}
