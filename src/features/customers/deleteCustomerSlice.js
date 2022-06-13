import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customersService from "./customersService";

const initialState = {
  customers: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// delete lead
export const deleteCustomer = createAsyncThunk(
  "/customer",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().login.user.token;
      return await customersService.deleteCustomer(id, token);
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
  name: "deleteCustomer",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteCustomer.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.customers = state.customers[0].filter(
          (customer) => customer.id !== action.payload.id
        );
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = customersSlice.actions;
export default customersSlice.reducer;
