
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
