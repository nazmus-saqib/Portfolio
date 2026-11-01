import '@fontsource-variable/dm-sans';
import '@fontsource/instrument-serif/latin-400-italic.css';
import { aboutMe, careerStops, professionalSummary, formatTenure, projects, skills, education, certificates, teaching } from './content.js';
import { renderProjectCard, renderProjectDetail } from './project-view.js';
import { renderStoryJourney, activateStoryMilestone } from './story-view.js';
import { renderProfile, activateProfileTab } from './profile-view.js';
import { renderRoleContributions, activateRoleContribution } from './contribution-view.js';
import { renderIdentifyWorkflow } from './workflow-view.js';
import './project-view.css';
import './story-view.css';
import './profile-view.css';
import './contribution-view.css';
import './workflow-view.css';

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
const email = 'saqib.uxui@gmail.com';
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const latest = careerStops.length - 1;
let world, active = -1, panel = 'journey', reading = false, exploring = false, paused = motionPreference.matches;
let toastTimer, speaking = false, dialogTrigger, disposed = false;
let selectedStoryMilestone = 0;
let selectedProfileTab = 0;
const selectedContributions = new Map();

document.querySelector('#app').innerHTML = `
  <a class="skip-link" href="#sidebar-body">Skip to career details</a>
  <main class="portfolio-shell" aria-label="Nazmus Saqib’s interactive portfolio">
    <header class="shell-header">
      <button type="button" class="wordmark" data-home aria-label="Nazmus Saqib, start of journey">saqib<span></span></button>
      <div class="header-actions"><a href="${assetUrl('Molla_Nazmus_Saqib_Project_Coordinator_Resume.pdf')}" class="resume-link" download>Résumé ${icons.download}</a><button type="button" class="view-toggle" id="reading-toggle" aria-pressed="false">${icons.cube}<span>Reading view</span></button></div>
    </header>

    <div class="experience-layout" id="scene-layout">
      <section class="world-pane" id="world-pane" aria-label="Explore my workplaces">
        <div class="world-note"><span class="monogram">S.</span><p>Different workplaces.<br>One connected journey.</p></div>
        <div class="world-meta"><span>MY STORY + ${careerStops.length} WORKPLACES</span><span id="travel-status" role="status">Meet Saqib</span></div>
        <div id="world" class="world-container"></div>
        <div class="world-loading" id="world-loading"><span class="loading-orbit"></span><p>A small world is taking shape.</p></div>
        <div class="stage-tools"><button type="button" id="go-today">Meet me today ${icons.arrow}</button><div class="scene-hint" id="scene-hint">Choose a company. I’ll take you there.</div><div class="stage-controls"><button type="button" id="explore-toggle" aria-pressed="false">Explore <span class="toggle-track"><i></i></span></button><button type="button" class="icon-button" id="pause-world" aria-label="Pause scene animation">${icons.pause}</button></div></div>
        <div class="touch-controls" id="touch-controls" aria-label="Move character" hidden><button type="button" data-direction="up" aria-label="Move forward">↑</button><button type="button" data-direction="left" aria-label="Move left">←</button><button type="button" data-direction="down" aria-label="Move back">↓</button><button type="button" data-direction="right" aria-label="Move right">→</button></div>
      </section>

      <aside class="sidebar" aria-label="Professional profile and career details">
        <nav class="panel-nav" id="panel-nav" aria-label="Portfolio sections"><button type="button" data-panel="journey" class="active" aria-pressed="true">Journey</button><button type="button" data-panel="profile" aria-pressed="false">Profile</button><button type="button" data-panel="projects" aria-pressed="false">Projects <span>${projects.length}</span></button><button type="button" data-panel="contact" aria-pressed="false">Contact</button></nav>
        <div class="sidebar-body" id="sidebar-body" tabindex="-1" role="region" aria-label="Career details"></div>
        <div class="company-navigation" id="company-navigation"><button type="button" class="icon-button" id="previous-stop" aria-label="Previous chapter">${icons.previous}</button><span id="stop-counter" aria-live="polite">00 / ${number(latest)}</span><button type="button" class="button button-secondary" id="next-stop">First company ${icons.next}</button><button type="button" class="icon-button" id="listen" aria-label="Listen to my story">${icons.sound}</button></div>
      </aside>
    </div>

  </main>
  <dialog class="project-dialog" id="project-dialog" aria-labelledby="dialog-title"><button type="button" class="dialog-close icon-button" id="dialog-close" aria-label="Close project">${icons.close}</button><div id="dialog-content"></div></dialog>
  <div class="toast" id="toast" role="status"></div>
`;

