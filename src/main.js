import '@fontsource-variable/dm-sans';
import '@fontsource/instrument-serif/latin-400-italic.css';
import { chapters, projects, experience, skills, certificates, education } from './content.js';

const icons = {
  arrow: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" stroke-width="1.5"/></svg>',
  right: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" stroke-width="1.5"/></svg>',
  sound: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m11 5-5 4H3v6h3l5 4V5Zm4 3a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  cube: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m12 2 9 5v10l-9 5-9-5V7l9-5Zm0 20V12m9-5-9 5-9-5m4.5-2.5 9 5" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>',
  pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14m8-14v14" fill="none" stroke="currentColor" stroke-width="3"/></svg>',
  play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 11 7-11 7V5Z" fill="currentColor"/></svg>',
  plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
  close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
  download: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
};
const esc = (v) => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const number = i => String(i + 1).padStart(2, '0');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const chapterNames = ['Design', 'Systems', 'Growth', 'Delivery'];
const email = 'saqib.uxui@gmail.com';
let world, currentChapter = 3, paused = reducedMotion.matches, exploring = false, simpleView = false, expanded = false, filter = 'all';
let speaking = false, modalTrigger;

document.querySelector('#app').innerHTML = `
  <a class="skip-link" href="#selected-work">Skip to selected work</a>
  <header class="site-header">
    <a class="wordmark" href="#home" aria-label="Nazmus Saqib, home">saqib<span class="brand-dot"></span></a>
    <nav class="main-nav" aria-label="Main navigation"><a href="#selected-work">Selected work <span>${number(projects.length-1)}</span></a><a href="#about">The person</a><a class="nav-contact" href="#contact">Let’s talk ${icons.arrow}</a></nav>
  </header>
  <main id="home">
    <section class="intro page-width" aria-labelledby="intro-title">
      <div class="intro-topline"><p class="eyebrow"><span class="tiny-cross">✳</span> PROJECT COORDINATION. OPERATIONS. PEOPLE.</p><span class="location"><i></i> ONTARIO, CANADA</span></div>
      <div class="intro-copy"><h1 id="intro-title">Bringing it<br><em>all together.</em><span class="title-spark" aria-hidden="true">✳</span></h1><div class="intro-aside"><p>I’m <strong>Nazmus Saqib, a project coordinator.</strong> I connect clients, vendors, and teams—and keep the moving parts moving forward.</p><a href="#journey" class="text-link">A little world. My story. <span>↓</span></a></div></div>
    </section>

    <section id="journey" class="journey page-width" aria-label="Interactive career journey">
      <div class="journey-heading"><div><span class="status-light"></span><span>THE WORLD OF MY WORK</span><span class="heading-separator">/</span><span class="subtle">EXPLORE THE CONNECTIONS</span></div><button class="view-toggle" id="view-toggle" type="button" aria-pressed="false">${icons.cube}<span>Switch to reading view</span></button></div>
      <div class="scene-layout" id="scene-layout">
        <div class="world-pane">
          <div id="world" class="world-container" aria-label="3D career world"></div>
          <div class="world-loading" id="world-loading"><span class="loading-orbit"></span><span>A small world is taking shape.</span></div>
          <div class="world-note"><span class="world-note-mark">S.</span><span>Different places.<br>The same curious mind.</span></div>
          <div class="scene-hint" id="scene-hint"><span class="key-mini">${icons.arrow}</span> Pick a place. I’ll meet you there.</div>
          <div class="touch-controls" id="touch-controls" hidden aria-label="Move character"><button type="button" data-direction="up" aria-label="Move forward">↑</button><button type="button" data-direction="left" aria-label="Move left">←</button><button type="button" data-direction="down" aria-label="Move back">↓</button><button type="button" data-direction="right" aria-label="Move right">→</button></div>
        </div>
        <aside class="story-panel" aria-label="Chapter narration">
          <div class="chapter-counter"><span id="chapter-counter">01</span><span class="counter-line"></span><span>04</span><span class="story-location" id="story-location"></span></div>
          <div id="story-copy" class="story-copy" aria-live="polite" aria-atomic="true"></div>
          <div class="story-bottom"><div class="story-controls"><button id="next-chapter" class="button button-dark" type="button">Next chapter ${icons.right}</button><button id="listen" class="icon-button" type="button" aria-label="Listen to this chapter" title="Listen to this chapter">${icons.sound}</button></div><button type="button" class="story-whisper story-related" id="story-related">See the work behind this chapter ${icons.arrow}</button></div>
        </aside>
      </div>
      <div class="reading-view" id="reading-view" hidden>${chapters.map((c,i)=>`<article class="reading-chapter"><span class="eyebrow">${number(i)} / ${esc(c.place)}</span><h3>${esc(c.title)}</h3><p>${esc(c.body)}</p><p class="reading-detail">${esc(c.detail)}</p><div class="tag-list">${c.tags.map(t=>`<span>${esc(t)}</span>`).join('')}</div></article>`).join('')}</div>
      <div class="journey-toolbar"><div class="chapter-tabs" role="group" aria-label="Choose a story chapter">${chapterNames.map((n,i)=>`<button type="button" class="chapter-tab ${i===0?'active':''}" data-chapter="${i}" aria-pressed="${i===0}"><span>${number(i)}</span>${n}<i></i></button>`).join('')}</div><div class="world-controls"><button type="button" id="explore-toggle" aria-pressed="false">Explore freely <span class="toggle-track"><i></i></span></button><button type="button" id="pause-world" class="icon-button" aria-label="${paused?'Resume':'Pause'} scene animation">${paused?icons.play:icons.pause}</button></div></div>
    </section>

    <section id="selected-work" class="work-section page-width" aria-labelledby="work-title">
      <div class="section-topline"><span class="eyebrow">01 / SELECTED WORK</span><span class="section-note">Different challenges. A human thread.</span></div>
      <div class="section-heading"><h2 id="work-title">Plans into<br><em>progress.</em></h2><p>Coordination is the focus of my work today. Earlier digital projects show the requirements, communication, and systems thinking I bring to it.</p></div>
      <div class="work-filter" role="group" aria-label="Filter projects"><button type="button" data-filter="all" class="active" aria-pressed="true">All work <span>${projects.length}</span></button><button type="button" data-filter="operations" aria-pressed="false">Project & operations</button><button type="button" data-filter="digital" aria-pressed="false">Earlier digital work</button></div>
      <div class="project-grid" id="project-grid"></div>
      <div class="more-work"><p id="work-count" aria-live="polite"></p><button class="button button-outline" id="more-projects" type="button">Explore the rest ${icons.plus}</button></div>
    </section>

    <section id="about" class="about-section" aria-labelledby="about-title"><div class="page-width">
      <div class="section-topline"><span class="eyebrow">02 / THE PERSON BEHIND THE PROJECTS</span><span class="small-star" aria-hidden="true">✳</span></div>
      <div class="about-intro"><h2 id="about-title">People. Clarity.<br><em>Follow-through.</em></h2><div><p>I started in UX, learning to ask better questions and make complex things easier to use. Today, I bring that same care to project coordination.</p><p>At Identify BDA, I connect clients, designers, vendors, and delivery partners—from the first request to the final handoff. The medium has changed. The way I think hasn’t.</p><a class="text-link light" href="/nazmus-saqib-resume.pdf" download>Get the full résumé ${icons.download}</a></div></div>
      <div class="proof-points"><div><span>03</span><p>Countries in my journey</p></div><div><span>20<span class="stat-plus">+</span></span><p>External vendors coordinated</p></div><div><span>6–10</span><p>Projects coordinated per month</p></div><div class="proof-note">A technical foundation.<br>A people-first approach.<br>Always a work in progress.</div></div>
      <div class="experience-heading"><h3>The path so far</h3><span>EXPERIENCE & EDUCATION</span></div>
      <div class="experience-list">${experience.map((e,i)=>`<details class="experience-item" ${i===0?'open':''}><summary><span class="experience-period">${esc(e.period)}</span><span class="experience-role"><strong>${esc(e.title)}</strong><span>${esc(e.company)}</span></span><span class="experience-plus">${icons.plus}</span></summary><p>${esc(e.description)}</p></details>`).join('')}</div>
      <div class="education-grid" aria-label="Education">${education.map(e=>`<article><span class="eyebrow">${esc(e.qualification)}</span><h3>${esc(e.title)}</h3><p>${esc(e.school)}</p></article>`).join('')}</div>
    </div></section>

    <section class="skills-section page-width" aria-labelledby="skills-title"><div class="section-topline"><span class="eyebrow">03 / WHAT I BRING TO THE TABLE</span><span class="section-note">Tools change. Good questions stay.</span></div><div class="section-heading"><h2 id="skills-title">From the big picture<br>to the <em>little details.</em></h2></div><div class="skills-grid">${skills.map((s,i)=>`<article class="skill-card"><span class="skill-mark" aria-hidden="true">${[icons.cube,icons.arrow,icons.sound,icons.plus][i%4]}</span><span class="skill-index">${number(i)}</span><h3>${esc(s.title)}</h3><p>${esc(s.description)}</p><div class="skill-tools">${s.items.map(t=>`<span>${esc(t)}</span>`).join('')}</div></article>`).join('')}</div><details class="learning-list"><summary><span><span class="eyebrow">STILL CURIOUS</span><strong>Learning is part of the practice.</strong></span><span class="learning-action">Courses & knowledge sharing ${icons.plus}</span></summary><div class="certificates">${certificates.map(c=>`<div><h4>${esc(c.title)}</h4><p>${esc(c.issuer)} <span>· ${esc(c.date)}</span></p></div>`).join('')}<div><h4>Wireframe & Prototype in XD</h4><p>Trainer, Synesis IT <span>· August 17, 2021</span></p></div></div></details></section>

    <section id="contact" class="contact-section page-width" aria-labelledby="contact-title"><div class="contact-card"><div class="contact-top"><span class="eyebrow">THE NEXT CONNECTION</span><span>ONTARIO, CANADA <span class="contact-star">✳</span></span></div><h2 id="contact-title">Good things happen<br>when we <em>connect.</em></h2><div class="contact-bottom"><p>A project, an opportunity, or a good conversation.<br>I’d like to hear what you have in mind.</p><a class="button button-lime" href="mailto:${email}">Let’s start a conversation ${icons.arrow}</a></div><div class="contact-email"><a href="mailto:${email}">${email}</a><button type="button" id="copy-email" aria-label="Copy email address">Copy email ${icons.plus}</button></div></div></section>
  </main>
  <footer class="site-footer page-width"><a href="#home" class="wordmark" aria-label="Back to top">saqib<span class="brand-dot"></span></a><p>Thoughtfully connected. Always evolving.</p><div><a href="https://github.com/nazmus-saqib" target="_blank" rel="noopener noreferrer">GitHub ${icons.arrow}</a><a href="#home">Back to top ↑</a></div><span class="copyright">© ${new Date().getFullYear()} Nazmus Saqib</span></footer>
  <dialog class="project-dialog" id="project-dialog" aria-labelledby="dialog-title"><button class="dialog-close icon-button" id="dialog-close" type="button" aria-label="Close project">${icons.close}</button><div id="dialog-content"></div></dialog>
  <div class="toast" role="status" id="toast"></div>
`;

