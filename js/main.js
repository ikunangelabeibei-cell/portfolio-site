// Testimonial carousel + mobile nav
document.querySelectorAll('.carousel').forEach((c) => {
  const track = c.querySelector('.track');
  const step = () => track.firstElementChild.getBoundingClientRect().width + 32;
  c.querySelector('[data-prev]')?.addEventListener('click', () => track.scrollBy({ left: -step() }));
  c.querySelector('[data-next]')?.addEventListener('click', () => track.scrollBy({ left: step() }));
});

const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
