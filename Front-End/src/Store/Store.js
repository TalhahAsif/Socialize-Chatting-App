import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Slices/usersSlice.js";
import messegeReducer from "../Slices/messegeSlice.js";

export const store = configureStore({
  reducer: { authdata: authReducer, messegedata: messegeReducer },
});
