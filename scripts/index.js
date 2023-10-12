const placeContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

initialCards.forEach(element => {
  element['alt'] = 'Фотография ' + element['name'];
  console.log(element['alt']);
  placeContainer.append(addCard(element['name'], element['link'], element['alt'], removeCard));
});

function addCard(name, link, alt, removeCallback) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = alt;
  cardElement.querySelector('.card__delete-button').addEventListener('click', removeCallback);

  return cardElement;
}

function removeCard(event) {
  event.target.closest('.card').remove();
}
