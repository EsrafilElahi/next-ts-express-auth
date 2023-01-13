import type { SerializedError } from "@reduxjs/toolkit";

export enum ELoadingState {
  IDLE = "idle",
  LOADING = "loading",
}

export type TUserRegister = {
  firstName: string | undefined;
  lastName?: string | undefined;
  email: string | undefined;
  password: string | undefined;
  passwordConfirm?: string | undefined;
  job?: string | undefined;
  birthDate?: string | undefined;
  age?: number | string | undefined;
  gender?: string | "male" | "female";
  isAdmin?: boolean | undefined;
};

export type TUserLogin = {
  email: string;
  password: string;
};

export type TAuthSliceState = {
  accessToken: string | null,
  refreshToken: string | null,
  isLoggedIn: boolean,
  me: TUserRegister | null;
  loading: ELoadingState;
  error: null | unknown;
};


