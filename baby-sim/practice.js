import { STAGES, STYLES, LENSES, SCENARIOS, SOURCES, getLens, getVariant, checkpointDirection, imaginedPerspective, responseExplanation, repairSuggestion } from './parenting-model.js';
import { SCENE_INFO, STAGE_INFO } from './scene-content.js';
export { STAGES, SCENARIOS } from './parenting-model.js';

const escapeHTML = value => String(value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
const stageNote = 'The five age stages follow Erikson’s first five psychosocial tasks. Age boundaries are approximate, not developmental deadlines.';
const KEY = 'baby-sim-journal-v3';
const SEEN_KEY = 'baby-sim-onboarded-v1';
const TIPS_KEY = 'baby-sim-tips-done-v1';
const SCENE_ICON = { tower:'🧱', milk:'🥛', bed:'🌙', share:'🧸', store:'🛒' };
// Older children's versions of a scene are different situations, so they get their own icons.
const OLDER_ICON = { school: { tower:'📐', milk:'🍳', bed:'📝', share:'🤝', store:'🧾' }, teen: { tower:'💻', milk:'🍳', bed:'📱', share:'👕', store:'💳' } };
const sceneIcon = (id, st) => OLDER_ICON[st]?.[id] || SCENE_ICON[id];
const RECOMMENDED = { stage:'toddler', id:'milk' };
// Age stages offered for now; the model and content still cover all five.
const AGES = ['infant', 'toddler'];
// How the child's mood moves after each response level; it carries through the scene.
const MOOD_STEP = { level1:20, level2:10, level3:-8, level4:-18, level5:-26 };
const MOODS = [[20,'😢','very upset'],[40,'😟','upset'],[60,'😐','unsure'],[80,'🙂','settling'],[101,'😊','calm']];
const moodOf = value => MOODS.find(([max]) => value < max);
const TIPS = [
  'Pick the response closest to what you would really say. There are no scores and nothing is judged.',
  'After you choose, the child reacts and you see how they might feel. You can always go back and try a different response.',
  'The mood in the corner of the scene carries from one exchange to the next, just like a real moment.',
];
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
  // Mood pill and narration caption sit over the 3D scene.
  const moodPill = document.createElement('div');
  moodPill.id = 'moodPill'; moodPill.setAttribute('aria-live', 'polite');
  const caption = document.createElement('div');
  caption.id = 'sceneCaption'; caption.setAttribute('aria-hidden', 'true');
  document.getElementById('ui').append(moodPill, caption);
  const header = document.createElement('header');
  header.id = 'appHeader';
  header.innerHTML = `<a class="brand" href="#" aria-label="Baby Sim home"><span>Baby Sim</span></a><nav class="header-actions">
    <button data-nav="library" id="libraryBtn">All scenes</button><button data-nav="journal" class="header-journal">Journal</button>
    <button data-nav="help" class="header-icon" aria-label="How it works" title="How it works">?</button>
    <button data-nav="sound" class="header-icon" aria-label="Turn sound on" title="Sound">🔇</button></nav>`;
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
  let storageAvailable = true;
  let customOpen = false;
  let comparing = false;
  let tipIndex = store.get(TIPS_KEY, '') ? TIPS.length : 0;
  let replyAt = -10;
  let introAt = 0;
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || localStorage.getItem('baby-sim-journal-v2') || '[]');
    if (Array.isArray(saved)) journal = saved.filter(entry => entry && typeof entry.name === 'string' && Array.isArray(entry.turns) && entry.turns.every(t => t && typeof t.text === 'string')).slice(-30);
  } catch { storageAvailable = false; }

  const button = (text, action, css = 'opt') => `<button class="${css}" data-action="${action}">${text}</button>`;
  const named = text => String(text).replaceAll('Mia', name);
  const lensId = () => getLens(stage);
  const lens = () => LENSES[lensId()];
  const info = (scenario = selected, st = stage) => SCENE_INFO?.[scenario.id]?.[st] || null;
  const stageInfo = st => STAGE_INFO?.[st] || { short: STAGES[st].label.split(' · ')[0], ages: STAGES[st].label.split(' · ')[1] || '', icon: '👶', blurb: STAGES[st].note };
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
  const crumb = () => `${escapeHTML(stageInfo(stage).short)} › ${escapeHTML(variant().name)} › ${round + 1} of ${turnLimit}`;
  const disclaimer = () => `<p class="practice-note">One possible experience, not a prediction. One moment does not define a person. Check-ins are illustrative, not measured changes.</p>`;

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
  function context() {
    if (!round) return variant().intro;
    const previous = history[round - 1];
    const reply = replyFor(round - 1, previous.approach);
    if (reply) return reply;
    if (stage === 'infant') return ({level1:`${name} loosens their hands and looks toward your voice.`,level2:`${name} pauses and reaches again.`,level3:`${name} fusses again as the response changes.`,level4:`${name} startles and watches your face.`,level5:`${name} pulls back and continues to fuss.`})[previous.approach] || `${name} pauses, then signals again.`;
    return ({ level1:`${name} stays close and returns to the conversation.`, level2:`${name} pauses, then looks for a little more guidance.`, level3:`${name} checks whether the plan has changed again.`, level4:`${name} becomes quiet and watches your expression.`, level5:`${name} pulls back. The tension in the room remains.` })[previous.approach] || `${name} pauses before the next moment.`;
  }
  function welcome() {
    customOpen = false; comparing = false;
    G.phase = 'welcome'; G.chosen = null;
    run(['jump', -1]);
    decorate();
    render();
  }
  function library() {
    customOpen = false; comparing = false;
    G.phase = 'library';
    G.chosen = null;
    run(['jump', -1]);
    decorate();
    render();
  }
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
    // The intro plays the opening and waits for the visitor instead of switching to the choices on its own.
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
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(journal)); }
    catch { storageAvailable = false; }
  }
  function complete() {
    journal.push({name: variant().name, character: name, stage: STAGES[stage].label, lens: lens().title, date: new Date().toLocaleString(), turns: history.map(item => ({...item})), plan: ''});
    journal = journal.slice(-30);
    save();
    G.phase = 'summary';
    render();
  }
  function styleName(entry) {
    return entry.styleName || STYLES.find(style => style.id === entry.approach)?.name || ({connect:'Warm + clear (previous version)',control:'Firm + controlling (previous version)',give:'Give in (previous version)',distance:'Step away (previous version)',rescue:'Take over (previous version)'}[entry.approach]) || 'Not classified';
  }
  const pill = style => style ? `<span class="stylepill" style="background:${style.color}">${style.name}</span>` : '<span class="stylepill" style="background:#8b7d83">Not classified</span>';
  function moodMeter(value, label = `How ${escapeHTML(name)} feels`) {
    const [, face, word] = moodOf(value);
    return `<div class="mood-meter"><span class="mood-face" aria-hidden="true">${face}</span><div><small>${label}</small><b>${word}</b><div class="mood-track"><i style="left:${value}%"></i></div></div></div>`;
  }
  function situation() {
    const s = info();
    if (!s) return '';
    return `<div class="situation"><p><b>What’s happening</b>${escapeHTML(named(s.summary))}</p><p><b>What ${escapeHTML(name)} might need</b>${escapeHTML(named(s.need))}</p></div>`;
  }
  function tip() {
    if (tipIndex >= TIPS.length) return '';
    return `<div class="tip" role="note"><small>Tip ${tipIndex + 1} of ${TIPS.length}</small><p>${TIPS[tipIndex]}</p><div>${button(tipIndex < TIPS.length - 1 ? 'Next tip' : 'Got it', 'tip-next', 'text-button')}${tipIndex < TIPS.length - 1 ? button('Hide tips', 'tip-hide', 'text-button') : ''}</div></div>`;
  }
  function checkpoints(styleId = activeStyle()?.id, turn = moment()) {
    const involved = lens().factors.filter(factor => turn.focus.includes(factor.id));
    const others = lens().factors.length - involved.length;
    return involved.map(factor => {
      const direction = checkpointDirection(styleId, factor.id, true);
      const arrow = direction.label === 'Supported' ? '↑' : ['Strained','Safety concern'].includes(direction.label) ? '↓' : '↔';
      return `<div class="development-row ${direction.kind}"><div><b>${factor.name}</b><small>${factor.domain}</small></div><div class="direction-track" aria-hidden="true">${direction.position === null ? '' : `<i style="width:${direction.position}%"></i>`}</div><span class="direction-label">${direction.position === null ? '—' : arrow} ${direction.label}</span></div>`;
    }).join('') + (others ? `<p class="areas-note">${others} other ${others === 1 ? 'area isn’t' : 'areas aren’t'} involved in this moment.</p>` : '');
  }
  function directionSummary(styleId) {
    const labels = moment().focus.filter(id => lens().factors.some(f => f.id === id)).map(id => checkpointDirection(styleId, id, true).label);
    const count = label => labels.filter(l => l === label).length;
    if (count('Safety concern')) return 'Safety becomes the main concern';
    if (count('Supported') === labels.length) return `Supports all ${labels.length} areas in this moment`;
    if (count('Supported')) return `Supports ${count('Supported')} of ${labels.length} areas`;
    if (count('Strained')) return `Strains ${count('Strained')} of ${labels.length} areas`;
    return 'Mixed effect on this moment’s areas';
  }
  function compareView() {
    const mine = active()?.approach;
    return `<div class="analysis-heading"><div class="eyebrow">${crumb()}</div><h2>All five responses</h2></div>
      <p class="stage-note">The same moment, five ways. Your choice is highlighted. These are illustrations, not predictions.</p>
      ${STYLES.map((style, k) => `<article class="compare-card ${style.id === mine ? 'mine' : ''}">${style.id === mine ? '<span class="mine-tag">Your choice</span>' : ''}${pill(style)}
        <p class="compare-said">${escapeHTML(choices()[k])}</p>
        ${replyFor(round, style.id) ? `<p class="compare-reply">${escapeHTML(replyFor(round, style.id))}</p>` : ''}
        <p class="compare-feel">“${imaginedPerspective(style.id, lensId())}”</p>
        <small>${directionSummary(style.id)}</small></article>`).join('')}
      <div class="analysis-actions">${button('Back to my result','compare-close','next-btn')}${button('Try a different response','retry','retry')}</div>`;
  }
  function analysis() {
    if (comparing) return compareView();
    const style = activeStyle();
    const entry = active();
    const last = round === turnLimit - 1;
    const canExtend = last && turnLimit === 3 && (info()?.extraTurns?.length || 0) > 0;
    const before = moodAfter(round), after = moodAfter(round + 1);
    const why = `<p class="why"><b>Why:</b> ${responseExplanation(style?.id,lensId()).replaceAll('Mia',escapeHTML(name))}</p>`;
    const features = style ? `<p><b>Response features:</b> ${style.features.join(', ')}. Level ${style.level}, ${style.fullName}. This describes the example response, not you as a parent.</p>` : '';
    return `<div class="analysis-heading"><div class="eyebrow">${crumb()}</div><h2>How this might feel</h2></div>
      <div class="feel-card"><div class="feel-top">${pill(style)}<span class="mood-change ${after >= before ? 'up' : 'down'}">${moodOf(after)[1]} ${after > before ? 'calmer' : after < before ? 'more upset' : 'no change'}</span></div>
        <p class="feel-quote">“${imaginedPerspective(style?.id, lensId())}”</p>
        <small>What ${escapeHTML(name)} might be ${stage === 'infant' ? 'experiencing (imagined; infants don’t think in words)' : 'thinking'}</small></div>
      <div class="fb-row fb-you"><div class="ava">You</div><div><span class="who">You said</span><div class="line">${escapeHTML(entry.text)}</div>${entry.selfSelected ? '<small>Pattern selected by you; the text has not been interpreted.</small>' : ''}</div></div>
      ${entry.reply ? `<div class="fb-row fb-child"><div class="ava">🧸</div><div><span class="who">${escapeHTML(name)}</span><div class="line">${escapeHTML(entry.reply)}</div></div></div>` : ''}
      ${button(`<b>⇆</b><span><strong>Compare all five responses</strong><small>See how ${escapeHTML(name)} might react to each one</small></span>`,'compare','compare-btn')}
      <div class="development-head"><h2>Areas this moment touches</h2><span>Illustrative directions, not measurements</span></div>
      ${checkpoints()}
      <div class="repair-note"><b>${style?.id === 'level5' ? 'Safety comes first' : 'A next step to practice'}</b><p>${repairSuggestion(style?.id,lensId())}</p></div>
      <details class="factor-details more-detail"><summary>More detail</summary><p class="lens-note">${lens().title} <span>${lens().virtue}</span></p>${why}${features}${lens().factors.filter(f => moment().focus.includes(f.id)).map(f => `<p><b>${f.name}:</b> ${f.focus}</p>`).join('')}<p class="practice-note">Areas are educational prompts informed by Erikson and parenting research. They are not MAPS subscales or validated developmental checkpoints. <a href="${SOURCES[lens().source].url}" target="_blank" rel="noopener">Research for this lens</a> · ${button('Research notes','research','text-button inline')}</p></details>
      ${canExtend ? `<p class="survey-more">${button('Keep going: 2 more exchanges in this scene','extend','text-button')}</p>` : ''}
      <div class="analysis-actions">${button(last ? 'Finish and see the summary' : 'Next exchange','next','next-btn')}${button('Try a different response','retry','retry')}</div>`;
  }
  function moodChart() {
    const points = [startMood(), ...history.map((_, i) => moodAfter(i + 1))];
    const w = 300, h = 90, step = w / Math.max(1, points.length - 1);
    const xy = points.map((m, i) => [Math.round(i * step), Math.round(h - 8 - m / 100 * (h - 16))]);
    return `<figure class="mood-chart"><svg viewBox="-12 0 ${w + 24} ${h}" role="img" aria-label="${escapeHTML(name)}’s mood across the scene: ${points.map(p => moodOf(p)[2]).join(', then ')}">
      <line x1="0" x2="${w}" y1="${h / 2}" y2="${h / 2}" class="mid"/>
      <polyline points="${xy.map(p => p.join(',')).join(' ')}"/>${xy.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="5"/><text x="${x}" y="${y - 10}">${moodOf(points[i])[1]}</text>`).join('')}</svg>
      <figcaption>${escapeHTML(name)}’s mood: start → ${history.map((_, i) => `exchange ${i + 1}`).join(' → ')}</figcaption></figure>`;
  }
  function summary() {
    const best = history.reduce((b, h) => (MOOD_STEP[h.approach] ?? -99) > (MOOD_STEP[b?.approach] ?? -99) ? h : b, null);
    const worst = history.reduce((w, h) => (MOOD_STEP[h.approach] ?? 99) < (MOOD_STEP[w?.approach] ?? 99) ? h : w, null);
    const wentWell = best && ['level1','level2'].includes(best.approach) ? `${escapeHTML(best.text)} helped ${escapeHTML(name)} settle.` : `You stayed with the moment to the end. Trying a calmer response next time could change how ${escapeHTML(name)} feels.`;
    // One card per exchange: what the child signalled, what you said, how they reacted and what it touched.
    const turnsHtml = history.map((h,i) => {
      const style = STYLES.find(s => s.id === h.approach);
      const before = moodAfter(i), after = moodAfter(i + 1);
      const areas = (h.analysis?.checkIns || []).filter(c => c.direction !== 'Not shown');
      return `<article class="summary-card"><header><span class="summary-num">${i + 1}</span><div><small>Exchange ${i + 1} of ${history.length}</small>${pill(style)}</div><span class="mood-change ${after >= before ? 'up' : 'down'}">${moodOf(before)[1]} → ${moodOf(after)[1]}</span></header>
        <dl>
          <dt>${escapeHTML(name)} ${stage === 'infant' ? 'signalled' : 'said'}</dt><dd class="recap-prompt">${escapeHTML(h.prompt)}</dd>
          <dt>You</dt><dd><b>${escapeHTML(h.text)}</b></dd>
          ${h.reply ? `<dt>${escapeHTML(name)}’s reaction</dt><dd>${escapeHTML(h.reply)}</dd>` : ''}
          <dt>How it might feel</dt><dd class="summary-feel">“${escapeHTML(h.analysis?.perspective || imaginedPerspective(h.approach, h.lens))}”</dd>
          ${areas.length ? `<dt>Areas touched</dt><dd class="area-chips">${areas.map(c => `<span class="chip ${c.direction === 'Supported' ? 'good' : c.direction === 'Mixed' ? 'mixed' : 'bad'}">${c.direction === 'Supported' ? '↑' : c.direction === 'Mixed' ? '↔' : '↓'} ${escapeHTML(c.name)}</span>`).join('')}</dd>` : ''}
          <dt>${h.approach === 'level5' ? 'Safety first' : 'Next step'}</dt><dd>${repairSuggestion(h.approach, h.lens)}</dd>
        </dl></article>`;
    }).join('');
    const counts = STYLES.map(s => [s, history.filter(h => h.approach === s.id).length]).filter(([, n]) => n);
    return `<div class="eyebrow">Summary for ${escapeHTML(stageInfo(stage).short)}, ${escapeHTML(stageInfo(stage).ages)} years</div><h2>${variant().name}</h2>
      <p class="stage-note">Practising ${escapeHTML(info() ? named(info().skill).toLowerCase() : lens().title)} over ${history.length} exchanges</p>
      ${moodChart()}
      <div class="pattern-row"><small>Your responses</small>${counts.map(([s, n]) => `<span class="stylepill" style="background:${s.color}">${s.name}${n > 1 ? ` ×${n}` : ''}</span>`).join('')}</div>
      <div class="recap-grid"><div class="recap-good"><b>What went well</b><p>${wentWell}</p></div><div class="recap-next"><b>Try next time</b><p>${worst ? repairSuggestion(worst.approach, worst.lens) : ''}</p></div></div>
      <h3 class="summary-sub">Each exchange</h3>${turnsHtml}
      <div class="summary-actions">${button('↺ Replay with a different approach','replay','next-btn')}${button('Choose another scene','library','retry')}</div>
      <label for="reflectionPlan">What would you try next time? (optional, saved only in this browser)</label><textarea id="reflectionPlan" maxlength="600" placeholder="When the moment gets difficult, I will…">${escapeHTML(journal.at(-1)?.plan || '')}</textarea>
      <p class="practice-note">${storageAvailable ? 'The journal stays in this browser.' : 'Browser saving is unavailable. Download your journal to keep it.'}</p>${button('Download journal','download','retry')}${disclaimer()}`;
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
      <h2>Practice everyday parenting moments</h2>
      <p class="lead">Baby Sim is a safe place to rehearse real moments with a virtual baby or toddler, from bedtime crying to spilled milk, and see how different responses might feel to them.</p>
      <ol class="how-steps">
        <li><span>1</span><div><b>Pick an age and a scene</b><small>Baby (0–1) or toddler (1–3), ${AGES.reduce((n, st) => n + SCENARIOS.filter(s => s.variants[st]).length, 0)} everyday scenes</small></div></li>
        <li><span>2</span><div><b>Watch the moment</b><small>A short everyday situation plays out</small></div></li>
        <li><span>3</span><div><b>Choose how you’d respond</b><small>Five responses, A to E, from warm to harsh</small></div></li>
        <li><span>4</span><div><b>See how it might feel</b><small>The child reacts, and you can compare all five</small></div></li>
      </ol>
      <ul class="facts"><li>⏱ About 2 minutes a scene</li><li>🙂 No scores, no judgement</li><li>↺ Try any response again</li></ul>
      <button class="next-btn wide" data-scenario="${RECOMMENDED.id}" data-stage="${RECOMMENDED.stage}">Try the recommended scene</button>
      <small class="rec-note">${escapeHTML(stageInfo(RECOMMENDED.stage).short)}: ${escapeHTML(getVariant(SCENARIOS.find(s => s.id === RECOMMENDED.id), RECOMMENDED.stage, name).name)}</small>
      ${button('Browse all scenes','library','retry')}
      <div class="library-footer">${button('Design your child','design','text-button')}${button('About the research','research','text-button')}</div>`;
    if (G.phase === 'library') panel.innerHTML = `
      <h2>Choose a scene</h2>
      <div class="name-row"><label for="characterName">Child’s name</label><input id="characterName" maxlength="24" value="${escapeHTML(name)}" autocomplete="off"></div>
      <div class="age-tabs" role="tablist" aria-label="Age stage" style="--ages:${AGES.length}">${AGES.map(id => { const s = stageInfo(id); return `<button role="tab" aria-selected="${id === stage}" data-age="${id}"><span aria-hidden="true">${s.icon}</span><b>${escapeHTML(s.short)}</b><small>${escapeHTML(s.ages)}</small></button>`; }).join('')}</div>
      <p class="stage-blurb">${escapeHTML(stageInfo(stage).blurb)}</p>
      <div class="scene-cards">${SCENARIOS.filter(s => s.variants[stage]).map(s => { const v = getVariant(s,stage,name); const meta = info(s); const done = journal.some(j => j.name === v.name && j.stage === STAGES[stage].label); return `<button class="scene-card" data-scenario="${s.id}"><span class="scene-icon" aria-hidden="true">${sceneIcon(s.id, stage)}</span><span class="scene-text"><b>${escapeHTML(v.name)}${done ? ' <em>✓ Done</em>' : ''}</b><span>${escapeHTML(meta ? named(meta.summary) : v.intro)}</span><small>${meta ? `Practises ${escapeHTML(meta.skill.toLowerCase())}. ` : ''}About 2 minutes${meta?.extraTurns ? ', with a longer version' : ''}.</small></span><span class="scene-arrow" aria-hidden="true">›</span></button>`; }).join('')}</div>
      <div class="library-footer">${button('Design your child','design','text-button')}${button('How it works','welcome','text-button')}${button('About the research','research','text-button')}</div>`;
    if (G.phase === 'intro') {
      const beats = (info()?.beats || [variant().intro]).map(named);
      panel.innerHTML = `<div class="eyebrow">${crumb()}</div><h2>${variant().name}</h2>
        <ol class="beats">${beats.map((b, i) => `<li style="animation-delay:${0.2 + i * 1.6}s">${escapeHTML(b)}</li>`).join('')}</ol>
        ${situation()}
        <button class="next-btn wide ready" data-action="skip" style="animation-delay:${0.2 + beats.length * 1.6}s">Show my options</button>
        ${button('Back to all scenes','library','text-button')}`;
    }
    if (G.phase === 'choose') panel.innerHTML = `
      <div class="eyebrow">${crumb()}</div>
      <h2>How would you respond?</h2>
      <div class="progress">${Array.from({length: turnLimit}, (_, i) => `<span class="${i <= round ? 'active' : ''}"></span>`).join('')}</div>
      ${round ? `<p class="scene-context">${escapeHTML(context())}</p>` : ''}
      <blockquote class="mobile-dialogue"><small>${escapeHTML(name)} ${stage === 'infant' ? 'signals' : 'says'}</small>${escapeHTML(speech())}</blockquote>
      ${info() ? `<details class="need-hint"><summary>What might ${escapeHTML(name)} need?</summary><p>${escapeHTML(named(info().need))}</p></details>` : ''}
      ${tip()}
      ${order.map((index,position) => `<button class="opt dialogue-choice" data-choice="${index}"><b>${String.fromCharCode(65+position)}</b><span>${escapeHTML(choices()[index])}</span></button>`).join('')}
      ${button('Write your own…','custom','opt write')}
      <p class="choice-help">Choose the one closest to what you’d really say. Keys A–E work too.</p>`;
    if (G.phase === 'react') {
      const entry = active();
      panel.innerHTML = `<div class="eyebrow">${crumb()}</div><h2>${escapeHTML(name)} reacts…</h2>
        <div class="said-card"><small>You said</small><p>${escapeHTML(entry.text)}</p></div>
        ${entry.reply ? `<div class="reply-card"><small>${escapeHTML(name)}</small><p>${escapeHTML(entry.reply)}</p></div>` : `<p class="scene-context">${activeStyle()?.id === 'level5' ? 'The moment feels tense. No physical harm is animated.' : 'Take a moment to notice the expression and the space between you.'}</p>`}
        ${moodMeter(mood())}
        ${button('See how this might feel','analyze','next-btn wide')}`;
    }
    if (G.phase === 'analysis') panel.innerHTML = analysis();
    if (G.phase === 'summary') panel.innerHTML = summary();
    if (G.phase === 'journal') panel.innerHTML = `<h2>${journal.length} completed ${journal.length === 1 ? 'scene' : 'scenes'}</h2>${journal.length ? journal.slice().reverse().map(j => `<article class="journal-turn"><b>${escapeHTML(j.name)}</b><small>${escapeHTML(j.stage)} ${j.lens ? '· '+escapeHTML(j.lens) : ''} · ${escapeHTML(j.date)}</small>${j.turns.map(h => `<p><small>${escapeHTML(styleName(h))}${h.selfSelected ? ' · self-selected' : ''}</small>${escapeHTML(h.text)}</p>`).join('')}${j.plan ? `<p class="context">Next time: ${escapeHTML(j.plan)}</p>` : ''}</article>`).join('') : '<p>Finish a scene to see it here. Everything stays in this browser.</p>'}${button('Back to all scenes','library','next-btn')}${button('Download journal','download','retry')}`;
    if (G.phase === 'research') panel.innerHTML = `<h2>What informs this simulator?</h2><p>${stageNote}</p><p>The five response patterns come from the supplied MAPS-based workbooks. Original MAPS has seven practice dimensions, not five clinical parenting types. The workbook’s level cutoffs are interpretive.</p><p>MAPS’s original sample covered ages 3–17. Infant and younger-toddler examples are educational adaptations.</p><p>Erikson supplies a theoretical lens. The check-in factors, mood meter, and child reactions are authored for reflection; they are not a developmental test or measured before-and-after changes.</p><p>Older ages currently use the same stylized seated avatar. Scenarios and dialogue change with age.</p><ul class="source-list">${SOURCES.map(s => `<li><a href="${s.url}" target="_blank" rel="noopener">${s.title}</a></li>`).join('')}</ul><p><a href="research/parenting-development-review.md" target="_blank">Read the full article review and mapping</a></p>${G.chosen && history[round] ? button('Back to this analysis','back-analysis','next-btn') : button('Back to all scenes','library','next-btn')}`;
    panel.scrollTop = 0;
    if (phaseChanged) {
      if (matchMedia('(max-width:700px)').matches) window.scrollTo(0,0);
      const heading = panel.querySelector('h2');
      if (heading) { heading.tabIndex = -1; heading.focus({preventScroll:true}); }
    }
  }
  function renderCustom() {
    customOpen = true;
    panel.innerHTML = `<div class="eyebrow">${crumb()}</div><h2>What would you say?</h2><label for="customText">Your words or action</label><textarea id="customText" maxlength="500"></textarea><label for="customStyle">Optional: which pattern should the demo illustrate?</label><select id="customStyle"><option value="-1">Leave unclassified</option>${STYLES.map((s,i) => `<option value="${i}">${s.name}</option>`).join('')}</select><p class="practice-note">The prototype does not interpret your words. Selecting a pattern only chooses an illustration for reflection.</p>${button('Say it','send','next-btn')}${button('Back to choices','cancel','retry')}`;
    document.getElementById('customText').focus();
  }
  function nextRound() { round++; order = shuffle(); comparing = false; G.chosen = null; G.phase = 'choose'; run(['jump',11.6]); render(); }
  panel.oninput = event => {
    if (event.target.id === 'characterName') name = event.target.value.trim().slice(0,24) || 'Mia';
    if (event.target.id === 'reflectionPlan' && journal.length) { journal.at(-1).plan = event.target.value; save(); }
  };
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
      case 'design': G.phase = 'create'; run(['jump',clock.createAt]); render(); break;
      case 'replay': start(selected.id); break;
      case 'analyze': G.phase = 'analysis'; render(); break;
      case 'compare': comparing = true; render(); break;
      case 'compare-close': comparing = false; render(); break;
      case 'tip-next': tipIndex++; if (tipIndex >= TIPS.length) store.set(TIPS_KEY, '1'); render(); break;
      case 'tip-hide': tipIndex = TIPS.length; store.set(TIPS_KEY, '1'); render(); break;
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
    if (where === 'sound') { const on = sound.toggle(); soundBtn.textContent = on ? '🔊' : '🔇'; soundBtn.setAttribute('aria-label', on ? 'Turn sound off' : 'Turn sound on'); }
  };
  document.addEventListener('keydown', event => {
    if (G.phase !== 'choose' || customOpen || event.repeat || event.metaKey || event.ctrlKey || event.altKey || ['INPUT','TEXTAREA','SELECT'].includes(event.target.tagName)) return;
    const position = 'abcde'.indexOf(event.key.toLowerCase());
    if (position >= 0) choose(order[position]);
  });
  ui.startBtn.onclick = library;
  const restart = document.getElementById('restartBtn');
  restart.textContent = 'All scenes';
  restart.title = 'Back to all scenes';
  restart.onclick = library;
  ui.startBtn.textContent = 'Choose a scene';
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
      moodPill.hidden = !inScene || !variant();
      if (!moodPill.hidden) moodPill.innerHTML = moodMeter(mood());
      // Speech bubble: the child's line while choosing, their reply after a response.
      const reply = active()?.reply;
      const bubbleText = G.phase === 'choose' && !customOpen ? speech() : G.phase === 'react' && reply && W > replyAt ? reply : '';
      show(ui.bubble, !!bubbleText);
      if (bubbleText && ui.bubble.textContent !== bubbleText) ui.bubble.textContent = bubbleText;
      // Opening narration plays as captions over the scene.
      const beats = G.phase === 'intro' ? (info()?.beats || []).map(named) : [];
      const beat = beats[Math.min(beats.length - 1, Math.floor((W - introAt - 0.2) / 1.6))];
      caption.textContent = beat || '';
      caption.classList.toggle('show', !!beat && W - introAt > 0.2);
      props.visible = ['welcome','library','intro','choose','react','analysis','summary'].includes(G.phase) && selected.id !== 'tower';
      blocks.forEach(block => { block.visible = ['welcome','library','intro','choose','react','analysis'].includes(G.phase) && selected.id === 'tower'; });
      if (selected.id === 'milk' && props.visible && ['react','analysis'].includes(G.phase) && ['level1','level2'].includes(active()?.approach)) props.children.at(-1).scale.setScalar(Math.max(.15,1-(W-G.pickAt)*.15));
      else if (selected.id === 'milk' && props.children.length) props.children.at(-1).scale.setScalar(1);
    } };
}
