import "./pages/index.css"; 
import { createCard, handleLike } from "./scripts/card.js";  
import { openModal, closeModal } from "./scripts/modal.js";
import { enableValidation, clearValidation } from './scripts/validation.js';
import { getUserInfo, getCards, updateUserInfo, addCard } from './scripts/api.js';

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

const placesList = document.querySelector(".places__list");

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});

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

function handleProfileFormSubmit(evt) { 
    evt.preventDefault(); 
    if (profileForm.checkValidity()) {
        updateUserInfo(nameInput.value.trim(), jobInput.value.trim())
            .then(updatedData => {
                profileTitle.textContent = updatedData.name;
                profileDescription.textContent = updatedData.about;
                closeModal(popupEdit); 
            })
            .catch(err => {
                console.error('Ошибка при обновлении данных пользователя:', err);
            });
    }
}

function handleNewCardSubmit(evt) { 
    evt.preventDefault(); 
    const newCardData = { 
        name: newCardNameInput.value, 
        link: newCardUrlInput.value 
    }; 
    addCard(newCardData.name, newCardData.link)
        .then(cardData => {
            const cardElement = createCard(cardData, handleLike, handleImageClick);
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
        });
} 

function handleImageClick(data) { 
    img.setAttribute("src", data.link); 
    img.setAttribute("alt", data.name); 
    imgTitle.textContent = data.name; 
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

Promise.all([getUserInfo(), getCards()])
    .then(([userData, cardsData]) => {
        const userId = userData._id;
        renderUserInfo(userData);
        renderCards(cardsData, userId);
    })
    .catch(err => {
        console.error('Ошибка при загрузке данных:', err);
    });
