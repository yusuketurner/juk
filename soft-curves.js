(function(){
  function init(){
    var selectors=[
      '.home-world .visual-break-photo',
      '.home-world .experience-card',
      '.home-world .world-menu-card:before',
      '.home-world .world-intro .intro-map'
    ];
    document.querySelectorAll('.home-world .visual-break-photo,.home-world .experience-card').forEach(function(el,i){
      el.classList.add('scroll-photo');
      el.classList.add(i%2?'from-right':'from-left');
      el.style.setProperty('--r',getComputedStyle(el).transform==='none'?'0deg':(i%2?'5deg':'-3deg'));
    });
    document.querySelectorAll('.home-world .intro-map,.home-world .world-menu-card').forEach(function(el){el.classList.add('scroll-illustration')});
    var items=document.querySelectorAll('.scroll-photo,.scroll-illustration');
    if(!('IntersectionObserver' in window)){items.forEach(function(el){el.classList.add('is-visible')});return;}
    var io=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('is-visible');io.unobserve(entry.target)}})},{threshold:.16,rootMargin:'0px 0px -8% 0px'});
    items.forEach(function(el){io.observe(el)});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
