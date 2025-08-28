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
import { io } from "socket.io-client";

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.authdata.user);
  const checkingAuth = useSelector((state) => state.authdata.checkingAuth);
  const loading = useSelector((state) => state.authdata.loading);

  const socket = io("http://localhost:8080/");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected to backend");
    });

    socket.on("receiveMessage", (msg) => {
      console.log("Message received from backend:", msg);
      // setReceivedMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

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
