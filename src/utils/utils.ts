import { SwapiPerson } from "../models/swapi";

// compare two person objects
// can add more properties to compare if needed
export const comparePerson = (p1: SwapiPerson, p2?: SwapiPerson) => {
  return (
    p1 &&
    p2 &&
    p1.name === p2.name &&
    p1.films === p2.films &&
    p1.mass === p2.mass
  );
};
