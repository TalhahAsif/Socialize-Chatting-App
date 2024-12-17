import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../lib/axios";
import axios from "axios";

const initialState = {
  user: [],
  checkingAuth: true,
  loading: true,
  error: null,
};

export const checkAuthFunc = createAsyncThunk("auth/checkAuth", async () => {
  try {
    const res = await axiosInstance.get("/auth/checkAuth");
    return res;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const registerUser = createAsyncThunk("auth/signup", async (data) => {
  console.log("yaha tak nhi chal raha ", data);
  try {
    const res = await axiosInstance.post("/auth/signup", data);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
});

const userSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    ////checking Auth
    builder
      .addCase(checkAuthFunc.pending, (state, action) => {
        state.checkingAuth = true;
      })
      .addCase(checkAuthFunc.fulfilled, (state, action) => {
        state.checkingAuth = false;
        state.user = action.payload;
        console.log(action.payload);
      })
      .addCase(checkAuthFunc.rejected, (state, action) => {
        state.checkingAuth = false;
        state.user = action.payload;
      });
    //// register
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// export const { checkAuthFunc } = userSlice.actions;

export default userSlice.reducer;