function renderStory() {
  const c = chapters[currentChapter];
  document.querySelector('#chapter-counter').textContent = number(currentChapter);
  document.querySelector('#story-location').textContent = c.place;
  document.querySelector('#story-copy').innerHTML = `<p class="eyebrow">${esc(c.eyebrow)}</p><h2>${esc(c.title)}</h2><p class="story-body">${esc(c.body)}</p><p class="story-detail">${esc(c.detail)}</p><div class="tag-list">${c.tags.map(t=>`<span>${esc(t)}</span>`).join('')}</div>`;
  document.querySelector('#story-related').innerHTML=`${currentChapter===3?'See my coordination workflow':'See the work behind this chapter'} ${icons.arrow}`;
  document.querySelector('#next-chapter').innerHTML = `${currentChapter===chapters.length-1?'Back to the beginning':'Next chapter'} ${icons.right}`;
  document.querySelectorAll('[data-chapter]').forEach(b => { const active=Number(b.dataset.chapter)===currentChapter; b.classList.toggle('active',active); b.setAttribute('aria-pressed',active); });
}
function stopSpeech() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  speaking=false;
  document.querySelector('#listen').classList.remove('speaking');
  document.querySelector('#listen').setAttribute('aria-label','Listen to this chapter');
}
function selectChapter(index) {
  if(index<0 || index>=chapters.length) return;
  stopSpeech();
  currentChapter=index; renderStory(); world?.goTo(index);
}
document.querySelector('.chapter-tabs').addEventListener('click',e=>{ const b=e.target.closest('[data-chapter]'); if(b) selectChapter(Number(b.dataset.chapter)); });
document.querySelector('#next-chapter').addEventListener('click',()=>selectChapter((currentChapter+1)%chapters.length));
document.querySelector('#listen').addEventListener('click',()=>{
  if(speaking) return stopSpeech();
  const c=chapters[currentChapter];
  const utterance=new SpeechSynthesisUtterance(`${c.title}. ${c.body} ${c.detail}`);
  utterance.lang='en-CA'; utterance.rate=.94;
  utterance.onend=utterance.onerror=()=>{speaking=false; document.querySelector('#listen').classList.remove('speaking');document.querySelector('#listen').setAttribute('aria-label','Listen to this chapter');};
  speaking=true; document.querySelector('#listen').classList.add('speaking');document.querySelector('#listen').setAttribute('aria-label','Stop narration');
  window.speechSynthesis.speak(utterance);
});
if(!('speechSynthesis' in window)) document.querySelector('#listen').hidden=true;

