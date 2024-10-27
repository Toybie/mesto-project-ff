(()=>{"use strict";var t={baseUrl:"https://nomoreparties.co/v1/wff-cohort-24",headers:{authorization:"a58ea39d-b3b1-43aa-92f9-4914b0eb621d","Content-Type":"application/json"}};function e(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}function n(n){return fetch("".concat(t.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:t.headers}).then(e)}function r(n){return fetch("".concat(t.baseUrl,"/cards/likes/").concat(n),{method:"DELETE",headers:t.headers}).then(e)}var o=document.querySelector("#card-template").content;function a(t,e,n,r,a){var u=o.querySelector(".places__item").cloneNode(!0),i=u.querySelector(".card__image"),c=u.querySelector(".card__title"),p=u.querySelector(".card__like-button"),l=u.querySelector(".card__delete-button"),s=u.querySelector(".card__like-count");return c.textContent=t.name,i.src=t.link,i.alt=t.name,s.textContent=t.likes.length,t.owner._id!==a&&(l.style.display="none"),t.likes.some((function(t){return t._id===a}))&&p.classList.add("card__like-button_is-active"),p.addEventListener("click",(function(){return e(t,p,s)})),l.addEventListener("click",(function(){r(t._id,u)})),i.addEventListener("click",(function(){return n(i,c)})),u}function u(t,e,o){(e.classList.contains("card__like-button_is-active")?r:n)(t._id).then((function(t){o.textContent=t.likes.length,e.classList.toggle("card__like-button_is-active")})).catch((function(t){console.error("Ошибка при обновлении лайков:",t)}))}function i(t){t.classList.add("popup_is-animated"),requestAnimationFrame((function(){t.classList.add("popup_is-opened")})),document.addEventListener("keydown",p),t.addEventListener("mousedown",l)}function c(t){t.classList.remove("popup_is-opened"),setTimeout((function(){t.classList.remove("popup_is-animated")}),300),document.removeEventListener("keydown",p),t.removeEventListener("mousedown",l)}function p(t){if("Escape"===t.key){var e=document.querySelector(".popup_is-opened");e&&c(e)}}function l(t){t.target.classList.contains("popup")&&c(t.target)}function s(t,e,n){var r=n.querySelector(".".concat(t.name,"-error"));r&&(t.classList.remove(e.inputErrorClass),t.classList.remove(e.invalidInputClass),r.classList.remove(e.errorClass),r.textContent="")}function d(t,e,n){var r=t.some((function(t){return!t.validity.valid}));e.disabled=r,e.classList.toggle(n.inactiveButtonClass,r)}function m(t,e){var n=Array.from(t.querySelectorAll(e.inputSelector)),r=t.querySelector(e.submitButtonSelector);n.forEach((function(n){s(n,e,t)})),r.disabled=!0,r.classList.add(e.inactiveButtonClass)}function f(t,e){t.textContent=e?"Сохранение...":"Сохранить"}function _(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=Array(e);n<e;n++)r[n]=t[n];return r}var v,y={popupImage:document.querySelector(".popup_type_image"),img:document.querySelector(".popup__image"),imgTitle:document.querySelector(".popup__caption"),popupNewCard:document.querySelector(".popup_type_new-card"),popupEdit:document.querySelector(".popup_type_edit"),popupAvatar:document.querySelector(".popup_type_avatar"),editButton:document.querySelector(".profile__edit-button"),addButton:document.querySelector(".profile__add-button"),avatarButton:document.querySelector(".profile__image"),profileForm:document.querySelector(".popup_type_edit .popup__form"),formNewCard:document.querySelector(".popup_type_new-card .popup__form"),avatarForm:document.querySelector(".popup_type_avatar .popup__form"),profileTitle:document.querySelector(".profile__title"),profileDescription:document.querySelector(".profile__description"),profileSubmitButton:document.querySelector(".popup_type_edit .popup__button"),newCardSubmitButton:document.querySelector(".popup_type_new-card .popup__button"),avatarSubmitButton:document.querySelector(".popup_type_avatar .popup__button"),placesList:document.querySelector(".places__list"),nameInput:document.querySelector(".popup__input_type_name"),jobInput:document.querySelector(".popup__input_type_description"),newCardNameInput:document.querySelector(".popup__input_type_card-name"),newCardUrlInput:document.querySelector(".popup__input_type_url"),avatarInput:document.querySelector(".popup__input_type_avatar")},h={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible",invalidInputClass:"popup__input_invalid"};function b(t){arguments.length>1&&void 0!==arguments[1]&&arguments[1]?y.placesList.prepend(t):y.placesList.append(t)}function S(){y.avatarSubmitButton.disabled=!y.avatarInput.value.trim()}function C(t,e){y.img.setAttribute("src",t.src),y.img.setAttribute("alt",e.textContent),y.imgTitle.textContent=e.textContent,i(y.popupImage)}function q(n,r){(function(n){return fetch("".concat(t.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:t.headers}).then(e)})(n).then((function(){return r.remove()})).catch(console.error)}!function(t){Array.from(document.querySelectorAll(t.formSelector)).forEach((function(e){!function(t,e){var n=Array.from(t.querySelectorAll(e.inputSelector)),r=t.querySelector(e.submitButtonSelector);d(n,r,e),n.forEach((function(o){o.addEventListener("input",(function(){!function(t,e,n){t.validity.valid?s(t,e,n):function(t,e,n){var r=n.querySelector(".".concat(t.name,"-error"));r&&(t.classList.add(e.inputErrorClass),t.classList.add(e.invalidInputClass),t.validity.valueMissing?r.textContent=t.validationMessage:t.validity.patternMismatch?r.textContent=t.dataset.errorMessage:r.textContent=t.validationMessage,r.classList.add(e.errorClass))}(t,e,n)}(o,e,t),d(n,r,e)}))}))}(e,t)}))}(h),y.avatarButton.addEventListener("click",(function(){y.avatarForm.reset(),S(),m(y.avatarForm,h),i(y.popupAvatar)})),y.editButton.addEventListener("click",(function(){y.profileForm.reset(),y.nameInput.value=y.profileTitle.textContent,y.jobInput.value=y.profileDescription.textContent,m(y.profileForm,h),i(y.popupEdit)})),y.addButton.addEventListener("click",(function(){y.formNewCard.reset(),m(y.formNewCard,h),i(y.popupNewCard)})),y.profileForm.addEventListener("submit",(function(n){var r,o;n.preventDefault(),f(y.profileSubmitButton,!0),(r=y.nameInput.value.trim(),o=y.jobInput.value.trim(),fetch("".concat(t.baseUrl,"/users/me"),{method:"PATCH",headers:t.headers,body:JSON.stringify({name:r,about:o})}).then(e)).then((function(t){var e=t.name,n=t.about;y.profileTitle.textContent=e,y.profileDescription.textContent=n,c(y.popupEdit)})).catch(console.error).finally((function(){return f(y.profileSubmitButton,!1)}))})),y.formNewCard.addEventListener("submit",(function(n){n.preventDefault(),f(y.newCardSubmitButton,!0);var r,o,i={name:y.newCardNameInput.value,link:y.newCardUrlInput.value};(r=i.name,o=i.link,fetch("".concat(t.baseUrl,"/cards"),{method:"POST",headers:t.headers,body:JSON.stringify({name:r,link:o})}).then(e)).then((function(t){b(a(t,u,C,q,v),!0),c(y.popupNewCard),y.formNewCard.reset(),m(y.formNewCard,h)})).catch(console.error).finally((function(){return f(y.newCardSubmitButton,!1)}))})),y.avatarForm.addEventListener("submit",(function(n){var r;n.preventDefault(),f(y.avatarSubmitButton,!0),(r=y.avatarInput.value,fetch("".concat(t.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:t.headers,body:JSON.stringify({avatar:r})}).then(e)).then((function(t){var e=t.avatar;y.avatarButton.style.backgroundImage="url(".concat(e,")"),c(y.popupAvatar)})).catch(console.error).finally((function(){return f(y.avatarSubmitButton,!1)}))})),document.querySelectorAll(".popup__close").forEach((function(t){t.addEventListener("click",(function(t){c(t.target.closest(".popup"))}))})),Promise.all([fetch("".concat(t.baseUrl,"/users/me"),{headers:t.headers}).then(e),fetch("".concat(t.baseUrl,"/cards"),{headers:t.headers}).then(e)]).then((function(t){var e,n,r,o,i,c,p=(c=2,function(t){if(Array.isArray(t))return t}(i=t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,a,u,i=[],c=!0,p=!1;try{if(a=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=a.call(n)).done)&&(i.push(r.value),i.length!==e);c=!0);}catch(t){p=!0,o=t}finally{try{if(!c&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(p)throw o}}return i}}(i,c)||function(t,e){if(t){if("string"==typeof t)return _(t,e);var n={}.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_(t,e):void 0}}(i,c)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),l=p[0],s=p[1];v=l._id,n=(e=l).avatar,r=e.name,o=e.about,y.avatarButton.style.backgroundImage="url(".concat(n,")"),y.profileTitle.textContent=r,y.profileDescription.textContent=o,function(t,e){t.forEach((function(t){b(a(t,u,C,q,e))}))}(s,v)})).catch(console.error),y.avatarInput.addEventListener("input",S)})();