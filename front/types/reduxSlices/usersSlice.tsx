import type { SerializedError } from "@reduxjs/toolkit";

export enum ELoadingState {
  IDLE = "idle",
  LOADING = "loading",
}

export type TUser = {
  firstName: string | undefined;
  lastName?: string | undefined;
  email: string | undefined;
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
  count: number,
  totalPages: number,
  users: TUser[]
}