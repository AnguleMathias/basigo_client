import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import leadsService from "./leadsService";

const initialState = {
  leads: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// create new Lead
export const createLead = createAsyncThunk(
  "/leads",
  async (leadData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().login.user.token;
      return await leadsService.createLead(leadData, token);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const leadsSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createLead.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createLead.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.leads.push(action.payload);
      })
      .addCase(createLead.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = leadsSlice.actions;
export default leadsSlice.reducer;
