import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../Slices/messegeSlice";
import UserChat from "../Component/userChat";

const Home = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.messegedata.users);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <>
      <section className="flex h-screen">
        <div className="w-1/5 flex flex-col gap-3 p-4">
          {users?.user?.map((data) => {
            return (
              <div key={data._id}>
                <UserChat data={data} />
              </div>
            );
          })}
        </div>
        <div className="w-4/5 rounded-l-md bg-gray-400 p-4"></div>
      </section>
    </>
  );
};

export default Home;
