import { Image, Send } from "lucide-react";
import React, { useState } from "react";
import SendImgBTN from "./sendImgBTN";

const MessegeInput = ({ handleFileChange, setText, handleForm }) => {
  return (
    <div className="flex flex-col px-3 pb-3 h-[10%] bg-transparent ">
      <form onSubmit={handleForm} className="flex items-center gap-2 ">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-accent w-full flex-grow"
          onChange={(e) => setText(e.target.value)}
        />
        <section className="flex items-center gap-1">
          <SendImgBTN onChange={handleFileChange} />
          <button className="bg-green-500 text-white p-3 rounded-full flex justify-center items-center">
            <Send />
          </button>
        </section>
      </form>
    </div>
  );
};

export default MessegeInput;
