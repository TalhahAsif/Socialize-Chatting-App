import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Slices/usersSlice.js";
import messegeReducer from "../Slices/messegeSlice.js";
import conversationReducer from "../Slices/conversation.Slice.js";
import socketReducer from "../Slices/socket.Slice.js";

export const store = configureStore({
  reducer: { authdata: authReducer, messegedata: messegeReducer, conversationData: conversationReducer, socketData: socketReducer },
});
