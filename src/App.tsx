import React from "react";
import SwapiPeopleTable from "./components/SwapiPeopleTable";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { fetchPeople } from "./features/people/thunks";
import { fetchFilm } from "./features/film/thunks";
import Loader from "./components/Loader";
import { SwapiPerson } from "./models/swapi";
import SwapiPersonDetailPaper from "./components/SwapiPersonDetailPaper";
import Switch from "@mui/material/Switch";
import "./App.css";

const App = () => {
  const dispatch = useAppDispatch();
  const people = useAppSelector((store) => store.people);
  const films = useAppSelector((store) => store.films);

  // TODO implement fetching mechanism, page change and row click logic
  const handlePageChange = (pageNumber: number) => {};

  const handleOnRowClick = (person: SwapiPerson) => {};

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
              event: React.ChangeEvent<HTMLInputElement>,
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
              event: React.ChangeEvent<HTMLInputElement>,
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
          /* TODO implement logic to display correct data */
          <SwapiPeopleTable
            //
            rows={[]}
            onPageChange={handlePageChange}
            onRowClick={handleOnRowClick}
            page={1}
          />
        )}
      </Loader>

      <SwapiPersonDetailPaper //
        name={""}
        birthYear={""}
        gender={""}
        films={[]}
      />
    </div>
  );
};

export default App;
