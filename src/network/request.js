import axios, { AxiosError } from "axios";
import store from "../redux/store.js";
import { updateLoginStatus } from "../feature/auth/authslice";
import { Exception } from "sass";

export const RequestMethod = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

/**
 * httpConfig: {
 *      url: "",
 *      method?: String,
 *      data: {},
 *      queryParams: {}
 * }
 *
 * @returns {success: boolean, data: Object }
 */
async function request(httpConfig) {
  const token = localStorage.getItem("token");
  try {
    const requestObj = {
      url: httpConfig.url,
      method: httpConfig.method ?? RequestMethod.GET,
      ...(httpConfig.data && { data: httpConfig.data }),
      ...(httpConfig.queryParams && { params: httpConfig.queryParams }),
      headers: {
        ...(token && { Authorization: token }),
      },
    };

    const response = await axios(requestObj);
    const data = response.data;
    return { success: true, data };
  } catch (exception) {
    if (exception instanceof AxiosError) {
      const statusCode = exception.status;
      if (statusCode === 401) {
        console.log("unauthorized user");
        // user's token is invalid
        handleUnAuthenticated();
      }
    }
    console.log(`Exception for ${httpConfig.url} ${exception}`);
    return { success: false, message: "Something went wrong" };
  }
}

function handleUnAuthenticated() {
  localStorage.removeItem("token");
  // since the user's token is inavalid update the redux store also with {isLoggedIn} to be false
  store.dispatch(updateLoginStatus(false));
}

export default request;
