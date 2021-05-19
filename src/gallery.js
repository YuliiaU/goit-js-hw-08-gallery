import galleryItems from './gallery-items.js'
const pictures = galleryItems;

const galleryContainer = document.querySelector('.js-gallery');
const cardsMarkup = createGalleryMarkup(pictures);
const lightBoxEl = document.querySelector('.js-lightbox');
const lightBoxImgEl = document.querySelector('.lightbox__image');
const closeModalBtn = document.querySelector('[data-action="close-lightbox"]');
const lightBoxOverlay = document.querySelector('.lightbox__overlay');

galleryContainer.insertAdjacentHTML('beforeend', cardsMarkup);

galleryContainer.addEventListener('click', onGalleryContainerClick);
closeModalBtn.addEventListener('click', onCloseModalBtmClick);
lightBoxOverlay.addEventListener('click', onBackdropClick);



function createGalleryMarkup(pictures) {
   
       return pictures.map(({ preview, original, description }) => {
        return `
        
 <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}" 
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li> 
        `;
    })
    .join('');
};

function onGalleryContainerClick(evt) {
    const isGallerySwatchEl = evt.target.classList.contains('gallery__image');

    if (!isGallerySwatchEl) {
        return;
    }
    evt.preventDefault();
    onOpenModal();
    updatePictureAttr(evt.target.dataset.source,evt.target.alt);

    // console.log(evt.target);
};

function onOpenModal() {
    window.addEventListener('keydown', onArrowKeyPress);
    window.addEventListener('keydown', onEsckeyPress);
    lightBoxEl.classList.add('is-open');
};

function updatePictureAttr(source,alt) {
    lightBoxImgEl.src = source;
    lightBoxImgEl.alt = alt;
};

function onCloseModalBtmClick() {
    onCloseModal();
    updatePictureAttr('', '');
};
    
function onCloseModal() {
    window.removeEventListener('keydown', onArrowKeyPress);
    window.removeEventListener('keydown', onEsckeyPress);
     lightBoxEl.classList.remove('is-open');
};

function onBackdropClick(evt) { 
    if (evt.currentTarget === evt.target) {
        onCloseModal();
    };
};

function onEsckeyPress(evt) {
    if (evt.code === 'Escape') {
        onCloseModal();
    };
};

function onArrowKeyPress(evt) {
    if (evt.code === 'ArrowLeft') {
        const i = galleryItems.findIndex(picture => picture.original === lightBoxImgEl.src) - 1;
        if (i === -1) {
            return
        }
        lightBoxImgEl.src = galleryItems[i].original;
        lightBoxImgEl.alt = galleryItems[i].description;
    } else if (evt.code === 'ArrowRight') {
        const i = galleryItems.findIndex(picture => picture.original === lightBoxImgEl.src) + 1;
        if (i === galleryItems.length-1) {
            return
        }
        lightBoxImgEl.src = galleryItems[i].original;
        lightBoxImgEl.alt = galleryItems[i].description;
    };
};
