import React from "react";
import { ApiStatus } from "../models/api";

type LoaderProps = {
  status: ApiStatus;
  error?: Error;
};

const Loader = (props: React.PropsWithChildren<LoaderProps>): JSX.Element => {
  const load = (): JSX.Element => {
    switch (props.status) {
      case ApiStatus.Idle:
        return <p>No data</p>;
      case ApiStatus.Pending:
        return <p>Loading...</p>;
      case ApiStatus.Resolved:
        return <>{props.children}</>;
      case ApiStatus.Rejected:
        return <p>{props.error?.message}</p>;
    }
  };

  return <div className="App-loader">{load()}</div>;
};

export default Loader;
