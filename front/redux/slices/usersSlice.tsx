import { createAsyncThunk, createSlice, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import axios from "utils/axios";
// import type { PayloadAction, SerializedError, Draft } from "@reduxjs/toolkit";
import { TUser, TUsersSliceState, ELoadingState } from "types/reduxSlices/usersSlice";


interface IGetUsers {
  page: number,
}

export const getUsers = createAsyncThunk(
  "users/getusers",
  async (_: IGetUsers, thunkAPI) => {
    try {
      const res = await axios.get(`/users?page=${_.page}&limit=${5}`);
      return res.data
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

interface IGetUser {
  userId: number,
}

export const getUser = createAsyncThunk(
  "users/getuser",
  async (_: IGetUser, thunkAPI) => {
    try {
      const res = await axios.get(`/users/${_.userId}`);
      return res.data
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);


const internalInitialState: TUsersSliceState = {
  user: null,
  users: [],
  loading: ELoadingState.IDLE,
  error: null,
};

// createSlice
export const usersSlice = createSlice({
  name: "users",
  initialState: internalInitialState,
  reducers: {
    reset: () => internalInitialState,

  },
  extraReducers: (builder: ActionReducerMapBuilder<TUsersSliceState>) => {
    // getUsers
    builder.addCase(getUsers.pending, (state, action) => {
      state.loading = ELoadingState.LOADING;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.loading = ELoadingState.IDLE;
      state.error = action.error.message
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.loading = ELoadingState.IDLE;
      state.users = action.payload
    })
  },
});

// Actions generated automatically by createSlice function
export const { reset } = usersSlice.actions;
