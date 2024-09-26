// modal.js

export const popupImage = document.querySelector(".popup_type_image");

const popupModal = document.querySelectorAll(".popup");

export function openModal(popupName) {
  popupName.classList.add("popup_is-opened");
  window.addEventListener("keydown", popupEscClose);
}

export function closeModal(popupName) {
  popupName.classList.remove("popup_is-opened");
  window.removeEventListener("keydown", popupEscClose);
}

export function closeModalOver(evt) {
  if (evt.target.classList.contains("popup")) {
    closeModal(evt.target);
  }
}

export function popupCrossClose(item) {
  item.addEventListener("click", function () {
    closeModal(item.closest('.popup'));
  });
}

export function closeOnOverlay(popup) {
  popup.addEventListener("click", closeModalOver);
}

export function popupEscClose(evt) {
  if (evt.key === "Escape") {
    const modalIsOpen = document.querySelector(".popup_is-opened");
    if (modalIsOpen) {
      closeModal(modalIsOpen);
    }
  }
}

export const img = document.querySelector(".popup__image");
export const imgTitle = document.querySelector(".popup__caption");

export function showImage(src, alt) {
  img.setAttribute("src", src);
  imgTitle.textContent = alt;
  openModal(popupImage);
}
