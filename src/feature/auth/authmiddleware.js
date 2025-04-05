import { ApiStatus } from "../../network/ApiStatus";
import Endpoints from "../../network/endpoints";
import {
  mutateLoginState,
  mutateSignupState,
  updateLoginStatus,
} from "./authslice";

export function signupMiddleware(signupFormData) {
  return async function (dispatch) {
    dispatch(mutateSignupState({ apiStatus: ApiStatus.pending }));
    const response = await fetch(Endpoints.signup, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupFormData),
    });
    if (response.status >= 200 && response.status < 300) {
      dispatch(mutateSignupState({ apiStatus: ApiStatus.success }));
      // success
    } else {
      const { message } = await response.json();
      dispatch(
        mutateSignupState({ apiStatus: ApiStatus.error, errorMessage: message })
      );
    }
  };
}

export function loginMiddleware(signupFormData) {
  return async function (dispatch) {
    dispatch(mutateLoginState({ apiStatus: ApiStatus.pending }));
    const response = await fetch(Endpoints.login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupFormData),
    });
    if (response.status >= 200 && response.status < 300) {
      const { token } = await response.json();
      localStorage.setItem("token", token);
      dispatch(mutateLoginState({ apiStatus: ApiStatus.success }));
      dispatch(updateLoginStatus(true));
    } else {
      const { message } = await response.json();
      dispatch(
        mutateLoginState({ apiStatus: ApiStatus.error, errorMessage: message })
      );
    }
  };
}