function projectNames(stop) {
  return stop.projectIds.map(id => projects.find(project => project.id === id)).filter(Boolean);
}

function aboutMarkup(compact = false) {
  return `<article class="about-story ${compact?'reading-about':''} ${active===-1?'is-current':''}" id="about-card" aria-labelledby="about-title">
    <div class="about-overview"><header><p class="eyebrow">00 / About Me &amp; My Story</p><h1 id="about-title">${esc(aboutMe.name)}</h1><p class="about-position"><strong>${esc(aboutMe.position)}</strong>, <span class="about-company">${esc(aboutMe.company)}</span></p><div class="about-links"><button type="button" data-about-jump="story" aria-label="Read my story: Bangladesh to Canada">My story ${icons.next}</button><button type="button" data-about-jump="goal" aria-label="My career goal">My goal ${icons.next}</button></div></header>
    <h3 class="about-tagline">${esc(aboutMe.tagline)}</h3><p class="about-statement">${esc(aboutMe.professionalStatement)}</p>
    <section class="about-motivation"><h3>What drives me</h3><p>${esc(aboutMe.motivation)}</p></section>
    <section class="about-goal"><h3 id="about-goal-title" tabindex="-1">Where I’m headed</h3><p>${esc(aboutMe.goal)}</p></section><footer class="about-signature"><span>THE WORLD OF MY WORK</span><span aria-hidden="true">/</span><strong>PEOPLE. PLANS. FOLLOW-THROUGH.</strong></footer></div>
    ${renderStoryJourney(aboutMe,{selectedIndex:selectedStoryMilestone})}
  </article>`;
}

function companyProjectsMarkup(stop) {
  const related = projectNames(stop);
  if(!related.length)return '';
  const heading=esc(stop.projectLabel || 'Projects from this chapter');
  if(stop.id==='identify'){
    const project=related.find(item=>item.id==='identify') || related[0];
    return `<section class="company-projects company-workflow" aria-label="Projects at ${esc(stop.company)}"><h3>${heading}</h3>${renderIdentifyWorkflow()}<button type="button" class="button button-dark workflow-explore" data-project="${esc(project.id)}" aria-label="Explore the flow: ${esc(project.title)}">Explore the flow ${icons.arrow}</button></section>`;
  }
  return `<section class="company-projects" aria-label="Projects at ${esc(stop.company)}"><h3>${heading}</h3><div class="project-chips">${related.map(p=>`<button type="button" class="button button-dark" data-project="${esc(p.id)}" aria-label="Read ${esc(p.title)} project story"><span>${esc(p.title)}</span>${icons.arrow}</button>`).join('')}</div></section>`;
}

function companyMarkup(stop, index, compact = false) {
  return `<article class="company-card ${compact?'reading-company':''} ${index===active?'is-current':''}" ${compact?'':`id="company-card"`} data-stop="${esc(stop.id)}">
    <div class="card-topline"><p class="eyebrow">${number(index)} / ${esc(stop.location)}</p><span class="employment-type">${esc(stop.employment)}</span></div>
    <h2 ${compact?'':'id="company-name"'}>${esc(stop.company)}</h2><p class="company-role" ${compact?'':'id="company-role"'}>${esc(stop.role)}</p>
    <div class="job-dates"><span ${compact?'':'id="company-dates"'}>${esc(stop.period)}</span><span class="tenure" ${compact?'':'id="company-tenure"'} title="Based on the supplied month-level dates">${esc(formatTenure(stop.start,stop.end))}</span></div>
    ${companyProjectsMarkup(stop)}
    <div class="company-story" ${compact?'':'id="story-copy"'}><h3>${esc(stop.headline)}</h3><p>${esc(stop.story)}</p></div>
    ${renderRoleContributions(stop, { selectedIndex: selectedContributions.get(stop.id) ?? 0 })}
  </article>`;
}

