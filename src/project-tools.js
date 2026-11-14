const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));

export function renderProjectTools(project) {
  if (!project.tools?.length) return '';
  const heading = `case-tools-${esc(project.id)}`;
  return `<section class="case-project-tools" aria-labelledby="${heading}"><h3 id="${heading}">Tools &amp; methods</h3><ul class="case-tools" aria-label="Project tools and methods">${project.tools.map(tool=>`<li>${esc(tool)}</li>`).join('')}</ul></section>`;
}
