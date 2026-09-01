export function initScrollAnimations() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('.section-label, .section-inner > .section-title').forEach((el) => {
    el.classList.add('reveal', 'reveal-fade');
  });

  document.querySelectorAll('.stagger-children').forEach((container) => {
    [...container.children].forEach((child, i) => child.style.setProperty('--stagger-i', i));
  });

  document.querySelectorAll('.exp-list .exp-item.reveal').forEach((el, i) => {
    el.style.setProperty('--reveal-delay', i * 90 + 'ms');
  });

  if (reduced) {
    document.querySelectorAll('.reveal, .stagger-children, .reveal-left, .reveal-right').forEach((el) => {
      el.classList.add('visible');
    });
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -6% 0px' }
  );

  document.querySelectorAll('.reveal, .stagger-children').forEach((el) => revealObserver.observe(el));

  requestAnimationFrame(() => {
    const gallery = document.querySelector('.photo-gallery.reveal');
    if (gallery) gallery.classList.add('visible');
  });

  const nav = document.querySelector('nav');
  const heroBg = document.querySelector('.hero-grid-bg');
  const gallery = document.querySelector('.photo-gallery');
  let scrollTicking = false;

  function onScrollAnim() {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      nav.classList.toggle('nav-scrolled', y > 20);
      if (y < window.innerHeight * 1.2) {
        if (heroBg) heroBg.style.transform = `translate3d(0, ${y * 0.22}px, 0)`;
        if (gallery) gallery.style.transform = `translate3d(0, ${y * -0.06}px, 0)`;
      }
      scrollTicking = false;
    });
  }

  window.addEventListener('scroll', onScrollAnim, { passive: true });
  onScrollAnim();
}
