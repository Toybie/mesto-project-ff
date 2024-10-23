export function createCard(data, handleLike, handleImageClick, userId) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const likeButton = cardElement.querySelector(".card__like-button");
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const likeCount = cardElement.querySelector(".card__like-count");

    cardTitle.textContent = data.name;
    cardImage.src = data.link;
    cardImage.alt = data.name;

    likeCount.textContent = data.likes.length;

    // Показываем кнопку удаления только для своих карточек
    if (data.owner._id !== userId) {
        deleteButton.style.display = "none"; // Скрываем кнопку удаления
    } else {
        // Обработчик нажатия на кнопку удаления
        deleteButton.addEventListener("click", () => {
            deleteCard(data._id, cardElement);
        });
    }

    likeButton.addEventListener("click", () => {
        handleLike(data, likeButton, likeCount);
    });

    cardImage.addEventListener("click", () => {
        handleImageClick(data);
    });

    return cardElement;
}

function deleteCard(cardId, cardElement) {
    fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-24/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: 'a58ea39d-b3b1-43aa-92f9-4914b0eb621d',
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`Ошибка: ${res.status}`);
        }
        cardElement.remove(); // Удаляем карточку из DOM
    })
    .catch(err => {
        console.error('Ошибка при удалении карточки:', err);
    });
}

export function handleLike(cardData, button, likeCount) {
    const isLiked = button.classList.toggle("card__like-button_is-active");
    const method = isLiked ? 'PUT' : 'DELETE';

    fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-24/cards/likes/${cardData._id}`, {
        method: method,
        headers: {
            authorization: 'a58ea39d-b3b1-43aa-92f9-4914b0eb621d',
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(updatedCard => {
        likeCount.textContent = updatedCard.likes.length;
    })
    .catch(err => {
        console.error('Ошибка при обновлении лайков:', err);
    });
}
