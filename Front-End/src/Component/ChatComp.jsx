import { MessageCircleDashed, Send } from "lucide-react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import cookieParser from "cookie-parser";
import Cookies from "js-cookie";
import ChatHeader from "./chatHeader";
import MessegeInput from "./MessegeInput";
import Messeges from "./Messeges";

const ChatComp = () => {
  const messege = useSelector((state) => state.messegedata?.messeges?.chat);
  const selectedUser = useSelector((state) => state.messegedata?.selectedUser);

  if (selectedUser === null) {
    return (
      <div className="h-full flex flex-col justify-center items-center rounded-tl-lg bg-slate-800">
        <div className="flex flex-col items-center gap-3">
          <MessageCircleDashed size={70} />
          <p className="font-bold text-3xl">Socialize</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col justify-between rounded-tl-lg bg-slate-800">
      <ChatHeader />
      <div>
        <div className="p-4 h-[45%] overflow-auto no-scrollbar">
          {/* <Messeges /> */}
          {messege ? <Messeges /> : "no Chats"}
        </div>
        <MessegeInput />
      </div>
    </div>
  );
};

export default ChatComp;
