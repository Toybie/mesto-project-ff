function showError(input, message, settings) {
    const existingError = input.parentNode.querySelector(`.${settings.errorClass}`);
    if (existingError) {
        existingError.remove();
    }

    const errorElement = document.createElement('span');
    errorElement.classList.add(settings.errorClass);
    errorElement.style.color = 'red';
    errorElement.textContent = message;
    input.parentNode.insertBefore(errorElement, input.nextSibling);

    input.style.borderBottom = '1px solid red';
}

function isValid(input, settings) {
    const value = input.value.trim();
    const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;
    const urlRegex = /^(https?:\/\/)[\w.-]+(\.[\w.-]+)+[/\w.,@?^=%&:;~+#-]*$/;
    let minLength, maxLength;

    if (input.classList.contains('popup__input_type_name')) {
        minLength = 2;
        maxLength = 40;
    } else if (input.classList.contains('popup__input_type_description')) {
        minLength = 2;
        maxLength = 200;
    } else if (input.classList.contains('popup__input_type_card-name')) {
        minLength = 2;
        maxLength = 30;
    } else if (input.classList.contains('popup__input_type_url') || input.classList.contains('popup__input_type_avatar')) {
        if (value.length === 0) {
            showError(input, 'Это поле обязательно для заполнения', settings);
            return false;
        }
        if (!urlRegex.test(value)) {
            showError(input, 'Введите корректный URL', settings);
            return false;
        }
        input.style.borderBottom = '1px solid rgba(0, 0, 0, 0.2)';
        return true;
    } else {
        return true;
    }

    if (value.length === 0) {
        showError(input, 'Это поле обязательно для заполнения', settings);
        return false;
    }

    if (value.length < minLength || value.length > maxLength) {
        showError(input, `Длина должна быть от ${minLength} до ${maxLength} символов`, settings);
        return false;
    }

    if (input.classList.contains('popup__input_type_name') || 
        input.classList.contains('popup__input_type_description') || 
        input.classList.contains('popup__input_type_card-name')) {
        if (!nameRegex.test(value)) {
            showError(input, 'Разрешены только латинские и кириллические буквы, знаки дефиса и пробелы', settings);
            return false;
        }
    }

    input.style.borderBottom = '1px solid rgba(0, 0, 0, 0.2)';
    return true;
}

function validateForm(form, settings) {
    const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
    let isFormValid = true;

    clearValidation(form, settings);

    inputs.forEach((input) => { 
        if (!isValid(input, settings)) {
            isFormValid = false;
        }
    });

    const submitButton = form.querySelector(settings.submitButtonSelector);
    submitButton.disabled = !isFormValid;

    if (isFormValid) {
        submitButton.classList.remove(settings.inactiveButtonClass);
    } else {
        submitButton.classList.add(settings.inactiveButtonClass);
    }
}

export function clearValidation(form, settings) {
    const errorMessages = form.querySelectorAll(`.${settings.errorClass}`);
    errorMessages.forEach(error => error.remove());

    const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
    const submitButton = form.querySelector(settings.submitButtonSelector);
    
    submitButton.disabled = true;
    submitButton.classList.add(settings.inactiveButtonClass);
}

export function enableValidation(settings) {
    const forms = document.querySelectorAll(settings.formSelector);

    forms.forEach((form) => {
        form.addEventListener('input', () => validateForm(form, settings));
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            validateForm(form, settings);
        });
    });
}
