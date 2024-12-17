import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Setting from "./Pages/Setting";
import Home from "./Pages/Home";
import Navbar from "./Component/Navbar";
import Auth from "./Pages/Auth";
import Layout from "./Pages/Layout";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "lucide-react";
import axios from "axios";
import { axiosInstance } from "./lib/axios.js";
import { checkAuthFunc } from "./Slices/usersSlice.js";
import { Toaster, toast } from "sonner";

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const checkingAuth = useSelector((state) => state.checkingAuth);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  console.log("user", user);
  // console.log("chekingAuth", checkingAuth);
  console.log("error", error);

  useEffect(() => {
    dispatch(checkAuthFunc());
  }, []);

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Toaster richColors position="bottom-right" />
      <Routes>
        <Route path="/" element={user ? <Layout /> : <Navigate to={"/auth"} />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="setting" element={<Setting />} />
        </Route>
        <Route path="/auth" element={!user ? <Auth /> : <Navigate to={"/"} />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
