import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import leadsService from "./leadsService";

const initialState = {
  leads: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// delete lead
export const deleteLead = createAsyncThunk("/leads", async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().login.user.token;
    return await leadsService.deleteLead(id, token);
  } catch (err) {
    const message =
      (err.response && err.response.data && err.response.data.message) ||
      err.message ||
      err.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const leadsSlice = createSlice({
  name: "deleteLead",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteLead.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteLead.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.leads = state.leads[0].filter(
          (lead) => lead.id !== action.payload.id
        );
      })
      .addCase(deleteLead.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = leadsSlice.actions;
export default leadsSlice.reducer;
