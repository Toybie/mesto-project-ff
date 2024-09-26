// card.js
import { showImage } from './modal.js';

const placesList = document.querySelector('.places__list');

// Создание элемента карточки
export function createCardElement(cardData, removeCard) {
  const cardTemplate = document.querySelector('#card-template').content.querySelector('.places__item');
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');

  // Установка данных карточки
  cardImage.src = cardData.link;
  cardImage.alt = cardData.alt;
  cardTitle.textContent = cardData.name;

  // Обработчик для лайка
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('card__like-button_active');
  });

  // Обработчик для удаления карточки
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => {
    removeCard(cardElement);
  });

  // Обработчик для открытия изображения в попапе
  cardImage.addEventListener('click', () => {
    showImage(cardData.link, cardData.name);
  });

  return cardElement;
}

// Функция добавления карточки в список
export function addCardToPlacesList(cardElement) {
  placesList.append(cardElement);
}

// Функция удаления карточки
export function removeCard(cardElement) {
  cardElement.remove();
}
