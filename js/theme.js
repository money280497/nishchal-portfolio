export function initTheme() {
  const html = document.documentElement;
  const toggle = document.getElementById('themeToggle');

  function setTheme(next) {
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    toggle.setAttribute('aria-pressed', String(next === 'dark'));
  }

  toggle.setAttribute('aria-pressed', String(html.getAttribute('data-theme') === 'dark'));

  toggle.addEventListener('click', () => {
    setTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });
}
