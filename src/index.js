import "./pages/index.css";  
import { createCard, removeCard, handleLike } from "./scripts/card.js";   
import { openModal, closeModal } from "./scripts/modal.js"; 
import { enableValidation, clearValidation } from './scripts/validation.js'; 
import { getUserInfo, getCards, updateUserInfo, addCard, deleteCardFromApi, updateAvatar } from './scripts/api.js'; 

// Глобальные переменные для popup
const popupImage = document.querySelector('.popup_type_image');  
const img = popupImage.querySelector('.popup__image');  
const imgTitle = popupImage.querySelector('.popup__caption'); 
const popupCloseButtons = document.querySelectorAll(".popup__close");   

// Переменные для профиля
const editButton = document.querySelector(".profile__edit-button");  
const popupEdit = document.querySelector(".popup_type_edit");  
const addButton = document.querySelector(".profile__add-button");  
const avatarButton = document.querySelector(".profile__image"); 
const popupAvatar = document.querySelector(".popup_type_avatar"); 

// Формы и инпуты
const profileForm = popupEdit.querySelector(".popup__form");  
const nameInput = popupEdit.querySelector(".popup__input_type_name");  
const jobInput = popupEdit.querySelector(".popup__input_type_description");  
const profileTitle = document.querySelector(".profile__title");  
const profileDescription = document.querySelector(".profile__description");  
const profileSubmitButton = profileForm.querySelector('.popup__button');

const formNewCard = document.querySelector(".popup_type_new-card .popup__form");  
const newCardNameInput = formNewCard.querySelector(".popup__input_type_card-name");  
const newCardUrlInput = formNewCard.querySelector(".popup__input_type_url");  
const newCardSubmitButton = formNewCard.querySelector('.popup__button');

const avatarForm = popupAvatar.querySelector(".popup__form"); 
const avatarInput = popupAvatar.querySelector(".popup__input_type_avatar");  
const avatarSubmitButton = avatarForm.querySelector('.popup__button');

// Список карточек
const placesList = document.querySelector(".places__list"); 

// Конфигурация для валидации
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

enableValidation(validationConfig);

avatarButton.addEventListener("click", openAvatarModal);
editButton.addEventListener("click", openProfileEditModal);
addButton.addEventListener("click", openAddCardModal);
profileForm.addEventListener("submit", handleProfileFormSubmit);
formNewCard.addEventListener("submit", handleNewCardSubmit);
avatarForm.addEventListener("submit", handleAvatarFormSubmit);

popupCloseButtons.forEach(button => { 
    button.addEventListener("click", (event) => { 
        const popup = event.target.closest(".popup"); 
        closeModal(popup); 
    }); 
});

function openProfileEditModal() {  
    nameInput.value = profileTitle.textContent;  
    jobInput.value = profileDescription.textContent;  
    clearValidation(profileForm, validationConfig); 
    openModal(popupEdit);  
}

function openAddCardModal() {
    newCardNameInput.value = ''; 
    newCardUrlInput.value = '';  
    toggleNewCardSubmitButton();  
    clearValidation(formNewCard, validationConfig);
    openModal(document.querySelector(".popup_type_new-card"));
}

function openAvatarModal() { 
    avatarForm.reset();  
    toggleAvatarSubmitButton();  
    clearValidation(avatarForm, validationConfig);
    openModal(popupAvatar); 
}

function handleProfileFormSubmit(evt) {  
    evt.preventDefault();  
    toggleLoadingState(profileSubmitButton, true);

    updateUserInfo(nameInput.value.trim(), jobInput.value.trim())
        .then(updatedData => { 
            profileTitle.textContent = updatedData.name; 
            profileDescription.textContent = updatedData.about; 
            closeModal(popupEdit);  
        }) 
        .catch(err => { 
            console.error('Ошибка при обновлении данных пользователя:', err); 
        }) 
        .finally(() => toggleLoadingState(profileSubmitButton, false));
}

function handleNewCardSubmit(evt) {  
    evt.preventDefault();  
    toggleLoadingState(newCardSubmitButton, true);

    const newCardData = {  
        name: newCardNameInput.value,  
        link: newCardUrlInput.value  
    };

    addCard(newCardData.name, newCardData.link)
        .then(cardData => { 
            const cardElement = createCard(cardData, handleLike, handleImageClick, handleDeleteCard, userId); 
            addCardToPlacesList(cardElement, true); 
            closeModal(document.querySelector(".popup_type_new-card"));  
            formNewCard.reset();  
            clearValidation(formNewCard, validationConfig);
        }) 
        .catch(err => { 
            console.error('Ошибка при добавлении карточки:', err); 
        }) 
        .finally(() => toggleLoadingState(newCardSubmitButton, false));
}

function addCardToPlacesList(card, prepend = false) {
    if (prepend) {
        placesList.prepend(card);
    } else {
        placesList.append(card);
    }
}

function handleAvatarFormSubmit(evt) { 
    evt.preventDefault(); 
    toggleLoadingState(avatarSubmitButton, true);

    const avatarUrl = avatarInput.value; 

    updateAvatar(avatarUrl)
        .then(updatedData => { 
            document.querySelector('.profile__image').style.backgroundImage = `url(${updatedData.avatar})`; 
            closeModal(popupAvatar); 
        }) 
        .catch(err => { 
            console.error('Ошибка при обновлении аватара:', err); 
        }) 
        .finally(() => toggleLoadingState(avatarSubmitButton, false));
}

function toggleLoadingState(button, isLoading) {
    button.textContent = isLoading ? 'Сохранение...' : 'Сохранить';
    button.disabled = isLoading;
}

function toggleNewCardSubmitButton() {
    newCardSubmitButton.disabled = !(newCardNameInput.value.trim() && newCardUrlInput.value.trim());
}

function toggleAvatarSubmitButton() {
    avatarSubmitButton.disabled = !avatarInput.value.trim(); 
}

function handleImageClick(cardImage, cardTitle) {
    img.setAttribute("src", cardImage.src);
    img.setAttribute("alt", cardTitle.textContent);
    imgTitle.textContent = cardTitle.textContent;
    openModal(popupImage); 
}

let userId;
Promise.all([getUserInfo(), getCards()]) 
    .then(([userData, cardsData]) => { 
        userId = userData._id; 
        renderUserInfo(userData); 
        renderCards(cardsData, userId); 
    }) 
    .catch(err => { 
        console.error('Ошибка при загрузке данных:', err); 
    });

function renderUserInfo(data) {
    document.querySelector('.profile__image').style.backgroundImage = `url(${data.avatar})`;
    profileTitle.textContent = data.name;
    profileDescription.textContent = data.about;
}

function renderCards(cards, userId) {  
    cards.forEach(cardData => {  
        const card = createCard(cardData, handleLike, handleImageClick, handleDeleteCard, userId);  
        addCardToPlacesList(card);
    });  
}

function handleDeleteCard(cardId, cardElement) {
    deleteCardFromApi(cardId)
        .then(() => {
            cardElement.remove();
            console.log('Карточка удалена:', cardId);
        })
        .catch(err => {
            console.error('Ошибка при удалении карточки:', err);
        });
}

newCardNameInput.addEventListener('input', toggleNewCardSubmitButton);
newCardUrlInput.addEventListener('input', toggleNewCardSubmitButton);
avatarInput.addEventListener('input', toggleAvatarSubmitButton);
