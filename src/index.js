import "./pages/index.css";
import { createCard, handleLike } from "./scripts/card.js";
import { openModal, closeModal } from "./scripts/modal.js";
import { enableValidation, clearValidation } from './scripts/validation.js';
import { getUserInfo, getCards, updateUserInfo, addCard, deleteCardFromApi, updateAvatar } from './scripts/api.js';
import { toggleLoadingState } from './scripts/utils.js';

const profileElements = {
    popupImage: document.querySelector('.popup_type_image'),
    img: document.querySelector('.popup__image'),
    imgTitle: document.querySelector('.popup__caption'),
    popupNewCard: document.querySelector(".popup_type_new-card"),
    popupEdit: document.querySelector(".popup_type_edit"),
    popupAvatar: document.querySelector(".popup_type_avatar"),
    editButton: document.querySelector(".profile__edit-button"),
    addButton: document.querySelector(".profile__add-button"),
    avatarButton: document.querySelector(".profile__image"),
    profileForm: document.querySelector(".popup_type_edit .popup__form"),
    formNewCard: document.querySelector(".popup_type_new-card .popup__form"),
    avatarForm: document.querySelector(".popup_type_avatar .popup__form"),
    profileTitle: document.querySelector(".profile__title"),
    profileDescription: document.querySelector(".profile__description"),
    profileSubmitButton: document.querySelector(".popup_type_edit .popup__button"),
    newCardSubmitButton: document.querySelector(".popup_type_new-card .popup__button"),
    avatarSubmitButton: document.querySelector(".popup_type_avatar .popup__button"),
    placesList: document.querySelector(".places__list"),
    nameInput: document.querySelector(".popup__input_type_name"),
    jobInput: document.querySelector(".popup__input_type_description"),
    newCardNameInput: document.querySelector(".popup__input_type_card-name"),
    newCardUrlInput: document.querySelector(".popup__input_type_url"),
    avatarInput: document.querySelector(".popup__input_type_avatar"),
};

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
    invalidInputClass: 'popup__input_invalid'
};

enableValidation(validationConfig);

profileElements.avatarButton.addEventListener("click", openAvatarModal);
profileElements.editButton.addEventListener("click", openProfileEditModal);
profileElements.addButton.addEventListener("click", openAddCardModal);
profileElements.profileForm.addEventListener("submit", handleProfileFormSubmit);
profileElements.formNewCard.addEventListener("submit", handleNewCardSubmit);
profileElements.avatarForm.addEventListener("submit", handleAvatarFormSubmit);

document.querySelectorAll(".popup__close").forEach(button => {
    button.addEventListener("click", (event) => {
        closeModal(event.target.closest(".popup"));
    });
});

function openProfileEditModal() {
    profileElements.profileForm.reset();
    profileElements.nameInput.value = profileElements.profileTitle.textContent;
    profileElements.jobInput.value = profileElements.profileDescription.textContent; 
    clearValidation(profileElements.profileForm, validationConfig);
    openModal(profileElements.popupEdit);
}

function openAddCardModal() {
    profileElements.formNewCard.reset();
    clearValidation(profileElements.formNewCard, validationConfig);
    openModal(profileElements.popupNewCard);
}

function openAvatarModal() {
    profileElements.avatarForm.reset();
    toggleAvatarSubmitButton();
    clearValidation(profileElements.avatarForm, validationConfig);
    openModal(profileElements.popupAvatar);
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    toggleLoadingState(profileElements.profileSubmitButton, true);

    updateUserInfo(profileElements.nameInput.value.trim(), profileElements.jobInput.value.trim())
        .then(({ name, about }) => {
            profileElements.profileTitle.textContent = name;
            profileElements.profileDescription.textContent = about;
            closeModal(profileElements.popupEdit);
        })
        .catch(console.error)
        .finally(() => toggleLoadingState(profileElements.profileSubmitButton, false));
}

function handleNewCardSubmit(evt) {
    evt.preventDefault();
    toggleLoadingState(profileElements.newCardSubmitButton, true);

    const newCardData = {
        name: profileElements.newCardNameInput.value,
        link: profileElements.newCardUrlInput.value
    };

    addCard(newCardData.name, newCardData.link)
        .then(cardData => {
            const cardElement = createCard(cardData, handleLike, handleImageClick, handleDeleteCard, userId);
            addCardToPlacesList(cardElement, true);
            closeModal(profileElements.popupNewCard);
            profileElements.formNewCard.reset();
            clearValidation(profileElements.formNewCard, validationConfig);
        })
        .catch(console.error)
        .finally(() => toggleLoadingState(profileElements.newCardSubmitButton, false));
}

function addCardToPlacesList(card, prepend = false) {
    prepend ? profileElements.placesList.prepend(card) : profileElements.placesList.append(card);
}

function handleAvatarFormSubmit(evt) {
    evt.preventDefault();
    toggleLoadingState(profileElements.avatarSubmitButton, true);

    const avatarUrl = profileElements.avatarInput.value;

    updateAvatar(avatarUrl)
        .then(({ avatar }) => {
            profileElements.avatarButton.style.backgroundImage = `url(${avatar})`;
            closeModal(profileElements.popupAvatar);
        })
        .catch(console.error)
        .finally(() => toggleLoadingState(profileElements.avatarSubmitButton, false));
}

function toggleNewCardSubmitButton() {
    profileElements.newCardSubmitButton.disabled = !(profileElements.newCardNameInput.value.trim() && profileElements.newCardUrlInput.value.trim());
}

function toggleAvatarSubmitButton() {
    profileElements.avatarSubmitButton.disabled = !profileElements.avatarInput.value.trim();
}

function handleImageClick(cardImage, cardTitle) {
    profileElements.img.setAttribute("src", cardImage.src);
    profileElements.img.setAttribute("alt", cardTitle.textContent);
    profileElements.imgTitle.textContent = cardTitle.textContent;
    openModal(profileElements.popupImage);
}

let userId;
Promise.all([getUserInfo(), getCards()])
    .then(([userData, cardsData]) => {
        userId = userData._id;
        renderUserInfo(userData);
        renderCards(cardsData, userId);
    })
    .catch(console.error);

function renderUserInfo({ avatar, name, about }) {
    profileElements.avatarButton.style.backgroundImage = `url(${avatar})`;
    profileElements.profileTitle.textContent = name;
    profileElements.profileDescription.textContent = about;
}

function renderCards(cards, userId) {
    cards.forEach(cardData => {
        const card = createCard(cardData, handleLike, handleImageClick, handleDeleteCard, userId);
        addCardToPlacesList(card);
    });
}

function handleDeleteCard(cardId, cardElement) {
    deleteCardFromApi(cardId)
        .then(() => cardElement.remove())
        .catch(console.error);
}

profileElements.avatarInput.addEventListener('input', toggleAvatarSubmitButton);
