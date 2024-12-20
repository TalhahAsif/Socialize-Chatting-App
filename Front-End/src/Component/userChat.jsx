import React from "react";

const UserChat = ({ data }) => {

  return (
    <div className="">
      <div className="m-auto md:flex md:items-center md:justify-center gap-2 p-4 rounded-lg md:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-200">
        <div className=" flex flex-col justify-center items-center gap-2">
          <img
            className="rounded-full w-16 md:h-full lg:h-16 object-cover border-2 border-gray-600"
            src={data.profileImg}
            alt="Profile"
          />
          <p className="font-semibold text-white md:hidden">{data.username}</p>
        </div>
        <div className="hidden md:flex flex-col flex-grow gap-1">
          <div className="flex justify-between items-center gap-2 w-full">
            <p className="font-semibold text-white">{data.username}</p>
            <p className="text-xs text-gray-400">time</p>
          </div>
          <p className="text-xs text-gray-400">last Message</p>
        </div>
      </div>
    </div>
  );
};

export default UserChat;
