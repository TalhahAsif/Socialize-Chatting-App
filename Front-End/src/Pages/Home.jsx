import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessages, getUsers } from "../Slices/messegeSlice";
import UserChat from "../Component/userChat";
import ChatComp from "../Component/ChatComp";

const Home = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.messegedata.users);
  const messeges = useSelector((state) => state.messegedata.messeges);

  // const state = useSelector((state) => state.messegedata);
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const handleChat = (id) => {
    dispatch(getMessages(id));
  };

  useEffect(() => {
    // console.log(messeges);
  }, [handleChat]);

  return (
    <section className="flex flex-grow h-[90%]">
      <div className="w-1/4 flex flex-col gap-3 p-4 overflow-auto">
        {users?.user?.map((data) => (
          <div
            key={data._id}
            onClick={() => handleChat(data._id)}
            className="p-2 cursor-pointer rounded-lg transition"
          >
            <UserChat data={data} />
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-end w-3/4 p-4 rounded-l-md bordershadow-lg">
        <ChatComp />
      </div>
    </section>
  );
};

export default Home;
