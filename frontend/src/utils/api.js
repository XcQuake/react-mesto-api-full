class Api {
  constructor({baseUrl, headers}) {
    this._link = baseUrl;
    this._headers = headers;
    this._token = headers.authorization;
  }

  _processResult(res) {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  
  getUserInfo() {
    return fetch(`${this._link}/users/me`, {
      credentials: 'include',
      method: 'GET', 
      headers: this._headers
    })
      .then(res => this._processResult(res))
  }

  setUserInfo({name, about}) {
    return fetch(`${this._link}/users/me`, {
      credentials: 'include',
      method: 'PATCH', 
      headers: this._headers, 
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res => this._processResult(res))
  }

  getInitialCards() {
    return fetch(`${this._link}/cards`, {
      credentials: 'include',
      method: 'GET', 
      headers: this._headers
    })
      .then(res => this._processResult(res))
  }

  getFullData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  setUserAvatar(item) {
    return fetch(`${this._link}/users/me/avatar`, {
      credentials: 'include',
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: item.avatar
      })
    })
      .then(res => this._processResult(res))
  }

  addCard(item) {
    return fetch(`${this._link}/cards`, {
      credentials: 'include',
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: item.name,
        link: item.link
      })
    })
      .then(res => this._processResult(res))
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._link}/cards/${cardId}/likes`, {
      credentials: 'include',
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: this._headers
    })
      .then(res => this._processResult(res))
  }

  deleteCard(cardId) {
    return fetch(`${this._link}/cards/${cardId}`, {
      credentials: 'include',
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => this._processResult(res))
  }
}

const api = new Api({
  baseUrl: 'https://api.xcqfront.nomoredomains.work',
  headers: {
    'Content-Type': 'application/json',
  }
})

export default api;