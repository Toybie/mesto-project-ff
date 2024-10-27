export function toggleLoadingState(button, isLoading) {
    if (isLoading) {
        button.textContent = "Сохранение...";
    } else {
        button.textContent = "Сохранить";
    }
}
