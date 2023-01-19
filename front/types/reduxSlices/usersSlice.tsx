import type { SerializedError } from "@reduxjs/toolkit";

export enum ELoadingState {
  IDLE = "idle",
  LOADING = "loading",
}

export type TUser = {
  firstName: string | undefined;
  lastName?: string | undefined;
  email: string | undefined;
  password: string | undefined;
  passwordConfirm?: string | undefined;
  job?: string | undefined;
  birthDate?: Date | string | undefined;
  age?: number | string | undefined;
  gender?: string | "male" | "female";
  isAdmin?: boolean | undefined;
};


export type TUsersSliceState = {
  users: TUser[];
  loading: ELoadingState;
  error: null | unknown | any;
};
