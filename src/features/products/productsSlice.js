import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productsService from "./productsService";

const initialState = {
  products: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// get all Leads
export const getProducts = createAsyncThunk(
  "/products",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().login.user.token;
      return await productsService.getProducts(token);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const productsSlice = createSlice({
  name: "getProducts",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = productsSlice.actions;
export default productsSlice.reducer;
