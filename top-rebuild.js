(() => {
  const init = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const sections = [...document.querySelectorAll('.top-rebuild .reveal-photo')];
    if (!sections.length) return;
    if (reduce || !('IntersectionObserver' in window)) {
      sections.forEach(el => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, {threshold:.12, rootMargin:'0px 0px -10% 0px'});
    sections.forEach(el => io.observe(el));
    const photos = [...document.querySelectorAll('.top-rebuild .reveal-photo img')];
    let ticking = false;
    const move = () => {
      photos.forEach(img => {
        const section = img.closest('.reveal-photo');
        if (!section || !section.classList.contains('is-visible')) return;
        const r = section.getBoundingClientRect();
        if (r.bottom < -150 || r.top > innerHeight + 150) return;
        const p = (innerHeight-r.top)/(innerHeight+r.height);
        const y = Math.max(-2.8, Math.min(2.8, (p-.5)*-5));
        img.style.transform = `scale(1.045) translate3d(0,${y}%,0)`;
      });
      ticking=false;
    };
    addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(move);ticking=true;}},{passive:true});
    move();
  };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
