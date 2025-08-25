import { MessageCircleDashed, Send } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatHeader from "./chatHeader";
import MessegeInput from "./MessegeInput";
import Messeges from "./Messeges";
import { sendMessege } from "../Slices/messegeSlice";
import { toast } from "sonner";

const ChatComp = () => {
  const dispatch = useDispatch();

  const messege = useSelector((state) => state.messegedata?.messeges);
  const currentConversation = useSelector(
    (state) => state.messegedata?.currentConversation
  );

  const [image, setImage] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [text, setText] = useState();
  const [documents, setDocuments] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (
      file.type !== "image/png" &&
      file.type !== "image/jpg" &&
      file.type !== "image/jpeg"
    ) {
      toast.error("Please select a valid image file (png, jpg, jpeg)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    if (image.length >= 4) {
      toast.error("Maximum 4 images can be uploaded");
      return;
    }

    setImage((prev) => [...prev, file]);

    const reader = new FileReader(file);
    reader.onloadend = () => {
      setImagePreview((prev) => [...prev, reader.result]);
    };
    reader.readAsDataURL(file);
  };

  const handleForm = (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (text) {
      formData.append("text", text);
    }
    if (image.length > 0) {
      formData.append("image", image);
    }
    if (documents.length > 0) {
      formData.append("documents", documents);
    }

    // for (const entry of formData.entries()) {
    //   console.log(entry[0], entry[1], "data");
    // }

    dispatch(sendMessege({ formData, currentConversation }));
    setText("");
    setImage("");
  };

  if (currentConversation === null) {
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
          <section className="flex overflow-x-auto no-scrollbar max-h-[200px]">
            {imagePreview &&
              imagePreview.map((imagePrev, index) => {
                return (
                  <div className="mx-3 flex">
                    <img
                      src={imagePrev}
                      className="w-full max-w-[120px] mb-3"
                      alt="Attachment"
                    />
                    <p
                      className="bg-gray-800 h-5 p-2 flex justify-center items-center mx-[-24px] my-[5px] rounded-full text-sm cursor-pointer"
                      onClick={() => {
                        imagePreview.splice(index, 1);
                        image.splice(index, 1);
                        setImagePreview([...imagePreview]);
                        setImage([...image]);
                      }}
                    >
                      x
                    </p>
                  </div>
                );
              })}
          </section>

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
