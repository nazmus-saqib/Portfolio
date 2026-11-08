const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));

const contributionThemes = {
  webnsoftech: [
    { title: 'Visual communication', icon: 'message', takeaway: 'Turn ideas into deliverables that people can understand.' },
    { title: 'Creative range', icon: 'layers', takeaway: 'Choose the format that fits the message and the task.' },
    { title: 'Clear information', icon: 'clarity', takeaway: 'Organize information so the next person can follow it.' },
  ],
  synesis: [
    { title: 'Learning in practice', icon: 'growth', takeaway: 'Keep learning as responsibilities grow.' },
    { title: 'Requirements into plans', icon: 'plan', takeaway: 'Clarify what is needed before shaping the next step.' },
    { title: 'Feedback into revisions', icon: 'conversation', takeaway: 'Use reviews and client conversations to move the work forward.' },
  ],
  iquantile: [
    { title: 'Understand requirements', icon: 'research', takeaway: 'Keep business needs and user needs in view together.' },
    { title: 'Connect the team', icon: 'people', takeaway: 'Make requirements and feedback clear between colleagues.' },
    { title: 'Make ideas tangible', icon: 'prototype', takeaway: 'Give people something concrete to review and discuss.' },
  ],
  istoreisend: [
    { title: 'Understand the operation', icon: 'research', takeaway: 'Connect the requested work with its business objective.' },
    { title: 'Bridge disciplines', icon: 'people', takeaway: 'Keep business and technical perspectives in the same conversation.' },
    { title: 'Keep revisions moving', icon: 'cycle', takeaway: 'Coordinate feedback and revisions through the next handoff.' },
  ],
  dynamic: [
    { title: 'Hands-on setup', icon: 'devices', takeaway: 'Connect technical requirements with practical execution.' },
    { title: 'Site problem solving', icon: 'tools', takeaway: 'Confirm the need and work through the issue at its source.' },
    { title: 'Organize execution', icon: 'plan', takeaway: 'Balance priorities, timing, and the work that needs doing.' },
  ],
  'ups-staples': [
    { title: 'Listen and recommend', icon: 'conversation', takeaway: 'Understand the customer before recommending a solution.' },
    { title: 'Balance requests', icon: 'layers', takeaway: 'Keep competing requests organized while serving the customer.' },
    { title: 'Follow through', icon: 'cycle', takeaway: 'Stay in the conversation while customer issues are worked through.' },
  ],
  identify: [
    { title: 'Align people and projects', icon: 'people', takeaway: 'A shared brief gives everyone the same starting point.' },
    { title: 'Track decisions and timelines', icon: 'plan', takeaway: 'Recording decisions makes changes easier to manage.' },
    { title: 'Complete the handoff', icon: 'delivery', takeaway: 'The handoff is complete when the next owner has what they need.' },
  ],
};

const iconPaths = {
  message: '<path d="M5 4h14v11H9l-4 4V4Z"/><path d="M8 8h8M8 11h5"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 16l9 5 9-5"/>',
  clarity: '<path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h4"/>',
  growth: '<path d="M5 19V9M12 19V5M19 19v-7M3 19h18"/><path d="m15 5 4-2 2 4"/>',
  plan: '<path d="M7 4H4v16h16V4h-3M9 3h6v4H9zM8 11h8M8 15h5"/>',
  conversation: '<path d="M3 4h13v10H8l-5 4V4Z"/><path d="M17 9h4v12l-5-4h-5"/>',
  research: '<circle cx="10" cy="10" r="6"/><path d="m14.5 14.5 6 6M7 10h6M10 7v6"/>',
  people: '<circle cx="8" cy="7" r="3"/><path d="M2 20v-3a6 6 0 0 1 12 0v3M17 4a3 3 0 0 1 0 6M17 13a5 5 0 0 1 5 5v2"/>',
  prototype: '<rect x="3" y="4" width="18" height="15" rx="2"/><path d="M3 8h18M7 12h4v4H7zM14 12h4M14 16h4"/>',
  cycle: '<path d="M20 8a8 8 0 0 0-14-3L3 8M3 3v5h5M4 16a8 8 0 0 0 14 3l3-3M16 16h5v5"/>',
  devices: '<rect x="3" y="4" width="14" height="11" rx="1"/><path d="M7 20h6M10 15v5"/><rect x="17" y="10" width="4" height="10" rx="1"/>',
  tools: '<path d="m14 6 4 4M6 14l4 4M14 3a5 5 0 0 0-6 6l-5 5a4 4 0 0 0 6 6l5-5a5 5 0 0 0 6-6l-4 4-5-5 3-5Z"/>',
  delivery: '<path d="M3 5h12v13H3zM15 10h4l3 4v4h-7M7 5v5h4V5"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',
};

