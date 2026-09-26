
const button = document.querySelector('.menu-button');
const nav = document.querySelector('.main-nav');
if (button && nav) {
  button.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    button.setAttribute('aria-expanded', String(isOpen));
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    button.setAttribute('aria-expanded', 'false');
  }));
}
document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

document.querySelectorAll('.realization-slider-wrap').forEach(function(wrap){
  var slider=wrap.querySelector('.realization-slider');
  var prev=wrap.querySelector('.slider-prev'), next=wrap.querySelector('.slider-next');
  function step(){return Math.max(280, slider.clientWidth*.72);}
  if(prev) prev.addEventListener('click',function(){slider.scrollBy({left:-step(),behavior:'smooth'});});
  if(next) next.addEventListener('click',function(){slider.scrollBy({left:step(),behavior:'smooth'});});
});

(function(){
  var box=document.querySelector('.photo-lightbox');
  if(!box) return;
  var img=box.querySelector('img'), items=Array.from(document.querySelectorAll('.gallery-item'));
  var current=0;
  function show(i){current=(i+items.length)%items.length;img.src=items[current].dataset.full;box.classList.add('open');box.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';}
  function close(){box.classList.remove('open');box.setAttribute('aria-hidden','true');document.body.style.overflow='';}
  items.forEach(function(item,i){item.addEventListener('click',function(){show(i);});});
  box.querySelector('.lightbox-close').addEventListener('click',close);
  box.querySelector('.lightbox-prev').addEventListener('click',function(){show(current-1);});
  box.querySelector('.lightbox-next').addEventListener('click',function(){show(current+1);});
  box.addEventListener('click',function(e){if(e.target===box)close();});
  document.addEventListener('keydown',function(e){
    if(!box.classList.contains('open'))return;
    if(e.key==='Escape')close();
    if(e.key==='ArrowLeft')show(current-1);
    if(e.key==='ArrowRight')show(current+1);
  });
})();


// realizace-project-lightbox-v2

(function(){
  var items=Array.from(document.querySelectorAll('.project-photo img'));
  if(!items.length) return;
  var box=document.querySelector('.photo-lightbox');
  if(!box){
    box=document.createElement('div');
    box.className='photo-lightbox';
    box.setAttribute('aria-hidden','true');
    box.setAttribute('role','dialog');
    box.setAttribute('aria-label','Zvětšená fotografie');
    box.innerHTML='<button class="lightbox-close" type="button" aria-label="Zavřít">×</button><button class="lightbox-arrow lightbox-prev" type="button" aria-label="Předchozí fotografie">‹</button><div class="lightbox-photo"><img src="" alt="Zvětšená fotografie"><div class="lightbox-brand" aria-label="FAST RIDE s.r.o."><span class="lightbox-brand-emblem"><img src="assets/logo-transparent.png" alt=""></span><span>FAST RIDE s.r.o.</span></div></div><button class="lightbox-arrow lightbox-next" type="button" aria-label="Další fotografie">›</button>';
    document.body.appendChild(box);
  }
  var img=box.querySelector('.lightbox-photo > img');
  var photo=box.querySelector('.lightbox-photo');
  var current=0;
  function fitPhoto(){
    if(!img.naturalWidth || !photo) return;
    var scale=Math.min(1,1240/img.naturalWidth,(window.innerWidth*.92)/img.naturalWidth,(window.innerHeight*.84)/img.naturalHeight);
    photo.style.width=Math.round(img.naturalWidth*scale)+'px';
    photo.style.height=Math.round(img.naturalHeight*scale)+'px';
  }
  img.addEventListener('load',fitPhoto);
  window.addEventListener('resize',fitPhoto);
  function show(i){
    current=(i+items.length)%items.length;
    img.src=items[current].getAttribute('data-full') || items[current].currentSrc || items[current].src;
    img.alt=items[current].alt || 'Zvětšená fotografie';
    if(img.complete) fitPhoto();
    box.classList.add('open');
    box.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
  }
  function close(){
    box.classList.remove('open');
    box.setAttribute('aria-hidden','true');
    document.body.style.overflow='';
  }
  items.forEach(function(item,i){
    item.addEventListener('click',function(){show(i);});
  });
  var closeBtn=box.querySelector('.lightbox-close');
  var prevBtn=box.querySelector('.lightbox-prev');
  var nextBtn=box.querySelector('.lightbox-next');
  if(closeBtn) closeBtn.addEventListener('click',close);
  if(prevBtn) prevBtn.addEventListener('click',function(e){e.stopPropagation();show(current-1);});
  if(nextBtn) nextBtn.addEventListener('click',function(e){e.stopPropagation();show(current+1);});
  box.addEventListener('click',function(e){ if(e.target===box) close(); });
  document.addEventListener('keydown',function(e){
    if(!box.classList.contains('open')) return;
    if(e.key==='Escape') close();
    if(e.key==='ArrowLeft') show(current-1);
    if(e.key==='ArrowRight') show(current+1);
  });
})();
