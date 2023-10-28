const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

function addCard(name, link, alt, removeCallback, likeCallback, openCallback) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = alt;
  cardElement.querySelector('.card__image').addEventListener('click', openCallback);
  cardElement.querySelector('.card__delete-button').addEventListener('click', removeCallback);
  cardElement.querySelector('.card__like-button').addEventListener('click', likeCallback);

  return cardElement;
}

function removeCard(event) {
  event.target.closest('.card').remove();
}

function likeCard(event) {
  if(event.target.classList.contains('card__like-button_is-active')){
    event.target.classList.remove('card__like-button_is-active');
  }else{
    event.target.classList.add('card__like-button_is-active');
  }
}

export {initialCards, addCard, removeCard, likeCard}
