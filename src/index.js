import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { createCard, removeCard, handleLike } from "./scripts/card.js"; 
import { openModal, closeModal } from "./scripts/modal.js";

const popupImage = document.querySelector('.popup_type_image');
const img = popupImage.querySelector('.popup__image');
const imgTitle = popupImage.querySelector('.popup__caption');

const editButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
const addButton = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");

const popupCloseButtons = document.querySelectorAll(".popup__close");
const profileForm = popupEdit.querySelector(".popup__form");
const nameInput = popupEdit.querySelector(".popup__input_type_name");
const jobInput = popupEdit.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const formNewCard = popupNewCard.querySelector(".popup__form");
const newCardNameInput = popupNewCard.querySelector(".popup__input_type_card-name");
const newCardUrlInput = popupNewCard.querySelector(".popup__input_type_url");

editButton.addEventListener("click", openEditProfileModal);
addButton.addEventListener("click", () => openModal(popupNewCard));
popupCloseButtons.forEach(button => button.addEventListener("click", closePopup));
[popupEdit, popupNewCard, popupImage].forEach(popup => popup.addEventListener("click", closeOnOverlay));
profileForm.addEventListener("submit", handleProfileFormSubmit);
formNewCard.addEventListener("submit", handleNewCardSubmit);

function renderCard(arr) {
    arr.forEach(cardData => {
        const card = createCard(cardData, handleLike, removeCard, handleImageClick);
        addCardToPlacesList(card);
    });
}

function openEditProfileModal() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(popupEdit);
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value.trim();
    profileDescription.textContent = jobInput.value.trim();
    closeModal(popupEdit);
}

function handleNewCardSubmit(evt) {
    evt.preventDefault();
    const newCardData = {
        name: newCardNameInput.value,
        link: newCardUrlInput.value,
        alt: newCardNameInput.value
    };
    const card = createCard(newCardData, handleLike, removeCard, handleImageClick);
    addCardToPlacesList(card);
    closeModal(popupNewCard);
    evt.target.reset();
}

function handleImageClick(cardImage, cardTitle) {
    img.setAttribute("src", cardImage.src);
    imgTitle.textContent = cardTitle.textContent;
    openModal(popupImage);
}

function closePopup(evt) {
    closeModal(evt.target.closest(".popup"));
}

function closeOnOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
        closeModal(evt.target);
    }
}

function addCardToPlacesList(card) {
    const placesList = document.querySelector(".places__list");
    placesList.prepend(card);
}

renderCard(initialCards);
