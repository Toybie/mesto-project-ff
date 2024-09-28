export function openModal(popup) {
    popup.classList.add("popup_is-animated");
    requestAnimationFrame(() => {
        popup.classList.add("popup_is-opened");
    });

    document.addEventListener('keydown', handleEscClose);
    popup.addEventListener('click', closeOnOverlay);
}

export function closeModal(popup) {
    popup.classList.remove("popup_is-opened");
    popup.classList.remove("popup_is-animated");
}

function handleEscClose(evt) {
    if (evt.key === 'Escape') {
        const openPopup = document.querySelector('.popup_is-opened');
        if (openPopup) {
            closeModal(openPopup);
        }
    }
}

function closeOnOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
        closeModal(evt.target);
    }
}
