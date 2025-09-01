import React from "react";
import { useSelector } from "react-redux";

const Messeges = () => {
  const messege = useSelector((state) => state.messegedata?.messeges);
  const currentConversation = useSelector(
    (state) => state.messegedata.currentConversation
  );
  const authUser = useSelector((state) => state.authdata.user);

  return (
    <div className="flex flex-col gap-4 overflow-auto">
      {messege?.map((data) => {
        return (
          <div
            key={data._id}
            className={`chat ${
              data.createdBy == authUser?._id ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-image avatar">
              <div className="w-7 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src={
                    data?.createdBy == authUser?._id
                      ? authUser?.profileImg
                      : currentConversation?.members[0]?.profileImg
                  }
                />
              </div>
            </div>
            <div className="chat-header">
              <time className="text-xs opacity-50">12:45</time>
            </div>
            <div
              className={`chat-bubble text-sm ${
                data.createdBy == authUser?._id && "bg-blue-600 text-black"
              }`}
            >
              <section className="flex gap-2 mb-2">
                {data.images &&
                  data.images.map((img, index) => (
                    <img src={img.url} alt="" className="w-24 rounded-lg" />
                  ))}
              </section>

              {data?.text}
            </div>
            <div className="chat-footer opacity-50 text-xs">Delivered</div>
          </div>
        );
      })}
    </div>
  );
};

export default Messeges;
