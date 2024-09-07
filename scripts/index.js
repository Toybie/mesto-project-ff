function createCardElement(data, deleteCard) {
  const cardElement = document.querySelector('#card-template').content.cloneNode(true);
  const card = cardElement.querySelector('.card'); 
  card.querySelector('.card__image').src = data.link;
  card.querySelector('.card__title').textContent = data.name;
  card.querySelector('.card__delete-button').addEventListener('click', () => deleteCard(card));
  return card;
}

function removeCard(cardElement) {
  cardElement.remove();
}

function renderCards(cards) {
  const placeList = document.querySelector('.places__list');
  cards.forEach(function(cardData) {
    const cardElement = createCardElement(cardData, removeCard); 
    placeList.appendChild(cardElement);
  });
}

renderCards(initialCards);
