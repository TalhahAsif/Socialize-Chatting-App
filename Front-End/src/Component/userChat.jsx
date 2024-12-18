import React from "react";

const UserChat = ({ data }) => {
  return (
    <div>
      <div className="flex items-center justify-center gap-3 p-2 rounded-lg bg-slate-900 shadow-sm">
        <div className="w-16">
          <img className="rounded-full" src={data.profileImg} />
        </div>
        <div className="flex flex-col flex-grow gap-1">
          <div className="flex justify-between items-center gap-7 w-full">
            <p className="font-semibold">{data.username}</p>
            <p className="text-xs">time</p>
          </div>
          <p className="text-xs">last Message</p>
        </div>
      </div>
    </div>
  );
};

export default UserChat;
