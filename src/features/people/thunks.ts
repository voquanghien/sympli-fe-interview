import { createAsyncThunk } from "@reduxjs/toolkit";
import { SwapiPeople } from "./models";

// TODO implement fetchPeople (utilize http utility)
export const fetchPeople = createAsyncThunk<
  //
  SwapiPeople,
  number,
  { rejectValue: Error }
>(`people/fetchPeople`, async (pageNumber, { rejectWithValue }) => {
  return Promise.resolve({
    count: 0,
    next: "",
    previous: "",
    results: [],
  });
});
