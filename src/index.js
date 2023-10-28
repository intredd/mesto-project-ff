import './pages/index.css';
import {initialCards, addCard, removeCard, likeCard} from './components/cards.js'
import {openModal, closeModal} from './components/modal.js'

const placeContainer = document.querySelector('.places__list');
//Profile env
const profileEditBtn = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit');
const profileForm = profileEditPopup.querySelector('.popup__form');
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
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

init();

function init(){
  initialCards.forEach(element => {
    element['alt'] = 'Фотография ' + element['name'];
    placeContainer.append(addCard(element['name'], element['link'], element['alt'], removeCard, likeCard, openCard));
  });

  profileEditBtn.addEventListener('click', (evt) => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(profileEditPopup);
  });

  addCardBtn.addEventListener('click', (evt) => {
    openModal(addCardPopup);
  });

  profileForm.addEventListener('submit', handleFormSubmit);
  addCardForm.addEventListener('submit', handleCardFormSubmit);
}

function openCard(event){
  openModal(imageCardPopup);

  popupImage.src = event.target.src;
  popupImage.alt = event.target.alt;
  popupCaption.textContent = event.target.closest('.card').querySelector('.card__title').textContent;
}

function handleFormSubmit(evt){
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closeModal(evt.target.closest('.popup'));
}

function handleCardFormSubmit(evt){
  evt.preventDefault();

  placeContainer.append(addCard(cardNameInput.value, imageUrlInput.value, '', removeCard, likeCard, openCard));

  closeModal(evt.target.closest('.popup'));

  setTimeout(() => {
    cardNameInput.value = '';
    imageUrlInput.value = '';
  }, 600)
}