function profileMarkup() {
  return renderProfile({professionalSummary,skills,education,certificates,teaching},{selectedIndex:selectedProfileTab,assetUrl});
}

let projectFilter = 'all';
function projectsMarkup() {
  const visible = projects.filter(p=>projectFilter==='all'||(projectFilter==='operations'?p.id==='identify':p.id!=='identify'));
  return `<section class="project-collection"><p class="eyebrow">CURRENT WORK & EARLIER PROJECTS</p><h2>Plans into <em>progress.</em></h2><p class="panel-description">Coordination is my focus today. Earlier digital work shows the requirements, communication, and systems thinking behind it.</p><div class="project-filter" role="group" aria-label="Filter projects">${[['all','All work'],['operations','Operations'],['digital','Earlier digital work']].map(([id,name])=>`<button type="button" data-filter="${id}" aria-pressed="${id===projectFilter}" class="${id===projectFilter?'active':''}">${name}</button>`).join('')}</div><div class="project-list" id="project-list">${visible.map(p=>renderProjectCard(p,{assetUrl})).join('')}</div><p class="collection-count" aria-live="polite">${visible.length} ${visible.length===1?'work story':'work stories'}</p></section>`;
}

function contactMarkup() {
  return `<section class="contact-panel"><p class="eyebrow">THE NEXT CONNECTION</p><h2>Let’s move<br><em>things forward.</em></h2><p>I bring a technical foundation, hands-on coordination experience, and a clear line of communication between clients, vendors, and teams.</p><p>If you’re hiring a Project Coordinator or Assistant Project Manager, I’d welcome a conversation.</p><a class="button button-dark" href="mailto:${email}">Start a conversation ${icons.arrow}</a><a class="contact-email" href="mailto:${email}">${email}</a><button type="button" class="copy-email" data-copy-email>Copy email address</button><div class="contact-links"><a href="${assetUrl('Molla_Nazmus_Saqib_Project_Coordinator_Resume.pdf')}" download>Résumé ${icons.download}</a><a href="https://github.com/nazmus-saqib" target="_blank" rel="noopener noreferrer">GitHub ${icons.arrow}</a></div><p class="contact-location">Based in Ontario, Canada.</p></section>`;
}

function renderPanel(resetScroll = true) {
  const body=document.querySelector('#sidebar-body');
  if(panel==='journey') body.innerHTML=reading?`<div id="reading-view">${aboutMarkup(true)}${careerStops.map((s,i)=>companyMarkup(s,i,true)).join('')}</div>`:active===-1?aboutMarkup():companyMarkup(careerStops[active],active);
  if(panel==='profile') body.innerHTML=profileMarkup();
  if(panel==='projects') body.innerHTML=projectsMarkup();
  if(panel==='contact') body.innerHTML=contactMarkup();
  body.setAttribute('aria-label',`${panel==='journey'?(active===-1?'About me and my story':'Company story'):panel} details`);
  document.querySelectorAll('#panel-nav [data-panel]').forEach(button=>{const selected=button.dataset.panel===panel;button.classList.toggle('active',selected);button.setAttribute('aria-pressed',selected);});
  document.querySelector('#company-navigation').hidden=panel!=='journey'||reading;
  document.querySelector('.portfolio-shell').dataset.panel=panel;
  if(resetScroll) body.scrollTop=0;
}

function updateChapterControls() {
  document.querySelector('#stop-counter').textContent=`${number(active)} / ${number(latest)}`;
  document.querySelector('#previous-stop').disabled=active===-1;
  document.querySelector('#next-stop').innerHTML=`${active===latest?'Back to my story':active===-1?'First company':'Next company'} ${icons.next}`;
  document.querySelector('#listen').setAttribute('aria-label',active===-1?'Listen to my story':'Listen to this company story');
}

