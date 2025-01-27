import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: null,
    email: null,
    name: null,
  },
  token: null,
  isGuest: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isGuest = false;
    },
    removeUser: (state) => {
      state.user = {
        id: null,
        email: null,
        name: null,
      };
      state.token = null;
      state.isGuest = false;
      localStorage.clear();
    },
    setGuest: (state) => {
      state.isGuest = true;
      state.user.name = "Guest";
    },
  },
});

export const { setUser, removeUser, setGuest } = authSlice.actions;

export default authSlice.reducer;
