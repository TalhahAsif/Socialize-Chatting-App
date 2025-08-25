import React from "react";
import { useSelector } from "react-redux";

const ChatHeader = () => {
  const currentConversation = useSelector(
    (state) => state.messegedata.currentConversation
  );
  return (
    <>
      <div className="w-full flex gap-5 items-center px-5 py-3  rounded-tl-lg">
        <div className="w-9 ">
          <img className="rounded-full" src={currentConversation?.members[0]?.profileImg} />
        </div>
        <p>{currentConversation?.members[0]?.username}</p>
      </div>
    </>
  );
};

export default ChatHeader;
