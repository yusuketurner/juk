(function(){
  function init(){
    var root=document.querySelector('.home-world');
    if(!root)return;
    var targets=root.querySelectorAll('.visual-break-photo,.world-menu-card:before,.intro-map,.kayoi-illustration,.world-final');
    root.querySelectorAll('.visual-break-photo,.world-menu-card,.intro-map,.kayoi-illustration,.world-final').forEach(function(el,i){
      el.classList.add('top-reveal');
      if(i%3===1)el.classList.add('from-right');
      else if(i%3===0)el.classList.add('from-left');
    });
    var reveal=root.querySelectorAll('.top-reveal');
    if(!('IntersectionObserver' in window)){
      reveal.forEach(function(el){el.classList.add('is-visible')});
      return;
    }
    var observer=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },{threshold:.14,rootMargin:'0px 0px -10% 0px'});
    reveal.forEach(function(el){observer.observe(el)});

    /* Gentle image parallax: movement is tied to scroll position, never a harsh transform. */
    var photos=root.querySelectorAll('.visual-break-photo img,.world-photo img');
    var ticking=false;
    function parallax(){
      var vh=window.innerHeight;
      photos.forEach(function(img){
        var r=img.getBoundingClientRect();
        if(r.bottom<0||r.top>vh)return;
        var center=(r.top+r.height/2-vh/2)/vh;
        img.style.setProperty('--scroll-y',(center*-18).toFixed(2)+'px');
        img.style.transform='translate3d(0,var(--scroll-y),0) scale(1.035)';
      });
      ticking=false;
    }
    window.addEventListener('scroll',function(){
      if(!ticking){window.requestAnimationFrame(parallax);ticking=true}
    },{passive:true});
    parallax();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
