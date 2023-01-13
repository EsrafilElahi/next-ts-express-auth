import { createAsyncThunk, createSlice, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import axios from "utils/axios";
// import type { PayloadAction, SerializedError, Draft } from "@reduxjs/toolkit";
import { TAuthSliceState, ELoadingState, TUserRegister, TUserLogin } from "types/reduxSlices/suthSlice";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data: TUserRegister, thunkAPI) => {
    try {
      const res = await axios.post("/auth/register", { data });
      return res;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userLoginData: TUserLogin, thunkAPI) => {
    try {
      const res = await axios.post("/auth/login", { userLoginData });
      localStorage.setItem("refreshToken", res.data.refreshToken)
      localStorage.setItem("accessToken", res.data.accessToken)
      return res;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

const internalInitialState: TAuthSliceState = {
  // firstName: null,
  // lastName: null,
  // email: null,
  // password: null,
  // job: null,
  // age: null,
  // gender: null,
  // birthDate: null,
  // isAdmin: null,
  accessToken: null,
  refreshToken: null,
  isLoggedIn: false,
  me: null,
  loading: ELoadingState.IDLE,
  error: null,
};

// createSlice
export const authSlice = createSlice({
  name: "auth",
  initialState: internalInitialState,
  reducers: {
    reset: () => internalInitialState,
  },
  extraReducers: (builder: ActionReducerMapBuilder<TAuthSliceState>) => {
    // registerUser
    builder.addCase(registerUser.pending, (state, action) => {
      state.loading = ELoadingState.LOADING;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = ELoadingState.IDLE;
      state.error = action.error.message
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = ELoadingState.IDLE;
      state.me = action.payload.data
    })

    // loginUser
    builder.addCase(loginUser.pending, (state) => {
      state.loading = ELoadingState.LOADING;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = ELoadingState.IDLE;
      state.error = action.error.message;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = ELoadingState.IDLE;
      state.accessToken = action?.payload?.data?.accessToken;
      state.refreshToken = action?.payload?.data?.refreshToken;
      state.isLoggedIn = true;
    });
  },
});

// Actions generated automatically by createSlice function
export const { reset } = authSlice.actions;
