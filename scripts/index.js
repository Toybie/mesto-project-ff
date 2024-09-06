function createCardElement(data, deleteCard) { 
  const cardElement = document.querySelector('#card-template').content.cloneNode(true); 
  cardElement.querySelector('.card__image').src = data.link; 
  cardElement.querySelector('.card__title').textContent = data.title; 
  cardElement.querySelector('.card__description').textContent = data.name; 
  cardElement.querySelector('.card__delete-button').addEventListener('click', () => deleteCard(cardElement));  
  return cardElement;  
} 
 
function removeCard(cardElement) { 
  cardElement.remove(); 
} 
 
function renderCards(cards) { 
  const placeList = document.querySelector('.places__list'); 
  cards.forEach(function(cardData) { 
    const cardElement = createCardElement(cardData); 
    placeList.appendChild(cardElement); 
  }); 
} 
 
renderCards(initialCards);
