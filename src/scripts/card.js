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

export { createCardElement, removeCard };

