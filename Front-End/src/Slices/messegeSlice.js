import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../lib/axios";

const initialState = {
  messeges: [],
  users: [],
  loading: false,
};

export const getUsers = createAsyncThunk("messege/users", async () => {
  try {
    const res = await axiosInstance("/messeges/users");
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

const messegeSlice = createSlice({
  name: "messege",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default messegeSlice.reducer;
