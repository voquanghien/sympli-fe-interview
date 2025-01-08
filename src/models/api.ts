export enum ApiStatus {
  Idle,
  Pending,
  Resolved,
  Rejected,
}

export type State<T> = {
  status: ApiStatus;
  data?: T;
  error?: Error;
};
