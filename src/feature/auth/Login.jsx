import React from "react";
import Button from "../../components/button/Button";
import { loginSelector } from "./authselectors";
import { useDispatch, useSelector } from "react-redux";
import { ApiStatus } from "../../network/ApiStatus";
import { loginMiddleware } from "./authmiddleware";

export default function Login() {
  const { errorMessage, apiStatus } = useSelector(loginSelector);
  const dispatch = useDispatch();

  async function onSubmit(event) {
    event.preventDefault();
    const form = event.target;

    const formData = {
      email: form["email"].value,
      password: form["password"].value,
    };
    dispatch(loginMiddleware(formData));
  }

  return (
    <div className="auth-container">
      <form className="form login-form" onSubmit={onSubmit}>
        <input required name="email" type="email" placeholder="Email" />
        <input
          required
          type="password"
          placeholder="Password"
          name="password"
        />
        <Button text="Login" isLoading={apiStatus === ApiStatus.pending} />
        {errorMessage && <p className="error">{errorMessage}</p>}
      </form>
    </div>
  );
}
