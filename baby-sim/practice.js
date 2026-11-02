import { STAGES, STYLES, LENSES, SCENARIOS, SOURCES, getLens, getVariant, checkpointDirection, imaginedPerspective, responseExplanation, repairSuggestion } from './parenting-model.js';
import { SCENE_INFO, STAGE_INFO } from './scene-content.js';
export { STAGES, SCENARIOS } from './parenting-model.js';

const escapeHTML = value => String(value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
const stageNote = 'The five age stages follow Erikson’s first five psychosocial tasks. Age boundaries are approximate, not developmental deadlines.';
const KEY = 'baby-sim-journal-v3';
const SEEN_KEY = 'baby-sim-onboarded-v1';
const TIPS_KEY = 'baby-sim-tips-done-v1';
const RECOMMENDED = { stage:'toddler', id:'milk' };
// Age stages offered for now; the model and content still cover all five.
const AGES = ['infant', 'toddler'];
// How the child's mood moves after each response level; it carries through the scene and shows as hearts.
const MOOD_STEP = { level1:20, level2:10, level3:-8, level4:-18, level5:-26 };
const MOODS = [[20,'very upset'],[40,'upset'],[60,'unsure'],[80,'settling'],[101,'calm']];
const moodWord = value => MOODS.find(([max]) => value < max)[1];
const hearts = value => Math.max(0, Math.min(5, Math.round(value / 20)));
const TIPS = [
  'Pick what you would really say. There are no scores.',
  'You can always go back and try another response.',
];
// Small line icons drawn inline so the interface needs no icon font.
const svg = (body, label = '') => `<svg viewBox="0 0 24 24" ${label ? `role="img" aria-label="${label}"` : 'aria-hidden="true"'}>${body}</svg>`;
const ICON = {
  grid: svg('<rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/>'),
  book: svg('<path d="M5 5.5A1.5 1.5 0 0 1 6.5 4H18v14H6.5A1.5 1.5 0 0 0 5 19.5z"/><path d="M5 19.5A1.5 1.5 0 0 0 6.5 21H18v-3"/>'),
  help: svg('<circle cx="12" cy="12" r="8.5"/><path d="M9.6 9.6a2.5 2.5 0 1 1 3.4 2.3c-.6.3-1 .8-1 1.5v.6"/><circle cx="12" cy="17" r=".6"/>'),
  soundOn: svg('<path d="M4 10h3l5-4v12l-5-4H4z"/><path d="M16 9.5a3.5 3.5 0 0 1 0 5M18.5 7a7 7 0 0 1 0 10"/>'),
  soundOff: svg('<path d="M4 10h3l5-4v12l-5-4H4z"/><path d="M16 10l5 5M21 10l-5 5"/>'),
  back: svg('<path d="M15 5l-7 7 7 7"/>'),
  heart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5l-1.3-1.2C5.6 14.7 2.5 11.9 2.5 8.4 2.5 5.6 4.7 3.5 7.4 3.5c1.6 0 3.1.7 4.1 1.9 1-1.2 2.5-1.9 4.1-1.9 2.7 0 4.9 2.1 4.9 4.9 0 3.5-3.1 6.3-8.2 10.9z"/></svg>',
};
const SCENE_ART = {
  milk: svg('<path d="M8 4h8l-1.3 14.5a1.5 1.5 0 0 1-1.5 1.5h-2.4a1.5 1.5 0 0 1-1.5-1.5z"/><path d="M8.4 9h7.2"/>'),
  bed: svg('<path d="M15.5 3.5a8.5 8.5 0 1 0 5 13.5A7 7 0 0 1 15.5 3.5z"/>'),
  store: svg('<path d="M3 5h2.2l2.1 10.2h10.4L20 8H6.2"/><circle cx="9" cy="19" r="1.4"/><circle cx="16.5" cy="19" r="1.4"/>'),
  tower: svg('<rect x="5" y="14" width="6" height="6" rx="1"/><rect x="13" y="14" width="6" height="6" rx="1"/><rect x="9" y="7" width="6" height="6" rx="1" transform="rotate(12 12 10)"/>'),
  share: svg('<circle cx="12" cy="13" r="6"/><circle cx="7" cy="7" r="2.3"/><circle cx="17" cy="7" r="2.3"/><circle cx="10" cy="12.5" r=".6"/><circle cx="14" cy="12.5" r=".6"/><path d="M10.5 15.5c.9.7 2.1.7 3 0"/>'),
};
const store = { get(key, fallback) { try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; } }, set(key, value) { try { localStorage.setItem(key, value); } catch {} } };
const shuffle = () => {
  const result = STYLES.map((_, index) => index);
  for (let i = result.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [result[i], result[j]] = [result[j], result[i]]; }
  return result;
};

