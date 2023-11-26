import { openPopup, closePopup } from "./modal";
import { removeCardAPI, likeCardAPI, unlikeCardAPI } from "./api";

function createCard(card, currentUserId, removeCallback, likeCallback, openCallback) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  if(card.likes.length !== 0){
    cardElement.querySelector('.card__like-numbers').textContent = card.likes.length;
    card.likes.forEach(like => {
      if(like._id === currentUserId){
        cardElement.querySelector('.card__like-button').classList.toggle('card__like-button_is-active');
      }
    });
  }

  if(card.owner._id === currentUserId){
    cardElement.querySelector('.card__delete-button').addEventListener('click', removeCallback);
    cardElement.querySelector('.card__delete-button').classList.add('card__delete-button_visble');
  }

  cardElement.id = card._id;
  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.name;
  cardElement.querySelector('.card__image').addEventListener('click', openCallback);
  cardElement.querySelector('.card__like-button').addEventListener('click', likeCallback);

  return cardElement;
}

function removeCard(event) {
  const deletePopup = document.querySelector('.popup_type_delete-card');
  const deleteButton = deletePopup.querySelector('.popup__button');
  const card = event.target.closest('.card');

  openPopup(deletePopup);

  deleteButton.addEventListener('click',(evt) => {
    removeCardAPI(card.id)
      .then((result) => {
        card.remove();
        closePopup(deletePopup);
      })
      .catch((err) => {
        console.log(err);
      })
  })

}

function likeCard(event) {
  const card = event.target.closest('.card');
  const cardLikes = card.querySelector('.card__like-numbers');

  if(!event.target.classList.contains('card__like-button_is-active')){
    likeCardAPI(card.id)
      .then((result) => {
        cardLikes.textContent = result.likes.length;
      })
      .catch((err) => {
        console.log(err);
      })
  } else{
    unlikeCardAPI(card.id)
      .then((result) => {
        cardLikes.textContent = result.likes.length;
      })
      .catch((err) => {
        console.log(err);
      })
  }
  event.target.classList.toggle('card__like-button_is-active');
}

export {createCard, removeCard, likeCard}
