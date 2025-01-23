import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  type: "default",
  flag: false,
};

const alterSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (state, action) => {
      state.flag = !state.flag;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
  },
});

export const { showAlert } = alterSlice.actions;

export default alterSlice.reducer;
