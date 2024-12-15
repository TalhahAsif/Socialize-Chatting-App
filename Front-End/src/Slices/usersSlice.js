import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  loading: true,
};

const userSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.users = action.payload;
      state.loading = false;
    },
    logout: (state, action) => {
      state.users = nul;
    },
    setloading: (state, action) => {
      state.loading = !state.loading;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
