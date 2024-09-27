const popups = document.querySelectorAll('.popup');

// Открытие попапа
export function openModal(popup) {
    popup.style.display = 'flex'; 
    setTimeout(() => {
        popup.style.visibility = 'visible'; 
        popup.style.opacity = '1';
    }, 10);

    // Добавляем обработчики событий
    document.addEventListener('keydown', handleEscClose);
    popup.addEventListener('click', closeOnOverlay);
}

// Закрытие попапа
export function closeModal(popup) {
    popup.style.opacity = '0';

    setTimeout(() => {
        popup.style.visibility = 'hidden'; 
        popup.style.display = 'none';
    }, 600);

    // Убираем обработчики событий
    document.removeEventListener('keydown', handleEscClose);
    popup.removeEventListener('click', closeOnOverlay);
}

// Закрытие попапа при клике на оверлей
export function closeOnOverlay(evt) {
    if (evt.target === evt.currentTarget) {
        closeModal(evt.target);
    }
}

// Закрытие попапа по клавише Esc
function handleEscClose(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closeModal(openedPopup);
        }
    }
}

// Элементы попапа с изображением
export const popupImage = document.querySelector('.popup_type_image');
export const img = popupImage.querySelector('.popup__image');
export const imgTitle = popupImage.querySelector('.popup__caption');
