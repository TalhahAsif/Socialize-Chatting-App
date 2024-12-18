import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.authdata.user);
  console.log(user);

  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        open modal
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <section className="flex flex-col justify-center items-center h-dvh">
            <div className="avatar">
              <div className="w-24 rounded-full">
                <img src={user.profileImg} />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <p>{user.username}</p>
              <p>{user.email}</p>
              <p>{user.Bio}</p>
            </div>
          </section>
        </div>
      </dialog>
    </>
  );
};

export default Profile;
