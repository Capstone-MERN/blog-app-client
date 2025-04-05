import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./feature/home";
import Login from "./feature/auth/Login";
import Signup from "./feature/auth/Signup";
import NavigationBar from "./feature/navbar";
import { useSelector } from "react-redux";
import { isUserLoggedInSelector } from "./feature/auth/authselectors";

const PrivateRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:genreId" Component={Home} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default function App() {
  const isLoggedIn = useSelector(isUserLoggedInSelector);

  if (isLoggedIn) {
    return <PrivateRoutes />;
  }

  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        {/* login & signup are public routes should be only available when logged out */}
        <Route path="/login" Component={Login} />
        <Route path="/signup" Component={Signup} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
