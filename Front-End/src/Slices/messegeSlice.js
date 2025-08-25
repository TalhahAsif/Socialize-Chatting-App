import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../lib/axios";

const initialState = {
  users: {},
  currentConversation: null,
  messeges: [],
  loading: false,
};


export const getUsers = createAsyncThunk("messege/users", async () => {
  try {
    const res = await axiosInstance.get("/messeges/users");
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const getMessages = createAsyncThunk("messeges/getMessage", async (conversation) => {
  console.log(conversation, "conversation")
  try {
    const res = await axiosInstance.get(`/messeges/getMessage/${conversation._id}`);
    res.data.currentConversation = conversation;
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const sendMessege = createAsyncThunk(
  "messeges/sendMessage",
  async ({ message, currentConversation }) => {
    console.log(message, "message")
    console.log(currentConversation, "currentConversation")
    return
    try {
      const res = await axiosInstance.post(
        `/messeges/sendMessage/${selectedUser._id}`,
        message
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

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
    builder
      .addCase(getMessages.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        console.log("action.payload", action.payload)
        state.loading = false;
        state.messeges = action.payload.chat;
        state.currentConversation = action.payload.currentConversation;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.loading = false;
      });
    builder
      .addCase(sendMessege.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(sendMessege.fulfilled, (state, action) => {
        state.messeges = [...state.messeges, action.payload.newMessage];
        state.loading = false;
      })
      .addCase(sendMessege.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default messegeSlice.reducer;
