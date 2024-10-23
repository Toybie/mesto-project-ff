import "./pages/index.css"; 
import { createCard, removeCard, handleLike } from "./scripts/card.js";  
import { openModal, closeModal, hideClosestPopup } from "./scripts/modal.js";
import { enableValidation, clearValidation } from './scripts/validation.js';
import { getUserInfo, getCards, updateUserInfo, addCard, updateAvatar } from './scripts/api.js'; // Добавьте updateAvatar

const popupImage = document.querySelector('.popup_type_image'); 
const img = popupImage.querySelector('.popup__image'); 
const imgTitle = popupImage.querySelector('.popup__caption'); 

const editButton = document.querySelector(".profile__edit-button"); 
const popupEdit = document.querySelector(".popup_type_edit"); 
const addButton = document.querySelector(".profile__add-button"); 
const popupNewCard = document.querySelector(".popup_type_new-card"); 
const avatarButton = document.querySelector(".profile__image"); // Элемент для клика по аватару

const popupAvatar = document.querySelector(".popup_type_avatar"); // Новый попап для аватара
const avatarForm = popupAvatar.querySelector(".popup__form"); // Форма для смены аватара
const avatarInput = popupAvatar.querySelector(".popup__input_type_avatar"); // Поле ввода для ссылки на аватар

const popupCloseButtons = document.querySelectorAll(".popup__close"); 

const profileForm = popupEdit.querySelector(".popup__form"); 
const nameInput = popupEdit.querySelector(".popup__input_type_name"); 
const jobInput = popupEdit.querySelector(".popup__input_type_description"); 
const profileTitle = document.querySelector(".profile__title"); 
const profileDescription = document.querySelector(".profile__description"); 

const formNewCard = popupNewCard.querySelector(".popup__form"); 
const newCardNameInput = popupNewCard.querySelector(".popup__input_type_card-name"); 
const newCardUrlInput = popupNewCard.querySelector(".popup__input_type_url"); 

const placesList = document.querySelector(".places__list");

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});

avatarButton.addEventListener("click", openAvatarModal);

editButton.addEventListener("click", openProfileEditModal);

addButton.addEventListener("click", () => {
    clearValidation(formNewCard, {
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        errorClass: 'popup__error_visible'
    });
    newCardNameInput.value = ''; 
    newCardUrlInput.value = ''; 
    openModal(popupNewCard);
}); 

popupCloseButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        const popup = event.target.closest(".popup");
        closeModal(popup);
    });
});

profileForm.addEventListener("submit", handleProfileFormSubmit); 
formNewCard.addEventListener("submit", handleNewCardSubmit); 
avatarForm.addEventListener("submit", handleAvatarFormSubmit);

function renderCards(cards, userId) { 
    cards.forEach(cardData => { 
        const card = createCard(cardData, handleLike, handleImageClick, userId); 
        addCardToPlacesList(card); 
    }); 
}

function openProfileEditModal() { 
    nameInput.value = profileTitle.textContent; 
    jobInput.value = profileDescription.textContent; 
    clearValidation(profileForm, {
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        errorClass: 'popup__error_visible'
    });
    openModal(popupEdit); 
} 

function openAvatarModal() {
    clearValidation(avatarForm, {
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button_avatar',
        errorClass: 'popup__error_visible'
    });
    avatarInput.value = '';
    openModal(popupAvatar);
}


function handleProfileFormSubmit(evt) { 
    evt.preventDefault(); 
    if (profileForm.checkValidity()) {
        const submitButton = profileForm.querySelector('.popup__button');
        submitButton.textContent = 'Сохранение...';
        submitButton.disabled = true;
        
        updateUserInfo(nameInput.value.trim(), jobInput.value.trim())
            .then(updatedData => {
                profileTitle.textContent = updatedData.name;
                profileDescription.textContent = updatedData.about;
                closeModal(popupEdit); 
            })
            .catch(err => {
                console.error('Ошибка при обновлении данных пользователя:', err);
            })
            .finally(() => {
                submitButton.textContent = 'Сохранить';
                submitButton.disabled = false;
            });
    }
}

function handleNewCardSubmit(evt) { 
    evt.preventDefault(); 
    const newCardData = { 
        name: newCardNameInput.value, 
        link: newCardUrlInput.value 
    }; 
    const submitButton = formNewCard.querySelector('.popup__button');
    submitButton.textContent = 'Сохранение...'; // Изменяем текст кнопки
    submitButton.disabled = true; // Отключаем кнопку

    addCard(newCardData.name, newCardData.link)
        .then(cardData => {
            const cardElement = createCard(cardData, handleLike, removeCard, handleImageClick);
            addCardToPlacesList(cardElement);
            closeModal(popupNewCard); 
            evt.target.reset(); 
            clearValidation(formNewCard, {
                inputSelector: '.popup__input',
                submitButtonSelector: '.popup__button',
                errorClass: 'popup__error_visible'
            });
        })
        .catch(err => {
            console.error('Ошибка при добавлении карточки:', err);
        })
        .finally(() => {
            submitButton.textContent = 'Сохранить';
            submitButton.disabled = false;
        });
}

function handleAvatarFormSubmit(evt) {
    evt.preventDefault();
    const avatarUrl = document.querySelector('.popup__input_type_avatar-url').value;
    const submitButton = document.querySelector('.popup__button_avatar');

    submitButton.textContent = 'Сохранение...';
    submitButton.disabled = true;

    updateAvatar(avatarUrl)
        .then(updatedData => {
            const profileAvatar = document.querySelector('.profile__image');
            profileAvatar.style.backgroundImage = `url(${updatedData.avatar})`;
            closeModal(document.querySelector('.popup_type_avatar'));
        })
        .catch(err => {
            console.error('Ошибка при обновлении аватара:', err);
        })
        .finally(() => {
            submitButton.textContent = 'Сохранить';
            submitButton.disabled = false;
        });
}

function handleImageClick(cardImage, cardTitle) { 
    img.setAttribute("src", cardImage.src); 
    img.setAttribute("alt", cardTitle.textContent); 
    imgTitle.textContent = cardTitle.textContent; 
    openModal(popupImage); 
} 

function addCardToPlacesList(card) { 
    placesList.prepend(card); 
} 

function renderUserInfo(data) {
    const profileAvatar = document.querySelector('.profile__image');
    profileAvatar.style.backgroundImage = `url(${data.avatar})`;
    profileTitle.textContent = data.name;
    profileDescription.textContent = data.about;
}

function renderServerCards(cards) {
    cards.forEach(card => {
        const cardElement = createCard(card, handleLike, removeCard, handleImageClick);
        addCardToPlacesList(cardElement);
    });
}

Promise.all([getUserInfo(), getCards()])
    .then(([userData, cardsData]) => {
        const userId = userData._id;
        renderUserInfo(userData);
        renderCards(cardsData, userId);
    })
    .catch(err => {
        console.error('Ошибка при загрузке данных:', err);
    });
