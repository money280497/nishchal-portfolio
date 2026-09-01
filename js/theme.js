export function initTheme() {
  const html = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const saved = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', saved);

  function setTheme(next) {
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  }

  toggle.addEventListener('click', () => {
    setTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });
}
