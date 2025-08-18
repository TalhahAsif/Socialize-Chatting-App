import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessages, getUsers } from "../Slices/messegeSlice";
import UserChat from "../Component/userChat";
import ChatComp from "../Component/ChatComp";
import { Contact } from "lucide-react";
import CreateConverversationBtn from "../Component/CreateConverversationBtn";
import { getConversations } from "../Slices/conversation.Slice";

const Home = () => {
  const dispatch = useDispatch();

  // const messeges = useSelector((state) => state.messegedata);
  const users = useSelector((state) => state.messegedata.users);
  const selecteduser = useSelector((state) => state.messegedata.selectedUser);
  const conversations = useSelector(
    (state) => state.conversationData.conversations
  );

  console.log(conversations, "conversations");

  useEffect(() => {
    dispatch(getConversations());
  }, []);

  const handleChat = (id) => {
    dispatch(getMessages(id));
  };

  return (
    <section className="flex flex-grow h-[90%]">
      <div className={`w-1/4 flex flex-col overflow-auto no-scrollbar`}>
        <CreateConverversationBtn />
        <div className="flex items-center mx-4 gap-3 my-2">
          <Contact />
          <p>Contacts</p>
        </div>
        {conversations?.map((data) => (
          <div
            key={data._id}
            onClick={() => {
              // console.log("data", data);
              handleChat(data);
            }}
            className="p-1 cursor-pointer rounded-lg transition"
          >
            <UserChat data={data} />
          </div>
        ))}
      </div>
      <div className="flex flex-col w-3/4 rounded-l-md bordershadow-lg">
        <ChatComp />
      </div>
    </section>
  );
};

export default Home;