function toggleReading(force) {
  simpleView=typeof force==='boolean'?force:!simpleView;
  document.querySelector('#reading-view').hidden=!simpleView;
  document.querySelector('#scene-layout').hidden=simpleView;
  document.querySelector('#view-toggle').setAttribute('aria-pressed',simpleView);
  document.querySelector('#view-toggle span').textContent=simpleView?'Switch to 3D view':'Switch to reading view';
  document.querySelector('.journey-toolbar').hidden=simpleView;
  world?.setPaused(paused || simpleView || document.hidden);
}
document.querySelector('#view-toggle').addEventListener('click',()=>toggleReading());
document.querySelector('#explore-toggle').addEventListener('click',()=>{
  exploring=!exploring; world?.setExploring(exploring);
  document.querySelector('#explore-toggle').setAttribute('aria-pressed',exploring);
  document.querySelector('#touch-controls').hidden=!exploring;
  document.querySelector('#scene-hint').innerHTML=exploring?'<span class="key-mini">W A S D</span> Focus the world, then move with arrow keys.':`<span class="key-mini">${icons.arrow}</span> Pick a place. I’ll meet you there.`;
  if(exploring) document.querySelector('#world canvas')?.focus({preventScroll:true});
});
document.querySelector('#touch-controls').addEventListener('click',e=>{ const button=e.target.closest('[data-direction]'); if(button) world?.move(button.dataset.direction); });
function updatePause() {
  world?.setPaused(paused || simpleView || document.hidden);
  const button=document.querySelector('#pause-world');
  button.innerHTML=paused?icons.play:icons.pause;
  button.setAttribute('aria-label',`${paused?'Resume':'Pause'} scene animation`);
}
document.querySelector('#pause-world').addEventListener('click',()=>{paused=!paused;updatePause();});
reducedMotion.addEventListener('change',()=>{paused=reducedMotion.matches;updatePause();});
document.addEventListener('visibilitychange',()=>{updatePause();if(document.hidden)stopSpeech();});

