import { MessageCircleDashed, Send } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cookieParser from "cookie-parser";
import Cookies from "js-cookie";
import ChatHeader from "./chatHeader";
import MessegeInput from "./MessegeInput";
import Messeges from "./Messeges";
import { sendMessege } from "../Slices/messegeSlice";

const ChatComp = () => {
  const dispatch = useDispatch();

  const messege = useSelector((state) => state.messegedata?.messeges);
  const selectedUser = useSelector((state) => state.messegedata?.selectedUser);

  const [image, setImage] = useState();
  const [text, setText] = useState();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    const reader = new FileReader(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleForm = (e) => {
    e.preventDefault();
    const message = {
      image,
      text,
    };
    dispatch(sendMessege({ message, selectedUser }));
    setText("");
    setImage("");
  };

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
      <div className="h-[80%] flex-grow relative">
        <div className="h-[90%] p-4 overflow-auto no-scrollbar">
          {messege ? <Messeges /> : "no Chats"}
        </div>
        <div className="absolute bottom-0 left-0 w-full flex flex-col ">
          {image && (
            <div className="mx-3 flex ">
              <img
                src={image}
                className="w-full max-w-[170px] mb-3"
                alt="Attachment"
              />
              <p
                className="bg-gray-800 h-5 p-2 flex justify-center items-center mx-[-24px] my-[5px] rounded-full text-sm cursor-pointer"
                onClick={() => setImage(null)}
              >
                x
              </p>
            </div>
          )}

          <div className="">
            <MessegeInput
              handleFileChange={handleFileChange}
              setText={setText}
              handleForm={handleForm}
              text={text}
              image={image}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComp;
