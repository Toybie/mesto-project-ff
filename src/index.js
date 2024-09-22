import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCardElement, removeCard } from "./scripts/card.js";
  
  function renderCards(cards) {
    const placeList = document.querySelector('.places__list');
    cards.forEach(function(cardData) {
      const cardElement = createCardElement(cardData, removeCard); 
      placeList.appendChild(cardElement);
    });
  }

  renderCards(initialCards);
