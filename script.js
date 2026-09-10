const nav=document.querySelector('.nav');const menu=document.querySelector('.menu');let open=false;const navLinks=document.querySelector('.nav nav');if(navLinks){if(!navLinks.querySelector('[href="index.html"]'))navLinks.insertAdjacentHTML('afterbegin','<a href="index.html" class="top-link">TOP</a>');if(!navLinks.querySelector('[href="blog.html"]'))navLinks.insertAdjacentHTML('beforeend','<a href="blog.html">ブログ</a><a href="contact.html">お問い合わせ</a>')}let mobilePanel=null;function buildMobilePanel(){if(mobilePanel||!navLinks)return;mobilePanel=document.createElement('div');mobilePanel.className='mobile-nav-panel';mobilePanel.innerHTML=navLinks.innerHTML;Object.assign(mobilePanel.style,{position:'fixed',top:'76px',left:'14px',right:'14px',padding:'22px',background:'#fffdf5f7',border:'1px solid #71978955',borderRadius:'28px',backdropFilter:'blur(18px)',boxShadow:'0 20px 55px #5c806d26',display:'none',flexDirection:'column',gap:'4px',zIndex:'49'});mobilePanel.querySelectorAll('a').forEach(a=>Object.assign(a.style,{display:'block',padding:'13px 8px',fontSize:'14px',fontWeight:'800',borderBottom:'1px solid #71978922'}));document.body.appendChild(mobilePanel)}function toggleMenu(){open=!open;if(nav)nav.classList.toggle('expanded',open);document.body.classList.toggle('menu-open',open);if(window.matchMedia('(max-width:900px)').matches){buildMobilePanel();if(mobilePanel)mobilePanel.style.display=open?'flex':'none';if(nav)nav.style.borderRadius=open?'24px':'999px'}else if(mobilePanel){mobilePanel.style.display='none'}}if(menu)menu.addEventListener('click',toggleMenu);if(navLinks)navLinks.addEventListener('click',e=>{if(e.target.closest('a')&&open){open=false;if(mobilePanel)mobilePanel.style.display='none';if(nav)nav.style.borderRadius='999px'}});addEventListener('resize',()=>{if(!window.matchMedia('(max-width:900px)').matches){open=false;if(mobilePanel)mobilePanel.style.display='none';if(nav)nav.style.borderRadius='999px'}});

/* Visual QA / refinement layer */
const refine=document.createElement('style');refine.textContent=`
/* headline rhythm */
.world-hero h1{max-width:760px}
.world-hero h1 span{white-space:nowrap}
.world-hero-copy{animation:heroCopyIn .9s cubic-bezier(.2,.8,.2,1) both}
@keyframes heroCopyIn{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
/* richer hero motion */
.world-hero-art{transform:translate3d(var(--hero-x,0),var(--hero-y,0),0);transition:transform .7s cubic-bezier(.2,.8,.2,1)}
.world-hero:after{content:'';position:absolute;inset:auto 0 0;height:1px;background:#46695b22;box-shadow:0 -90px 120px #fff6c733;pointer-events:none}
.hero-motion-orbit{position:absolute;width:110px;height:110px;border:2px dashed #df8797;border-radius:50%;right:13%;bottom:14%;opacity:.65;pointer-events:none;animation:orbitSpin 14s linear infinite}
.hero-motion-orbit:after{content:'✦';position:absolute;right:-7px;top:44%;font-size:22px;color:#df8797;background:#fff7c9;padding:2px 5px;border-radius:50%}
@keyframes orbitSpin{to{transform:rotate(360deg)}}
.hero-scroll-line{position:absolute;left:6vw;bottom:24px;width:150px;height:3px;background:#46695b22;overflow:hidden;border-radius:99px;z-index:8}
.hero-scroll-line span{display:block;width:34%;height:100%;background:#df8797;transform:translateX(-120%);animation:scrollLine 2.8s ease-in-out infinite}
@keyframes scrollLine{0%,100%{transform:translateX(-120%)}50%{transform:translateX(320%)}}
/* never crop the key supplied classroom photos */
.study-photo-main img,.about-photo-main img,.people-portrait-main img,.en-photo-main img{object-fit:contain;background:#fff}
/* page-specific wireframes: each intent gets its own composition */
@media(min-width:901px){
.about-hero{grid-template-columns:1.18fr .82fr;gap:5vw}.about-hero-copy{order:2}.about-hero-art{order:1;transform:translateY(18px) rotate(-2deg)}
.people-hero{grid-template-columns:1.18fr .82fr}.people-hero-copy{padding-left:5vw}.people-portrait{transform:translateY(20px)}
.ab-hero{grid-template-columns:1.05fr .95fr}.ab-visual{order:-1;transform:translateY(18px)}.ab-copy{padding-right:4vw}
.pr-hero{display:block;text-align:center;padding-top:170px}.pr-hero>div:first-child{max-width:900px;margin:auto}.pr-hero p{margin-left:auto;margin-right:auto}.pr-ticket{max-width:920px;margin:45px auto 0}.pr-stack{inset:0 12%}.pr-card{width:390px}
.ac-hero{display:block;min-height:790px;padding:150px 6vw 70px}.ac-map{position:absolute;inset:130px 6vw 70px;min-height:0}.ac-hero>.reveal{position:relative;z-index:5;width:min(520px,55%);padding:34px 38px;background:#fffdf5e8;border:1px solid #71978933;border-radius:32px;box-shadow:15px 18px 0 #46695b18;backdrop-filter:blur(12px)}
}
/* desktop tablet refinement: preserve the two-line headline while keeping the photo visible */
@media(min-width:901px) and (max-width:1350px){
.world-hero{grid-template-columns:minmax(430px,.92fr) minmax(470px,1.08fr);gap:2vw;padding-left:5vw;padding-right:5vw}
.world-hero h1{font-size:clamp(62px,7vw,92px);letter-spacing:-.075em}
.world-hero-copy{max-width:560px}
.world-hero-art{height:560px;max-width:610px}
.main-photo{inset:3% 3% 5% 10%}
.small-photo{width:195px;height:175px}
.sun-burst{width:120px;height:120px}
}
@media(max-width:900px){.world-hero h1 span{white-space:normal}.hero-scroll-line{left:20px;width:110px}.hero-motion-orbit{right:7%;bottom:10%;width:75px;height:75px}.study-photo-main img,.about-photo-main img,.people-portrait-main img,.en-photo-main img{object-fit:contain}}
`;
document.head.appendChild(refine);

