import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../lib/axios";
import axios from "axios";
import { toast } from "sonner";

const initialState = {
  user: [],
  checkingAuth: true,
  loading: false,
  error: null,
};

export const checkAuthFunc = createAsyncThunk("auth/checkAuth", async () => {
  try {
    const res = await axiosInstance.get("/auth/checkAuth");
    return res.data;
  } catch (error) {
    console.log(error);
    
  }
});

export const registerUser = createAsyncThunk("auth/signup", async (data) => {
  try {
    const res = await axiosInstance.post("/auth/signup", data);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
});

export const loginUser = createAsyncThunk("auth/login", async (data) => {
  try {
    const res = await axiosInstance.post("/auth/login", data);
    toast.success(error.response.data.message);
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    const res = await axiosInstance.post("/auth/logout");
    toast.success(error.response.data.message);
    return res;
  } catch (error) {
    toast.error(error.response.data.message);
    // return rejectWithValue(error.response.data);
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
        console.log(action);
      });
    ////login
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
      });
    ////Logout
    builder
      .addCase(logout.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

// export const { checkAuthFunc } = userSlice.actions;

export default userSlice.reducer;
