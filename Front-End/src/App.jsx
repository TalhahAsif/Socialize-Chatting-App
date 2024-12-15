import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Setting from "./Pages/Setting";
import Home from "./Pages/Home";
import Navbar from "./Component/Navbar";
import Auth from "./Pages/Auth";
import Layout from "./Pages/Layout";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./Slices/usersSlice";
import { Loader } from "lucide-react";

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.users);
  const loading = useSelector((state) => state.loading);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="setting" element={<Setting />} />
        </Route>
        <Route path="/auth" element={<Auth />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />  
        </Route>
      </Routes>
    </>
  );
};

export default App;
