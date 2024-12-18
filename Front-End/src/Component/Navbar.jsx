import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthFunc, logout } from "../Slices/usersSlice";
import { MessageCircleDashed } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AvatarDropDown from "./AvatarDropDown";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();



  return (
    <div className="flex justify-between mx-7 my-3">
      <div className="flex items-center justify-center gap-2">
        <MessageCircleDashed size={38} color="#1e55ca" />
        <p className="text-md font-bold">Socialize</p>
      </div>

      <AvatarDropDown />
    </div>
  );
};

export default Navbar;
