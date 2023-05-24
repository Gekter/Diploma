import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BitrixApi } from "../../api/bitrix.api";
import { FetchError, LoadingStatus } from "../../types/api.types";
import { ITaskUser } from "../../types/dto.types";

export interface UsersState {
  users: ITaskUser[]; //TODO use diferent interface
  usersFetchStatus: LoadingStatus;
  usersFetchError: FetchError;

  projectUsers: ITaskUser[];
  projectUsersFetchStatus: LoadingStatus;
  projectUsersFetchError: FetchError;
}

const initialState: UsersState = {
  users: [],
  usersFetchStatus: "FULFILLED",
  usersFetchError: null,

  projectUsers: [],
  projectUsersFetchStatus: "FULFILLED",
  projectUsersFetchError: null,
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (offset?: number) => {
    const response = await BitrixApi.getUsers(offset);
    return response.data;
  }
);

export const fetchProjectusers = createAsyncThunk(
  "users/fetchProjectusers",
  async (projectId: number) => {
    const response = await BitrixApi.getUsersByProjectId(projectId);
    return response.data;
  }
);

export const tasksSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.usersFetchStatus = "PENDING";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.usersFetchStatus = "FULFILLED";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.usersFetchStatus = "REJECTED";
      })
      .addCase(fetchProjectusers.pending, (state) => {
        state.projectUsersFetchStatus = "PENDING";
        state.projectUsers = [];
      })
      .addCase(fetchProjectusers.fulfilled, (state, action) => {
        state.projectUsersFetchStatus = "FULFILLED";
        state.projectUsers = action.payload;
      })
      .addCase(fetchProjectusers.rejected, (state) => {
        state.projectUsersFetchStatus = "REJECTED";
      });
  },
});

export const {} = tasksSlice.actions;

export default tasksSlice.reducer;
