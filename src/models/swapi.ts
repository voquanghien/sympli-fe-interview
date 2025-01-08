export type SwapiResourceUrl = string;

export interface SwapiResource {
  url: SwapiResourceUrl;
}

export interface PagedResults<T> {
  count: number;
  next?: string;
  previous: string;
  results: T[];
}

export interface SwapiFilm extends SwapiResource {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
}

export interface SwapiPerson extends SwapiResource {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  films: SwapiResourceUrl[];
}
