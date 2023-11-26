import './pages/index.css';
import {createCard, removeCard, likeCard} from './components/card.js'
import {openPopup, closePopup, closePopupByClick} from './components/modal.js'
import { enableValidation, clearValidation } from './components/validation.js';
import { getInitialCards, addCardAPI, getProfile, editProfile, editProfileAvatar } from './components/api.js';

const placeContainer = document.querySelector('.places__list');
//Profile env
const profileEditBtn = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit');
const profileForm = profileEditPopup.querySelector('.popup__form');
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
//Avatar env
const avatar = document.querySelector('.profile__image');
const avatarEditPopup = document.querySelector('.popup_type_edit-avatar');
const avatarEditForm = avatarEditPopup.querySelector('.popup__form');
const avatarLinkInput = avatarEditForm.querySelector('.popup__input_type_avatar-url')
//Add Card env
const addCardPopup = document.querySelector('.popup_type_new-card');
const addCardBtn = document.querySelector('.profile__add-button');
const addCardForm = addCardPopup.querySelector('.popup__form');
const cardNameInput = addCardForm.querySelector('.popup__input_type_card-name');
const imageUrlInput = addCardForm.querySelector('.popup__input_type_url');
//Open Card env
const imageCardPopup = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
//Delete env
const deletePopup = document.querySelector('.popup_type_delete-card');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

let currentUserId = '';

init();

function init(){

  Promise.all([getProfile(), getInitialCards()])
    .then(([profile, cards]) => {
      updateProfile(profile);
      currentUserId = profile._id;

      cards.reverse().forEach((card) => {
        placeContainer.append(createCard(card, currentUserId, removeCard, likeCard, openCard));
      })
    })
    .catch((err) => {
      console.log(err);
    })

  enableValidation(validationConfig);

  profileEditBtn.addEventListener('click', (evt) => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    clearValidation(profileForm, validationConfig);
    openPopup(profileEditPopup);
  });

  avatar.addEventListener('click', (evt) => {
    document.forms['edit-avatar'].reset();
    clearValidation(avatarEditForm, validationConfig);
    openPopup(avatarEditPopup);
  })

  addCardBtn.addEventListener('click', (evt) => {
    document.forms['new-place'].reset();
    clearValidation(addCardForm, validationConfig);
    openPopup(addCardPopup);
  });

  profileEditPopup.addEventListener('click', closePopupByClick);
  avatarEditPopup.addEventListener('click', closePopupByClick);
  addCardPopup.addEventListener('click', closePopupByClick);
  imageCardPopup.addEventListener('click', closePopupByClick);
  deletePopup.addEventListener('click', closePopupByClick);

  profileForm.addEventListener('submit', handleProfileFormSubmit);
  avatarEditForm.addEventListener('submit', handleImageEditFormSubmit);
  addCardForm.addEventListener('submit', handleCardFormSubmit);
}

function openCard(event){
  openPopup(imageCardPopup);

  popupImage.src = event.target.src;
  popupImage.alt = event.target.alt;
  popupCaption.textContent = event.target.closest('.card').querySelector('.card__title').textContent;
}

function handleProfileFormSubmit(evt){
  evt.preventDefault();

  const name = nameInput.value;
  const about = jobInput.value;

  evt.target.querySelector('.popup__button').textContent = 'Сохранение...';

  editProfile(name, about)
    .then((result) => {
      updateProfile(result);
      closePopup(profileEditPopup);
      evt.target.querySelector('.popup__button').textContent = 'Сохранить';
    })
    .catch((err) => {
      console.log(err);
    })
}

function handleImageEditFormSubmit(evt){
  evt.preventDefault();

  const link = avatarLinkInput.value;

  evt.target.querySelector('.popup__button').textContent = 'Обновление...';

  editProfileAvatar(link)
    .then((result) => {
      avatar.style.backgroundImage = `url(${result.avatar})`
      closePopup(avatarEditPopup);
      evt.target.querySelector('.popup__button').textContent = 'Обновить';
    })
    .catch((err) => {
      console.log(err);
    })
}

function handleCardFormSubmit(evt){
  evt.preventDefault();

  const name = cardNameInput.value;
  const link = imageUrlInput.value;

  evt.target.querySelector('.popup__button').textContent = 'Создание...';

  addCardAPI(name, link)
    .then((result) => {
      placeContainer.append(createCard(result, currentUserId, removeCard, likeCard, openCard));
      closePopup(addCardPopup);
      evt.target.querySelector('.popup__button').textContent = 'Создать';
    })
    .catch((err) => {
      console.log(err);
    })
}

function updateProfile(profile) {
  profileName.textContent = profile.name;
    profileDescription.textContent = profile.about;
    avatar.style.backgroundImage = `url(${profile.avatar})`;
}