function icon(name) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name] || iconPaths.clarity}</svg>`;
}

export function renderRoleContributions(stop, { selectedIndex = 0 } = {}) {
  const highlights = Array.isArray(stop?.highlights) ? stop.highlights : [];
  if (!highlights.length) return '';
  const id = String(stop.id || 'work').replace(/[^a-zA-Z0-9_-]/g, '-');
  const themes = contributionThemes[stop.id] || [];
  const cards = highlights.map((description, index) => ({
    description,
    title: themes[index]?.title || `Contribution ${index + 1}`,
    icon: themes[index]?.icon || 'clarity',
    takeaway: themes[index]?.takeaway || description,
  }));
  const selected = Number.isInteger(selectedIndex) && selectedIndex >= 0 && selectedIndex < cards.length ? selectedIndex : 0;
  const headingId = `contributions-title-${id}`;
  const takeawayHeadingId = `contribution-takeaways-title-${id}`;

  return `<section class="role-contributions" data-role-contributions="${escapeHtml(stop.id || 'work')}" aria-labelledby="${headingId}">
    <header class="contribution-heading"><span class="contribution-heading-symbol" aria-hidden="true">${icon('layers')}</span><div><h3 id="${headingId}">What I brought to the work</h3><p>Each contribution connects to a skill I carry forward.</p></div></header>
    <div class="contribution-cards" role="group" aria-label="Contributions at ${escapeHtml(stop.company || 'this workplace')}">${cards.map((card, index) => {
      const takeawayId = `contribution-takeaway-${id}-${index}`;
      return `<button type="button" class="contribution-card ${index === selected ? 'is-active' : ''}" data-contribution-index="${index}" data-contribution-title="${escapeHtml(card.title)}" data-contribution-takeaway="${escapeHtml(card.takeaway)}" aria-pressed="${index === selected}" aria-controls="${takeawayId}"><span class="contribution-node" aria-hidden="true">${icon(card.icon)}</span><span class="contribution-card-body"><span class="contribution-card-topline"><strong>${escapeHtml(card.title)}</strong><span class="contribution-number" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span></span><span class="contribution-description">${escapeHtml(card.description)}</span></span></button>`;
    }).join('')}</div>
    <section class="contribution-takeaway" aria-labelledby="${takeawayHeadingId}"><header class="contribution-takeaway-heading"><span class="contribution-takeaway-mark" aria-hidden="true">${icon('growth')}</span><h4 class="contribution-takeaway-label" id="${takeawayHeadingId}">What I carry forward</h4></header><ol class="contribution-takeaway-list" role="list">${cards.map((card, index) => `<li class="contribution-takeaway-item ${index === selected ? 'is-active' : ''}" id="contribution-takeaway-${id}-${index}" data-contribution-takeaway-index="${index}"><span class="contribution-takeaway-number" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span><p class="contribution-takeaway-copy">${escapeHtml(card.takeaway)}</p></li>`).join('')}</ol></section>
  </section>`;
}

export function activateRoleContribution(root, index, { focus = false } = {}) {
  if (!root || !Number.isInteger(index)) return false;
  const cards = [...root.querySelectorAll('[data-contribution-index]')];
  const active = cards.find(card => Number(card.dataset.contributionIndex) === index);
  if (!active) return false;
  cards.forEach(card => {
    const selected = card === active;
    card.setAttribute('aria-pressed', String(selected));
    card.classList.toggle('is-active', selected);
  });
  root.querySelectorAll('[data-contribution-takeaway-index]').forEach(item => {
    item.classList.toggle('is-active', Number(item.dataset.contributionTakeawayIndex) === index);
  });
  if (focus) active.focus();
  return true;
}
