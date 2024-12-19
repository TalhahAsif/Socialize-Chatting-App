import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../Slices/usersSlice";

const LogoutModal = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    Navigate("/auth");
  };

  return (
    <div>
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
  );
};

export default LogoutModal;
