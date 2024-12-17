import React from "react";
import { useDispatch } from "react-redux";
import { checkAuthFunc, logout } from "../Slices/usersSlice";
import { MessageCircleDashed } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };

  return (
    <div className="flex justify-between m-5">
      <div className="flex items-center justify-center gap-2">
        <MessageCircleDashed size={50} color="#1e55ca" />
        <p className="text-lg font-bold">Socialize</p>
      </div>
      <div>
        <button
          onClick={() => handleLogout()}
          className="btn btn-active btn-primary"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
