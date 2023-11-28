import { deletePopup, deleteBtn } from "./data";
import { openPopup, closePopup } from "./modal";
import { removeCardAPI, likeCardAPI, unlikeCardAPI } from "./api";

function createCard(card, currentUserId, removeCallback, likeCallback, openCallback) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardLikes = cardElement.querySelector('.card__like-numbers');
  const cardLikeBtn = cardElement.querySelector('.card__like-button');
  const cardDeleteBtn = cardElement.querySelector('.card__delete-button');
  const remCard = () => {
    removeCallback(card, cardElement, removeCard)
    deleteBtn.removeEventListener('click', remCard);
  }

  if(card.likes.length !== 0){
    cardLikes.textContent = card.likes.length;
    card.likes.forEach(like => {
      if(like._id === currentUserId){
        cardLikeBtn.classList.toggle('card__like-button_is-active');
      }
    });
  }

  if(card.owner._id === currentUserId){
    cardDeleteBtn.addEventListener('click', () => {
      openPopup(deletePopup);
      deleteBtn.addEventListener('click', remCard);
    });
    cardDeleteBtn.classList.add('card__delete-button_visble');
  }

  cardElement.id = card._id;
  cardElement.querySelector('.card__title').textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardImage.addEventListener('click', () => openCallback(card.name, card.link));
  cardLikeBtn.addEventListener('click', () => likeCallback(card, cardLikeBtn, cardLikes, checkStatusLike(cardLikeBtn)));

  return cardElement;
}

function removeCard(cardElement) {
  cardElement.remove();
  closePopup(deletePopup);
}

function checkStatusLike(cardLikeBtn) {
  let status = false;
  if(cardLikeBtn.classList.contains('card__like-button_is-active')){
    status = true;
  }
  return status;
}

function changeLike(res, cardLikeBtn, cardLikes){
  cardLikes.textContent = res.likes.length;
  cardLikeBtn.classList.toggle('card__like-button_is-active');
}

export {createCard, removeCard, changeLike}
