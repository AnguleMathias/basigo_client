import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import leadsService from "./leadsService";

const initialState = {
  leads: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// get all Leads
export const getLeads = createAsyncThunk("/leads", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().login.user.token;
    return await leadsService.getLeads(token);
  } catch (err) {
    const message =
      (err.response && err.response.data && err.response.data.message) ||
      err.message ||
      err.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const leadsSlice = createSlice({
  name: "getLeads",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeads.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(getLeads.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.leads = action.payload.leads;
      })
      .addCase(getLeads.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = leadsSlice.actions;
export default leadsSlice.reducer;
