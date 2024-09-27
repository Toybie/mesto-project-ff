import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import {
  createCard,
  addCardToPlacesList,
  removeCard,
  handleLike,
} from "./scripts/card.js";
import {
  openModal,
  closeModal,
  closeOnOverlay,
} from "./scripts/modal.js";

function renderCard(arr) {
  arr.forEach(function (cardData) {
    const card = createCard(cardData, handleLike, removeCard);
    addCardToPlacesList(card);
  });
}

renderCard(initialCards);

const editButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");

const addButton = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");

const popupCloseButtons = document.querySelectorAll(".popup__close");

editButton.addEventListener("click", () => openModal(popupEdit));
addButton.addEventListener("click", () => openModal(popupNewCard));

popupCloseButtons.forEach((button) => {
  button.addEventListener("click", (evt) => closeModal(evt.target.closest(".popup")));
});

[popupEdit, popupNewCard].forEach((popup) => {
  popup.addEventListener("click", closeOnOverlay);
});

const formElement = popupEdit.querySelector(".popup__form");
const nameInput = popupEdit.querySelector(".popup__input_type_name");
const jobInput = popupEdit.querySelector(".popup__input_type_description");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

nameInput.value = profileTitle.textContent;
jobInput.value = profileDescription.textContent;

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value.trim();
  profileDescription.textContent = jobInput.value.trim();
  closeModal(popupEdit);
}

formElement.addEventListener("submit", handleFormSubmit);

const formNewCard = popupNewCard.querySelector(".popup__form");
const newCardNameInput = popupNewCard.querySelector(".popup__input_type_card-name");
const newCardUrlInput = popupNewCard.querySelector(".popup__input_type_url");

function handleNewCardSubmit(evt) {
  evt.preventDefault();

  const newCardData = {
    name: newCardNameInput.value,
    link: newCardUrlInput.value,
    alt: newCardNameInput.value
  };

  const card = createCard(newCardData, handleLike, removeCard);
  addCardToPlacesList(card);
  closeModal(popupNewCard);

  newCardNameInput.value = '';
  newCardUrlInput.value = '';
}

formNewCard.addEventListener("submit", handleNewCardSubmit);
