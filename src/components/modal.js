function openModal(domElement){
  domElement.classList.add('popup_is-opened');

  document.addEventListener('click', (function handler(evt){
    if(evt.target.classList.contains('popup__close')){
      closeModal(domElement);

      document.removeEventListener('click', handler);
    }
  }));

  closeModalByEscape(domElement);
  closeModalByOverlay(domElement);
}

function closeModal(domElement){
  domElement.classList.remove('popup_is-opened');
  domElement.classList.add('popup_is-animated');

  setTimeout(() => document.forms['new-place'].reset(), 600);
}

function closeModalByEscape(domElement){
  document.addEventListener('keydown', (function handler(evt){
    if(evt.key === "Escape"){
      closeModal(domElement);

      document.removeEventListener('keydown', handler);
    }
  }));
}

function closeModalByOverlay(domElement){
  document.addEventListener('click', (function handler(evt){
    if((evt.target.contains(domElement))&&(!evt.target.contains(domElement.querySelector('popup__content')))){
      closeModal(domElement);

      document.removeEventListener('click', handler);
    }
  }))
}

export {openModal, closeModal};
