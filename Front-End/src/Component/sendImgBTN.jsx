import { Image } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const SendImgBTN = ({ onChange }) => {
  return (
    <div>
      <div className="flex items-center justify-center">
        <label className="flex items-center p-3 bg-transparent bg-slate-600 hover:bg-slate-700 text-white rounded-full cursor-pointer transition">
          <Image size={20} className="" />
          <input type="file" className="hidden" onChange={onChange} />
        </label>
      </div>
    </div>
  );
};

export default SendImgBTN;
