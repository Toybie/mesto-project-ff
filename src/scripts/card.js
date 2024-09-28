import { openModal, img, imgTitle, popupImage } from './modal.js';

export function createCard(data, handleLike, removeCard, handleImageClick) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const likeButton = cardElement.querySelector(".card__like-button");
    const deleteButton = cardElement.querySelector(".card__delete-button");

    cardTitle.textContent = data.name;
    cardImage.src = data.link;
    cardImage.alt = data.alt;

    likeButton.addEventListener("click", () => {
        handleLike(likeButton);
    });

    deleteButton.addEventListener("click", () => {
        removeCard(cardElement);
    });

    cardImage.addEventListener("click", () => {
        handleImageClick(cardImage, cardTitle);
    });

    return cardElement;
}

export function addCardToPlacesList(card) {
    const placesList = document.querySelector(".places__list");
    placesList.prepend(card);
}

export function handleLike(button) {
    button.classList.toggle("card__like-button_is-active");
}

export function removeCard(cardElement) {
    cardElement.remove();
}
