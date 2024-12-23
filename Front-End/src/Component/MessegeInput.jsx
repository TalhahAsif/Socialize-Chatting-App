import { Image, Send } from "lucide-react";
import React from "react";
import SendImgBTN from "./sendImgBTN";

const handleFileChange = (event) => {
  const file = event.target.files[0];
  console.log(file);
};

const MessegeInput = () => {
  return (
    <div className="p-3 bg-transparent h-[10%]">
      <div className="flex justify-between gap-2">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-accent w-full"
        ></input>
        <section className="flex items-center gap-1">
          <SendImgBTN onChange={handleFileChange} />
          <button className="bg-green-500 text-white p-3 rounded-full flex justify-center items-center">
            <Send />
          </button>
        </section>
      </div>
    </div>
  );
};

export default MessegeInput;
