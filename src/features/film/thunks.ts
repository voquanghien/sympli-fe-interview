import { createAsyncThunk } from "@reduxjs/toolkit";
import { SwapiPerson } from "../../models/swapi";
import http from "../../utils/http";
import { SwapiFilms } from "./models";
import { setRequestId } from "./slice";

// implement fetchFilm (utilize http utility)
export const fetchFilm = createAsyncThunk<
  SwapiFilms,
  SwapiPerson,
  { rejectValue: Error }
>(`film/fetchFilm`, async (person, { dispatch, rejectWithValue }) => {
  const filmUrls = person.films;
  try {
    const requestId = Date.now(); // Use timestamp or a unique ID for each request
    dispatch(setRequestId(requestId));

    // fetch multiple films from person so use allSettled to get `fulfilled` data
    const response = await Promise.allSettled(filmUrls.map((e) => http.get(e)));

    return {
      requestId,
      films: response
        .filter((e) => e.status === "fulfilled")
        .map((t) => t.value),
    };
  } catch (err) {
    return rejectWithValue({
      message: err instanceof Error ? err.message : "Something went wrong",
      name: "Error",
    });
  }
});
