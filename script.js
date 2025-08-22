// tese grab elements
const gallery = document.querySelector('.gallery');
const galleryItems = Array.from(document.querySelectorAll('.gallery .item'));
let thumbs = Array.from(document.querySelectorAll('.gallery .item img'));
const filtersBar = document.querySelector('.filters');

const lightbox = document.querySelector('.lightbox');
const lbImg = document.querySelector('.lightbox-img');
const btnClose = document.querySelector('.lightbox .close');
const btnPrev = document.querySelector('.lightbox .prev');
const btnNext = document.querySelector('.lightbox .next');

let currentIndex = 0;

// this one open lightbox when clicking a thumbnail 
gallery.addEventListener('click', (e) => {
  const clickedImg = e.target.closest('img');
  if (!clickedImg) return;
  const list = Array.from(document.querySelectorAll('.gallery .item:not(.is-hidden) img'));
  currentIndex = list.indexOf(clickedImg);
  if (currentIndex === -1) return;
  thumbs = list; // this set thumbs to currently visible images
  showImage();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden'; // this stop body scroll
});

// this for show image in lightbox
function showImage() {
  if (!thumbs.length) return;
  currentIndex = Math.max(0, Math.min(currentIndex, thumbs.length - 1));
  lbImg.src = thumbs[currentIndex].src;
  lbImg.alt = thumbs[currentIndex].alt || '';
}

// tis for close lightbox
function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}
btnClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox(); // click backdrop to close mygod
});

// the navigations
btnPrev.addEventListener('click', () => changeImage(-1));
btnNext.addEventListener('click', () => changeImage(1));
function changeImage(step) {
  if (!thumbs.length) return;
  currentIndex = (currentIndex + step + thumbs.length) % thumbs.length;
  showImage();
}

// this is for keyboard support
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') changeImage(-1);
  if (e.key === 'ArrowRight') changeImage(1);
});

//the filters (buttons)
filtersBar.addEventListener('click', (e) => {
  if (e.target.tagName !== 'BUTTON') return;
  const value = e.target.dataset.filter;
  // to highlight active button
  document.querySelectorAll('.filters button').forEach(b => b.classList.remove('is-active'));
  e.target.classList.add('is-active');
  //to  show/hide items
  galleryItems.forEach(item => {
    const show = (value === 'all') || item.classList.contains(value);
    item.classList.toggle('is-hidden', !show);
  });
  // so just rebuilded thumbs to include only visible items so lightbox navigation respects filters
  thumbs = Array.from(document.querySelectorAll('.gallery .item:not(.is-hidden) img'));
});
