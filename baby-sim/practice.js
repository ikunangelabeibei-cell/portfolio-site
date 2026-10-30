import { STAGES, STYLES, LENSES, SCENARIOS, SOURCES, getLens, getVariant, checkpointDirection, imaginedPerspective, responseExplanation, repairSuggestion } from './parenting-model.js';
export { STAGES, SCENARIOS } from './parenting-model.js';

const escapeHTML = value => String(value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
const stageNote = 'The five age stages follow Erikson’s first five psychosocial tasks. Age boundaries are approximate, not developmental deadlines.';
const KEY = 'baby-sim-journal-v3';
// Survey mode (?survey, or <html data-mode="survey">) narrows the demo to one infant and one early-childhood scene.
const SURVEY = new URLSearchParams(location.search).has('survey') || document.documentElement.dataset.mode === 'survey';
const SURVEY_SCENES = [
  { stage: 'infant', id: 'bed', label: 'Baby · 0–1 year', hint: 'Crying at bedtime' },
  { stage: 'toddler', id: 'milk', label: 'Early childhood · 1–3 years', hint: 'A kitchen accident' },
];
const shuffle = () => {
  const result = STYLES.map((_, index) => index);
  for (let i = result.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [result[i], result[j]] = [result[j], result[i]]; }
  return result;
};

export function createPractice({ G, ui, show, run, THREE, scene, mesh, mat, blocks, rug, wall, clock }) {
  const panel = document.createElement('section');
  panel.id = 'practice';
  panel.setAttribute('aria-label', 'Practice session');
  document.getElementById('ui').append(panel);
  const nav = document.createElement('button');
  nav.id = 'libraryBtn';
  nav.textContent = 'Scenes';
  const header = document.createElement('header');
  header.id = 'appHeader';
  header.innerHTML = '<a class="brand" href="#" aria-label="Baby Sim home"><span>Baby Sim</span></a><div class="header-actions"></div>';
  document.body.append(header);
  header.querySelector('.header-actions').append(nav);
  const journalNav = document.createElement('button'); journalNav.textContent = 'Journal'; journalNav.className = 'header-journal';
  journalNav.onclick = () => { G.phase = 'journal'; render(); };
  header.querySelector('.header-actions').append(journalNav);
  header.querySelector('.brand').onclick = event => { event.preventDefault(); library(); };

  let stage = 'preschool';
  let name = 'Mia';
  let selected = SCENARIOS[0];
  let round = 0;
  let history = [];
  let order = shuffle();
  let journal = [];
  let lastPhase = '';
  let storageAvailable = true;
  let customOpen = false;
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || localStorage.getItem('baby-sim-journal-v2') || '[]');
    if (Array.isArray(saved)) journal = saved.filter(entry => entry && typeof entry.name === 'string' && Array.isArray(entry.turns) && entry.turns.every(t => t && typeof t.text === 'string')).slice(-30);
  } catch { storageAvailable = false; }

  const button = (text, action, css = 'opt') => `<button class="${css}" data-action="${action}">${text}</button>`;
  const lensId = () => getLens(stage);
  const lens = () => LENSES[lensId()];
  const variant = () => getVariant(selected, stage, name);
  const moment = () => variant().turns[round];
  const active = () => history[round];
  const activeStyle = () => STYLES.find(style => style.id === active()?.approach);
  const disclaimer = () => `<p class="practice-note">One possible experience, not a prediction. One moment does not define a person. Check-ins are illustrative, not measured changes.</p>`;
 const props = new THREE.Group(); scene.add(props);
 const add = (geo,color,x,y,z)=>{const m=mesh(geo,mat(color));m.position.set(x,y,z);props.add(m);return m;};
 function decorate() {
  while(props.children.length) {const p=props.children[0];props.remove(p);p.geometry.dispose();p.material.dispose();}
  const box=(w,h,d,c,x,y,z)=>add(new THREE.BoxGeometry(w,h,d),c,x,y,z);
  rug.material.color.set(selected.id==='bed'?'#c7c3e6':selected.id==='store'?'#c6d7df':'#bfe0d8');
  wall.material.color.set(selected.id==='bed'?'#d9d9ee':'#f8e4d9');
  if(selected.id==='milk') {box(1.25,.12,.9,'#c89b79',1,.43,.45);box(.12,.45,.12,'#a77d5c',1,.2,.45);const cup=add(new THREE.CylinderGeometry(.1,.08,.25,24),'#f4a7b8',1,.61,.45);cup.rotation.z=1.3;const spill=add(new THREE.CircleGeometry(.34,32),'#fffaf0',1.2,.496,.45);spill.rotation.x=-Math.PI/2;}
  if(selected.id==='bed') {box(1.4,.25,1.3,'#bea6cc',1,.15,.1);box(1.3,.12,1.2,'#e9deff',1,.34,.1);box(.8,.1,.35,'#fff9e9',1,.44,-.25);add(new THREE.SphereGeometry(.22,24,16),'#ffdc89',-1.5,1.6,-1.5);}
  if(selected.id==='share' && ['toddler','preschool'].includes(stage)) {add(new THREE.SphereGeometry(.23,24,16),'#ce9b71',1,.32,.45);add(new THREE.SphereGeometry(.16,24,16),'#ce9b71',1,.63,.45);[-1,1].forEach(s=>add(new THREE.SphereGeometry(.08,16,12),'#ce9b71',1+s*.13,.77,.45));box(.65,.08,.4,'#8dabe0',1,.06,1);}
  if(selected.id==='share' && stage==='school') {box(1.2,.08,.9,'#c89b79',1,.32,.4);box(.35,.3,.35,'#8dabe0',.8,.51,.4);box(.3,.22,.3,'#efb98d',1.2,.47,.4);}
  if(selected.id==='share' && stage==='teen') {box(.65,.8,.1,'#8dabe0',1,.75,.2);const sleeve=box(.55,.25,.1,'#8dabe0',.5,1,.2);sleeve.rotation.z=.4;const other=box(.55,.25,.1,'#8dabe0',1.5,1,.2);other.rotation.z=-.4;}
  if(selected.id==='bed' && stage==='teen') {box(.17,.3,.03,'#394655',1,.55,.8);box(.13,.24,.01,'#9fd3ed',1,.55,.82);}
  if(selected.id==='bed' && stage==='school') {box(.48,.33,.02,'#fffaf0',1,.56,.8);}
  if(selected.id==='store') {[-1,0,1].forEach(i=>{box(3,.1,.6,'#a0b8c0',.4,.6+i*.45,-1.6);for(let j=0;j<5;j++)box(.25,.3,.25,['#efb98d','#a8c9a7','#f5dc9b'][j%3],-.7+j*.5,.81+i*.45,-1.6);});box(.8,.4,.5,'#8eacb9',1.1,.3,.7);}
 }

  const speech = () => moment().speech;
  const choices = () => moment().choices;
  function context() {
    if (!round) return variant().intro;
    const previous = history[round - 1];
    if (stage === 'infant') return ({level1:`${name} loosens their hands and looks toward your voice.`,level2:`${name} pauses and reaches again.`,level3:`${name} fusses again as the response changes.`,level4:`${name} startles and watches your face.`,level5:`${name} pulls back and continues to fuss.`})[previous.approach] || `${name} pauses, then signals again.`;
    const descriptions = {
      level1: `${name} stays close and returns to the conversation.`,
      level2: `${name} pauses, then looks for a little more guidance.`,
      level3: `${name} checks whether the plan has changed again.`,
      level4: `${name} becomes quiet and watches your expression.`,
      level5: `${name} pulls back. The tension in the room remains.`,
    };
    return descriptions[previous.approach] || `${name} pauses before the next moment.`;
  }
  function library() {
    customOpen = false;
    G.phase = 'library';
    G.chosen = null;
    run(['jump', -1]);
    decorate();
    render();
  }
  function start(id, nextStage = stage) {
    stage = nextStage;
    const scenario = SCENARIOS.find(item => item.id === id);
    if (!scenario?.variants[stage]) return;
    selected = scenario;
    round = 0;
    history = [];
    order = shuffle();
    customOpen = false;
    G.chosen = null;
    decorate();
    G.phase = 'intro';
    run(['jump', selected.id === 'tower' && ['toddler','preschool'].includes(stage) ? -1.6 : 7.9], ['play', 11.6], ['do', () => { G.phase = 'choose'; render(); }]);
    render();
  }
  function choose(index, text, selfSelected = false) {
    if (G.phase !== 'choose' || !Number.isInteger(index) || index < -1 || index >= STYLES.length) return;
    const style = STYLES[index];
    history.push({
      approach: style?.id || null,
      styleName: style?.name || 'Not classified',
      text: text || choices()[index],
      prompt: speech(),
      lens: lensId(),
      analysis: { task: lens().title, perspective: imaginedPerspective(style?.id,lensId()), explanation: responseExplanation(style?.id,lensId()), checkIns: lens().factors.map(f => ({name:f.name,direction:checkpointDirection(style?.id,f.id,moment().focus.includes(f.id)).label})), source: SOURCES[lens().source].url },
      selfSelected,
    });
    customOpen = false;
    G.chosen = { style: index === 0 || index === 1 ? 'warm' : 'dis' };
    G.pickAt = clock.now();
    G.phase = 'react';
    const time = index === 0 || index === 1 ? 26.2 : index >= 3 ? 14 : 11.6;
    run(['jump', time], ['play', time + 1.8]);
    render();
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(journal)); }
    catch { storageAvailable = false; }
  }
  function complete() {
    if (SURVEY) { G.phase = 'summary'; render(); return; }
    journal.push({name: variant().name, character: name, stage: STAGES[stage].label, lens: lens().title, date: new Date().toLocaleString(), turns: history.map(item => ({...item})), plan: ''});
    journal = journal.slice(-30);
    save();
    G.phase = 'summary';
    render();
  }
  function styleName(entry) {
    return entry.styleName || STYLES.find(style => style.id === entry.approach)?.name || ({connect:'Warm + clear (previous version)',control:'Firm + controlling (previous version)',give:'Give in (previous version)',distance:'Step away (previous version)',rescue:'Take over (previous version)'}[entry.approach]) || 'Not classified';
  }
  function checkpoints() {
    const style = activeStyle();
    return lens().factors.map(factor => {
      const direction = checkpointDirection(style?.id, factor.id, moment().focus.includes(factor.id));
      const supporting = direction.label === 'Supported';
      const arrow = supporting ? '↑' : ['Strained','Safety concern'].includes(direction.label) ? '↓' : '↔';
      return `<div class="development-row ${direction.kind}"><div><b>${factor.name}</b><small>${factor.domain}</small></div><div class="direction-track" aria-hidden="true">${direction.position === null ? '' : `<i style="width:${direction.position}%"></i>`}</div><span class="direction-label">${direction.position === null ? '—' : arrow} ${direction.label}</span></div>`;
    }).join('');
  }
  function analysis() {
    const style = activeStyle();
    const entry = active();
    return `<div class="analysis-heading"><div class="eyebrow">Exchange ${round + 1} of 3</div><h2>How this might feel</h2></div><div class="fb-row fb-you"><div class="ava">You</div><div><span class="who">Your response ${style ? `<span class="stylepill" style="background:${style.color}">${style.name}</span>` : '<span class="stylepill" style="background:#8b7d83">Not classified</span>'}</span><div class="line">${escapeHTML(entry.text)}</div>${entry.selfSelected ? '<small>Pattern selected by you; the text has not been interpreted.</small>' : ''}</div></div>
      <div class="fb-row fb-child"><div class="ava">🧸</div><div><span class="who">What ${escapeHTML(name)} might be ${stage === 'infant' ? 'experiencing' : 'thinking'}</span><div class="line">“${imaginedPerspective(style?.id, lensId())}”</div>${stage === 'infant' ? '<small>Imagined perspective; infants do not express these words.</small>' : ''}</div></div>
<div class="development-head"><h2>Development check-in</h2><span>illustrative direction · no measured change</span></div>
      <p class="lens-note">${lens().title} <span>${lens().virtue}</span></p>${checkpoints()}
      <details class="factor-details area-explainer"><summary>What these areas mean</summary>${lens().factors.map(f => `<p><b>${f.name}:</b> ${f.focus}</p>`).join('')}</details>
      <p class="why"><b>Why:</b> ${responseExplanation(style?.id,lensId()).replaceAll('Mia',escapeHTML(name))} For this moment, the focus is ${moment().focus.filter(id => lens().factors.some(f => f.id === id)).map(id => lens().factors.find(f => f.id === id).name.toLowerCase()).join(', ')}.</p>
      ${style ? `<details class="factor-details"><summary>Response features in the framework</summary><p>${style.features.join(' · ')}</p><p>Level ${style.level} · ${style.fullName} · ${style.zh}. This describes the example response, not your identity as a parent.</p></details>` : ''}
      <div class="repair-note"><b>${style?.id === 'level5' ? 'Safety comes first' : 'A next step to practice'}</b><p>${repairSuggestion(style?.id,lensId())}</p></div>
      <p class="practice-note">Areas are educational prompts informed by Erikson and parenting research. They are not MAPS subscales or validated developmental checkpoints. <a href="${SOURCES[lens().source].url}" target="_blank" rel="noopener">Research for this lens</a></p>
      <div class="analysis-actions">${button(round === 2 ? 'Finish & reflect →' : 'Continue the moment →','next','next-btn')}${button('Try a different response','retry','retry')}</div>${button('Read the research notes','research','text-button')}`;
  }
  function render() {
    const phaseChanged = lastPhase !== G.phase;
    lastPhase = G.phase;
    panel.dataset.phase = G.phase;
    document.body.dataset.phase = G.phase;
    journalNav.hidden = SURVEY || ['title','create'].includes(G.phase);
    nav.setAttribute('aria-current', G.phase === 'library' ? 'page' : 'false');
    panel.hidden = ['title','create'].includes(G.phase);
    nav.hidden = ['title','create'].includes(G.phase);
    if (G.phase === 'library' && SURVEY) panel.innerHTML = `
      <div class="eyebrow">SURVEY DEMO</div>
      <h2>Try a moment</h2>
      <p class="stage-note">Pick one of two everyday moments. Each has three short exchanges: choose one of five responses (A–E), then see how the child might experience it. About 1–2 minutes each.</p>
      <div class="identity-controls"><div><label for="characterName">Child’s name</label><input id="characterName" maxlength="24" value="${escapeHTML(name)}" autocomplete="off"></div></div>
      <div class="scene-list">${SURVEY_SCENES.map(s => { const v = getVariant(SCENARIOS.find(x => x.id === s.id), s.stage, name); return `<button data-scenario="${s.id}" data-stage="${s.stage}"><span><b>${s.label}: ${v.name}</b><small>${s.hint} · ${v.setting} · ${LENSES[getLens(s.stage)].title}</small></span><span class="scene-arrow" aria-hidden="true">›</span></button>`; }).join('')}</div>
      <p class="scene-help">You can try a different response at any point. Nothing you choose here is saved or sent anywhere.</p>`;
    else if (G.phase === 'library') panel.innerHTML = `
      <h2>Choose a scene</h2>
      <div class="identity-controls"><div><label for="characterName">Name</label><input id="characterName" maxlength="24" value="${escapeHTML(name)}" autocomplete="off"></div><div><label for="ageStage">Age</label><select id="ageStage">${Object.entries(STAGES).map(([id,s]) => `<option value="${id}" ${id === stage ? 'selected' : ''}>${s.label}</option>`).join('')}</select></div></div>
      <p class="stage-note">${lens().title} · ${lens().virtue}</p>
      <div class="scene-list">${SCENARIOS.filter(s=>s.variants[stage]).map(s => { const v = getVariant(s,stage,name); return `<button data-scenario="${s.id}"><span><b>${v.name}</b><small>${v.setting}</small></span><span class="scene-arrow" aria-hidden="true">›</span></button>`; }).join('')}</div>
      <p class="scene-help">Each scene has three exchanges. You can try a different response at any point.</p>
      <div class="library-footer">${button('Change appearance','design','text-button')}${button('Research notes','research','text-button')}</div>`;
    if (['intro','choose'].includes(G.phase)) panel.innerHTML = `
      <div class="eyebrow">${escapeHTML(variant().setting)} · ${escapeHTML(name)}</div>
      ${G.phase === 'intro' ? `<h2>${variant().name}</h2><p class="scene-context">${escapeHTML(context())}</p>${button('Continue →','skip','next-btn')}` : `<h2>How would you respond?</h2><div class="progress">${[0,1,2].map(i => `<span class="${i <= round ? 'active' : ''}"></span>`).join('')}</div><p class="turn-counter">Exchange ${round + 1} of 3</p>${round ? `<p class="scene-context">${escapeHTML(context())}</p>` : ''}<blockquote class="mobile-dialogue"><small>${escapeHTML(name)} ${stage === 'infant' ? 'signals' : 'says'}</small>${escapeHTML(speech())}</blockquote>${order.map((index,position) => `<button class="opt dialogue-choice" data-choice="${index}"><b>${String.fromCharCode(65+position)}</b><span>${escapeHTML(choices()[index])}</span></button>`).join('')}${button('Write your own…','custom','opt write')}`}`;
    if (G.phase === 'react') panel.innerHTML = `<div class="eyebrow">YOU RESPONDED</div><h2>${escapeHTML(name)} pauses…</h2><p class="selected-dialogue">${escapeHTML(active().text)}</p><p class="scene-context">${activeStyle()?.id === 'level5' ? 'The moment feels tense. No physical harm is animated.' : 'Take a moment to notice the expression and the space between you.'}</p>${button('See how this might feel →','analyze','next-btn')}`;
    if (G.phase === 'analysis') panel.innerHTML = analysis();
    if (G.phase === 'summary') panel.innerHTML = `<div class="eyebrow">A MOMENT TO REFLECT</div><h2>${variant().name}</h2><p class="stage-note">${STAGES[stage].label} · ${lens().title}</p>${history.map((h,i) => `<article class="journal-turn"><small>Moment ${i+1} · ${escapeHTML(styleName(h))}</small><p>${escapeHTML(h.text)}</p><p class="stage-note">${repairSuggestion(h.approach,h.lens)}</p></article>`).join('')}${SURVEY ? `<p class="survey-return"><b>Thanks for trying the demo.</b> Try the other moment, or return to the survey tab to continue.</p>${button('Try the other moment','library','next-btn')}${button('Replay this moment','replay','retry')}` : `<label for="reflectionPlan">What would you try next time?</label><textarea id="reflectionPlan" maxlength="600" placeholder="When the moment gets difficult, I will…">${escapeHTML(journal.at(-1)?.plan || '')}</textarea><p class="practice-note">${storageAvailable ? 'The journal stays in this browser.' : 'Browser saving is unavailable. Download your journal to keep it.'}</p>${button('Choose another moment','library','next-btn')}${button('Replay this moment','replay','retry')}${button('Download journal','download','retry')}`}${disclaimer()}`;
    if (G.phase === 'journal') panel.innerHTML = `<div class="eyebrow">PRACTICE JOURNAL</div><h2>${journal.length} completed sessions</h2>${journal.length ? journal.slice().reverse().map(j => `<article class="journal-turn"><b>${escapeHTML(j.name)}</b><small>${escapeHTML(j.stage)} ${j.lens ? '· '+escapeHTML(j.lens) : ''} · ${escapeHTML(j.date)}</small>${j.turns.map(h => `<p><small>${escapeHTML(styleName(h))}${h.selfSelected ? ' · self-selected' : ''}</small>${escapeHTML(h.text)}</p>`).join('')}${j.plan ? `<p class="context">Next time: ${escapeHTML(j.plan)}</p>` : ''}</article>`).join('') : '<p>Complete a moment to save a reflection.</p>'}${button('Back to moments','library','next-btn')}${button('Download journal','download','retry')}`;
    if (G.phase === 'research') panel.innerHTML = `<div class="eyebrow">RESEARCH & FRAMEWORK</div><h2>What informs this demo?</h2><p>${stageNote}</p><p>The five response patterns come from the supplied MAPS-based workbooks. Original MAPS has seven practice dimensions, not five clinical parenting types. The workbook’s level cutoffs are interpretive.</p><p>MAPS’s original sample covered ages 3–17. Infant and younger-toddler examples are educational adaptations.</p><p>Erikson supplies a theoretical lens. The check-in factors and bar directions are authored for reflection; they are not a developmental test or measured before-and-after changes.</p><p>Older ages currently use the same stylized seated avatar. Scenarios and dialogue change with age.</p><ul class="source-list">${SOURCES.map(s => `<li><a href="${s.url}" target="_blank" rel="noopener">${s.title}</a></li>`).join('')}</ul><p><a href="research/parenting-development-review.md" target="_blank">Read the full article review and mapping</a></p>${G.chosen && history[round] ? button('Back to this analysis','back-analysis','next-btn') : button('Back to moments','library','next-btn')}`;
    panel.scrollTop = 0;
    if (phaseChanged) {
      if (matchMedia('(max-width:700px)').matches) window.scrollTo(0,0);
      const heading = panel.querySelector('h2');
      if (heading) { heading.tabIndex = -1; heading.focus({preventScroll:true}); }
    }
  }
  function renderCustom() {
    customOpen = true;
    panel.innerHTML = `<h2>What would you say?</h2><label for="customText">Your words or action</label><textarea id="customText" maxlength="500"></textarea><label for="customStyle">Optional: which pattern should the demo illustrate?</label><select id="customStyle"><option value="-1">Leave unclassified</option>${STYLES.map((s,i) => `<option value="${i}">${s.name}</option>`).join('')}</select><p class="practice-note">The prototype does not interpret your words. Selecting a pattern only chooses an illustration for reflection.</p>${button('Say it','send','next-btn')}${button('Back to choices','cancel','retry')}`;
    document.getElementById('customText').focus();
  }
  panel.onchange = event => {
    if (event.target.id === 'ageStage') { stage = event.target.value; if (!selected.variants[stage]) selected = SCENARIOS.find(s => s.variants[stage]); render(); }
  };
  panel.oninput = event => {
    if (event.target.id === 'characterName') name = event.target.value.trim().slice(0,24) || 'Mia';
    if (event.target.id === 'reflectionPlan' && journal.length) { journal.at(-1).plan = event.target.value; save(); }
  };
  panel.onclick = event => {
    const target = event.target.closest('button');
    if (!target || target.disabled) return;
    if (target.dataset.scenario) { start(target.dataset.scenario, target.dataset.stage || stage); return; }
    if (target.dataset.choice !== undefined) { choose(Number(target.dataset.choice)); return; }
    switch (target.dataset.action) {
      case 'skip': run(['jump',11.6]); G.phase = 'choose'; render(); break;
      case 'library': library(); break;
      case 'journal': G.phase = 'journal'; render(); break;
      case 'research': G.phase = 'research'; render(); break;
      case 'back-analysis': G.phase = 'analysis'; render(); break;
      case 'design': G.phase = 'create'; run(['jump',clock.createAt]); render(); break;
      case 'replay': start(selected.id); break;
      case 'analyze': G.phase = 'analysis'; render(); break;
      case 'next':
        if (G.phase !== 'analysis') break;
        if (round === 2) complete();
        else { round++; order = shuffle(); G.chosen = null; G.phase = 'choose'; run(['jump',11.6]); render(); }
        break;
      case 'retry':
        if (G.phase !== 'analysis') break;
        history.pop(); G.chosen = null; G.phase = 'choose'; run(['jump',11.6]); render(); break;
      case 'custom': renderCustom(); break;
      case 'cancel': customOpen = false; render(); break;
      case 'send': {
        const text = document.getElementById('customText').value.trim();
        const index = Number(document.getElementById('customStyle').value);
        if (text) choose(index,text,index >= 0);
        else document.getElementById('customText').focus();
        break;
      }
      case 'download': {
        const blob = new Blob([JSON.stringify(journal,null,2)], {type:'application/json'});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url; link.download = 'baby-sim-practice-journal.json'; link.click();
        setTimeout(() => URL.revokeObjectURL(url),1000);
        break;
      }
    }
  };
  document.addEventListener('keydown', event => {
    if (G.phase !== 'choose' || customOpen || event.repeat || event.metaKey || event.ctrlKey || event.altKey || ['INPUT','TEXTAREA','SELECT'].includes(event.target.tagName)) return;
    const position = 'abcde'.indexOf(event.key.toLowerCase());
    if (position >= 0) choose(order[position]);
  });
  ui.startBtn.onclick = library;
  nav.onclick = library;
  document.getElementById('restartBtn').onclick = () => {
    if (SURVEY) { library(); return; }
    G.phase = 'title'; G.chosen = null; customOpen = false; props.visible = false;
    run(['jump',clock.titleAt]); render();
  };
  ui.startBtn.textContent = 'Choose a moment →';
  library();
  return { update(t,W) {
    if (lastPhase !== G.phase) render();
    show(ui.title,G.phase === 'title');
    show(ui.creator,G.phase === 'create');
    if (G.phase === 'create') clock.renderCreator();
    show(ui.chapter,['intro','choose','react','analysis'].includes(G.phase));
    ui.chapText.textContent = variant()?.name || 'Choose a moment';
    ui.chapNum.textContent = round + 1;
    show(ui.bubble,G.phase === 'choose' && !customOpen);
    if (variant()) ui.bubble.textContent = speech();
    props.visible = ['library','intro','choose','react','analysis','summary'].includes(G.phase) && selected.id !== 'tower';
    blocks.forEach(block => { block.visible = ['library','intro','choose','react','analysis'].includes(G.phase) && selected.id === 'tower'; });
    if (selected.id === 'milk' && props.visible && ['react','analysis'].includes(G.phase) && active()?.approach === 'level1') props.children.at(-1).scale.setScalar(Math.max(.15,1-(W-G.pickAt)*.15));
  }, library };
}
