import axios from "./api";

import { TaskStatus } from "../types/api.types";
import {
  IComment,
  ICreateTask,
  IProject,
  ITask,
  ITaskUser,
  ITaskWithComments,
  IUpdateTask,
} from "../types/dto.types";

export class BitrixApi {
  static getProjects() {
    return axios.get<IProject[]>(`/kanban/projects`);
  }

  static getUsers(offset: number = 0) {
    return axios.get<ITaskUser[]>(`/kanban/users`, { params: { offset } });
  }

  static getTaskById(id: number) {
    return axios.get<ITaskWithComments>(`/kanban/task/${id}`);
  }

  static getProjectById(id: number) {
    return axios.get<IProject>(`/kanban/projects/${id}`);
  }

  static getTasksByProjectId(
    projectId: number,
    status: TaskStatus,
    offset: number = 0
  ) {
    return axios.get<ITask[]>(`/kanban/projects/${projectId}/tasks`, {
      params: {
        status,
        offset,
      },
    });
  }

  static getUsersByProjectId(projectId: number) {
    return axios.get<ITaskUser[]>(`/kanban/projects/${projectId}/users`);
  }

  static createTask(dto: ICreateTask) {
    return axios.post<ITask>(`/kanban/task`, {
      TITLE: dto.title,
      GROUP_ID: dto.projectId,
      DESCRIPTION: dto.description,
      RESPONSIBLE_ID: dto.responsibleId,
    });
  }

  static updateTask(id: number, dto: IUpdateTask) {
    return axios.patch<ITask>(`/kanban/task/${id}`, {
      TITLE: dto.title,
      DESCRIPTION: dto.description,
      RESPONSIBLE_ID: dto.responsibleId,
      GROUP_ID: dto.projectId,
      CREATOR_ID: dto.creatorId,
      STATUS: dto.status,
      PRIORITY: dto.priority,
    });
  }

  static addComment(dto: { taskId: number; POST_MESSAGE: string }) {
    return axios.post<IComment>(`/kanban/task/${dto.taskId}/comment`, {
      POST_MESSAGE: dto.POST_MESSAGE,
    });
  }
}
