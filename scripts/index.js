// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

function createCardElement(data, onDelete) {
    const cardElement = document.getElementById('#card-template').cloneNode(true);
    cardElement.querySelector('.title').textContent = data.title;
    cardElement.querySelector('.description').textContent = data.description;
    cardElement.querySelector('.delete-icon').addEventListener('click', function() {
      onDelete();
    });
    return cardElement;
  }
  
  function renderCards(cards) {
    const placeList = document.querySelector('.places__list');
    cards.forEach(function(cardData) {
      const cardElement = createCardElement(cardData, function() {
        console.log('Карточка была удалена');
      });
      placeList.appendChild(cardElement);
    });
  }
  
  const initialCards = [
    { title: 'Место 1', description: 'Описание места 1' },
    { title: 'Место 2', description: 'Описание места 2' },
    { title: 'Место 3', description: 'Описание места 3' },
    { title: 'Место 4', description: 'Описание места 4' },
    { title: 'Место 5', description: 'Описание места 5' },
    { title: 'Место 6', description: 'Описание места 6' },
  ];
  
  renderCards(initialCards);