/* Fix the known study hero image typo and keep the full supplied frame visible. */
document.querySelectorAll('img').forEach(img=>{const src=img.getAttribute('src')||'';if(src.includes('GF0f7G2')&&src.includes('CdG2TK'))img.src=src.replace('CdG2TK','CdGq2TK')});

/* Homepage: turn the first screen into a living composition. */
if(document.body.classList.contains('home-world')){
 const art=document.querySelector('.world-hero-art');const hero=document.querySelector('.world-hero');
 if(art&&hero){const orbit=document.createElement('div');orbit.className='hero-motion-orbit';art.appendChild(orbit);const line=document.createElement('div');line.className='hero-scroll-line';line.innerHTML='<span></span>';hero.appendChild(line);hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;art.style.setProperty('--hero-x',`${x*16}px`);art.style.setProperty('--hero-y',`${y*12}px`)});hero.addEventListener('pointerleave',()=>{art.style.setProperty('--hero-x','0px');art.style.setProperty('--hero-y','0px')});}
 const title=document.querySelector('.world-hero h1');if(title)title.innerHTML='学ぶって、<span>ちょっと楽しい。</span>';
 const copy=document.querySelector('.world-hero-copy');if(copy)copy.querySelector('.eyebrow')?.insertAdjacentText('afterend','  ');
}

const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));const parallax=[...document.querySelectorAll('.parallax,.hero-visual,.flexible-image,.page-photo')];const motion=[...document.querySelectorAll('.choice-card,.story-card,.price-panel,.final-image,.gallery .g')];let ticking=false;function move(){const vh=innerHeight;const y=window.scrollY;parallax.forEach((el,i)=>{const r=el.getBoundingClientRect();if(r.bottom>0&&r.top<vh){const speed=Number(el.dataset.speed||(.045+(i%3)*.018));const p=(vh/2-(r.top+r.height/2))/vh;el.style.setProperty('--py',`${p*55*speed*10}px`);el.style.setProperty('--scale',`${1+Math.min(.035,Math.abs(p)*.035)}`)}});motion.forEach((el,i)=>{const r=el.getBoundingClientRect();if(r.bottom>0&&r.top<vh){const p=(r.top+r.height/2-vh/2)/vh;const x=(i%2?-1:1)*p*24;const y2=-p*18;const rot=(i%2?-1:1)*p*1.8;el.style.setProperty('--mx',`${x}px`);el.style.setProperty('--my',`${y2}px`);el.style.setProperty('--rot',`${rot}deg`);el.style.setProperty('--photo-scale',`${1+Math.min(.045,Math.abs(p)*.045)}`)}});if(nav){nav.classList.toggle('scrolled',y>40);nav.style.boxShadow=y>40?'0 18px 50px #5c806d26':'0 12px 35px #5c806d1c'}ticking=false}addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(move);ticking=true}},{passive:true});addEventListener('resize',move);move();

/* Final typography/image QA: prevent display clipping at common desktop widths. */
const qa=document.createElement('style');qa.textContent=`
/* Keep editorial Japanese headlines intact instead of letting a single phrase wrap by glyph. */
.page-hero h1 em,.ac-hero h1 em,.pr-hero h1 em{white-space:nowrap}
.page-hero h1,.ac-hero h1,.pr-hero h1{overflow-wrap:normal;word-break:keep-all}
/* Access: readable two-line lockup, never wider than its card. */
@media(min-width:901px){.ac-hero>.reveal{width:min(620px,58%);padding:30px 34px}.ac-hero h1{font-size:clamp(62px,6.1vw,94px);max-width:620px}.ac-hero h1 em{display:inline-block}.ac-hero p{font-size:15px}.ac-map{inset:130px 4vw 70px}.ac-label{font-size:14px}}
/* Price: make the headline a deliberate two-line composition. */
@media(min-width:901px){.pr-hero>div:first-child{max-width:1080px}.pr-hero h1{font-size:clamp(64px,7.2vw,112px);max-width:1050px;margin-left:auto;margin-right:auto}.pr-hero h1 em{display:inline-block}.pr-hero p{max-width:720px}}
/* Blog: the supplied image lives at repository root; preserve its full frame. */
.blog-hero .page-photo{background:#fff}.blog-hero .page-photo img{object-fit:contain;background:#fff}
/* General page imagery: no important subject should be lost to a forced crop. */
.page-photo img{object-position:center center}
@media(max-width:900px){.page-hero h1,.ac-hero h1,.pr-hero h1{font-size:clamp(48px,13vw,78px)}.page-hero h1 em,.ac-hero h1 em,.pr-hero h1 em{display:inline-block}.ac-hero>.reveal{width:100%;padding:0;background:transparent;border:0;box-shadow:none}.ac-map{position:relative;inset:auto;margin-top:20px}.pr-hero{text-align:left}.pr-hero h1{max-width:100%}}
`;
document.head.appendChild(qa);