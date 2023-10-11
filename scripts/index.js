const placeContainer = document.querySelector('.places__list');
initialCards.forEach(element => {
  placeContainer.append(addCard(element['name'], element['link'], removeCard));
});

function addCard(name, link, removeCallback) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__delete-button').addEventListener('click', removeCallback);

  return cardElement;
}

function removeCard(event) {
  event.target.parentElement.remove();
}
