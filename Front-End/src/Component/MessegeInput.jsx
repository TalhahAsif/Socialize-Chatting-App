import { Send } from "lucide-react";
import React from "react";

const MessegeInput = () => {
  return (
    <div className="p-3 bg-transparent h-[10%]">
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

export default MessegeInput;
