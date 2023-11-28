const token = 'f9c508cd-5ca6-41d9-8d69-4cf226b126b0';
const groupId = 'wff-cohort-1';
const config = {
  baseUrl: `https://mesto.nomoreparties.co/v1/${groupId}`,
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
  .then((res) => checkResponse(res))
}

export const addCardAPI = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then((res) => checkResponse(res))
}

export const removeCardAPI = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then((res) => checkResponse(res))
}

export const likeCardAPI = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then((res) => checkResponse(res))
}

export const unlikeCardAPI = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then((res) => checkResponse(res))
}

export const getProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
  .then((res) => checkResponse(res))
}

export const editProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then((res) => checkResponse(res))
}

export const editProfileAvatar = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link
    })
  })
  .then((res) => checkResponse(res))
}

const checkResponse = (res) => {
  if(res.ok){
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
}