// Gentle synthesized sound: a quiet room tone and short cues after each response. Off until the visitor turns it on.
function createSound() {
  let ctx = null, master = null, on = false;
  function init() {
    if (ctx) return;
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain(); master.gain.value = 0; master.connect(ctx.destination);
    [196, 247, 294].forEach((f, i) => {
      const osc = ctx.createOscillator(), gain = ctx.createGain(), lfo = ctx.createOscillator(), depth = ctx.createGain();
      osc.type = 'sine'; osc.frequency.value = f; gain.gain.value = 0.018;
      lfo.frequency.value = 0.05 + i * 0.03; depth.gain.value = 0.012; lfo.connect(depth); depth.connect(gain.gain);
      osc.connect(gain); gain.connect(master); osc.start(); lfo.start();
    });
  }
  function tone(freq, start, length, volume = 0.12, type = 'sine') {
    if (!on || !ctx) return;
    const osc = ctx.createOscillator(), gain = ctx.createGain(), t = ctx.currentTime + start;
    osc.type = type; osc.frequency.setValueAtTime(freq, t);
    gain.gain.setValueAtTime(0, t); gain.gain.linearRampToValueAtTime(volume, t + 0.03); gain.gain.exponentialRampToValueAtTime(0.0008, t + length);
    osc.connect(gain); gain.connect(ctx.destination); osc.start(t); osc.stop(t + length + 0.05);
  }
  return {
    get on() { return on; },
    toggle() { init(); on = !on; ctx.resume(); master.gain.setTargetAtTime(on ? 1 : 0, ctx.currentTime, 0.4); return on; },
    cue(level) {
      if (level === 'level1' || level === 'level2') { tone(659, 0, 0.6); tone(880, 0.12, 0.7); if (level === 'level1') tone(1047, 0.24, 0.9, 0.09); }
      else if (level === 'level3') { tone(440, 0, 0.4, 0.08); tone(415, 0.2, 0.5, 0.08); }
      else if (level) { tone(196, 0, 0.9, 0.1, 'triangle'); tone(185, 0.25, 1.1, 0.08, 'triangle'); }
    },
    click() { tone(988, 0, 0.12, 0.04); },
  };
}

