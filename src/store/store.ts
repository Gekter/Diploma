import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import tasksSlice from './tasksSlice/tasks.slice';
import projectsSlice from './projectsSlice/projects.slice';
import userSlice from './userSlice/user.slice';

export const store = configureStore({
  reducer: {
    tasks: tasksSlice,
    projects: projectsSlice,
    users: userSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
