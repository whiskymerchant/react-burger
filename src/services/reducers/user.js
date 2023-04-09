import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import isActionPending from "../../utils/isActionPending";
import isActionRejected from "../../utils/isActionRejected";
import getActionName from "../../utils/getActionName";
import { removeCookie, setCookie } from "../../utils/cookie";
import {
  getUser,
  registerUser as registerUserApi,
  loginUser as loginUserApi,
  logoutUser as logoutUserApi
} from "../../utils/api";

const initialState = {
  isAuthChecked: false,
  data: null,

  registerUserError: null,
  registerUserRequest: false,

  loginUserError: null,
  loginUserRequest: false,

  getUserError: null,
  getUserRequest: false,
};

export const checkUserAuth = createAsyncThunk(
  `user/checkUserAuth`,
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const data = await getUser();
      if (!data?.success) {
        return rejectWithValue(data);
      }
      return data.user;
    } catch (error) {
      return rejectWithValue(error);
    } finally {
      dispatch(authCheck());
    }
  }
);

export const registerUser = createAsyncThunk(
  `user/registerUser`,
  async (myData, { rejectWithValue }) => {
    console.log(myData);
    const data = await registerUserApi(myData.dataUser).catch(({ message }) =>
      myData.onError(message)
    );
    console.log("responce", data);
    if (!data?.success) {
      return rejectWithValue(data);
    }
    setCookie("accessToken", data.accessToken, { "max-age": 1000 });
    setCookie("refreshToken", data.refreshToken);
    myData.onSuccess(data.accessToken);
    return data.user;
  }
);

export const loginUser = createAsyncThunk(
  `user/loginUser`,
  async (myData, { rejectWithValue }) => {
    const data = await loginUserApi(myData.dataUser).catch(({ message }) =>
      myData.onError(message)
    );
    console.log("responce", data);
    if (!data?.success) {
      return rejectWithValue(data);
    }
    setCookie("accessToken", data.accessToken);
    setCookie("refreshToken", data.refreshToken);
    myData.onSuccess(data.accessToken);
    return data.user;
  }
);

export const logoutUser = createAsyncThunk(
  `user/logoutUser`,
  async (myData, { rejectWithValue }) => {
    const data = await logoutUserApi().catch(({ message }) =>
      myData.onError(message)
    );
    console.log("responce", data);
    if (!data?.success) {
      return rejectWithValue(data);
    }
    removeCookie("accessToken");
    removeCookie("refreshToken");
    myData.onSuccess();
    return data.user;
  }
);

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    authCheck: (state) => {
      state.isAuthChecked = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.data = action.payload;
        state.getUserRequest = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.registerUserRequest = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loginUserRequest = false;
      })
      .addMatcher(isActionPending, (state, action) => {
        state[`${getActionName(action.type)}Request`] = true;
        state[`${getActionName(action.type)}Error`] = null;
      })
      .addMatcher(isActionRejected, (state, action) => {
        state[`${getActionName(action.type)}Error`] = action.payload;
        state[`${getActionName(action.type)}Request`] = false;
      });
  },
});

export const { authCheck } = user.actions;

export default user.reducer;
