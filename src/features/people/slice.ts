import { createSlice } from "@reduxjs/toolkit";
import { ApiStatus, State } from "../../models/api";
import { SwapiPeople } from "./models";
import { fetchPeople } from "./thunks";

const initialState: State<SwapiPeople> = {
  status: ApiStatus.Idle,

  data: undefined,
  error: undefined,
};

const slice = createSlice({
  name: "people",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPeople.pending, (state) => {
        state.status = ApiStatus.Pending;
      })
      .addCase(fetchPeople.fulfilled, (state, action) => {
        state.status = ApiStatus.Resolved;
        state.data = action.payload;
      })
      .addCase(fetchPeople.rejected, (state, action) => {
        state.status = ApiStatus.Rejected;
        state.error = action.payload;
      });
  },
});

export default slice.reducer;
