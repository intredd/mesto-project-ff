import './pages/index.css';
import * as data from './components/data.js';
import {createCard, removeCard, likeCard, changeLike} from './components/card.js'
import {openPopup, closePopup, closePopupByClick} from './components/modal.js'
import { enableValidation, clearValidation } from './components/validation.js';
import { getInitialCards, addCardAPI, removeCardAPI, getProfile, editProfile, editProfileAvatar, likeCardAPI, unlikeCardAPI } from './components/api.js';

let currentUserId = ''


Promise.all([getProfile(), getInitialCards()])
  .then(([profile, cards]) => {
    updateProfile(profile);
    currentUserId = profile._id;

    cards.forEach((card) => {
      data.placeContainer.append(createCard(card, currentUserId, handleRemoveCard, handleLikeCard, openCard));
    })
  })
  .catch((err) => {
    console.log(err);
  })

enableValidation(data.validationConfig);

data.profileEditBtn.addEventListener('click', (evt) => {
  data.nameInput.value = data.profileName.textContent;
  data.jobInput.value = data.profileDescription.textContent;
  clearValidation(data.profileForm, data.validationConfig);
  openPopup(data.profileEditPopup);
});

data.avatar.addEventListener('click', (evt) => {
  document.forms['edit-avatar'].reset();
  clearValidation(data.avatarEditForm, data.validationConfig);
  openPopup(data.avatarEditPopup);
})

data.addCardBtn.addEventListener('click', (evt) => {
  document.forms['new-place'].reset();
  clearValidation(data.addCardForm, data.validationConfig);
  openPopup(data.addCardPopup);
});

data.profileEditPopup.addEventListener('click', closePopupByClick);
data.avatarEditPopup.addEventListener('click', closePopupByClick);
data.addCardPopup.addEventListener('click', closePopupByClick);
data.imageCardPopup.addEventListener('click', closePopupByClick);
data.deletePopup.addEventListener('click', closePopupByClick);

data.profileForm.addEventListener('submit', handleProfileFormSubmit);
data.avatarEditForm.addEventListener('submit', handleImageEditFormSubmit);
data.addCardForm.addEventListener('submit', handleCardFormSubmit);

function openCard(name, link){
  openPopup(data.imageCardPopup);

  data.popupImage.src = link;
  data.popupImage.alt = name;
  data.popupCaption.textContent = name;
}

function handleRemoveCard(card, cardElement, removeCard){
  removeCardAPI(card._id)
    .then((result) => {
      removeCard(cardElement);
    })
    .catch((err) => {
      console.log(err);
    })
}

function handleLikeCard(card, cardLikeBtn, cardLikes, status){
  if(!status){
    likeCardAPI(card._id)
      .then((res) => changeLike(res, cardLikeBtn, cardLikes))
      .catch(err => console.log(err));
  } else {
    unlikeCardAPI(card._id)
      .then(res => changeLike(res, cardLikeBtn, cardLikes))
      .catch(err => console.log(err));
  }
}

function handleProfileFormSubmit(evt){
  evt.preventDefault();

  const name = data.nameInput.value;
  const about = data.jobInput.value;

  data.profileConfirmBtn.textContent = 'Сохранение...';

  editProfile(name, about)
    .then((result) => {
      updateProfile(result);
      closePopup(data.profileEditPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      data.profileConfirmBtn.textContent = 'Сохранить';
    })
}

function handleImageEditFormSubmit(evt){
  evt.preventDefault();

  const link = data.avatarLinkInput.value;

  data.avatarConfirmBtn.textContent = 'Обновление...';

  editProfileAvatar(link)
    .then((result) => {
      data.avatar.style.backgroundImage = `url(${result.avatar})`
      closePopup(data.avatarEditPopup);
      data.avatarConfirmBtn.textContent = 'Обновить';
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      data.avatarConfirmBtn.textContent = 'Обновить';
    })
}

function handleCardFormSubmit(evt){
  evt.preventDefault();

  const name = data.cardNameInput.value;
  const link = data.imageUrlInput.value;

  data.addCardConfirmBtn.textContent = 'Создание...';

  addCardAPI(name, link)
    .then((result) => {
      data.placeContainer.prepend(createCard(result, currentUserId, handleRemoveCard, handleLikeCard, openCard));
      closePopup(data.addCardPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      data.addCardConfirmBtn.textContent = 'Создать';
    })
}

function updateProfile(profile) {
  data.profileName.textContent = profile.name;
  data.profileDescription.textContent = profile.about;
  data.avatar.style.backgroundImage = `url(${profile.avatar})`;
}
