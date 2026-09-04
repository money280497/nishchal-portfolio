export function initGallery() {
  const gallery = document.getElementById('photoGallery');
  const slides = [...gallery.querySelectorAll('.gallery-slide')];
  const thumbsWrap = document.getElementById('galleryThumbs');
  const dotsWrap = document.getElementById('galleryDots');
  const meta = document.getElementById('galleryMeta');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let index = 0;
  let timer;
  let paused = false;

  slides.forEach((slide, i) => {
    const thumb = document.createElement('button');
    thumb.type = 'button';
    thumb.className = 'gallery-thumb' + (i === 0 ? ' active' : '');
    thumb.setAttribute('aria-label', 'Photo ' + (i + 1));
    const img = slide.querySelector('img').cloneNode();
    img.removeAttribute('loading');
    thumb.appendChild(img);
    thumb.addEventListener('click', () => goTo(i, true));
    thumbsWrap.appendChild(thumb);

    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'gallery-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', 'Slide ' + (i + 1));
    dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    dot.addEventListener('click', () => goTo(i, true));
    dotsWrap.appendChild(dot);
  });

  const thumbs = [...thumbsWrap.children];
  const dots = [...dotsWrap.children];

  function goTo(i, manual) {
    index = (i + slides.length) % slides.length;
    slides.forEach((s, n) => s.classList.toggle('active', n === index));
    thumbs.forEach((t, n) => t.classList.toggle('active', n === index));
    dots.forEach((d, n) => {
      d.classList.toggle('active', n === index);
      d.setAttribute('aria-selected', n === index ? 'true' : 'false');
    });
    meta.textContent = index + 1 + ' / ' + slides.length;
    if (manual) resetTimer();
  }

  function resetTimer() {
    clearInterval(timer);
    if (reducedMotion || paused) return;
    timer = setInterval(() => goTo(index + 1), 6000);
  }

  document.getElementById('galleryPrev').addEventListener('click', () => goTo(index - 1, true));
  document.getElementById('galleryNext').addEventListener('click', () => goTo(index + 1, true));

  gallery.addEventListener('mouseenter', () => { paused = true; resetTimer(); });
  gallery.addEventListener('mouseleave', () => { paused = false; resetTimer(); });
  gallery.addEventListener('focusin', () => { paused = true; resetTimer(); });
  gallery.addEventListener('focusout', () => { paused = false; resetTimer(); });
  document.addEventListener('visibilitychange', () => {
    paused = document.hidden;
    resetTimer();
  });

  goTo(0);
  resetTimer();
}
