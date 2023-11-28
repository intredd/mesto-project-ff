export const placeContainer = document.querySelector('.places__list');
//Profile env
export const profileEditBtn = document.querySelector('.profile__edit-button');
export const profileEditPopup = document.querySelector('.popup_type_edit');
export const profileForm = profileEditPopup.querySelector('.popup__form');
export const nameInput = profileForm.querySelector('.popup__input_type_name');
export const jobInput = profileForm.querySelector('.popup__input_type_description');
export const profileConfirmBtn = profileForm.querySelector('.popup__button');
export const profileName = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');
//Avatar env
export const avatar = document.querySelector('.profile__image');
export const avatarEditPopup = document.querySelector('.popup_type_edit-avatar');
export const avatarEditForm = avatarEditPopup.querySelector('.popup__form');
export const avatarLinkInput = avatarEditForm.querySelector('.popup__input_type_avatar-url');
export const avatarConfirmBtn = avatarEditForm.querySelector('.popup__button');
//Add Card env
export const addCardPopup = document.querySelector('.popup_type_new-card');
export const addCardBtn = document.querySelector('.profile__add-button');
export const addCardForm = addCardPopup.querySelector('.popup__form');
export const cardNameInput = addCardForm.querySelector('.popup__input_type_card-name');
export const imageUrlInput = addCardForm.querySelector('.popup__input_type_url');
export const addCardConfirmBtn = addCardForm.querySelector('.popup__button');
//Open Card env
export const imageCardPopup = document.querySelector('.popup_type_image');
export const popupImage = document.querySelector('.popup__image');
export const popupCaption = document.querySelector('.popup__caption');
//Delete env
export const deletePopup = document.querySelector('.popup_type_delete-card');
export const deleteBtn = deletePopup.querySelector('.popup__button');

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
