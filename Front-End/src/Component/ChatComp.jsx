import { Send } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import cookieParser from "cookie-parser";

const ChatComp = () => {
  const messege = useSelector((state) => state.messegedata.messeges.chat);
  const myID = 
  console.log(messege);

  return (
    <div className="">
      {/* Friend Messege*/}

      {messege.map((data) => {

      })}
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
        <div className="chat-header">
          Obi-Wan Kenobi
          <time className="text-xs opacity-50">12:45</time>
        </div>
        <div className="chat-bubble">You were the Chosen One!</div>
        <div className="chat-footer opacity-50">Delivered</div>
      </div>

      {/* My Messege */}
      <div className="chat chat-end">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
        <div className="chat-header">
          Anakin
          <time className="text-xs opacity-50">12:46</time>
        </div>
        <div className="chat-bubble">I hate you!</div>
        <div className="chat-footer opacity-50">Seen at 12:46</div>
      </div>

      {/* TEXT INPUT */}

      <div className="flex justify-between gap-2">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-accent w-full"
        />
        <button className="bg-green-500 text-white p-3 rounded-full flex justify-center items-center">
          <Send />
        </button>
      </div>
    </div>
  );
};

export default ChatComp;
