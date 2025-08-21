import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { set } from "zod";
import { createConversation, findUser } from "../Slices/conversation.Slice";
import { clearSearchedUser } from "../Slices/conversation.Slice";

const CreateConverversationBtn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { searchLoading, searchedUser } = useSelector(
    (state) => state.conversationData
  );
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(findUser(search));
  };

  const handlecreateConversation = (id) => {
    dispatch(createConversation(id));
  };

  return (
    <section>
      {/* Create Conversation Button */}
      <div
        className="flex items-center justify-center gap-2 p-2 my-3 mx-4 rounded-lg bg-gray-800 text-white shadow-md hover:shadow-2xl transition-shadow duration-200 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        Create Conversation
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-gray-900 rounded-lg shadow-lg w-[60%] h-fit p-6 transform transition-all duration-300 ease-out opacity-100 scale-100 translate-y-0"
            onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside
          >
            <h3 className="font-bold text-lg">Search User</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Search by username or email"
                className="input input-bordered input-accent w-full mt-4"
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="flex justify-end mt-10 gap-3">
                <div
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
                  onClick={() => {
                    setIsOpen(false);
                    dispatch(clearSearchedUser());
                    setSearch("");
                  }}
                >
                  Close
                </div>
                <button
                  disabled={searchLoading || search.length === 0}
                  className={`px-4 py-2 bg-gray-800 text-white rounded-lg ${
                    search.length > 0
                      ? "hover:bg-gray-700"
                      : " bg-gray-800 cursor-not-allowed"
                  } transition flex justify-center item-center`}
                  type="submit"
                >
                  {searchLoading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "find"
                  )}
                </button>
              </div>
            </form>
            <section>
              {searchedUser &&
                searchedUser.map((user) => (
                  <section
                    key={user._id}
                    className="flex justify-between items-center mt-4 p-2 bg-gray-900 rounded-lg border border-gray-700 hover:bg-gray-800 cursor-pointer"
                  >
                    <div className="flex gap-4 items-center ">
                      <img
                        className="w-10 h-10 rounded-full object-cover"
                        src={user.profileImg}
                        alt="Profile"
                      />
                      <div className="">
                        <p className="text-white font-bold">{user.username}</p>
                        <p className="text-white text-sm mt-1 text-xs">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handlecreateConversation(user._id)}
                      className="btn btn-primary btn-sm"
                    >
                      Start Chat
                    </button>
                  </section>
                ))}
            </section>
          </div>
        </div>
      )}
    </section>
  );
};

export default CreateConverversationBtn;
