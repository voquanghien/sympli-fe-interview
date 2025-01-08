import { createAsyncThunk } from "@reduxjs/toolkit";
import { SwapiPeople } from "./models";
import http from "../../utils/http";

// implement fetchPeople (utilize http utility)
export const fetchPeople = createAsyncThunk<
  SwapiPeople,
  number,
  { rejectValue: Error }
>(`people/fetchPeople`, async (pageNumber, { rejectWithValue }) => {
  try {
    const response = await http.get(
      `/mocks/people/page_${pageNumber + 1}.json`
    );
    return response;
  } catch (err) {
    return rejectWithValue({
      message: err instanceof Error ? err.message : "Something went wrong",
      name: "Error",
    });
  }
});
