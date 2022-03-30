import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  url: "",
  faceBox: [],
};

export const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    showPhoto: (state, action) => {
      state.url = action.payload;
    },

    showFaceBox: (state, action) => {
      state.faceBox.push(action.payload);
    },

    clearPhoto: (state, action) => {
      state.url = "";
      state.faceBox = [];
    },
  },
});
export const { showPhoto, showFaceBox, clearPhoto } = photoSlice.actions;

export default photoSlice.reducer;
