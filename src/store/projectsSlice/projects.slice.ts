import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BitrixApi } from '../../api/bitrix.api';
import { IColumn } from '../../components/board/Board';
import {
  FetchError,
  LoadingStatus,
  STATUSES,
  TaskStatus,
} from '../../types/api.types';
import { IProject, ITask, ITaskWithComments } from '../../types/dto.types';

export interface ProjectsState {
  projects: IProject[];
  projectsFetchStatus: LoadingStatus;
  projectFetchError: FetchError;

  currentProject: IProject | null;
  currentProjectFetchStatus: LoadingStatus;
  currentProjectFetchError: FetchError;
}

const initialState: ProjectsState = {
  projects: [],
  projectsFetchStatus: 'FULFILLED',
  projectFetchError: null,

  currentProject: null,
  currentProjectFetchStatus: 'FULFILLED',
  currentProjectFetchError: null,
};

export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async () => {
    const response = await BitrixApi.getProjects();
    return response.data;
  },
);

export const fetchProjectById = createAsyncThunk(
  'projects/fetchProjectById',
  async (id: number) => {
    const response = await BitrixApi.getProjectById(id);
    return response.data;
  },
);

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setNullCurrentProject: state => {
      state.currentProject = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProjects.pending, state => {
        state.projectsFetchStatus = 'PENDING';
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projectsFetchStatus = 'FULFILLED';
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, state => {
        state.projectsFetchStatus = 'REJECTED';
      })
      .addCase(fetchProjectById.pending, state => {
        state.currentProject = null;
        state.currentProjectFetchStatus = 'PENDING';
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.currentProjectFetchStatus = 'FULFILLED';
        state.currentProject = action.payload;
      })
      .addCase(fetchProjectById.rejected, state => {
        state.currentProjectFetchStatus = 'REJECTED';
      });
  },
});

export const { setNullCurrentProject } = projectsSlice.actions;

export default projectsSlice.reducer;
