import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customersService from "./customersService";

const initialState = {
  customers: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// create new customer
export const createCustomer = createAsyncThunk(
  "/customer",
  async (customerData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().login.user.token;
      return await customersService.createCustomer(customerData, token);
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
  name: "customer",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.customers.push(action.payload);
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = customersSlice.actions;
export default customersSlice.reducer;
