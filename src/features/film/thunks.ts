import { createAsyncThunk } from "@reduxjs/toolkit";
import { SwapiPerson } from "../../models/swapi";

// TODO implement fetchFilm (utilize http utility)
export const fetchFilm = createAsyncThunk<
  //
  unknown,
  SwapiPerson,
  { rejectValue: Error }
>(`film/fetchFilm`, async () => {
  return Promise.resolve([]);
});
