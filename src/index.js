// index.js

import "./pages/index.css"; 
import { initialCards } from "./scripts/cards.js";
import { createCardElement, removeCard, addCardToPlacesList } from "./scripts/card.js";
import {
  openModal,
  closeModal,
  closeOnOverlay,
  popupCrossClose,
  popupImage // Импортируйте popupImage здесь
} from "./scripts/modal.js";

// Селектор списка карточек
const placesList = document.querySelector('.places__list');

// Функция для отрисовки карточек
function renderCards(cards) {
  cards.forEach(function(cardData) {
    const cardElement = createCardElement(cardData, removeCard);
    addCardToPlacesList(cardElement);
  });
}

// Инициализация карточек
renderCards(initialCards);

// Открытие попапа для редактирования профиля
const editButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");

editButton.addEventListener("click", () => openModal(popupEdit));

// Открытие попапа для добавления новой карточки
const addButton = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");

addButton.addEventListener("click", () => openModal(popupNewCard));

// Закрытие попапов по кнопке крестика
const popupCloseButton = document.querySelectorAll(".popup__close");
popupCloseButton.forEach(popupCrossClose);

// Закрытие попапов при клике на оверлей
closeOnOverlay(popupEdit);
closeOnOverlay(popupNewCard);
closeOnOverlay(popupImage); // Теперь эта переменная определена
