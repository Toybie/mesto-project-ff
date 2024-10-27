function showInputError(inputElement, validationConfig, formElement) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    if (errorElement) {
        inputElement.classList.add(validationConfig.inputErrorClass);
        inputElement.classList.add(validationConfig.invalidInputClass);

        if (inputElement.validity.valueMissing) {
            errorElement.textContent = inputElement.validationMessage;
        } else if (inputElement.validity.patternMismatch) {
            errorElement.textContent = inputElement.dataset.errorMessage;
        } else {
            errorElement.textContent = inputElement.validationMessage;
        }
        errorElement.classList.add(validationConfig.errorClass);
    }
}

function hideInputError(inputElement, validationConfig, formElement) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    if (errorElement) {
        inputElement.classList.remove(validationConfig.inputErrorClass);
        inputElement.classList.remove(validationConfig.invalidInputClass);
        errorElement.classList.remove(validationConfig.errorClass);
        errorElement.textContent = ''; 
    }
}

function checkInputValidity(inputElement, validationConfig, formElement) {
    if (!inputElement.validity.valid) {
        showInputError(inputElement, validationConfig, formElement);
    } else {
        hideInputError(inputElement, validationConfig, formElement);
    }
}

function setEventListeners(formElement, validationConfig) {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    
    toggleButtonState(inputList, buttonElement, validationConfig);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(inputElement, validationConfig, formElement);
            toggleButtonState(inputList, buttonElement, validationConfig);
        });
    });
}

function toggleButtonState(inputList, buttonElement, validationConfig) {
    const hasInvalidInput = inputList.some((inputElement) => !inputElement.validity.valid);
    buttonElement.disabled = hasInvalidInput;
    buttonElement.classList.toggle(validationConfig.inactiveButtonClass, hasInvalidInput);
}

export function enableValidation(validationConfig) {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, validationConfig);
    });
}

export function clearValidation(formElement, validationConfig) {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    
    inputList.forEach((inputElement) => {
        hideInputError(inputElement, validationConfig, formElement);
    });
    
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
}
