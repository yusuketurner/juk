(() => {
  const init = () => {
    const root = document.querySelector('.top-master');
    if (!root) return;
    const nav = root.querySelector('#top-nav');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const frames = [...root.querySelectorAll('.tm-photo-frame')];
    const reveal = () => frames.forEach(el => el.classList.add('is-visible'));
    if (!reduce && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        });
      }, {threshold:.12, rootMargin:'0px 0px -10% 0px'});
      frames.forEach(el => io.observe(el));
    } else reveal();

    const hero = root.querySelector('.tm-hero-photo img');
    let ticking = false;
    const move = () => {
      const y = Math.min(3.8, Math.max(-2.5, window.scrollY * .016));
      if (!reduce && hero) hero.style.transform = `scale(1.045) translate3d(0,${y}%,0)`;
      if (nav) nav.classList.toggle('is-scrolled', window.scrollY > 40);
      if (!reduce) {
        frames.forEach(frame => {
          if (!frame.classList.contains('is-visible')) return;
          const img = frame.querySelector('img');
          if (!img) return;
          const r = frame.getBoundingClientRect();
          if (r.bottom < -100 || r.top > innerHeight + 100) return;
          const progress = (innerHeight - r.top) / (innerHeight + r.height);
          const offset = Math.max(-2.2, Math.min(2.2, (progress - .5) * -4));
          img.style.transform = `scale(1.055) translate3d(0,${offset}%,0)`;
        });
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) { requestAnimationFrame(move); ticking = true; }
    };
    addEventListener('scroll', onScroll, {passive:true});
    move();
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
