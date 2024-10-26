const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-24',
    headers: {
        authorization: 'a58ea39d-b3b1-43aa-92f9-4914b0eb621d',
        'Content-Type': 'application/json'
    }
};

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export function getUserInfo() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    }).then(checkResponse);
}

export function getCards() {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    }).then(checkResponse);
}

export function updateUserInfo(name, about) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about
        })
    }).then(checkResponse);
}

export function addCard(name, link) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    }).then(checkResponse);
}

export function deleteCardFromApi(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-24/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: 'a58ea39d-b3b1-43aa-92f9-4914b0eb621d',
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    });
}

export function updateAvatar(avatarUrl) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatarUrl
        })
    }).then(checkResponse);
}

export function addLike(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-24/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
            authorization: 'a58ea39d-b3b1-43aa-92f9-4914b0eb621d',
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`Ошибка: ${res.status}`);
        }
        return res.json();
    });
}

export function removeLike(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-24/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: 'a58ea39d-b3b1-43aa-92f9-4914b0eb621d',
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`Ошибка: ${res.status}`);
        }
        return res.json();
    });
}