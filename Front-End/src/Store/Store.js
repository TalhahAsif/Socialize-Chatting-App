import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Slices/usersSlice.js";

export const store = configureStore({
  reducer: authReducer,
});
