export const apiConfig = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-30",
  headers: {
    authorization: "f6455210-30f0-46a8-b3a6-525ed072a92c",
    "Content-Type": "application/json",
  },
};

function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const getUserInfo = () => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    headers: apiConfig.headers,
  }).then((res) => handleResponse(res));
};

export const getCardsList = () => {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    headers: apiConfig.headers,
  }).then((res) => handleResponse(res));
};

export const changeUserInfo = (name, about) => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    method: "PATCH",
    body: JSON.stringify({
      name: name,
      about: about,
    }),
    headers: apiConfig.headers,
  }).then((res) => handleResponse(res));
};

export function changeAvatar(link) {
  return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    body: JSON.stringify({
      avatar: link,
    }),
    headers: apiConfig.headers,
  }).then((res) => handleResponse(res));
}

export function postCard(name, link) {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    method: "POST",
    body: JSON.stringify({
      name: name,
      link: link,
    }),
    headers: apiConfig.headers,
  })
    .then((res) => handleResponse(res));
}

export const deleteCardFromList = (cardId) => {
  return fetch(`${apiConfig.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  })
    .then((res) => handleResponse(res));
}

export const putLike = (cardId) => {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: apiConfig.headers,
  })
  .then((res) => handleResponse(res));
}

export const deleteLike = (cardId) => {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  })
  .then((res) => handleResponse(res));
}