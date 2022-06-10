import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import loginService from "./loginService";

// get user from local storage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isLoading: false,
  isSucccess: false,
  isError: false,
  message: "",
};

// login user
export const login = createAsyncThunk("/login", async (user, thunkAPI) => {
  try {
    return await loginService.login(user);
  } catch (err) {
    const message =
      (err.response && err.response.data && err.response.data.message) ||
      err.message ||
      err.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

// logout user
export const logout = createAsyncThunk("/logout", async () => {
  await loginService.logout();
});

export const loginSlice = createSlice({
  name: "login",
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
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.message = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = loginSlice.actions;
export default loginSlice.reducer;
