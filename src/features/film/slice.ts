import { createSlice } from "@reduxjs/toolkit";
import { ApiStatus, State } from "../../models/api";
import { SwapiFilm } from "../../models/swapi";
import { fetchFilm } from "./thunks";

const initialState: State<SwapiFilm[]> = {
  status: ApiStatus.Idle,
  data: [],
  error: undefined,
};

const slice = createSlice({
  name: "film",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilm.pending, (state) => {
        state.status = ApiStatus.Pending;
      })
      .addCase(fetchFilm.fulfilled, (state, action) => {
        state.status = ApiStatus.Resolved;
        state.data = action.payload;
      })
      .addCase(fetchFilm.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default slice.reducer;
