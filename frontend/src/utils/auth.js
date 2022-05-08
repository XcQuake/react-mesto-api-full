export const BASE_URL = 'https://api.xcqfront.nomoredomains.work';

function processResult(res) {
  if (res.ok) return res.json();
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify ({
      "password": password,
      "email": email
    })
  })
  .then((res) => processResult(res))
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify ({
      "password": password,
      "email": email
    })
  })
  .then((res) => processResult(res))
};

export const checkToken = () => {
  return fetch(`${BASE_URL}/users/me`, {
    credentials: 'include',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then((res) => processResult(res))
};

export const logout = () => {
  return fetch(`${BASE_URL}/signout`, {
    credentials: 'include',
    method: 'GET'
  })
  .then((res) => processResult(res))
};