function stopSpeech() {
  if('speechSynthesis' in window) window.speechSynthesis.cancel();
  speaking=false;const button=document.querySelector('#listen');button.classList.remove('speaking');button.setAttribute('aria-label',active===-1?'Listen to my story':'Listen to this company story');
}

function updateMotion() { world?.setPaused(paused||reading||document.hidden||document.querySelector('#project-dialog').open);document.querySelector('#pause-world').innerHTML=paused?icons.play:icons.pause;document.querySelector('#pause-world').setAttribute('aria-label',`${paused?'Resume':'Pause'} scene animation`); }
function selectStop(index) {
  if(!Number.isInteger(index)||index < -1||index>=careerStops.length)return;
  stopSpeech();active=index;panel='journey';renderPanel();updateChapterControls();
  document.querySelector('#travel-status').textContent=active===-1?'Meet Saqib':`${paused||motionPreference.matches?'At':'Visiting'} ${careerStops[active].company}`;
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
  if(!section||!Number.isInteger(index)||index<0||index>=section.querySelectorAll('[data-contribution-index]').length)return;
  selectedContributions.set(section.dataset.roleContributions,index);
  stopSpeech();
  activateRoleContribution(section,index,{focus});
}

document.querySelector('#app').addEventListener('click',event=>{
  const contribution=event.target.closest('[data-contribution-index]');if(contribution){showRoleContribution(contribution.closest('[data-role-contributions]'),Number(contribution.dataset.contributionIndex));return;}
  const profileTab=event.target.closest('[data-profile-tab]');if(profileTab){showProfileTab(Number(profileTab.dataset.profileTab));return;}
  const milestone=event.target.closest('[data-story-milestone]');if(milestone){showStoryMilestone(Number(milestone.dataset.storyMilestone));return;}
  const aboutJump=event.target.closest('[data-about-jump]');if(aboutJump){stopSpeech();const body=document.querySelector('#sidebar-body');const target=body.querySelector(aboutJump.dataset.aboutJump==='story'?'#about-story-title':'#about-goal-title');if(target){target.focus({preventScroll:true});body.scrollTo({top:body.scrollTop+target.getBoundingClientRect().top-body.getBoundingClientRect().top-12,behavior:motionPreference.matches?'instant':'smooth'});}return;}
  const project=event.target.closest('[data-project]');if(project){openProject(project.dataset.project,project);return;}
  const section=event.target.closest('button[data-panel]');if(section){stopSpeech();panel=section.dataset.panel;renderPanel();return;}
  const category=event.target.closest('[data-filter]');if(category){projectFilter=category.dataset.filter;renderPanel(false);return;}
  if(event.target.closest('[data-home]')){selectStop(-1);return;}
  if(event.target.closest('[data-copy-email]')) copyEmail();
});
document.querySelector('#app').addEventListener('keydown',event=>{
  const card=event.target.closest('[data-contribution-index]');if(!card)return;
  const section=card.closest('[data-role-contributions]');
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
document.querySelector('#previous-stop').addEventListener('click',()=>selectStop(active-1));
document.querySelector('#next-stop').addEventListener('click',()=>selectStop(active===latest?-1:active+1));
document.querySelector('#go-today').addEventListener('click',()=>selectStop(latest));

function toggleReading(force) {reading=typeof force==='boolean'?force:!reading;stopSpeech();document.querySelector('.portfolio-shell').classList.toggle('reading-mode',reading);document.querySelector('#reading-toggle').setAttribute('aria-pressed',reading);document.querySelector('#reading-toggle span').textContent=reading?'3D view':'Reading view';panel='journey';renderPanel();scrollCurrentReading();updateMotion();}
document.querySelector('#reading-toggle').addEventListener('click',()=>toggleReading());
document.querySelector('#explore-toggle').addEventListener('click',()=>{exploring=!exploring;world?.setExploring(exploring);document.querySelector('#explore-toggle').setAttribute('aria-pressed',exploring);document.querySelector('#touch-controls').hidden=!exploring;document.querySelector('#scene-hint').textContent=exploring?'Move with WASD, arrows, or the controls.':'Choose a company. I’ll take you there.';});
document.querySelector('#touch-controls').addEventListener('click',event=>{const button=event.target.closest('[data-direction]');if(button)world?.move(button.dataset.direction);});
document.querySelector('#pause-world').addEventListener('click',()=>{paused=!paused;updateMotion();});
motionPreference.addEventListener('change',()=>{paused=motionPreference.matches;updateMotion();});
document.addEventListener('visibilitychange',()=>{if(document.hidden){stopSpeech();}updateMotion();});
document.querySelector('#listen').addEventListener('click',()=>{if(speaking){stopSpeech();return;}const stop=careerStops[active];const text=active===-1?`${aboutMe.name}. ${aboutMe.position}. ${aboutMe.professionalStatement} ${aboutMe.motivation} ${aboutMe.goal} ${aboutMe.story.join(' ')}`:`${stop.company}. ${stop.role}. ${stop.period}. ${stop.story}`;const utterance=new SpeechSynthesisUtterance(text);utterance.lang='en-CA';utterance.rate=.94;utterance.onend=utterance.onerror=()=>{speaking=false;document.querySelector('#listen').classList.remove('speaking');document.querySelector('#listen').setAttribute('aria-label',active===-1?'Listen to my story':'Listen to this company story');};speaking=true;document.querySelector('#listen').classList.add('speaking');document.querySelector('#listen').setAttribute('aria-label','Stop narration');window.speechSynthesis.speak(utterance);});
if(!('speechSynthesis' in window))document.querySelector('#listen').hidden=true;

function openProject(id,trigger) {const project=projects.find(item=>item.id===id);if(!project)return;stopSpeech();dialogTrigger=trigger;document.querySelector('#dialog-content').innerHTML=renderProjectDetail(project,{assetUrl});document.querySelector('#project-dialog').showModal();document.querySelector('#dialog-content').scrollTop=0;updateMotion();}
function closeProject() {document.querySelector('#project-dialog').close();}
document.querySelector('#dialog-close').addEventListener('click',closeProject);
document.querySelector('#project-dialog').addEventListener('click',event=>{if(event.target.closest('[data-contact]')){closeProject();panel='contact';renderPanel();return;}if(event.target===event.currentTarget){const rect=event.currentTarget.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)closeProject();}});
document.querySelector('#project-dialog').addEventListener('close',()=>{if(dialogTrigger?.isConnected)dialogTrigger.focus({preventScroll:true});updateMotion();});
async function copyEmail() {try{await navigator.clipboard.writeText(email);toast('Email copied. Let’s connect.');}catch{toast(`Email me at ${email}`);}}
function toast(text) {const node=document.querySelector('#toast');node.textContent=text;node.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>node.classList.remove('visible'),4000);}

