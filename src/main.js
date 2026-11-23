import '@fontsource-variable/dm-sans';
import '@fontsource/instrument-serif/latin-400-italic.css';
import { aboutMe, careerStops, formatTenure, projects, skills, education, certificates, teaching, professionalSummary, professionalTools } from './content.js';
import { renderProjectCard, renderProjectDetail } from './project-view.js';
import { bindStudyInteractions } from './case-study-sections.js';
import { renderStoryJourney, activateStoryMilestone } from './story-view.js';
import { renderProfile, renderCoordinationMetrics, activateProfileTab } from './profile-view.js';
import { renderRoleContributions, activateRoleContribution } from './contribution-view.js';
import { renderIdentifyWorkflow } from './workflow-view.js';
import { renderProfessionalOverview, renderOpportunityStatement } from './recruiter-view.js';
import { renderManagementUpdates, renderCareerBridge } from './career-context.js';
import './project-view.css';
import './case-study-sections.css';
import './story-view.css';
import './profile-view.css';
import './contribution-view.css';
import './workflow-view.css';
import './recruiter-view.css';
import './career-context.css';

const icons = {
  arrow: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" stroke-width="1.5"/></svg>',
  next: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" stroke-width="1.5"/></svg>',
  previous: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 12H5m6-6-6 6 6 6" stroke="currentColor" stroke-width="1.5"/></svg>',
  sound: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m11 5-5 4H3v6h3l5 4V5Zm4 3a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  cube: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m12 2 9 5v10l-9 5-9-5V7l9-5Zm0 20V12m9-5-9 5-9-5" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>',
  pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14m8-14v14" fill="none" stroke="currentColor" stroke-width="3"/></svg>',
  play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 11 7-11 7V5Z" fill="currentColor"/></svg>',
  close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
  download: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
};
const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[char]));
const assetUrl = path => `${import.meta.env.BASE_URL}${String(path).replace(/^\/+/, '')}`;
const number = index => String(index + 1).padStart(2, '0');
const email = 'saqibmollanazmus@gmail.com';
const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;
const outlookComposeUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(email)}`;
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const contributionHoverPreference = window.matchMedia('(any-hover: hover) and (any-pointer: fine)');
const latest = careerStops.length - 1;
// Preserve the original company numbers and map indices while reading current to previous.
let world, active = latest, worldStation = -1, panel = 'profile', reading = false, exploring = false, paused = motionPreference.matches;
let toastTimer, speaking = false, dialogTrigger, disposed = false;
let emailDialogTrigger;
let selectedStoryMilestone = 0;
let selectedProfileTab = 0;
const selectedContributions = new Map();
let contributionKeyboardInput = false;
let currentProjectId = null;
let worldInitialization = null, worldFailed = false;

document.querySelector('#app').innerHTML = `
  <a class="skip-link" href="#sidebar-body">Skip to career details</a>
  <main class="portfolio-shell" aria-label="Nazmus Saqib’s interactive portfolio">
    <header class="shell-header">
      <button type="button" class="wordmark" data-home aria-label="Nazmus Saqib, About Me">saqib<span></span></button>
      <div class="header-actions"><a href="${assetUrl('Molla_Nazmus_Saqib_Project_Coordinator_Resume.pdf')}" class="resume-link" download>Résumé ${icons.download}</a><button type="button" class="view-toggle" id="reading-toggle" aria-pressed="false">${icons.cube}<span>Focus on content</span></button></div>
    </header>

    <div class="experience-layout" id="scene-layout">
      <section class="world-pane" id="world-pane" aria-label="Explore my workplaces">
        <div class="world-note"><span class="monogram">S.</span><p>Different workplaces.<br>One connected journey.</p></div>
        <p id="travel-status" class="sr-only" role="status">About Me</p>
        <div id="world" class="world-container"></div>
        <div class="world-loading" id="world-loading"><span class="loading-orbit"></span><p>A small world is taking shape.</p></div>
        <div class="stage-tools"><a id="go-today" href="mailto:${email}" data-email-compose aria-haspopup="dialog" aria-controls="email-dialog" aria-label="Meet me today — send email">Meet me today ${icons.arrow}</a><div class="scene-hint" id="scene-hint" role="status">Choose a company. I’ll take you there.</div><div class="stage-controls"><button type="button" id="explore-toggle" aria-pressed="false">Explore <span class="toggle-track"><i></i></span></button><button type="button" class="icon-button" id="pause-world" aria-label="Pause scene animation">${icons.pause}</button></div></div>
        <div class="touch-controls" id="touch-controls" aria-label="Move character" hidden><button type="button" data-direction="up" aria-label="Move forward">↑</button><button type="button" data-direction="left" aria-label="Move left">←</button><button type="button" data-direction="down" aria-label="Move back">↓</button><button type="button" data-direction="right" aria-label="Move right">→</button></div>
      </section>

      <aside class="sidebar" aria-label="About me and career details">
        <button type="button" id="mobile-world-toggle" class="mobile-world-toggle" aria-expanded="false" aria-controls="world-pane">Explore the 3D journey</button>
        <nav class="panel-nav" id="panel-nav" aria-label="Portfolio sections"><button type="button" data-panel="profile" class="active" aria-pressed="true">About Me</button><button type="button" data-panel="journey" aria-pressed="false">Journey</button><button type="button" data-panel="projects" aria-pressed="false">Projects <span>${projects.length}</span></button><button type="button" data-panel="contact" aria-pressed="false">Contact</button></nav>
        <div class="sidebar-body" id="sidebar-body" tabindex="-1" role="region" aria-label="Career details"></div>
        <div class="company-navigation" id="company-navigation" hidden><button type="button" class="icon-button" id="previous-stop" aria-label="More recent role">${icons.previous}</button><span id="stop-counter" aria-live="polite">${number(latest)} / ${number(latest)}</span><button type="button" class="button button-secondary" id="next-stop">Previous role ${icons.next}</button><button type="button" class="icon-button" id="listen" aria-label="Listen to this company story">${icons.sound}</button></div>
      </aside>
    </div>

  </main>
  <dialog class="project-dialog" id="project-dialog" aria-labelledby="dialog-title"><button type="button" class="dialog-close icon-button" id="dialog-close" aria-label="Close project">${icons.close}</button><div id="dialog-content"></div></dialog>
  <dialog class="email-dialog" id="email-dialog" aria-labelledby="email-title" aria-describedby="email-description">
    <button type="button" class="email-close icon-button" id="email-close" aria-label="Close email options">${icons.close}</button>
    <p class="eyebrow">LET’S CONNECT</p><h2 id="email-title">Send an email</h2>
    <p id="email-description">Choose your email service, or copy my address.</p>
    <div class="email-providers"><a class="button button-dark" href="${esc(gmailComposeUrl)}" target="_blank" rel="noopener noreferrer">Open Gmail ${icons.arrow}</a><a class="button button-secondary" href="${esc(outlookComposeUrl)}" target="_blank" rel="noopener noreferrer">Open Outlook ${icons.arrow}</a></div>
    <a class="email-app-link" href="mailto:${email}">Use email app ${icons.arrow}</a>
    <div class="email-copy"><p id="email-address" tabindex="-1">${esc(email).replace('@','<wbr>@')}</p><button type="button" class="copy-email" data-copy-email>Copy email address</button></div>
    <p class="email-status" id="email-status" role="status"></p>
  </dialog>
  <div class="toast" id="toast" role="status"></div>
