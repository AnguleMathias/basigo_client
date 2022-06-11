import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import leadsService from "./leadsService";

const initialState = {
  leads: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// get lead by id
export const getLeadById = createAsyncThunk("/leads", async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().login.user.token;
    return await leadsService.getLeadById(id, token);
  } catch (err) {
    const message =
      (err.response && err.response.data && err.response.data.message) ||
      err.message ||
      err.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const leadsSlice = createSlice({
  name: "getLeadById",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeadById.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(getLeadById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.leads = action.payload;
      })
      .addCase(getLeadById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = leadsSlice.actions;
export default leadsSlice.reducer;
