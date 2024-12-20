import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessages, getUsers } from "../Slices/messegeSlice";
import UserChat from "../Component/userChat";
import ChatComp from "../Component/ChatComp";

const Home = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.messegedata.users);
  const messeges = useSelector((state) => state.messeges);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const handleChat = (id) => {
    dispatch(getMessages(id));
  };

  return (
    <>
      <section className="flex h-screen">
        <div className="w-1/4 flex flex-col gap-3 p-4">
          {users?.user?.map((data) => {
            return (
              <div key={data._id} onClick={() => handleChat(data._id)}>
                {console.log(data._id)}
                <UserChat data={data} />
              </div>
            );
          })}
        </div>
        <div className="w-4/5 rounded-l-md border p-4">
          <ChatComp />
        </div>
      </section>
    </>
  );
};

export default Home;
