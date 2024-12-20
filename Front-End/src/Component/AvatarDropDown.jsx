import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Slices/usersSlice";
import { Link, Navigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";
import { Check, Pen } from "lucide-react";
import LogoutModal from "./LogoutModal";

const AvatarDropDown = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authdata.user);

  return (
    <>
      <div className="flex justify-between items-center gap-3 cursor-pointer">
        <details className="dropdown dropdown-end">
          <summary className="flex flex-row-reverse gap-6 justify-center items-center rounded-full">
            <div className="avatar">
              <div className="w-10 h-10 rounded-full">
                <img src={user.profileImg} />
              </div>
            </div>
            <p className="hidden md:flex">{user.username}</p>
          </summary>
          <ul className="menu dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow">
            <li>
              <div
                onClick={() =>
                  document.getElementById("profileModal").showModal()
                }
              >
                Profile
              </div>
            </li>
            <li>
              <div>Setting</div>
            </li>
            <li>
              <div
                className="text-red-600"
                onClick={() =>
                  document.getElementById("my_modal_3").showModal()
                }
              >
                logout
              </div>
            </li>
          </ul>
        </details>

        <ProfileModal />

        {/* ///////////////Logout Modal */}
        <LogoutModal />
      </div>
    </>
  );
};

export default AvatarDropDown;
