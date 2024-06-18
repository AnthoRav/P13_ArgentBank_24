// @ts-ignore
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profil from "./pages/profil/Profil";
import Error from "./pages/error/Error";
import { useSelector } from "react-redux";
import { authenticated } from './redux/authSlice'


function Router() {
  const isAuthenticated = useSelector(authenticated)
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/profile" replace /> : <Login />}
      ></Route>
      <Route
        path="/profile"
        element={isAuthenticated ? <Profil /> : <Navigate to="/login" replace />}
      ></Route>
      <Route path="/*" element={<Error />}></Route>
    </Routes>
  );
}

export default Router;
