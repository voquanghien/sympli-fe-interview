import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { fetchPeople } from "./features/people/thunks";
import { fetchFilm } from "./features/film/thunks";
import { SwapiPerson } from "./models/swapi";
import { ApiStatus } from "./models/api";
import Switch from "@mui/material/Switch";
import Loader from "./components/Loader";
import SwapiPeopleTable from "./components/SwapiPeopleTable";
import SwapiPersonDetailPaper from "./components/SwapiPersonDetailPaper";
import "./App.css";

const App = () => {
  const dispatch = useAppDispatch();
  const people = useAppSelector((store) => store.people);
  const films = useAppSelector((store) => store.films);

  // useState
  const [page, setPage] = useState<number>(0);
  const [person, setPerson] = useState<SwapiPerson | undefined>(undefined);

  // implement fetching mechanism, page change and row click logic
  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
    setPerson(undefined); // reset selected person
    dispatch(fetchPeople(pageNumber));
  };

  const handleOnRowClick = (person: SwapiPerson) => {
    setPerson(person);
  };

  // useEffect for first load
  useEffect(() => {
    setPerson(undefined); // reset selected person
    dispatch(fetchPeople(0)); // start with page 0
  }, [dispatch]);

  // useEffect for selected person change
  useEffect(() => {
    if (person) {
      dispatch(fetchFilm(person));
    }
  }, [person, dispatch]);

  return (
    <div className="App">
      <header className="App-header">
        <img
          src="https://www.sympli.com.au/wp-content/uploads/sympli-logo-black.svg"
          className="App-logo"
          alt="logo"
        />
        <label>
          Throttle requests
          <Switch
            onChange={(
              _event: React.ChangeEvent<HTMLInputElement>,
              checked: boolean
            ) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (window as any)["APPLY_THROTTLE"] = checked;
            }}
          />
        </label>
        <label>
          Simulate errors
          <Switch
            onChange={(
              _event: React.ChangeEvent<HTMLInputElement>,
              checked: boolean
            ) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (window as any)["SIMULATE_ERRORS"] = checked;
            }}
          />
        </label>
      </header>
      <Loader status={people.status} error={people.error}>
        {people.data && (
          /* implement logic to display correct data */
          <SwapiPeopleTable
            //
            selectedRow={person}
            rows={
              people.status === ApiStatus.Resolved ? people.data.results : []
            }
            count={people.status === ApiStatus.Resolved ? people.data.count : 0}
            onPageChange={handlePageChange}
            onRowClick={handleOnRowClick}
            page={page}
          />
        )}
      </Loader>

      {/* only show person info if person existed */}
      {person ? (
        <SwapiPersonDetailPaper //
          name={person.name}
          birthYear={person.birth_year}
          gender={person.gender}
          films={
            films?.status === ApiStatus.Resolved
              ? // sort film title by alphabet
                films?.data?.films
                  ?.map((e) => e.title)
                  .sort((a, b) =>
                    a.toLowerCase().localeCompare(b.toLowerCase())
                  ) || []
              : []
          }
        />
      ) : null}
    </div>
  );
};

export default App;
