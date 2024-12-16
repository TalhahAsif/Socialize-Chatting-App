import React from "react";

const Input = ({ icon, type, placeholder, refr }) => {
  return (
    <div>
      <label className="input input-bordered flex items-center gap-2">
        {icon}
        <input type={type} className="grow" placeholder={placeholder} refr />
      </label>
    </div>
  );
};

export default Input;
