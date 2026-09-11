(() => {
  const init = () => {
    const root = document.querySelector('.top-master');
    if (!root) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const frames = [...root.querySelectorAll('.tm-photo-frame')];
    if (reduce || !('IntersectionObserver' in window)) {
      frames.forEach(el => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, {threshold:.16, rootMargin:'0px 0px -12% 0px'});
    frames.forEach(el => io.observe(el));
    const hero = root.querySelector('.tm-hero-photo img');
    let ticking = false;
    const move = () => {
      if (hero) {
        const y = Math.min(3.5, Math.max(-3.5, window.scrollY * .018));
        hero.style.transform = `scale(1.025) translate3d(0,${y}%,0)`;
      }
      frames.forEach(frame => {
        if (!frame.classList.contains('is-visible')) return;
        const img = frame.querySelector('img');
        if (!img) return;
        const r = frame.getBoundingClientRect();
        if (r.bottom < -120 || r.top > innerHeight + 120) return;
        const progress = (innerHeight - r.top) / (innerHeight + r.height);
        const y = Math.max(-2.4, Math.min(2.4, (progress - .5) * -4));
        img.style.transform = `scale(1.055) translate3d(0,${y}%,0)`;
      });
      ticking = false;
    };
    addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(move); ticking = true; }
    }, {passive:true});
    move();
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
