import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import peopleReducer from "../features/people/slice";
import filmsReducer from "../features/film/slice";

export const store = configureStore({
  reducer: {
    people: peopleReducer,
    films: filmsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
