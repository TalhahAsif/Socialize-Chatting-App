import React from "react";
import { useSelector } from "react-redux";

const ChatHeader = () => {
  const selectedUser = useSelector((state) => state.messegedata?.selectedUser);

  return (
    <>
      <div className="w-full flex gap-5 items-center px-5 py-3  rounded-tl-lg">
        <div className="w-9 ">
          <img className="rounded-full" src={selectedUser?.profileImg} />
        </div>
        <p>{selectedUser?.username}</p>
      </div>
    </>
  );
};

export default ChatHeader;
