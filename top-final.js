(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const photos = [...document.querySelectorAll('.home-world .photo-only')];
  if (!photos.length) return;
  photos.forEach((section) => {
    section.classList.add('top-photo-ready');
  });
  if (reduce) {
    photos.forEach((section) => section.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  photos.forEach((section) => observer.observe(section));
  let ticking = false;
  const move = () => {
    photos.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.bottom < -100 || rect.top > window.innerHeight + 100) return;
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const offset = Math.max(-2, Math.min(2, (progress - .5) * -3));
      section.querySelector('img').style.transform = `translate3d(0, ${offset}%, 0) scale(1.02)`;
    });
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { window.requestAnimationFrame(move); ticking = true; }
  }, { passive: true });
})();
