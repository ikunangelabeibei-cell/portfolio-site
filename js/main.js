// Rebecca Xu portfolio — interactions
document.documentElement.classList.add('js');
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

// Mobile nav
const toggle = $('.nav-toggle'), nav = $('.nav');
toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});

// Reading progress + header shadow
const bar = document.createElement('div'); bar.className = 'progress-bar'; document.body.prepend(bar);
const hdr = $('.site-header');
const onScroll = () => {
  const d = document.documentElement;
  const p = d.scrollTop / Math.max(1, d.scrollHeight - d.clientHeight);
  bar.style.transform = `scaleX(${p})`;
  hdr?.classList.toggle('scrolled', d.scrollTop > 8);
};
addEventListener('scroll', onScroll, { passive: true }); onScroll();

// Scroll reveal
const revealEls = $$('.hero .wrap > *, .hero-grid > *, .section-head, .filters, .case, .pillar-grid > div, .stats .wrap > div, .project-facts .wrap > div, .xp-item, .story-row, .cv-item, .cv-h2, .block, .beyond-grid img, .facts, .form, .project-nav a, .workbook, .shots img, .slides img, .why .wrap > *');
revealEls.forEach(el => {
  el.classList.add('reveal');
  const i = [...el.parentElement.children].indexOf(el);
  el.style.transitionDelay = `${Math.min(i, 8) * 70}ms`;
});
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: 0.08, rootMargin: '0px 0px -4% 0px' });
revealEls.forEach(el => io.observe(el));

// Count-up numbers
$$('.stats strong, .project-facts strong').forEach(el => {
  const m = el.textContent.trim().match(/^(\d+)(.*)$/); if (!m) return;
  const n = +m[1], suf = m[2]; el.textContent = '0' + suf;
  const o = new IntersectionObserver(es => {
    if (!es[0].isIntersecting) return; o.disconnect();
    const t0 = performance.now(), dur = 1100;
    const step = now => {
      const k = Math.min(1, (now - t0) / dur);
      el.textContent = Math.round(n * (1 - Math.pow(1 - k, 3))) + suf;
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, { threshold: 0.5 });
  o.observe(el);
});

// Rotating word in hero
$$('.rotate').forEach(r => {
  const words = r.dataset.words.split('|'); let i = 0; const span = r.firstElementChild;
  setInterval(() => {
    span.classList.add('out');
    setTimeout(() => { i = (i + 1) % words.length; span.textContent = words[i]; span.classList.remove('out'); }, 320);
  }, 2600);
});

// Work filters
const filters = $('.filters');
filters?.addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  $$('button', filters).forEach(x => x.classList.toggle('on', x === b));
  const f = b.dataset.f;
  $$('.case').forEach(c => {
    const show = f === 'all' || (c.dataset.cat || '').split(' ').includes(f);
    c.classList.toggle('hide', !show);
    if (show) c.classList.add('in');
  });
});

// Experience accordion
$$('.xp-head').forEach(b => b.addEventListener('click', () => {
  const open = b.getAttribute('aria-expanded') === 'true';
  b.setAttribute('aria-expanded', String(!open));
  b.parentElement.classList.toggle('open', !open);
}));

// On-this-page scroll spy
const tocLinks = $$('.toc a');
if (tocLinks.length) {
  const secs = tocLinks.map(a => $(a.getAttribute('href'))).filter(Boolean);
  const spy = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) tocLinks.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id));
  }), { rootMargin: '-25% 0px -65% 0px' });
  secs.forEach(s => spy.observe(s));
}

// Lightbox for screenshots and slides
const zoomables = $$('.shots img, .slides img, .workbook img, .project-photo > .wrap > img, .beyond-grid img');
if (zoomables.length) {
  const lb = document.createElement('div'); lb.className = 'lb';
  lb.innerHTML = '<button class="lb-x" aria-label="Close">×</button><img alt="">';
  document.body.append(lb);
  const close = () => lb.classList.remove('open');
  lb.addEventListener('click', close);
  addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  zoomables.forEach(im => {
    im.classList.add('zoomable');
    im.addEventListener('click', () => { $('img', lb).src = im.currentSrc || im.src; lb.classList.add('open'); });
  });
}

// Copy email
$$('.copy-email').forEach(b => b.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(b.dataset.email);
    const t = b.textContent; b.textContent = 'Copied!'; setTimeout(() => (b.textContent = t), 1800);
  } catch { location.href = 'mailto:' + b.dataset.email; }
}));
