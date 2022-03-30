import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userAPI from "./userAPI";

export const userSignin = createAsyncThunk(
  "user/signin",
  async (userInput, thunkAPI) => {
    if (userInput.name) {
      const response = await userAPI.post("/register", userInput);
      return await response.json();
    } else {
      const response = await userAPI.post("/signin", userInput);
      return await response.json();
    }
  }
);

const initialState = {
  value: {
    id: "",
    name: "",
    password: "",
    email: "",
    entries: 0,
    joined: "",
  },
  status: "logout",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userSignout: (state) => {
      state.value = initialState.value;
      state.status = initialState.status;
    },

    entriesUpdate: (state, action) => {
      state.value.entries = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userSignin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userSignin.fulfilled, (state, action) => {
        state.status = "login";
        state.value = action.payload;
      })
      .addCase(userSignin.rejected, (state, action) => {
        state.status = "fail";
      });
  },
});

export const { userSignout, entriesUpdate } = userSlice.actions;

export default userSlice.reducer;
