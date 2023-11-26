function openPopup(domElement){
  domElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupByEscape);
}

function closePopup(domElement){
  document.removeEventListener('keydown', closePopupByEscape);
  domElement.classList.remove('popup_is-opened');
  domElement.classList.add('popup_is-animated');
}

function closePopupByEscape(evt){
  if(evt.key === "Escape"){
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
}

function closePopupByClick(evt){
  if(evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')){
    closePopup(evt.currentTarget);
  }
}

export {openPopup, closePopup, closePopupByClick};