function artFor(p, modal=false) {
  if(p.id==='identify') return `<div class="project-art identify-art"><div class="art-top">Identify BDA<span>PROJECT & OPERATIONS COORDINATION</span></div><div class="workflow-art" aria-label="Requirements, sourcing, approvals, and delivery"><div><i>◎</i><span>Understand</span></div><b>→</b><div><i>⌕</i><span>Source</span></div><b>→</b><div><i>↔</i><span>Coordinate</span></div><b>→</b><div><i>✓</i><span>Deliver</span></div></div><div class="art-bottom">From the first request to the final handoff. <span>${icons.arrow}</span></div></div>`;
  if(p.image) return `<div class="project-art image-art art-${esc(p.id)}" style="--project-accent:${esc(p.accent || '#e5e9e8')}"><img src="${esc(p.image)}" alt="${esc(p.title)} design preview" loading="lazy" ${modal?'':'decoding="async"'}><span class="art-corner">${esc(p.company)}</span></div>`;
  if(p.id==='odin') return `<div class="project-art odin-art"><div class="art-top">ODIN <span>WAREHOUSE & FULFILLMENT</span></div><div class="warehouse-illustration" aria-hidden="true"><div class="shelf shelf-one">${'<i></i>'.repeat(9)}</div><div class="shelf shelf-two">${'<i></i>'.repeat(9)}</div><span class="warehouse-path"></span><span class="parcel">${icons.arrow}</span><span class="shipping-pin">✓</span></div><div class="art-bottom">Every order. Every moving part. <span>${icons.arrow}</span></div></div>`;
  if(p.id==='quantibly') return `<div class="project-art quantibly-art"><div class="art-top">quantibly<span>ORGANIZATION MANAGEMENT</span></div><div class="org-illustration" aria-hidden="true"><span class="org-line"></span><div class="org-node root-node">Q<span>Clarity, connected.</span></div><div class="org-branches"><i>People</i><i>Projects</i><i>Purpose</i></div></div><div class="art-bottom">A system for the bigger picture. <span>${icons.arrow}</span></div></div>`;
  if(p.id==='cozey') return `<div class="project-art cozey-art"><div class="art-top">cozey<span>ACADEMIC REDESIGN PITCH</span></div><div class="sofa-illustration" aria-hidden="true"><div class="sofa-back"></div><div class="sofa-seat"></div><div class="sofa-arm arm-left"></div><div class="sofa-arm arm-right"></div><i></i><i></i><span class="sofa-pillow"></span></div><div class="art-bottom">Making room for a better experience. <span>${icons.arrow}</span></div></div>`;
  return `<div class="project-art signfy-art"><div class="art-top">Signfy<span>COMMUNICATION, REIMAGINED</span></div><div class="signfy-illustration" aria-hidden="true"><div class="signfy-orbit orbit-one"></div><div class="signfy-orbit orbit-two"></div><div class="signfy-phone"><div class="phone-notch"></div><span class="phone-greeting">Hello.</span><span class="phone-hand">✋</span><span class="phone-caption">A conversation<br>without barriers.</span><span class="phone-button">Start a conversation ${icons.arrow}</span></div><div class="hello-bubble">A little more understanding.</div></div><div class="art-bottom">An academic app concept. <span>${icons.arrow}</span></div></div>`;
}
function isAcademic(p) {return p.category==='academic' || /academic|centennial/i.test(`${p.category} ${p.company}`);}
function matchingProjects() {return projects.filter(p=>filter==='all' || (filter==='operations'?p.id==='identify':p.id!=='identify'));}
function renderProjects() {
  const matching=matchingProjects();const visible=expanded?matching:matching.slice(0,3);
  document.querySelector('#project-grid').innerHTML=visible.map((p,i)=>`<article class="project-card"><button class="project-open" type="button" data-project="${esc(p.id)}" aria-label="Read ${esc(p.title)} project story">${artFor(p)}<div class="project-meta"><span>${esc(p.company)}</span><span>${esc(p.collaboration)}</span></div><div class="project-name"><h3>${esc(p.title)}</h3><span class="project-arrow">${icons.arrow}</span></div><p>${esc(p.summary)}</p></button></article>`).join('');
  document.querySelector('#work-count').textContent=`Showing ${visible.length} of ${matching.length} ${filter==='all'?'work stories':filter==='operations'?'operations story':'earlier digital projects'}`;
  const more=document.querySelector('#more-projects');more.hidden=matching.length<=3;more.innerHTML=`${expanded?'Show fewer projects':'Explore the rest'} ${icons.plus}`;more.setAttribute('aria-expanded',expanded);
}
document.querySelector('.work-filter').addEventListener('click',e=>{const b=e.target.closest('[data-filter]');if(!b)return;filter=b.dataset.filter;expanded=false;document.querySelectorAll('[data-filter]').forEach(el=>{const active=el===b;el.classList.toggle('active',active);el.setAttribute('aria-pressed',active);});renderProjects();});
document.querySelector('#more-projects').addEventListener('click',()=>{expanded=!expanded;renderProjects();if(!expanded)document.querySelector('#selected-work').scrollIntoView({behavior:reducedMotion.matches?'instant':'smooth'});});
function openProject(p,trigger) {
if(!p)return;
stopSpeech();
modalTrigger=trigger;document.querySelector('#dialog-content').innerHTML=`${artFor(p,true)}<div class="dialog-body"><p class="eyebrow">${esc(p.company)} / ${esc(p.collaboration)}</p><h2 id="dialog-title">${esc(p.title)}</h2><p class="dialog-summary">${esc(p.summary)}</p><div class="project-facts"><div><span>CONTEXT</span><strong>${p.id==='identify'?'Current role':isAcademic(p)?'Academic project':'Earlier digital work'}</strong></div><div><span>MY CONTRIBUTION</span><strong>${esc(p.role)}</strong></div></div><section><h3>The challenge</h3><p>${esc(p.challenge)}</p></section><section><h3>The approach</h3><ul>${p.approach.map(t=>`<li>${esc(t)}</li>`).join('')}</ul></section><section><h3>The work in perspective</h3><p>${esc(p.outcome)}</p></section>${p.gallery?.length?`<details class="prototype-gallery"><summary>Explore the prototype screens ${icons.plus}</summary><div class="project-gallery">${p.gallery.map(g=>`<figure><img src="${esc(g.src)}" alt="${esc(g.alt)}" loading="lazy"><figcaption>${esc(g.alt)}</figcaption></figure>`).join('')}</div></details>`:''}${p.confidential?'<p class="confidential-note">A high-level overview. Internal product details stay confidential.</p>':''}${!p.image?'<p class="illustration-note">Cover illustration created for this portfolio.</p>':''}<div class="tag-list">${p.tools.map(t=>`<span>${esc(t)}</span>`).join('')}</div><a class="text-link" href="#contact" id="dialog-contact">Let’s talk about the work ${icons.arrow}</a></div>`;document.querySelector('#project-dialog').showModal();document.body.classList.add('dialog-open');document.querySelector('#dialog-content').scrollTop=0;document.querySelector('#dialog-contact').addEventListener('click',closeDialog);
}
document.querySelector('#project-grid').addEventListener('click',e=>{const button=e.target.closest('[data-project]');if(button)openProject(projects.find(p=>p.id===button.dataset.project),button);});
document.querySelector('#story-related').addEventListener('click',e=>{const ids=['biwta','odin','signfy','identify'];openProject(projects.find(p=>p.id===ids[currentChapter]),e.currentTarget);});
function closeDialog() {document.querySelector('#project-dialog').close();}
document.querySelector('#dialog-close').addEventListener('click',closeDialog);
document.querySelector('#project-dialog').addEventListener('click',e=>{if(e.target===e.currentTarget){const r=e.currentTarget.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDialog();}});
document.querySelector('#project-dialog').addEventListener('close',()=>{document.body.classList.remove('dialog-open');modalTrigger?.focus({preventScroll:true});});
document.querySelector('#copy-email').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(email);showToast('Email copied. Let’s connect.');}catch{showToast(`Email me at ${email}`);}});
let toastTimer;
function showToast(text) {const toast=document.querySelector('#toast');toast.textContent=text;toast.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('visible'),4000);}

renderStory();renderProjects();

async function initWorld() {
  try {
    const {createWorld}=await import('./world.js');
    world=createWorld({container:document.querySelector('#world'),onSelect:selectChapter,onReady:()=>document.querySelector('#world-loading').classList.add('loaded'),reducedMotion:reducedMotion.matches});
    world.goTo(currentChapter);world.setPaused(paused);
  } catch(error) {
    console.warn('The 3D view is unavailable; the reading journey remains available.',error);
    document.querySelector('#world-loading').classList.add('loaded');
    document.querySelector('#world').innerHTML=`<div class="world-fallback"><span aria-hidden="true">✳</span><h3>Every story has another way in.</h3><p>The 3D view isn’t available on this device. All the same chapters are here to read.</p><button class="button button-dark" id="fallback-reading" type="button">Read my journey ${icons.right}</button></div>`;
    document.querySelector('#fallback-reading').addEventListener('click',()=>toggleReading(true));
    document.querySelector('#explore-toggle').disabled=true;document.querySelector('#pause-world').disabled=true;
  }
}
initWorld();
window.addEventListener('pagehide',()=>{stopSpeech();world?.dispose();},{once:true});
