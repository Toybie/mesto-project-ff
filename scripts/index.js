function createCardElement(data, onDelete) {
  const cardElement = document.querySelector('#card-template').content.cloneNode(true);
  cardElement.querySelector('.card__image').src = data.link;
  cardElement.querySelector('.card__title').textContent = data.title;
  cardElement.querySelector('.card__description').textContent = data.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', onDelete); 
  return cardElement; 
}

/* Функция удаления */
const card = document.getElementsByName('.card');
const deleteButton = card.querySelector('.card__delete-button');
deleteButton.addEventListener('click', function () {
  const listItem = deleteButton.closest('.card__delete-button');
  listItem.remove();
});

function renderCards(cards) {
  const placeList = document.querySelector('.places__list');
  cards.forEach(function(cardData) {
    const cardElement = createCardElement(cardData);
    placeList.appendChild(cardElement);
  });
}

renderCards(initialCards);