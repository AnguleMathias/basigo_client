import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import logoutService from "./logoutService";

const initialState = {
  user: null,
};

export const logout = createAsyncThunk("/logout", async () => {
  //   await logoutService.logout();

  localStorage.removeItem("user");
});

export const logoutSlice = createSlice({
  name: "logout",
  initialState,
  reducers: {
    reset: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
    });
  },
});

export const { reset } = logoutSlice.actions;
export default logoutSlice.reducer;
