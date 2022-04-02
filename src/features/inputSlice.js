import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  password: "",
};

export const inputSlice = createSlice({
  name: "input",
  initialState,
  reducers: {
    changeName: (state, action) => {
      state.name = action.payload;
    },
    changePassword: (state, action) => {
      state.password = action.payload;
    },
    changeEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { changeName, changePassword, changeEmail } = inputSlice.actions;

export default inputSlice.reducer;
