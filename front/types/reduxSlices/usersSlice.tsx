
export enum ELoadingState {
  IDLE = "idle",
  LOADING = "loading",
}

export type TUser = {
  firstName: string | undefined;
  lastName?: string | undefined;
  email: string | undefined;
  _id?: string | undefined;
  job?: string | undefined;
  birthDate?: Date | string | undefined;
  age?: number | string | undefined;
  gender?: string | "male" | "female";
  isAdmin?: boolean | undefined;
};


export type TUsersSliceState = {
  user: null | TUser;
  users: TUser[];
  loading: ELoadingState;
  error: null | unknown | any;
};

export type TDataUsers = {
  msg: "string",
  count?: number,
  totalPages?: number | undefined | any,
  users?: TUser | TUser[] | any
  user?: TUser
}