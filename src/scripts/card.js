import { deleteCardFromApi, addLike, removeLike } from './api.js';

const cardTemplate = document.querySelector("#card-template").content; 

function getCardTemplate() {
    return cardTemplate.querySelector(".places__item").cloneNode(true);
}

export function createCard(data, handleLike, handleImageClick, handleDelete, userId) {
    const cardElement = getCardTemplate();
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const likeButton = cardElement.querySelector(".card__like-button");
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const likeCount = cardElement.querySelector(".card__like-count");

    cardTitle.textContent = data.name;
    cardImage.src = data.link;
    cardImage.alt = data.name;
    likeCount.textContent = data.likes.length;

    if (data.owner._id !== userId) {
        deleteButton.style.display = "none";
    }

    if (data.likes.some(user => user._id === userId)) {
        likeButton.classList.add("card__like-button_is-active");
    }

    likeButton.addEventListener("click", () => handleLike(data, likeButton, likeCount));

    deleteButton.addEventListener("click", () => {
        handleDelete(data._id, cardElement);
    });

    cardImage.addEventListener("click", () => handleImageClick(cardImage, cardTitle));

    return cardElement;
}

export function removeCard(cardId, cardElement) {
    return deleteCardFromApi(cardId)
        .then(() => {
            cardElement.remove();
            console.log(`Карточка с id ${cardId} удалена.`);
        })
        .catch(err => {
            console.error('Ошибка при удалении карточки:', err);
        });
}

export function handleLike(cardData, likeButton, likeCount) {
    const likeAction = likeButton.classList.contains('card__like-button_is-active') ? removeLike : addLike;

    likeAction(cardData._id)
        .then(updatedCard => {
            likeCount.textContent = updatedCard.likes.length;
            likeButton.classList.toggle('card__like-button_is-active');
        })
        .catch(err => {
            console.error('Ошибка при обновлении лайков:', err);
        });
}
