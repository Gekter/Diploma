import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BitrixApi } from '../../api/bitrix.api';
import { IColumn } from '../../components/board/Board';
import {
  FetchError,
  LoadingStatus,
  STATUSES,
  TaskStatus,
} from '../../types/api.types';
import {
  ICreateTask,
  IProject,
  ITask,
  ITaskWithComments,
  IUpdateTask,
} from '../../types/dto.types';

export interface TasksState {
  columns: IColumn[];
  columnsFetchStatus: LoadingStatus;
  columnsFetchError: FetchError;

  currentTask: ITaskWithComments | null;
  currentTaskFetchStatus: LoadingStatus;
  currentTaskFetchError: FetchError;

  createTaskFetchStatus: LoadingStatus;
  createTaskFetchError: FetchError;

  updateTaskFetchStatus: LoadingStatus;
  updateTaskFetchError: FetchError;

  addCommentFetchStatus: FetchError;
}

const initialState: TasksState = {
  columns: [],
  columnsFetchStatus: 'FULFILLED',
  columnsFetchError: null,

  currentTask: null,
  currentTaskFetchStatus: 'FULFILLED',
  currentTaskFetchError: null,

  createTaskFetchStatus: 'FULFILLED',
  createTaskFetchError: null,

  updateTaskFetchStatus: 'FULFILLED',
  updateTaskFetchError: null,

  addCommentFetchStatus: 'FULFILLED',
};

interface IFetchTasksParams {
  projectId: number;
  status: TaskStatus;
  offset?: number;
}

export const fetchTasksByProjectId = createAsyncThunk(
  'tasks/fetchTasksByProjectId',
  async (params: IFetchTasksParams) => {
    const response = await BitrixApi.getTasksByProjectId(
      params.projectId,
      params.status,
      params.offset,
    );
    return { data: response.data, status: params.status };
  },
);

export const fetchTaskById = createAsyncThunk(
  'tasks/fetchTaskById',
  async (id: number) => {
    const response = await BitrixApi.getTaskById(id);
    return response.data;
  },
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (dto: ICreateTask) => {
    const response = await BitrixApi.createTask(dto);
    return response.data;
  },
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (updatedTask: { id: number; dto: IUpdateTask }) => {
    const response = await BitrixApi.updateTask(
      updatedTask.id,
      updatedTask.dto,
    );
    return response.data;
  },
);

export const addComment = createAsyncThunk(
  'tasks/addComment',
  async (dto: { taskId: number; POST_MESSAGE: string }) => {
    const response = await BitrixApi.addComment(dto);
    return { result: response.data, taskId: dto.taskId };
  },
);

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    updateColumns(state, action: PayloadAction<IColumn[]>) {
      state.columns = action.payload;
    },
    resetColumns(state) {
      state.columns = [];
    },
    updateCurrentTask(state, action: PayloadAction<ITaskWithComments>) {
      console.log(action.payload);
      if (state.currentTask) {
        console.log(action.payload);
        state.currentTask = action.payload;
      }
    },
    addOrReplaceTask(state, action: PayloadAction<ITaskWithComments>) {
      state.columns.forEach(column => {
        column.tasks = column.tasks.filter(
          task => +task.id !== +action.payload.id,
        );
        if (STATUSES[column.title] === action.payload.status) {
          column.tasks.unshift(action.payload);
        }
      });
    },
  },
  extraReducers: builder => {
    builder

      .addCase(fetchTasksByProjectId.pending, state => {
        state.columnsFetchStatus = 'PENDING';
      })
      .addCase(fetchTasksByProjectId.fulfilled, (state, action) => {
        if (state.columns.length === 4) {
          state.columnsFetchStatus = 'FULFILLED';
        }
        state.columns = state.columns.filter(
          column => column.title !== action.payload.status,
        );
        state.columns.push({
          tasks: action.payload.data,
          title: action.payload.status,
        });
        state.columns = state.columns.sort((t1, t2) =>
          t1.title.localeCompare(t2.title),
        );
      })
      .addCase(fetchTasksByProjectId.rejected, state => {
        state.columnsFetchStatus = 'REJECTED';
      })

      .addCase(fetchTaskById.pending, state => {
        state.currentTask = null;
        state.currentTaskFetchStatus = 'PENDING';
      })
      .addCase(fetchTaskById.fulfilled, (state, action) => {
        state.currentTaskFetchStatus = 'FULFILLED';
        state.currentTask = action.payload;
      })
      .addCase(fetchTaskById.rejected, state => {
        state.currentTaskFetchStatus = 'REJECTED';
      })

      .addCase(createTask.pending, state => {
        state.createTaskFetchStatus = 'PENDING';
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.createTaskFetchStatus = 'FULFILLED';
        state.columns.forEach(column => {
          if (STATUSES[column.title] === action.payload.status) {
            column.tasks.unshift(action.payload);
          }
        });
      })
      .addCase(createTask.rejected, state => {
        state.createTaskFetchStatus = 'REJECTED';
      })

      .addCase(updateTask.pending, state => {
        state.updateTaskFetchStatus = 'PENDING';
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.updateTaskFetchStatus = 'FULFILLED';
        state.columns.forEach(column => {
          if (STATUSES[column.title] === action.payload.status) {
            column.tasks = column.tasks.map(task =>
              +task.id === +action.payload.id ? action.payload : task,
            );
          }
        });
      })
      .addCase(updateTask.rejected, state => {
        state.updateTaskFetchStatus = 'REJECTED';
      })
      .addCase(addComment.rejected, state => {
        state.addCommentFetchStatus = 'REJECTED';
      })
      .addCase(addComment.pending, state => {
        state.addCommentFetchStatus = 'PENDING';
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.addCommentFetchStatus = 'FULFILLED';
        state.columns.forEach(c => {
          const task = c.tasks.find(t => t.id === action.payload.taskId);
          if (task) {
            task.commentsCount = 1 + +task.commentsCount;
          }
        });
        state.currentTask!.comments.push(action.payload.result);
        state.currentTask!.commentsCount =
          1 + +state.currentTask!.commentsCount;
      });
  },
});

export const {
  updateColumns,
  resetColumns,
  updateCurrentTask,
  addOrReplaceTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;
