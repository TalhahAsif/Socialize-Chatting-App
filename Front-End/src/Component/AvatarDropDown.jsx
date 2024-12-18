import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Slices/usersSlice";
import { Link, Navigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";
import { Check, Pen } from "lucide-react";

const AvatarDropDown = () => {
  const [isUpdatingUN, setUpdatingUN] = useState(false);
  const [isUpdatingBio, setUpdatingBio] = useState(false);

  console.log("isUpdatingUN==>", isUpdatingUN);
  console.log("isUpdatingBio==>", isUpdatingBio);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.authdata.user);

  const handleLogout = () => {
    dispatch(logout());
    Navigate("/auth");
  };

  return (
    <>
      <div className="flex justify-between items-center gap-3">
        <details className="dropdown dropdown-end">
          <summary className="flex flex-row-reverse gap-6 justify-center items-center rounded-full">
            <div className="avatar">
              <div className="w-10 h-10 rounded-full">
                <img src={user.profileImg} />
              </div>
            </div>
            <p>{user.username}</p>
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

        {/* ///////////////////Profile Modal */}

        <dialog id="profileModal" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <section className="flex flex-col justify-center items-center gap-8 h-80">
              <div className="w-24 flex flex-col items-center gap-3">
                <img className="rounded-full" src={user.profileImg} />
                <div className="flex gap-4 justify-center items-center">
                  {isUpdatingUN ? (
                    <div className="border">
                      <input type="text" />
                      <Check onClick={() => setUpdatingUN(false)} />
                    </div>
                  ) : (
                    <div className="border">
                      <p className="text-xl font-bold">{user.username}</p>
                      <Pen onClick={() => setUpdatingUN(true)} size={15} />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-3 ">
                <div>
                  <div>
                    <p className="font-bold">Bio:</p>
                  </div>
                  <div className="flex justify-between items-center gap-5">
                    <p>{user.Bio}</p>
                    <Pen onClick={() => setUpdatingBio(true)} size={15} />
                  </div>
                </div>
                <div>
                  <div>
                    <p className="font-bold">Email:</p>
                  </div>
                  <div className="flex justify-between items-center gap-5">
                    <p>{user.email}</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </dialog>

        {/* ///////////////Logout Modal */}

        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Wait!</h3>
            <p className="py-4">Are you sure that you want to logout?</p>

            <button
              onClick={() => handleLogout()}
              className="btn btn-active btn-primary"
            >
              Logout
            </button>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default AvatarDropDown;
