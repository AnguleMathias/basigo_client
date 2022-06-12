import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customersService from "./customersService";

const initialState = {
  customers: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// get all customers
export const getCustomers = createAsyncThunk(
  "/customers",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().login.user.token;
      return await customersService.getAllLeadCustomers(token);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const customersSlice = createSlice({
  name: "getCustomers",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCustomers.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.customers = action.payload;
      })
      .addCase(getCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = customersSlice.actions;
export default customersSlice.reducer;
