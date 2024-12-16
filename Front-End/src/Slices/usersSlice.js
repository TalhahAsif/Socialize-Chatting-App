import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../lib/axios";
import axios from "axios";

const initialState = {
  user: [],
  checkingAuth: true,
  loading: true,
};

export default const checkAuthFunc = createAsyncThunk("auth/checkAuth", async () => {
  try {
    const res = axios.get("http://localhost:5050/api/auth/checkAuth");
    return res;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const userSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    ////checking Auth
    builder.addCase(checkAuthFunc.pending, (state, action) => {
      state.checkingAuth = true;
    });
    builder.addCase(checkAuthFunc.fulfilled, (state, action) => {
      state.checkingAuth = false;
      state.user = action.payload;
    });
    builder.addCase(checkAuthFunc.rejected, (state, action) => {
      state.checkingAuth = false;
      state.user = null;
    });
  },
});

export default userSlice.reducer;
