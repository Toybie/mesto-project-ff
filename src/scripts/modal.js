const popups = document.querySelectorAll('.popup');

export function openModal(popup) {
    popup.classList.add('popup_is-opened');
    
    popup.style.display = 'flex';
    popup.style.opacity = '0';
    popup.style.visibility = 'visible';

    requestAnimationFrame(() => {
        popup.style.transition = 'opacity 0.6s';
        popup.style.opacity = '1';
    });

    document.addEventListener('keydown', handleEscClose);
    popup.addEventListener('click', closeOnOverlay); 
}

export function closeModal(popup) {
    popup.style.opacity = '0';

    setTimeout(() => {
        popup.style.visibility = 'hidden';
        popup.style.display = 'none';
        popup.classList.remove('popup_is-opened');
    }, 600);

    document.removeEventListener('keydown', handleEscClose); 
    popup.removeEventListener('click', closeOnOverlay); 
}

export function closeOnOverlay(evt) {
    if (evt.target === evt.currentTarget) {
        closeModal(evt.target);
    }
}

function handleEscClose(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closeModal(openedPopup);
        }
    }
}

export const popupImage = document.querySelector('.popup_type_image');
export const img = popupImage.querySelector('.popup__image');
export const imgTitle = popupImage.querySelector('.popup__caption');
