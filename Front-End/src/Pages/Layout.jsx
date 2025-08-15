import React from "react";
import Navbar from "../Component/Navbar";
import { Outlet } from "react-router-dom";
import CreateConverversationBtn from "../Component/CreateConverversationBtn";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