renderPanel();updateChapterControls();updateMotion();
async function initWorld() {
  try {const {createWorld}=await import('./world.js');if(disposed)return;world=createWorld({container:document.querySelector('#world'),stations:careerStops,onSelect:index=>selectStop(index),onArrival:index=>{if(index===active)document.querySelector('#travel-status').textContent=index===-1?'Meet Saqib':`At ${careerStops[index].company}`;},onReady:()=>document.querySelector('#world-loading').classList.add('loaded'),reducedMotion:motionPreference.matches});world.goTo(active);updateMotion();}
  catch(error){console.warn('The 3D view is unavailable; all career details remain accessible.',error);document.querySelector('#world-loading').classList.add('loaded');document.querySelector('#world').innerHTML=`<div class="world-fallback"><span aria-hidden="true">✳</span><h2>There’s another<br>way into the story.</h2><p>Explore every employer, project, and qualification in reading view.</p><button type="button" class="button button-dark" id="fallback-reading">Read my journey ${icons.next}</button></div>`;document.querySelector('#fallback-reading').addEventListener('click',()=>toggleReading(true));document.querySelector('#explore-toggle').disabled=true;document.querySelector('#pause-world').disabled=true;}
}
initWorld();
window.addEventListener('pagehide',event=>{stopSpeech();if(!event.persisted){disposed=true;world?.dispose();}},{once:true});