`;

function projectNames(stop) {
  return stop.projectIds.map(id => projects.find(project => project.id === id)).filter(Boolean);
}

function aboutMarkup() {
  return `<article class="about-story" id="about-card" aria-labelledby="about-title">
    ${renderProfessionalOverview({aboutMe,professionalSummary})}
    <details class="about-personal" id="about-personal"><summary><span class="profile-preview-title">My story &amp; beyond work</span><span class="profile-preview-excerpt">${esc(aboutMe.introduction)}</span><span class="profile-preview-toggle"><span class="profile-preview-expand">Read more</span><span class="profile-preview-collapse">Show less</span><span class="profile-preview-icon" aria-hidden="true">+</span></span></summary><div class="about-personal-body">
      <div class="about-overview"><header><p class="eyebrow">About Me &amp; My Story</p><h2 class="about-tagline">${esc(aboutMe.tagline)}</h2><div class="about-links"><button type="button" data-about-jump="story" aria-label="Read my story: Bangladesh to Canada">My story ${icons.next}</button><button type="button" data-about-jump="learning" aria-label="Read about my auto repair learning">Beyond the screen ${icons.next}</button></div></header>
      <section class="about-motivation"><h3>What keeps me curious</h3><p>${esc(aboutMe.motivation)}</p></section>
      <section class="about-learning"><h3 id="about-learning-title" tabindex="-1">${esc(aboutMe.handsOnLearning.title)}</h3><p>${esc(aboutMe.handsOnLearning.introduction)} <a href="${esc(aboutMe.handsOnLearning.url)}" target="_blank" rel="noopener noreferrer">${esc(aboutMe.handsOnLearning.organization)}</a>.</p></section></div>
      ${renderStoryJourney(aboutMe,{selectedIndex:selectedStoryMilestone})}
    </div></details>
  </article>`;
}

function companyProjectsMarkup(stop) {
  const related = projectNames(stop);
  if(!related.length)return '';
  const heading=esc(stop.projectLabel || 'Projects from this chapter');
  if(stop.id==='identify'){
    const project=related.find(item=>item.id==='identify') || related[0];
    return `<section class="company-projects company-workflow" aria-label="Projects at ${esc(stop.company)}"><h3>${heading}</h3>${renderIdentifyWorkflow()}<button type="button" class="button button-dark workflow-explore" data-project="${esc(project.id)}" aria-label="Explore the flow: ${esc(project.title)}">Explore the flow ${icons.arrow}</button>${related.filter(item=>item.id!==project.id).length?`<div class="project-chips">${related.filter(item=>item.id!==project.id).map(item=>`<button type="button" class="button button-secondary" data-project="${esc(item.id)}">${esc(item.title)} ${icons.arrow}</button>`).join('')}</div>`:''}</section>`;
  }
  return `<section class="company-projects" aria-label="Projects at ${esc(stop.company)}"><h3>${heading}</h3><div class="project-chips">${related.map(p=>`<button type="button" class="button button-dark" data-project="${esc(p.id)}" aria-label="Read ${esc(p.title)} project story"><span>${esc(p.title)}</span>${icons.arrow}</button>`).join('')}</div></section>`;
}

function companyMarkup(stop, index, compact = false) {
  const isIdentify = stop.id === 'identify';
  return `<article class="company-card ${compact?'reading-company':''} ${index===active?'is-current':''}" ${compact?'':`id="company-card"`} data-stop="${esc(stop.id)}">
    <div class="card-topline"><p class="eyebrow">${number(index)} / ${esc(stop.location)}</p><span class="employment-type">${esc(stop.employment)}</span></div>
    <h2 class="company-position" ${compact?'':'id="company-role"'}>${esc(stop.role)}</h2><p class="company-employer" ${compact?'':'id="company-name"'}>${esc(stop.company)}</p>
    <div class="job-dates"><span ${compact?'':'id="company-dates"'}>${esc(stop.period)}</span><span class="tenure" ${compact?'':'id="company-tenure"'} title="Based on the supplied month-level dates">${esc(formatTenure(stop.start,stop.end))}</span></div>
    ${isIdentify?'':companyProjectsMarkup(stop)}
    <div class="company-story${isIdentify?' identify-overview':''}" ${compact?'':'id="story-copy"'}>${isIdentify?'':`<h3>${esc(stop.headline)}</h3>`}<p>${esc(stop.story)}</p></div>
    ${isIdentify?renderCoordinationMetrics():''}
    ${renderRoleContributions(stop, { selectedIndex: selectedContributions.get(stop.id) ?? 0 })}
    ${isIdentify?renderManagementUpdates():''}
    ${isIdentify?companyProjectsMarkup(stop):''}
  </article>`;
}

function profileMarkup() {
  return renderProfile({skills,education,certificates,teaching,professionalTools},{selectedIndex:selectedProfileTab,assetUrl,aboutHtml:aboutMarkup()});
}

let projectFilter = 'operations';
function projectsMarkup() {
  const isOperations = project => project.category === 'operations' || project.id === 'identify';
  const visible = projects.filter(p=>projectFilter==='all'||(projectFilter==='operations'?isOperations(p):!isOperations(p)));
  const groups = [
    { id: 'case-studies', title: 'Documented Projects', description: 'Specific work examples, with my contribution and the result established for each.', items: visible.filter(p=>isOperations(p)&&p.storyType==='case-study') },
    { id: 'workflows', title: 'How I Work', description: 'Recurring coordination methods, rather than separate completed projects.', items: visible.filter(p=>isOperations(p)&&p.storyType==='workflow') },
    { id: 'overview', title: 'Role overview', description: 'How the responsibilities connect across my current role.', items: visible.filter(p=>isOperations(p)&&p.storyType==='overview') },
    { id: 'digital', title: 'Earlier digital projects', description: 'Design, requirements and stakeholder-review work in its original context.', items: visible.filter(p=>!isOperations(p)) },
  ];
  return `<section class="project-collection"><p class="eyebrow">CURRENT WORK & EARLIER PROJECTS</p><h1>Plans into <em>progress.</em></h1><p class="panel-description">Project examples and recurring coordination methods, with earlier digital projects available separately.</p><button type="button" class="project-tools-link" data-show-tools>View tools &amp; methods ${icons.arrow}</button><div class="project-filter" role="group" aria-label="Filter projects">${[['operations','Operations'],['digital','Earlier digital work'],['all','All work']].map(([id,name])=>`<button type="button" data-filter="${id}" aria-pressed="${id===projectFilter}" class="${id===projectFilter?'active':''}">${name}</button>`).join('')}</div><div class="project-list" id="project-list">${groups.filter(group=>group.items.length).map(group=>`<section class="project-group" data-project-group="${group.id}" aria-labelledby="project-group-${group.id}"><h2 id="project-group-${group.id}">${group.title}</h2><p>${group.description}</p>${group.id==='digital'?renderCareerBridge():''}<div class="project-group-cards">${group.items.map(p=>renderProjectCard(p,{assetUrl})).join('')}</div></section>`).join('')}</div><p class="collection-count" aria-live="polite">${visible.length} ${visible.length===1?'work story':'work stories'}</p></section>`;
}

function contactMarkup() {
  return `<section class="contact-panel"><p class="eyebrow">THE NEXT CONNECTION</p><h1>Let’s move<br><em>things forward.</em></h1><p>I coordinate cross-functional work from requirements and supplier evaluation through approvals, execution and delivery. My experience includes procurement, practical risk and issue management, operational documentation, cost analysis and stakeholder communication across business operations, technical field services and digital projects.</p><p>I enjoy turning complex requests into clear next steps, keeping people informed about decisions and dependencies, and following through when plans change. My technical education and project management training help me bridge business needs with practical execution.</p><p>${renderOpportunityStatement(professionalSummary)}</p><a class="button button-dark" href="mailto:${email}" data-email-compose aria-haspopup="dialog" aria-controls="email-dialog">Start a conversation ${icons.arrow}</a><a class="contact-email" href="mailto:${email}" data-email-compose aria-haspopup="dialog" aria-controls="email-dialog">${email}</a><button type="button" class="copy-email" data-copy-email>Copy email address</button><div class="contact-links"><a href="${assetUrl('Molla_Nazmus_Saqib_Project_Coordinator_Resume.pdf')}" download>Résumé ${icons.download}</a><a href="https://github.com/nazmus-saqib" target="_blank" rel="noopener noreferrer">GitHub ${icons.arrow}</a></div><p class="contact-location">Based in Ontario, Canada.</p></section>`;
}

function renderPanel(resetScroll = true) {
  const body=document.querySelector('#sidebar-body');
  if(panel==='journey') body.innerHTML='<h1 class="sr-only">Career experience</h1>'+(reading?`<div id="reading-view">${careerStops.map((s,i)=>companyMarkup(s,i,true)).reverse().join('')}</div>`:companyMarkup(careerStops[active],active));
  if(panel==='profile') body.innerHTML=profileMarkup();
  if(panel==='projects') body.innerHTML=projectsMarkup();
  if(panel==='contact') body.innerHTML=contactMarkup();
  body.setAttribute('aria-label',`${panel==='journey'?'Company story':panel==='profile'?'About me and my story':panel==='contact'?'Contact':panel} details`);
  document.querySelectorAll('#panel-nav [data-panel]').forEach(button=>{const selected=button.dataset.panel===panel;button.classList.toggle('active',selected);button.setAttribute('aria-pressed',selected);});
  document.querySelector('#company-navigation').hidden=panel!=='journey'||reading;
  document.querySelector('.portfolio-shell').dataset.panel=panel;
  if(resetScroll) body.scrollTop=0;
  ensureWorld();updateMotion();
}

function updateChapterControls() {
  document.querySelector('#stop-counter').textContent=`${number(active)} / ${number(latest)}`;
  document.querySelector('#previous-stop').disabled=active===latest;
  document.querySelector('#next-stop').innerHTML=`${active===0?'Back to current role':'Previous role'} ${icons.next}`;
  document.querySelector('#listen').setAttribute('aria-label','Listen to this company story');
}

function stopSpeech() {
  if('speechSynthesis' in window) window.speechSynthesis.cancel();
  speaking=false;const button=document.querySelector('#listen');button.classList.remove('speaking');button.setAttribute('aria-label','Listen to this company story');
}

function updateMotion() { world?.setPaused(paused||reading||document.hidden||getComputedStyle(document.querySelector('#world-pane')).display==='none'||document.querySelector('#project-dialog').open||document.querySelector('#email-dialog').open);document.querySelector('#pause-world').innerHTML=paused?icons.play:icons.pause;document.querySelector('#pause-world').setAttribute('aria-label',`${paused?'Resume':'Pause'} scene animation`); }
function setExploring(value) {
  exploring=!!value;
  document.querySelector('#explore-toggle').setAttribute('aria-pressed',exploring);
  document.querySelector('#touch-controls').hidden=!exploring;
  document.querySelector('#scene-hint').textContent=exploring?'Move with WASD, arrows, or the controls.':'Choose a company. I’ll take you there.';
  world?.setExploring(exploring);
}
function updateTravelStatus(arrived = false) {
  const settled=arrived||paused||reading||motionPreference.matches;
  document.querySelector('#travel-status').textContent=worldStation===-1
    ? settled?'About Me':'Returning to About Me'
    : `${settled?'At':'Visiting'} ${careerStops[worldStation].company}`;
}
function selectAbout(resetProfile = true) {
  stopSpeech();
  setExploring(false);
  worldStation=-1;
  panel='profile';
  if(resetProfile)selectedProfileTab=0;
  renderPanel();
  updateMotion();
  updateTravelStatus();
  world?.goTo(-1);
}
function selectStop(index) {
  if(index===-1){selectAbout();return;}
  if(!Number.isInteger(index)||index < 0||index>=careerStops.length)return;
  stopSpeech();active=index;worldStation=index;panel='journey';renderPanel();updateChapterControls();
  updateMotion();updateTravelStatus();
  world?.goTo(index);scrollCurrentReading();
}

function scrollCurrentReading() {if(!reading||panel!=='journey')return;const body=document.querySelector('#sidebar-body');const card=body.querySelector('#reading-view > .is-current');if(card)body.scrollTop+=card.getBoundingClientRect().top-body.getBoundingClientRect().top-8;}

function showStoryMilestone(index, focus = false) {
  if(!Number.isInteger(index)||index<0||index>=aboutMe.storyMilestones.length)return;
  selectedStoryMilestone=index;
  stopSpeech();
  activateStoryMilestone(document.querySelector('#story-journey'),index,{focus});
}

function showProfileTab(index, focus = false) {
  const explorer=document.querySelector('#profile-explorer');
  if(!explorer||!Number.isInteger(index)||index<0||index>=explorer.querySelectorAll('[data-profile-tab]').length)return;
  selectedProfileTab=index;
  stopSpeech();
  activateProfileTab(explorer,index,{focus});
}

function showRoleContribution(section, index, focus = false) {
  if(!section||!Number.isInteger(index)||index< -1||index>=section.querySelectorAll('[data-contribution-index]').length)return;
  selectedContributions.set(section.dataset.roleContributions,index);
  stopSpeech();
  activateRoleContribution(section,index,{focus});
}

document.querySelector('#app').addEventListener('click',event=>{
  const emailLink=event.target.closest('[data-email-compose]');if(emailLink){event.preventDefault();openEmailOptions(emailLink);return;}
  const contribution=event.target.closest('[data-contribution-index]');if(contribution){showRoleContribution(contribution.closest('[data-role-contributions]'),contribution.getAttribute('aria-expanded')==='true'?-1:Number(contribution.dataset.contributionIndex));return;}
  const profileTab=event.target.closest('[data-profile-tab]');if(profileTab){showProfileTab(Number(profileTab.dataset.profileTab));return;}
  const milestone=event.target.closest('[data-story-milestone]');if(milestone){showStoryMilestone(Number(milestone.dataset.storyMilestone));return;}
  const aboutJump=event.target.closest('[data-about-jump]');if(aboutJump){stopSpeech();const body=document.querySelector('#sidebar-body');const personal=body.querySelector('#about-personal');if(personal)personal.open=true;const target=body.querySelector(aboutJump.dataset.aboutJump==='story'?'#about-story-title':'#about-learning-title');if(target){target.focus({preventScroll:true});body.scrollTo({top:body.scrollTop+target.getBoundingClientRect().top-body.getBoundingClientRect().top-12,behavior:motionPreference.matches?'instant':'smooth'});}return;}
  if(event.target.closest('[data-current-experience]')){selectStop(latest);return;}
  if(event.target.closest('[data-show-tools]')){selectAbout(false);showProfileTab(1);const target=document.querySelector('#profile-tools-title');target?.focus({preventScroll:true});target?.scrollIntoView({block:'start',behavior:motionPreference.matches?'instant':'smooth'});return;}
  const project=event.target.closest('[data-project]');if(project){openProject(project.dataset.project,project);return;}
  const section=event.target.closest('button[data-panel]');if(section){if(section.dataset.panel==='profile'){selectAbout(false);}else if(section.dataset.panel==='journey'){selectStop(active);}else{stopSpeech();panel=section.dataset.panel;renderPanel();}return;}
  const category=event.target.closest('[data-filter]');if(category){projectFilter=category.dataset.filter;renderPanel(false);return;}
  if(event.target.closest('[data-home]')){selectAbout();return;}
  if(event.target.closest('[data-copy-email]')) copyEmail(event.target.closest('#email-dialog')?.querySelector('#email-status'));
});
function showHoveredContribution(event) {
  if(contributionKeyboardInput||event.pointerType!=='mouse'||!contributionHoverPreference.matches)return;
  const card=event.target.closest('[data-contribution-index]');if(!card)return;
  if(event.type==='pointerover'&&event.relatedTarget instanceof Node&&card.contains(event.relatedTarget))return;
  if(card.getAttribute('aria-expanded')==='true')return;
  showRoleContribution(card.closest('[data-role-contributions]'),Number(card.dataset.contributionIndex));
}
document.querySelector('#app').addEventListener('keydown',()=>{contributionKeyboardInput=true;},{capture:true});
document.querySelector('#app').addEventListener('pointerdown',()=>{contributionKeyboardInput=false;},{capture:true});
document.querySelector('#app').addEventListener('pointerover',showHoveredContribution);
document.querySelector('#app').addEventListener('pointermove',event=>{
  if(event.pointerType!=='mouse'||(!event.movementX&&!event.movementY))return;
  const wasKeyboard=contributionKeyboardInput;
  contributionKeyboardInput=false;
  if(wasKeyboard)showHoveredContribution(event);
});
document.querySelector('#app').addEventListener('focusin',event=>{
  const card=event.target.closest('[data-contribution-index]');
  if(!card||!card.matches(':focus-visible')||card.getAttribute('aria-expanded')==='true')return;
  showRoleContribution(card.closest('[data-role-contributions]'),Number(card.dataset.contributionIndex));
});
document.querySelector('#app').addEventListener('keydown',event=>{
  const card=event.target.closest('[data-contribution-index]');if(!card)return;
  const section=card.closest('[data-role-contributions]');
  if(event.key==='Escape'){event.preventDefault();showRoleContribution(section,-1);return;}
  const index=Number(card.dataset.contributionIndex),count=section.querySelectorAll('[data-contribution-index]').length;
  let next;
  if(event.key==='ArrowRight'||event.key==='ArrowDown')next=(index+1)%count;
  if(event.key==='ArrowLeft'||event.key==='ArrowUp')next=(index-1+count)%count;
  if(event.key==='Home')next=0;
  if(event.key==='End')next=count-1;
  if(next===undefined)return;
  event.preventDefault();showRoleContribution(section,next,true);
});
document.querySelector('#app').addEventListener('keydown',event=>{
  const tab=event.target.closest('[role="tab"][data-story-milestone]');if(!tab)return;
  const index=Number(tab.dataset.storyMilestone),count=aboutMe.storyMilestones.length;
  let next;
  if(event.key==='ArrowRight')next=(index+1)%count;
  if(event.key==='ArrowLeft')next=(index-1+count)%count;
  if(event.key==='Home')next=0;
  if(event.key==='End')next=count-1;
  if(next===undefined)return;
  event.preventDefault();showStoryMilestone(next,true);
});
document.querySelector('#app').addEventListener('keydown',event=>{
  const tab=event.target.closest('[role="tab"][data-profile-tab]');if(!tab)return;
  const index=Number(tab.dataset.profileTab),count=document.querySelectorAll('#profile-explorer [data-profile-tab]').length;
  let next;
  if(event.key==='ArrowRight')next=(index+1)%count;
  if(event.key==='ArrowLeft')next=(index-1+count)%count;
  if(event.key==='Home')next=0;
  if(event.key==='End')next=count-1;
  if(next===undefined)return;
  event.preventDefault();showProfileTab(next,true);
});
document.querySelector('#previous-stop').addEventListener('click',()=>selectStop(active+1));
document.querySelector('#next-stop').addEventListener('click',()=>selectStop(active===0?latest:active-1));

function toggleReading(force) {
  const next=typeof force==='boolean'?force:!reading;
  if(next===reading)return;
  stopSpeech();setExploring(false);
  const body=document.querySelector('#sidebar-body');
  const previousScroll=body.scrollTop;
  let chapterOffset=previousScroll;
  if(panel==='journey'&&reading){
    const top=body.getBoundingClientRect().top+parseFloat(getComputedStyle(body).paddingTop);
    const current=[...body.querySelectorAll('.reading-company')].find(card=>card.getBoundingClientRect().bottom>top+24);
    if(current){active=careerStops.findIndex(stop=>stop.id===current.dataset.stop);chapterOffset=top-current.getBoundingClientRect().top;}
  }
  reading=next;
  document.querySelector('.portfolio-shell').classList.toggle('reading-mode',reading);
  document.querySelector('#reading-toggle').setAttribute('aria-pressed',reading);
  document.querySelector('#reading-toggle span').textContent=reading?'Return to 3D':'Focus on content';
  if(panel==='journey'){
    renderPanel();updateChapterControls();
    if(reading){const card=body.querySelector('.reading-company.is-current');const first=body.querySelector('.reading-company');if(card&&first)body.scrollTop=card.offsetTop-first.offsetTop+chapterOffset;}
    else{body.scrollTop=Math.max(0,chapterOffset);worldStation=active;world?.goTo(active);}
  }else{
    // Preserve the existing DOM, selected tabs, expanded details, and reading position.
    body.scrollTop=previousScroll;
  }
  ensureWorld();updateMotion();updateTravelStatus();
}
document.querySelector('#reading-toggle').addEventListener('click',()=>toggleReading());
document.querySelector('#mobile-world-toggle').addEventListener('click',()=>{const expanded=document.querySelector('.portfolio-shell').classList.toggle('world-expanded');const button=document.querySelector('#mobile-world-toggle');button.setAttribute('aria-expanded',expanded);button.textContent=expanded?'Hide the 3D journey':'Explore the 3D journey';ensureWorld();updateMotion();});
document.querySelector('#explore-toggle').addEventListener('click',()=>setExploring(!exploring));
document.querySelector('#touch-controls').addEventListener('click',event=>{const button=event.target.closest('[data-direction]');if(button)world?.move(button.dataset.direction);});
document.querySelector('#pause-world').addEventListener('click',()=>{paused=!paused;updateMotion();});
motionPreference.addEventListener('change',()=>{paused=motionPreference.matches;updateMotion();});
document.addEventListener('visibilitychange',()=>{if(document.hidden){stopSpeech();}updateMotion();});
document.querySelector('#listen').addEventListener('click',()=>{if(speaking){stopSpeech();return;}const stop=careerStops[active];const text=`${stop.company}. ${stop.role}. ${stop.period}. ${stop.story}`;const utterance=new SpeechSynthesisUtterance(text);utterance.lang='en-CA';utterance.rate=.94;utterance.onend=utterance.onerror=()=>{speaking=false;document.querySelector('#listen').classList.remove('speaking');document.querySelector('#listen').setAttribute('aria-label','Listen to this company story');};speaking=true;document.querySelector('#listen').classList.add('speaking');document.querySelector('#listen').setAttribute('aria-label','Stop narration');window.speechSynthesis.speak(utterance);});
if(!('speechSynthesis' in window))document.querySelector('#listen').hidden=true;

function projectUrl(id) {
  const url=new URL(window.location.href);
  if(id)url.searchParams.set('project',id);else url.searchParams.delete('project');
  return url;
}
function openProject(id,trigger,{updateUrl=true}={}) {
  const project=projects.find(item=>item.id===id);if(!project)return false;
  stopSpeech();
  if(trigger)dialogTrigger=trigger;
  const dialog=document.querySelector('#project-dialog');
  const content=document.querySelector('#dialog-content');
  const changed=currentProjectId!==id;
  currentProjectId=id;
  if(changed||!dialog.open){
    content.innerHTML=renderProjectDetail(project,{assetUrl});
    bindStudyInteractions(content);
    content.scrollTop=0;
  }
  if(!dialog.open)dialog.showModal();
  if(updateUrl&&new URL(window.location.href).searchParams.get('project')!==id){history.pushState({...history.state,portfolioProject:id},'',projectUrl(id));}
  updateMotion();return true;
}
function closeProject({updateUrl=true}={}) {
  const dialog=document.querySelector('#project-dialog');
  currentProjectId=null;
  if(dialog.open)dialog.close();
  if(updateUrl&&new URL(window.location.href).searchParams.has('project')){
    // Replace a direct-link entry safely; do not navigate to an unrelated previous site.
    history.replaceState({...history.state,portfolioProject:null},'',projectUrl(null));
  }
}
function syncProjectFromUrl() {
  const id=new URL(window.location.href).searchParams.get('project');
  if(id&&projects.some(project=>project.id===id)){openProject(id,null,{updateUrl:false});return;}
  closeProject({updateUrl:false});
  if(id!==null)history.replaceState({...history.state,portfolioProject:null},'',projectUrl(null));
}
document.querySelector('#dialog-close').addEventListener('click',()=>closeProject());
document.querySelector('#project-dialog').addEventListener('cancel',event=>{event.preventDefault();closeProject();});
document.querySelector('#project-dialog').addEventListener('click',event=>{
  const projectButton=event.target.closest('[data-project]');if(projectButton){openProject(projectButton.dataset.project,projectButton);return;}
  if(event.target.closest('[data-contact]')){closeProject();panel='contact';renderPanel();document.querySelector('#sidebar-body').focus({preventScroll:true});return;}
  if(event.target===event.currentTarget){const rect=event.currentTarget.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)closeProject();}
});
document.querySelector('#project-dialog').addEventListener('close',event=>{
  // Native close restores focus immediately. Its later close event must not
  // move focus away from a card the visitor has already selected next.
  const dialog=event.currentTarget;
  const focused=document.activeElement;
  if(!dialog.open&&(!focused||focused===document.body||dialog.contains(focused))){
    const target=dialogTrigger?.isConnected?dialogTrigger:document.querySelector('#panel-nav button.active');
    target?.focus({preventScroll:true});
  }
  updateMotion();
});
window.addEventListener('popstate',syncProjectFromUrl);

function openEmailOptions(trigger) {
  stopSpeech();
  const dialog=document.querySelector('#email-dialog');
  emailDialogTrigger=trigger;
  document.querySelector('#email-status').textContent='';
  if(!dialog.open)dialog.showModal();
  updateMotion();
}
document.querySelector('#email-close').addEventListener('click',()=>document.querySelector('#email-dialog').close());
document.querySelector('#email-dialog').addEventListener('click',event=>{
  if(event.target!==event.currentTarget)return;
  const rect=event.currentTarget.getBoundingClientRect();
  if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)event.currentTarget.close();
});
document.querySelector('#email-dialog').addEventListener('close',event=>{
  const dialog=event.currentTarget,focused=document.activeElement;
  if(!dialog.open&&(!focused||focused===document.body||dialog.contains(focused))){
    const target=emailDialogTrigger?.isConnected?emailDialogTrigger:document.querySelector('#panel-nav button.active');
    target?.focus({preventScroll:true});
  }
  updateMotion();
});
async function copyEmail(status) {
  try {
    await navigator.clipboard.writeText(email);
    if(status?.closest('dialog')?.open)status.textContent='Email address copied.';
    else toast('Email copied. Let’s connect.');
  } catch {
    if(status?.closest('dialog')?.open){
      const address=document.querySelector('#email-address');
      address.focus({preventScroll:true});
      const range=document.createRange();range.selectNodeContents(address);
      const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);
      status.textContent='Copy the selected email address to continue.';
    }else toast(`Email me at ${email}`);
  }
}
function toast(text) {const node=document.querySelector('#toast');node.textContent=text;node.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>node.classList.remove('visible'),4000);}

renderPanel();updateChapterControls();updateMotion();syncProjectFromUrl();
function ensureWorld() {
  if(disposed||world||worldFailed||worldInitialization)return;
  const visible=!reading&&(window.innerWidth>860||panel==='journey'||document.querySelector('.portfolio-shell').classList.contains('world-expanded'));
  const loading=document.querySelector('#world-loading');
  if(!visible){loading.classList.add('loaded');return;}
  loading.classList.remove('loaded');
  worldInitialization=initWorld().finally(()=>{worldInitialization=null;});
}

async function initWorld() {
  try {const {createWorld}=await import('./world.js');if(disposed)return;world=createWorld({container:document.querySelector('#world'),stations:careerStops,onSelect:index=>selectStop(index),onArrival:index=>{if(index===worldStation)updateTravelStatus(true);},onReady:()=>document.querySelector('#world-loading').classList.add('loaded'),reducedMotion:motionPreference.matches});world.goTo(worldStation);world.setExploring(exploring);updateMotion();}
  catch(error){worldFailed=true;console.warn('The 3D view is unavailable; all career details remain accessible.',error);document.querySelector('#world-loading').classList.add('loaded');document.querySelector('#world').innerHTML=`<div class="world-fallback"><span aria-hidden="true">✳</span><h2>There’s another<br>way into the story.</h2><p>Explore every employer, project, and qualification in reading view.</p><button type="button" class="button button-dark" id="fallback-reading">Read my journey ${icons.next}</button></div>`;document.querySelector('#fallback-reading').addEventListener('click',()=>{selectStop(active);toggleReading(true);});document.querySelector('#explore-toggle').disabled=true;document.querySelector('#pause-world').disabled=true;}
}
ensureWorld();
window.addEventListener('resize',()=>{ensureWorld();updateMotion();});
window.addEventListener('pagehide',event=>{stopSpeech();if(!event.persisted){disposed=true;world?.dispose();}},{once:true});
