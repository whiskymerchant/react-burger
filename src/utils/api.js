export const BURGER_INGREDIENTS_API = 'https://norma.nomoreparties.space/api';

export const listenRequest = (res) => {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(err))
}

export const getIngredients = () => {
  return fetch(`${BURGER_INGREDIENTS_API}/ingredients`)
    .then(listenRequest)
    .then(data => {
      if (data.success) {
        return data.data;
      }
    })
}


export const sendOrder = (data) => {
  return fetch(`${BURGER_INGREDIENTS_API}/orders`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then(listenRequest)
    .then(data => {
      if (data.success) {
        return data.data;
      }
    })
}



