import { Check, Pen } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { update } from "../Slices/usersSlice";

const schema = z.object({
  username: z
    .string()
    .min(2, "Too Short")
    .max(20, "username must be less than 20 characters")
    .optional(),
  Bio: z
    .string()
    .min(2, "Too Short")
    .max(20, "Bio must be less than 20 characters")
    .optional(),
});

const ProfileModal = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const user = useSelector((state) => state.authdata.user);
  const loading = useSelector((state) => state.authdata.loading);
  const dispatch = useDispatch();

  const [isUpdatingUN, setUpdatingUN] = useState(false);
  const [isUpdatingBio, setUpdatingBio] = useState(false);

  const submit = (data) => {
    dispatch(update(data));
    console.log(data);
    setUpdatingBio(false);
    setUpdatingUN(false);
    reset();
  };

  return (
    <dialog id="profileModal" className="modal open">
      <div className="modal-box p-6">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => {
              setUpdatingUN(false);
              setUpdatingBio(false);
              reset();
            }}
          >
            ✕
          </button>
        </form>
        <form
          onSubmit={handleSubmit(submit)}
          className="flex flex-col justify-center items-center gap-8"
        >
          <div className="flex flex-col items-center justify-center gap-3">
            <img
              className="rounded-full w-24 h-24 object-cover"
              src={user.profileImg}
              alt="Profile"
            />
            <div className="flex gap-4 justify-center items-center">
              {isUpdatingUN ? (
                <div className="flex gap-4 justify-center items-center">
                  <label className="">
                    <input
                      type="text"
                      autoFocus
                      {...register("username")}
                      className="flex items-center p-1 bg-transparent border-b-2 border-gray-300 focus:border-blue-500 rounded-lg transition duration-200"
                    />
                    {errors["username"] && (
                      <div className="mt-1 text-xs text-red-600">
                        {errors["username"]?.message}
                      </div>
                    )}
                  </label>
                </div>
              ) : (
                <div className="flex justify-center items-center gap-10">
                  <p className="text-xl font-bol">{user.username}</p>
                  <Pen
                    onClick={() => {
                      setUpdatingUN(true);
                      setUpdatingBio(false);
                    }}
                    size={20}
                    className="cursor-pointer text-gray-500 hover:text-gray-700 transition duration-200"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <div className="w-full">
              <p className="font-bold">Bio:</p>
              <div className="flex">
                {isUpdatingBio ? (
                  <div className="flex gap-4 justify-center items-center w-full">
                    <label className="w-full">
                      <input
                        type="text"
                        autoFocus
                        {...register("Bio")}
                        className="flex items-center p-1 bg-transparent border-b-2 border-gray-300 focus:border-blue-500 rounded-lg transition duration-200 w-full"
                      />
                      {errors["Bio"] && (
                        <div className="mt-1 text-xs text-red-600">
                          {errors["Bio"]?.message}
                        </div>
                      )}
                    </label>
                  </div>
                ) : (
                  <div className="flex justify-between items-center w-full gap-10">
                    <p className="text-sm">{user.Bio}</p>
                    <Pen
                      onClick={() => {
                        setUpdatingBio(true);
                        setUpdatingUN(false);
                      }}
                      size={20}
                      className="cursor-pointer text-gray-500 hover:text-gray-700 transition duration-200"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="w-full">
              <p className="font-bold">Email:</p>
              <div className="flex justify-between items-center">
                <p className="text-sm">{user.email}</p>
              </div>
            </div>
            {(isUpdatingUN || isUpdatingBio) && (
              <div className="mt-4 flex justify-between">
                <button type="submit" className="text-green-500">
                  Update
                  {loading && (
                    <span className="loading loading-dots loading-xs"></span>
                  )}
                </button>
                <button
                  className="text-red-500"
                  onClick={() => {
                    setUpdatingUN(false);
                    setUpdatingBio(false);
                    reset();
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default ProfileModal;
