import { Check, Pen } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { update } from "../Slices/usersSlice";

const ProfileModal = () => {
  const user = useSelector((state) => state.authdata.user);
  const dispatch = useDispatch();

  const [isUpdatingUN, setUpdatingUN] = useState(false);
  const [isUpdatingBio, setUpdatingBio] = useState(false);

  const [userName, setUserName] = useState(user.username);
  const [Bio, setBio] = useState(user.Bio);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Bio);
    console.log(userName);
    setUpdatingBio(false);
    setUpdatingUN(false);
    setUserName(user.username);
    setBio(user.Bio);
  };

  return (
    <dialog id="profileModal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => {
              setUpdatingUN(false);
              setUpdatingBio(false);
            }}
          >
            ✕
          </button>
        </form>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-8 h-80"
        >
          <div className="w-24 flex flex-col items-center justify-center gap-3">
            <img className="rounded-full" src={user.profileImg} alt="Profile" />
            <div className="flex gap-4 justify-center items-center">
              {isUpdatingUN ? (
                <div className="flex gap-4 justify-center items-center">
                  <label className="">
                    <input
                      type="text"
                      autoFocus
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="flex items-center p-1 bg-transparent border rounded-lg"
                    />
                    <div>
                      {/* {errors ? (
                        <span className="text-xs text-red-600">
                          {errors["username"]?.message}
                        </span>
                      ) : null} */}
                    </div>
                  </label>
                </div>
              ) : (
                <div className="flex justify-center items-center gap-10">
                  <p className="text-xl font-bold">{user.username}</p>
                  <Pen
                    onClick={() => {
                      setUpdatingUN(true);
                      setUpdatingBio(false);
                    }}
                    size={15}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <p className="font-bold">Bio:</p>
              <div className="flex">
                {isUpdatingBio ? (
                  <div className="flex gap-4 justify-center items-center">
                    <label className="">
                      <input
                        type="text"
                        autoFocus
                        value={Bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="flex items-center p-1 bg-transparent border rounded-lg"
                      />
                      {/* {errors ? (
                        <span className="text-xs text-red-600">
                          {errors["Bio"]?.message}
                        </span>
                      ) : null} */}
                    </label>
                  </div>
                ) : (
                  <div className="flex justify-center items-center gap-10">
                    <p className="text-sm">{user.Bio}</p>
                    <Pen
                      onClick={() => {
                        setUpdatingBio(true);
                        setUpdatingUN(false);
                      }}
                      size={15}
                    />
                  </div>
                )}
              </div>
            </div>
            <div>
              <p className="font-bold">Email:</p>
              <div className="flex justify-between items-center gap-5">
                <p className="text-sm">{user.email}</p>
              </div>
            </div>
            {isUpdatingUN || isUpdatingBio ? (
              <div>
                <button type="submit" className="text-green-500">
                  Update
                </button>
              </div>
            ) : null}
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default ProfileModal;
