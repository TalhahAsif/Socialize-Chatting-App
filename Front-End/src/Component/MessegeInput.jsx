import { Image, Send } from "lucide-react";
import React, { useState } from "react";
import SendImgBTN from "./sendImgBTN";

const MessegeInput = ({
  handleFileChange,
  setText,
  handleForm,
  text,
  image,
}) => {
  return (
    <div className="flex flex-col px-3 pb-3 h-[10%] bg-transparent ">
      <form onSubmit={handleForm} className="flex items-center gap-2 ">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-accent w-full flex-grow"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <section className="flex items-center gap-1">
          <SendImgBTN onChange={handleFileChange} />
          <button
            disabled={!text && !image}
            className={`text-white p-3 rounded-full flex justify-center items-center ${
              !text && !image ? "bg-slate-500" : "bg-green-500"
            }`}
          >
            <Send />
          </button>
        </section>
      </form>
    </div>
  );
};

export default MessegeInput;
