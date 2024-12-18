import React from "react";
import { useSelector } from "react-redux";

const ProfileModal = () => {
  const user = useSelector((state) => state.authdata.user);
  console.log(user);

  return (
    <>
    
    </>
  );
};

export default ProfileModal;
