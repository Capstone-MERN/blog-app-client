import { createSlice } from "@reduxjs/toolkit";
import { ApiStatus } from "../../network/ApiStatus";

const getInitialLoginStatus = () => {
  return Boolean(localStorage.getItem("token"));
};

const initialState = {
  loggedIn: getInitialLoginStatus(),
  login: {
    errorMessage: "",
    apiStatus: ApiStatus.init,
  },
  signup: {
    errorMessage: "",
    apiStatus: ApiStatus.init,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    mutateLoginState: (state, { payload }) => {
      const { errorMessage, apiStatus } = payload;
      if (errorMessage) {
        state.login.errorMessage = errorMessage;
      } else state.login.errorMessage = "";
      state.login.apiStatus = apiStatus;
    },

    mutateSignupState: (state, { payload }) => {
      const { errorMessage, apiStatus } = payload;
      if (errorMessage) {
        state.signup.errorMessage = errorMessage;
      } else state.signup.errorMessage = "";
      state.signup.apiStatus = apiStatus;
    },

    updateLoginStatus: (state, { payload }) => {
      state.loggedIn = payload;
    },
  },
});

export const { mutateLoginState, mutateSignupState, updateLoginStatus } =
  authSlice.actions;

export default authSlice;
