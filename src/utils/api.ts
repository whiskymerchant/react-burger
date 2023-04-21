import { getCookie, setCookie } from "./cookie";

interface IHeaders {
  authorization?: string;
  "Content-Type"?: string;
}

export interface IRegisterUser {
  email: string;
  password: string;
  name: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

interface ISendCode {
  code: string;
}

interface IUserInfoUpdate {
  email: string;
  password: string;
  name: string;
}

export interface IPasswordReset {
  password: string;
  token: string;
}

export interface IUserName {
  email: string;
  name: string;
}

export interface IUserRequest {
  onError: (error?: string) => void;
  onSuccess: (token?: string) => void;
}

export interface IRegisteredUserRequest extends IUserRequest {
  dataUser: IRegisterUser;
}

export const BURGER_INGREDIENTS_API = "https://norma.nomoreparties.space/api";
export const BURGER_API_WSS_ORDERS = "wss://norma.nomoreparties.space/orders";
export const BURGER_API_WSS_FEED = "wss://norma.nomoreparties.space/orders/all";

export const listenRequest = (res: any) => {
  return res.ok
    ? res.json()
    : res
        .json()
        .then((err: any) => Promise.reject({ ...err, statusCode: res.status }));
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

export const sendOrder = (data: unknown) => {
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

export const fetchWithRefresh = async (url: string, options: RequestInit) => {
  try {
    const res = await fetch(url, options);
    return await listenRequest(res);
  } catch (error: any) {
    if (error.statusCode === 401 || error.statusCode === 403) {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        Promise.reject(refreshData);
      }

      setCookie("accessToken", refreshData.accessToken);
      setCookie("refreshToken", refreshData.refreshToken);
      options.headers = {
        ...options.headers,
        authorization: refreshData.accessToken,
      };
      // options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await listenRequest(res);
    } else {
      Promise.reject(error);
    }
  }
};

export const registerUser = (data: IRegisterUser) => {
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

export const loginUser = (data: ILoginUser) => {
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
      authorization: getCookie("accessToken") ?? "",
    },
  }).then((data) => {
    if (data?.success) return data;
    return Promise.reject(data);
  });
};


// export const passwordReset = ({value, onSuccess}) =>
export const passwordReset = ({email , onSuccess}:{email: string, onSuccess:() => void}) => {
  return fetch(`${BURGER_INGREDIENTS_API}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({ email }),
  })
    .then(listenRequest)
    .then((data) => {
      if (data.success) {
        onSuccess();
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

export const sendCode = (data: ISendCode) => {
  return fetch(`${BURGER_INGREDIENTS_API}/password-reset/reset`, {
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

export const userInfoUpdate = (data: IUserInfoUpdate) => {
  return fetch(`${BURGER_INGREDIENTS_API}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: getCookie("accessToken") ?? "",
    },
    body: JSON.stringify(data),
  })
    .then(listenRequest)
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });
};
