import { createAsyncThunk } from "@reduxjs/toolkit";
import { SwapiFilm, SwapiPerson } from "../../models/swapi";
import http from "../../utils/http";

// TODO implement fetchFilm (utilize http utility)
export const fetchFilm = createAsyncThunk<
  SwapiFilm[],
  SwapiPerson,
  { rejectValue: Error }
>(`film/fetchFilm`, async (person, { rejectWithValue }) => {
  const filmUrls = person.films;
  try {
    const response = await Promise.allSettled(filmUrls.map((e) => http.get(e)));
    return response.filter((e) => e.status === "fulfilled").map((t) => t.value);
  } catch (err) {
    return rejectWithValue({
      message: err instanceof Error ? err.message : "Something went wrong",
      name: "Error",
    });
  }
});
