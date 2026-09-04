const NAV_SECTIONS = ['top', 'about', 'experience', 'projects', 'education', 'contact'];

function getScrollOffset() {
  const styles = getComputedStyle(document.documentElement);
  const navH = parseFloat(styles.getPropertyValue('--nav-h')) || 64;
  const extra = parseFloat(styles.fontSize) * 0.75 || 12;
  return navH + extra;
}

function scrollToSection(id) {
  if (id === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  const target = document.getElementById(id);
  if (!target) return;
  const marker = target.querySelector('.section-label') || target.querySelector('h2') || target;
  marker.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function initNavigation(mobileMenu) {
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-link');

  function updateActiveNav() {
    let current = 'top';
    const scrollPos = window.scrollY + getScrollOffset() * 0.5;
    for (let i = NAV_SECTIONS.length - 1; i >= 0; i--) {
      const sec = document.getElementById(NAV_SECTIONS[i]);
      if (sec && scrollPos >= sec.offsetTop) {
        current = NAV_SECTIONS[i];
        break;
      }
    }
    navLinks.forEach((link) => {
      const active = link.getAttribute('href') === '#' + current;
      link.classList.toggle('active', active);
      if (link.closest('.nav-links')) {
        link.style.color = active ? 'var(--text)' : '';
        link.style.fontWeight = active ? '500' : '';
      }
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      e.preventDefault();
      if (mobileMenu.isOpen()) mobileMenu.close();
      scrollToSection(href.slice(1));
      history.pushState(null, '', href);
    });
  });

  document.querySelector('.nav-logo')?.addEventListener('click', (e) => {
    e.preventDefault();
    scrollToSection('top');
    history.pushState(null, '', '#top');
  });

  updateActiveNav();
  window.addEventListener('scroll', updateActiveNav, { passive: true });
}
