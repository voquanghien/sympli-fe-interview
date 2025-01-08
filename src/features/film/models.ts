import { SwapiFilm } from "../../models/swapi";

export type SwapiFilms = {
  requestId: number | null;
  films: SwapiFilm[];
};