export function createPractice({ G, ui, show, run, THREE, scene, mesh, mat, blocks, rug, wall, clock }) {
  const panel = document.createElement('section');
  panel.id = 'practice';
  panel.setAttribute('aria-label', 'Baby Sim');
  document.getElementById('ui').append(panel);
  // Heads-up display and narration caption sit over the 3D scene.
  const hud = document.createElement('div');
  hud.id = 'hud';
  const caption = document.createElement('div');
  caption.id = 'sceneCaption'; caption.setAttribute('aria-hidden', 'true');
  document.getElementById('ui').append(hud, caption);
  const header = document.createElement('header');
  header.id = 'appHeader';
  header.innerHTML = `<a class="brand" href="#" aria-label="Baby Sim home"><i aria-hidden="true"></i><span>Baby Sim</span></a><nav class="header-actions">
    <button data-nav="library" id="libraryBtn" class="icon-btn" aria-label="All scenes" title="All scenes">${ICON.grid}</button>
    <button data-nav="journal" class="icon-btn" aria-label="Journal" title="Journal">${ICON.book}</button>
    <button data-nav="help" class="icon-btn" aria-label="How it works" title="How it works">${ICON.help}</button>
    <button data-nav="sound" class="icon-btn" aria-label="Turn sound on" title="Sound">${ICON.soundOff}</button></nav>`;
  document.body.append(header);
  const nav = header.querySelector('#libraryBtn');
  const soundBtn = header.querySelector('[data-nav="sound"]');
  const sound = createSound();

  let stage = 'toddler';
  let name = 'Mia';
  let selected = SCENARIOS.find(s => s.id === RECOMMENDED.id);
  let round = 0;
  let turnLimit = 3;
  let history = [];
  let order = shuffle();
  let journal = [];
  let lastPhase = '';
  let customOpen = false;
  let comparing = false;
  let tipIndex = store.get(TIPS_KEY, '') ? TIPS.length : 0;
  let replyAt = -10;
  let introAt = 0;
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || localStorage.getItem('baby-sim-journal-v2') || '[]');
    if (Array.isArray(saved)) journal = saved.filter(entry => entry && typeof entry.name === 'string' && Array.isArray(entry.turns) && entry.turns.every(t => t && typeof t.text === 'string')).slice(-30);
  } catch {}

  const button = (text, action, css = 'opt') => `<button class="${css}" data-action="${action}">${text}</button>`;
  const named = text => String(text).replaceAll('Mia', name);
  const firstSentence = text => String(text).split(/(?<=[.!?])\s/)[0];
  const lensId = () => getLens(stage);
  const lens = () => LENSES[lensId()];
  const info = (scenario = selected, st = stage) => SCENE_INFO?.[scenario.id]?.[st] || null;
  const stageInfo = st => STAGE_INFO?.[st] || { short: STAGES[st].label.split(' · ')[0], ages: STAGES[st].label.split(' · ')[1] || '', blurb: STAGES[st].note };
  const variant = () => getVariant(selected, stage, name);
  const extraTurns = () => (info()?.extraTurns || []).map(t => ({ ...t, speech: named(t.speech), choices: t.choices.map(named) }));
  const turns = () => turnLimit > 3 ? [...variant().turns, ...extraTurns()] : variant().turns;
  const moment = () => turns()[round];
  const active = () => history[round];
  const activeStyle = () => STYLES.find(style => style.id === active()?.approach);
  const replyFor = (turn, styleId) => { const k = STYLES.findIndex(s => s.id === styleId); if (k < 0) return null; const extra = turn >= 3; const t = extra ? info()?.extraTurns?.[turn - 3] : info()?.replies?.[turn]; const line = extra ? t?.replies?.[k] : t?.[k]; return line ? named(line) : null; };
  const startMood = () => stage === 'infant' && ['bed','store'].includes(selected.id) ? 30 : stage === 'infant' ? 40 : 45;
  const moodAfter = upTo => history.slice(0, upTo).reduce((m, h) => Math.max(0, Math.min(100, m + (MOOD_STEP[h.approach] ?? 0))), startMood());
  const mood = () => moodAfter(history.length);
  const disclaimer = () => `<p class="fine">One possible experience, not a prediction. One moment doesn’t define anyone.</p>`;
  const heartRow = (value, css = '') => `<span class="hearts ${css}" role="img" aria-label="${escapeHTML(name)} feels ${moodWord(value)}">${Array.from({length: 5}, (_, i) => `<i class="${i < hearts(value) ? 'on' : ''}">${ICON.heart}</i>`).join('')}</span>`;
  const delta = (before, after) => { const d = hearts(after) - hearts(before); return d > 0 ? `<span class="delta up">+${d} ${ICON.heart}</span>` : d < 0 ? `<span class="delta down">${d} ${ICON.heart}</span>` : '<span class="delta">No change</span>'; };

 const props = new THREE.Group(); scene.add(props);
 const add = (geo,color,x,y,z)=>{const m=mesh(geo,mat(color));m.position.set(x,y,z);props.add(m);return m;};
 function decorate() {
  while(props.children.length) {const p=props.children[0];props.remove(p);p.geometry.dispose();p.material.dispose();}
  const box=(w,h,d,c,x,y,z)=>add(new THREE.BoxGeometry(w,h,d),c,x,y,z);
  rug.material.color.set(selected.id==='bed'?'#c7c3e6':selected.id==='store'?'#c6d7df':'#bfe0d8');
  wall.material.color.set(selected.id==='bed'?'#d6dcf2':'#fdf1d2');
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
  function goTo(phase) {
    customOpen = false; comparing = false;
    G.phase = phase; G.chosen = null;
    run(['jump', -1]);
    decorate();
    render();
  }
  let designFrom = 'library';
  const welcome = () => goTo('welcome');
  const library = () => goTo('library');
  function start(id, nextStage = stage) {
    const scenario = SCENARIOS.find(item => item.id === id);
    if (!scenario?.variants[nextStage]) return;
    stage = nextStage;
    selected = scenario;
    round = 0;
    turnLimit = 3;
    history = [];
    order = shuffle();
    customOpen = false; comparing = false;
    G.chosen = null;
    store.set(SEEN_KEY, '1');
    decorate();
    G.phase = 'intro';
    introAt = clock.now();
    // The opening plays and waits for the visitor instead of switching to the choices on its own.
    run(['jump', selected.id === 'tower' && ['toddler','preschool'].includes(stage) ? -1.6 : 7.9], ['play', 11.6]);
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
      reply: style ? replyFor(round, style.id) : null,
      lens: lensId(),
      analysis: { task: lens().title, perspective: imaginedPerspective(style?.id,lensId()), explanation: responseExplanation(style?.id,lensId()), checkIns: lens().factors.map(f => ({name:f.name,direction:checkpointDirection(style?.id,f.id,moment().focus.includes(f.id)).label})), source: SOURCES[lens().source].url },
      selfSelected,
    });
    history.at(-1).mood = mood();
    customOpen = false;
    G.chosen = { style: index === 0 || index === 1 ? 'warm' : 'dis', level: style?.id || null };
    G.pickAt = clock.now();
    replyAt = clock.now() + 0.6;
    G.phase = 'react';
    sound.cue(style?.id);
    run(['jump', 11.6]);
    render();
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(journal)); } catch {} }
  function complete() {
    journal.push({name: variant().name, character: name, stage: STAGES[stage].label, lens: lens().title, date: new Date().toLocaleString(), turns: history.map(item => ({...item})), plan: ''});
    journal = journal.slice(-30);
    save();
    G.phase = 'summary';
    render();
  }
  function styleName(entry) {
    return entry.styleName || STYLES.find(style => style.id === entry.approach)?.name || 'Not classified';
  }
  const pill = style => style ? `<span class="stylepill" style="--pill:${style.color}">${style.name}</span>` : '<span class="stylepill" style="--pill:#8b7d83">Not classified</span>';
  function areaChips(styleId, turn = moment()) {
    return lens().factors.filter(f => turn.focus.includes(f.id)).map(f => {
      const d = checkpointDirection(styleId, f.id, true).label;
      const kind = d === 'Supported' ? 'good' : d === 'Mixed' ? 'mixed' : 'bad';
      return `<span class="chip ${kind}" title="${escapeHTML(f.focus)}">${kind === 'good' ? '↑' : kind === 'mixed' ? '↔' : '↓'} ${escapeHTML(f.name)}</span>`;
    }).join('');
  }
  function compareView() {
    const mine = active()?.approach;
    return `<div class="sheet-head"><button class="icon-btn ghost" data-action="compare-close" aria-label="Back to my result">${ICON.back}</button><h2>Five ways to answer</h2></div>
      <div class="compare-row">${STYLES.map((style, k) => `<article class="compare-card ${style.id === mine ? 'mine' : ''}">${pill(style)}${style.id === mine ? '<small class="mine-tag">You chose this</small>' : ''}
        <p class="compare-said">${escapeHTML(choices()[k])}</p>
        ${replyFor(round, style.id) ? `<p class="compare-reply">${escapeHTML(replyFor(round, style.id))}</p>` : ''}
        ${heartRow(Math.max(0, Math.min(100, moodAfter(round) + MOOD_STEP[style.id])), 'small')}</article>`).join('')}</div>
      <div class="sheet-actions">${button('Back to my result','compare-close','next-btn')}${button('Try another answer','retry','retry')}</div>`;
  }
  function analysis() {
    if (comparing) return compareView();
    const style = activeStyle();
    const last = round === turnLimit - 1;
    const canExtend = last && turnLimit === 3 && (info()?.extraTurns?.length || 0) > 0;
    const before = moodAfter(round), after = moodAfter(round + 1);
    return `<div class="sheet-head">${pill(style)}${delta(before, after)}</div>
      <h2 class="feel-quote">“${imaginedPerspective(style?.id, lensId())}”</h2>
      <p class="feel-note">How ${escapeHTML(name)} might feel${stage === 'infant' ? ', imagined' : ''}</p>
      <div class="chips">${areaChips(style?.id)}</div>
      <p class="next-step"><b>${style?.id === 'level5' ? 'Safety first' : 'Try'}</b> ${repairSuggestion(style?.id,lensId())}</p>
      <div class="sheet-actions">${button(last ? 'Finish scene' : 'Next','next','next-btn')}${button('Try another answer','retry','retry')}</div>
      <div class="sheet-links">${button('Compare all five','compare','text-button')}${canExtend ? button('Keep going (2 more)','extend','text-button') : ''}</div>
      <details class="more"><summary>Why?</summary><p>${responseExplanation(style?.id,lensId()).replaceAll('Mia',escapeHTML(name))}</p><p class="fine">${lens().title}. Areas are reflection prompts, not measurements. <a href="${SOURCES[lens().source].url}" target="_blank" rel="noopener">Research</a></p></details>`;
  }
  function moodLine() {
    const points = [startMood(), ...history.map((_, i) => moodAfter(i + 1))];
    const w = 300, h = 64, step = w / Math.max(1, points.length - 1);
    const xy = points.map((m, i) => [Math.round(i * step), Math.round(h - 8 - m / 100 * (h - 16))]);
    return `<svg class="mood-line" viewBox="-10 0 ${w + 20} ${h}" role="img" aria-label="${escapeHTML(name)}’s mood: ${points.map(moodWord).join(', then ')}"><polyline points="${xy.map(p => p.join(',')).join(' ')}"/>${xy.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5"/>`).join('')}</svg>`;
  }
  function summary() {
    const worst = history.reduce((w, h) => (MOOD_STEP[h.approach] ?? 99) < (MOOD_STEP[w?.approach] ?? 99) ? h : w, null);
    const other = SCENARIOS.filter(s => s.variants[stage] && s.id !== selected.id && !journal.some(j => j.name === getVariant(s, stage, name).name))[0];
    // One card per exchange: what the child signalled, what you said, how they reacted and what it touched.
    const cards = history.map((h, i) => {
      const style = STYLES.find(s => s.id === h.approach);
      const turn = turns()[i];
      return `<article class="ex-card"><header><b>${i + 1}</b>${pill(style)}${delta(moodAfter(i), moodAfter(i + 1))}</header>
        <p class="ex-child"><span>${escapeHTML(name)}</span>${escapeHTML(h.prompt)}</p>
        <p class="ex-you"><span>You</span>${escapeHTML(h.text)}</p>
        ${h.reply ? `<p class="ex-child"><span>${escapeHTML(name)}</span>${escapeHTML(h.reply)}</p>` : ''}
        <p class="ex-feel">“${escapeHTML(h.analysis?.perspective || imaginedPerspective(h.approach, h.lens))}”</p>
        ${turn ? `<div class="chips">${areaChips(h.approach, turn)}</div>` : ''}
        <p class="next-step"><b>${h.approach === 'level5' ? 'Safety first' : 'Try'}</b> ${repairSuggestion(h.approach, h.lens)}</p></article>`;
    }).join('');
    return `<div class="result-top"><p class="kicker">${escapeHTML(variant().name)}</p><h2>Scene complete</h2>${heartRow(mood(), 'big')}<p class="feel-note">${escapeHTML(name)} ended up feeling ${moodWord(mood())}</p>${moodLine()}</div>
      ${worst && !['level1','level2'].includes(worst.approach) ? `<p class="next-step"><b>Try next time</b> ${repairSuggestion(worst.approach, worst.lens)}</p>` : ''}
      <div class="sheet-actions">${other ? `<button class="next-btn" data-scenario="${other.id}">Next scene: ${escapeHTML(getVariant(other, stage, name).name)}</button>` : button('All scenes','library','next-btn')}${button('Replay this scene','replay','retry')}</div>
      <h3>Each exchange</h3>${cards}
      ${disclaimer()}`;
  }
  function sceneTiles() {
    return SCENARIOS.filter(s => s.variants[stage]).map(s => {
      const v = getVariant(s, stage, name), meta = info(s);
      const done = journal.some(j => j.name === v.name && j.stage === STAGES[stage].label);
      return `<button class="scene-tile ${done ? 'done' : ''}" data-scenario="${s.id}"><span class="art art-${s.id}">${SCENE_ART[s.id]}</span><b>${escapeHTML(v.name)}</b><small>${escapeHTML(meta ? named(firstSentence(meta.summary)) : v.setting)}</small>${done ? '<em>Played</em>' : ''}</button>`;
    }).join('');
  }
  function render() {
    const phaseChanged = lastPhase !== G.phase;
    lastPhase = G.phase;
    panel.dataset.phase = G.phase;
    document.body.dataset.phase = G.phase;
    const inApp = !['title','create'].includes(G.phase);
    header.querySelector('.header-actions').hidden = !inApp;
    nav.setAttribute('aria-current', G.phase === 'library' ? 'page' : 'false');
    panel.hidden = !inApp;
    if (G.phase === 'welcome') panel.innerHTML = `
      <h1 class="logo">Baby Sim</h1>
      <p class="tagline">Practise real moments with a virtual baby or toddler.</p>
      <ol class="how"><li><span>1</span>Watch</li><li><span>2</span>Respond</li><li><span>3</span>See how it feels</li></ol>
      <div class="name-row"><label for="characterName">Child’s name</label><input id="characterName" maxlength="24" value="${escapeHTML(name)}" autocomplete="off"></div>
      ${button('Customize your baby','design','retry')}
      <button class="next-btn big" data-scenario="${RECOMMENDED.id}" data-stage="${RECOMMENDED.stage}">Play</button>
      ${button('Choose a scene','library','retry')}
      <p class="fine">About 2 minutes a scene. No scores. Nothing leaves your browser. ${button('About the research','research','text-button inline')}</p>`;
    if (G.phase === 'library') panel.innerHTML = `
      <h2>Choose a scene</h2>
      <div class="age-toggle" role="tablist" aria-label="Age">${AGES.map(id => { const s = stageInfo(id); return `<button role="tab" aria-selected="${id === stage}" data-age="${id}"><b>${escapeHTML(s.short)}</b><small>${escapeHTML(s.ages)} yrs</small></button>`; }).join('')}</div>
      <div class="scene-grid">${sceneTiles()}</div>
      <div class="name-row"><label for="characterName">Child’s name</label><input id="characterName" maxlength="24" value="${escapeHTML(name)}" autocomplete="off">${button('Change look','design','text-button')}</div>`;
    if (G.phase === 'intro') panel.innerHTML = `
      ${button('What do you do?','skip','next-btn big ready')}
      ${info() ? `<details class="more"><summary>What’s going on?</summary><p>${escapeHTML(named(info().summary))}</p><p><b>${escapeHTML(name)} might need:</b> ${escapeHTML(named(info().need))}</p></details>` : ''}`;
    if (G.phase === 'choose') panel.innerHTML = `
      <p class="child-line"><span>${escapeHTML(name)}</span>${escapeHTML(speech())}</p>
      ${tipIndex < TIPS.length ? `<p class="tip">${TIPS[tipIndex]} ${button('OK','tip-next','text-button inline')}</p>` : ''}
      <div class="choices">${order.map((index,position) => `<button class="choice" data-choice="${index}"><b>${String.fromCharCode(65+position)}</b><span>${escapeHTML(choices()[index])}</span></button>`).join('')}</div>
      <div class="tray-links">${info() ? `<details class="hint"><summary>Hint</summary><p>${escapeHTML(named(info().need))}</p></details>` : ''}${button('Say something else','custom','text-button')}</div>`;
    if (G.phase === 'react') {
      const entry = active();
      panel.innerHTML = `<p class="you-line"><span>You</span>${escapeHTML(entry.text)}</p>
        ${entry.reply ? `<p class="child-line reply"><span>${escapeHTML(name)}</span>${escapeHTML(entry.reply)}</p>` : ''}
        <div class="react-row">${delta(moodAfter(round), mood())}${button('How did that feel?','analyze','next-btn')}</div>`;
    }
    if (G.phase === 'analysis') panel.innerHTML = analysis();
    if (G.phase === 'summary') panel.innerHTML = summary();
    if (G.phase === 'journal') panel.innerHTML = `<h2>Your journal</h2>${journal.length ? journal.slice().reverse().map(j => `<article class="ex-card"><header><b>${escapeHTML(j.name)}</b><small>${escapeHTML(j.date)}</small></header>${j.turns.map(h => `<p class="ex-you"><span>${escapeHTML(styleName(h))}</span>${escapeHTML(h.text)}</p>`).join('')}</article>`).join('') : '<p>Finish a scene and it shows up here. It stays in this browser.</p>'}<div class="sheet-actions">${button('All scenes','library','next-btn')}${journal.length ? button('Download','download','retry') : ''}</div>`;
    if (G.phase === 'research') panel.innerHTML = `<h2>What this is based on</h2><p>${stageNote}</p><p>The five response types come from a MAPS-based workbook. MAPS measures seven parenting practices; the five levels used here are an interpretation, not a clinical type. Baby and toddler examples adapt it for younger ages.</p><p>The hearts, reactions, and areas are written for reflection. They aren’t a test or a measurement.</p><ul class="source-list">${SOURCES.map(s => `<li><a href="${s.url}" target="_blank" rel="noopener">${s.title}</a></li>`).join('')}</ul><p><a href="research/parenting-development-review.md" target="_blank">Full article review</a></p><div class="sheet-actions">${G.chosen && history[round] ? button('Back to the scene','back-analysis','next-btn') : button('All scenes','library','next-btn')}</div>`;
    panel.scrollTop = 0;
    if (phaseChanged) {
      const heading = panel.querySelector('h1,h2,button');
      if (heading) { if (!/BUTTON/.test(heading.tagName)) heading.tabIndex = -1; heading.focus({preventScroll:true}); }
    }
  }
  function renderCustom() {
    customOpen = true;
    panel.innerHTML = `<label for="customText">What would you say?</label><textarea id="customText" maxlength="500" placeholder="Your words or action"></textarea><label for="customStyle">Which response type is closest? (optional)</label><select id="customStyle"><option value="-1">Leave it open</option>${STYLES.map((s,i) => `<option value="${i}">${s.name}</option>`).join('')}</select><p class="fine">The simulator doesn’t read your words; the type you pick decides the reaction.</p><div class="sheet-actions">${button('Say it','send','next-btn')}${button('Back','cancel','retry')}</div>`;
    document.getElementById('customText').focus();
  }
  function nextRound() { round++; order = shuffle(); comparing = false; G.chosen = null; G.phase = 'choose'; run(['jump',11.6]); render(); }
  panel.oninput = event => {
    if (event.target.id === 'characterName') { name = event.target.value.trim().slice(0,24) || 'Mia'; }
  };
  panel.onchange = event => { if (event.target.id === 'characterName') render(); };
  panel.onclick = event => {
    const target = event.target.closest('button');
    if (!target || target.disabled) return;
    sound.click();
    if (target.dataset.age) { stage = target.dataset.age; if (!selected.variants[stage]) selected = SCENARIOS.find(s => s.variants[stage]); decorate(); render(); panel.querySelector(`[data-age="${stage}"]`)?.focus(); return; }
    if (target.dataset.scenario) { start(target.dataset.scenario, target.dataset.stage || stage); return; }
    if (target.dataset.choice !== undefined) { choose(Number(target.dataset.choice)); return; }
    switch (target.dataset.action) {
      case 'skip': run(['jump',11.6]); G.phase = 'choose'; render(); break;
      case 'library': library(); break;
      case 'welcome': welcome(); break;
      case 'research': G.phase = 'research'; render(); break;
      case 'back-analysis': G.phase = 'analysis'; render(); break;
      case 'design': designFrom = G.phase; G.phase = 'create'; run(['jump',clock.createAt]); render(); break;
      case 'replay': start(selected.id); break;
      case 'analyze': G.phase = 'analysis'; render(); break;
      case 'compare': comparing = true; render(); break;
      case 'compare-close': comparing = false; render(); break;
      case 'tip-next': tipIndex++; if (tipIndex >= TIPS.length) store.set(TIPS_KEY, '1'); render(); break;
      case 'extend':
        if (G.phase !== 'analysis') break;
        turnLimit = 3 + info().extraTurns.length; nextRound();
        break;
      case 'next':
        if (G.phase !== 'analysis') break;
        if (round === turnLimit - 1) complete();
        else nextRound();
        break;
      case 'retry':
        if (G.phase !== 'analysis') break;
        history.pop(); comparing = false; G.chosen = null; G.phase = 'choose'; run(['jump',11.6]); render(); break;
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
  header.onclick = event => {
    const target = event.target.closest('button,a');
    if (!target) return;
    event.preventDefault();
    if (target.classList.contains('brand')) return welcome();
    const where = target.dataset.nav;
    if (where === 'library') library();
    if (where === 'journal') { G.phase = 'journal'; render(); }
    if (where === 'help') welcome();
    if (where === 'sound') { const on = sound.toggle(); soundBtn.innerHTML = on ? ICON.soundOn : ICON.soundOff; soundBtn.setAttribute('aria-label', on ? 'Turn sound off' : 'Turn sound on'); }
  };
  document.addEventListener('keydown', event => {
    if (G.phase !== 'choose' || customOpen || event.repeat || event.metaKey || event.ctrlKey || event.altKey || ['INPUT','TEXTAREA','SELECT'].includes(event.target.tagName)) return;
    const position = 'abcde'.indexOf(event.key.toLowerCase());
    if (position >= 0) choose(order[position]);
  });
  ui.startBtn.onclick = () => (designFrom === 'welcome' ? welcome() : library());
  const restart = document.getElementById('restartBtn');
  restart.textContent = 'Leave scene';
  restart.title = 'Back to all scenes';
  restart.onclick = library;
  ui.startBtn.textContent = 'Done →';
  if (store.get(SEEN_KEY, '')) library(); else welcome();

  // Emotion targets for the 3D child. The page blends toward these each frame.
  const emo = { happy: 0, sad: 0, worried: 0, sob: 0, surprise: 0, comfort: 0, talk: 0, push: 0 };
  function targets(W) {
    const t = { happy: 0, sad: 0, worried: 0, sob: 0, surprise: 0, comfort: 0, talk: 0, push: 0 };
    if (!['intro','choose','react','analysis'].includes(G.phase)) return t;
    const m = mood();
    t.sad = Math.max(0, Math.min(1, (45 - m) / 35)) * 0.8;
    t.happy = Math.max(0, Math.min(1, (m - 60) / 40)) * 0.6;
    t.worried = Math.max(0, 1 - Math.abs(m - 45) / 30) * 0.7;
    if (stage === 'infant' && m < 40) t.sob = Math.min(1, (40 - m) / 25);
    if (G.phase === 'intro') t.push = Math.min(1, (W - introAt) / 6) * 0.35;
    if (G.phase === 'choose') t.push = 0.2;
    const level = active()?.approach;
    if (['react','analysis'].includes(G.phase) && level) {
      const since = W - G.pickAt;
      if (level === 'level1') { t.happy = 0.9; t.sad = 0; t.worried = 0; t.sob = 0; t.comfort = 1; }
      if (level === 'level2') { t.happy = 0.5; t.sad = 0; t.worried = 0.15; t.sob = 0; t.comfort = 0.7; }
      if (level === 'level3') { t.worried = 0.95; t.happy = 0; t.sad = 0.25; }
      if (level === 'level4') { t.sad = 0.85; t.happy = 0; t.worried = 0.3; t.surprise = since < 0.8 ? 0.6 : 0; }
      if (level === 'level5') { t.sad = 1; t.happy = 0; t.worried = 0.4; t.surprise = since < 1 ? 1 : 0; t.sob = stage === 'infant' || stage === 'toddler' ? 0.8 : 0.3; }
      t.push = G.phase === 'react' ? 0.3 : 0.15;
    }
    const sinceReply = W - replyAt;
    if (G.phase === 'react' && stage !== 'infant' && sinceReply > 0 && sinceReply < 2.6) t.talk = 1;
    return t;
  }
  let hudKey = '';
  return {
    library,
    // Smoothed emotion weights for the 3D child, or null outside a scene.
    emotion(W, dt) {
      const t = targets(W);
      const k = 1 - Math.exp(-dt * 3);
      for (const key in emo) emo[key] += (t[key] - emo[key]) * k;
      return ['intro','choose','react','analysis'].includes(G.phase) ? { ...emo, hand: selected.id === 'milk' ? 'wipe' : 'pat' } : null;
    },
    update(t,W) {
      if (lastPhase !== G.phase) render();
      show(ui.title,G.phase === 'title');
      show(ui.creator,G.phase === 'create');
      if (G.phase === 'create') clock.renderCreator();
      show(ui.chapter,false);
      const inScene = ['intro','choose','react','analysis'].includes(G.phase);
      hud.hidden = !inScene;
      const key = inScene ? `${variant().name}|${round}|${turnLimit}|${mood()}|${name}` : '';
      if (inScene && key !== hudKey) hud.innerHTML = `<div class="hud-scene"><b>${escapeHTML(variant().name)}</b><span class="dots">${Array.from({length: turnLimit}, (_, i) => `<i class="${i < round ? 'done' : i === round ? 'now' : ''}"></i>`).join('')}</span></div>${heartRow(mood())}`;
      hudKey = key;
      // Speech bubble over the child: their line while choosing, their reply after a response.
      const reply = active()?.reply;
      const bubbleText = G.phase === 'choose' && !customOpen ? speech() : G.phase === 'react' && reply && W > replyAt ? reply : '';
      show(ui.bubble, !!bubbleText);
      if (bubbleText && ui.bubble.textContent !== bubbleText) ui.bubble.textContent = bubbleText;
      // Opening narration plays as captions over the scene.
      const beats = G.phase === 'intro' ? (info()?.beats || [variant().intro]).map(named) : [];
      const beat = beats[Math.min(beats.length - 1, Math.floor((W - introAt - 0.2) / 1.8))];
      if (caption.textContent !== (beat || '')) caption.textContent = beat || '';
      caption.classList.toggle('show', !!beat && W - introAt > 0.2);
      props.visible = ['welcome','library','intro','choose','react','analysis','summary'].includes(G.phase) && selected.id !== 'tower';
      blocks.forEach(block => { block.visible = ['welcome','library','intro','choose','react','analysis'].includes(G.phase) && selected.id === 'tower'; });
      if (selected.id === 'milk' && props.visible && ['react','analysis'].includes(G.phase) && ['level1','level2'].includes(active()?.approach)) props.children.at(-1).scale.setScalar(Math.max(.15,1-(W-G.pickAt)*.15));
      else if (selected.id === 'milk' && props.children.length) props.children.at(-1).scale.setScalar(1);
    } };
}
