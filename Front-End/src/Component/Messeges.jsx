import React from "react";
import { useSelector } from "react-redux";

const Messeges = () => {
  const messege = useSelector((state) => state.messegedata?.messeges);
  const currentConversation = useSelector(
    (state) => state.messegedata.currentConversation
  );
  const authUser = useSelector((state) => state.authdata.user);

  return (
    <div className="flex flex-col gap-4 overflow-auto">
      {messege?.map((data) => (
        <div
          key={data._id}
          className={`chat ${
            currentConversation?.members[0]?._id === authUser._id
              ? "chat-end"
              : "chat-start"
          }`}
        >
          <div className="chat-image avatar">
            <div className="w-7 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src={
                  currentConversation?.members[0]?._id === authUser._id
                    ? authUser.profileImg
                    : currentConversation?.members[0]?.profileImg
                }
              />
            </div>
          </div>
          <div className="chat-header">
            <time className="text-xs opacity-50">12:45</time>
          </div>
          <div
            className={`chat-bubble text-sm ${
              currentConversation?.members[0]?._id === authUser._id &&
              "bg-blue-600 text-black"
            }`}
          >
            <img src={data.image} alt="" className="w-24 rounded-lg" />
            {data.text}
          </div>
          <div className="chat-footer opacity-50 text-xs">Delivered</div>
        </div>
      ))}
    </div>
  );
};

export default Messeges;
