import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customersService from "./customersService";

const initialState = {
  customers: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// get all Leads
export const getAllLeadCustomers = createAsyncThunk(
  "/customer",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().login.user.token;
      return await customersService.getAllLeadCustomers(id, token);
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
  name: "getAllLeadCustomers",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllLeadCustomers.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllLeadCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.customers = action.payload;
      })
      .addCase(getAllLeadCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = customersSlice.actions;
export default customersSlice.reducer;
