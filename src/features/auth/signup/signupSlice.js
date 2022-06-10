import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import signupService from "./signupService";

const initialState = {
  user: null,
  isLoading: false,
  isSucccess: false,
  isError: false,
  message: "",
};

// sign up user
export const signUp = createAsyncThunk("/signup", async (user, thunkAPI) => {
  try {
    return await signupService.signUp(user);
  } catch (err) {
    const message =
      (err.response && err.response.data && err.response.data.message) ||
      err.message ||
      err.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSucccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucccess = true;
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.message = action.payload;
      });
  },
});

export const { reset } = signupSlice.actions;
export default signupSlice.reducer;
