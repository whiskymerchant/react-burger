import { getCookie, setCookie } from "./cookie";

export const BURGER_INGREDIENTS_API = "https://norma.nomoreparties.space/api";

export const listenRequest = (res) => {
  return res.ok
    ? res.json()
    : res
        .json()
        .then((err) => Promise.reject({ ...err, statusCode: res.status }));
};

export const getIngredients = () => {
  return fetch(`${BURGER_INGREDIENTS_API}/ingredients`)
    .then(listenRequest)
    .then((data) => {
      if (data.success) {
        return data.data;
      }
    });
};

export const sendOrder = (data) => {
  return fetch(`${BURGER_INGREDIENTS_API}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({ ingredients: data }),
  })
    .then(listenRequest)
    .then((data) => {
      if (data.success) {
        return data;
      }
    });
};

export const refreshToken = () => {
  return fetch(`${BURGER_INGREDIENTS_API}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    }),
  }).then(listenRequest);
};

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await listenRequest(res);
  } catch (error) {
    console.log("fetchWithRefresh", error);
    if (error.statusCode === 401 || error.statusCode === 403) {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        Promise.reject(refreshData);
      }

      setCookie("accessToken", refreshData.accessToken);
      setCookie("refreshToken", refreshData.refreshToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await listenRequest(res);
    } else {
      Promise.reject(error);
    }
  }
};

export const registerUser = (data) => {
  return fetch(`${BURGER_INGREDIENTS_API}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then(listenRequest)
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });
};

export const loginUser = (data) => {
  return fetch(`${BURGER_INGREDIENTS_API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then(listenRequest)
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });
};

export const getUser = () => {
  return fetchWithRefresh(`${BURGER_INGREDIENTS_API}/auth/user`, {
    headers: {
      authorization: getCookie("accessToken"),
    },
  }).then((data) => {
    if (data?.success) return data;
    return Promise.reject(data);
  });
};

export const passwordReset = (data) => {
  return fetch(`${BURGER_INGREDIENTS_API}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({ email: data }),
  })
    .then(listenRequest)
    .then((data) => {
      if (data.success) {
        return data;
      }
    });
};

export const logoutUser = () => {
  return fetch(`${BURGER_INGREDIENTS_API}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    }),
  })
    .then(listenRequest)
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });
};