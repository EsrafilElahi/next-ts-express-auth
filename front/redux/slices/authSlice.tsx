import { createAsyncThunk, createSlice, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import axios from "utils/axios";
// import type { PayloadAction, SerializedError, Draft } from "@reduxjs/toolkit";
import { TAuthSliceState, ELoadingState, TUserRegister, TUserLogin } from "types/reduxSlices/authSlice";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data: TUserRegister, thunkAPI) => {
    try {
      const res = await axios.post("/auth/register", { data });
      return res.data;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data: TUserLogin, thunkAPI) => {
    try {
      const res = await axios.post("/auth/login", { data });
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("accessToken", res.data.accessToken);
      return res.data;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);


export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (data: string | null, thunkAPI) => {
    try {
      const res = await axios.post("/auth/logout", { data });
      if (res) {
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");
      }
      return res.data;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

interface IResetPassword {
  pass: string | number,
  confirmPass: string | number
}

export const resetPassword = createAsyncThunk(
  "auth/reset-password",
  async (data: IResetPassword, thunkAPI) => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const res = await axios.post(`/auth/reset-password/${refreshToken}`, { data });
      return res.data;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

const internalInitialState: TAuthSliceState = {
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
    changeIsLoggedIn: (state, action) => {
      state.isLoggedIn = !state.isLoggedIn;
    }
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
      // state.me = action.payload?.user
    })

    // resetPassword
    builder.addCase(resetPassword.pending, (state, action) => {
      state.loading = ELoadingState.LOADING;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.loading = ELoadingState.IDLE;
      state.error = action.error.message
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.loading = ELoadingState.IDLE;
      // state.me = action.payload?.user
    })

    // logoutUser
    builder.addCase(logoutUser.pending, (state) => {
      state.loading = ELoadingState.LOADING;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.loading = ELoadingState.IDLE;
      state.error = action.error.message;
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      reset();
      // state.accessToken = null;
      // state.refreshToken = null;
      // state.isLoggedIn = false;
      // state.me = null;
    });

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
      state.accessToken = action?.payload?.accessToken;
      state.refreshToken = action?.payload?.refreshToken;
      state.isLoggedIn = true;
      state.me = action.payload?.user;
    });
  },
});

// Actions generated automatically by createSlice function
export const { reset, changeIsLoggedIn } = authSlice.actions;
