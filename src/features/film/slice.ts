import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiStatus, State } from "../../models/api";
import { fetchFilm } from "./thunks";
import { SwapiFilms } from "./models";

const initialState: State<SwapiFilms> = {
  status: ApiStatus.Idle,
  data: {
    requestId: null,
    films: [],
  },
  error: undefined,
};

const slice = createSlice({
  name: "film",
  initialState,
  reducers: {
    // setRequestId to get the newest request
    setRequestId(state, action: PayloadAction<number>) {
      state.data = {
        ...state.data,
        requestId: action.payload,
        films: state.data?.films || [],
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilm.pending, (state) => {
        state.status = ApiStatus.Pending;
      })
      .addCase(fetchFilm.fulfilled, (state, action) => {
        // check race condition to prevent getting wrong data
        if (state.data?.requestId === action.payload?.requestId) {
          state.status = ApiStatus.Resolved;
          state.data = action.payload;
        }
      })
      .addCase(fetchFilm.rejected, (state, action) => {
        state.status = ApiStatus.Rejected;
        state.error = action.payload;
      });
  },
});

export const { setRequestId } = slice.actions;

export default slice.reducer;
