import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { PRIORITIES, STATUSES, TaskDto } from './dto/task.dto';
import { GetTaskDto } from './dto/getTask.dto';
import { CommentDto } from './dto/comment.dto';
import { GetUserDto } from './dto/getUser.dto';
import { GetCommentDto } from './dto/getComment.dto';
import { CreateTaskDto } from './dto/createTask.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';
import { CreateCommentDto } from './dto/createComment.dto';
import { Project } from './dto/project.dto';
import { FileDto } from './dto/file.dto';

// TODO прописать селекты у запросов, чтобы не офигевать от количества данных?
@Injectable()
export class BitrixService {
  constructor(private readonly httpService: HttpService) {}

  async addTask(dto: CreateTaskDto) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.post<{ result: { task: TaskDto } }>(
          '/tasks.task.add',
          dto,
        ),
      );

      return this.replacePriorityAndStatus(data.result.task);
    } catch (e) {
      throw e;
    }
  }

  async updateTask(taskId: number, dto: UpdateTaskDto) {
    try {
      // if (dto.fields.STATUS) {
      //   dto.fields.STATUS = Object.entries(STATUSES).find(
      //     (entry) => entry[1] === dto.fields.STATUS,
      //   )[0];
      // }
      // if (dto.fields.PRIORITY) {
      //   dto.fields.PRIORITY = Object.entries(PRIORITIES).find(
      //     (entry) => entry[1] === dto.fields.PRIORITY,
      //   )[0];
      // }

      const { data } = await firstValueFrom(
        this.httpService.post<{ result: { task: TaskDto } }>(
          '/tasks.task.update',
          { taskId, ...dto },
        ),
      );

      return this.replacePriorityAndStatus(data.result.task);
    } catch (e) {
      throw e;
    }
  }

  async deleteTask(taskId: number): Promise<boolean> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<{ result?: { task: boolean } }>(
          '/tasks.task.delete',
          {
            params: {
              taskId,
            },
          },
        ),
      );

      return data.result?.task;
    } catch (e) {
      throw e;
    }
  }

  async getTaskById(id: number): Promise<GetTaskDto> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<{ result: { task: TaskDto } }>('/tasks.task.get', {
          params: {
            taskId: id,
          },
        }),
      );

      const task = data.result.task;
      const comments = await this.getTaskComments(id);
      const files = await this.getTaskFiles(id);

      return this.replacePriorityAndStatus({
        ...task,
        comments,
        files,
      }) as GetTaskDto;
    } catch (e) {
      throw e;
    }
  }

  async getTasksByProjectId(
    projectId: number,
    status: number,
    offset: number = 0,
  ): Promise<TaskDto[]> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<{ result: { tasks: TaskDto[] }; total: number }>(
          '/tasks.task.list',
          {
            params: {
              'order[ID]': 'DESC',
              'filter[GROUP_ID]': projectId,
              'filter[REAL_STATUS]': status,
              start: offset,
            },
          },
        ),
      );

      if (offset > data.total) {
        return [];
      } else {
        return data.result.tasks.map(this.replacePriorityAndStatus);
      }
    } catch (e) {
      throw e;
    }
  }

  async getProjects(offset: number = 0): Promise<Project[]> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<{ result: Project[]; total: number }>(
          `/sonet_group.get.json`,
          {
            params: {
              'order[ID]': 'DESC',
              start: offset,
            },
          },
        ),
      );

      if (offset < data.total) {
        return data.result.sort((p1, p2) => (p1.ACTIVE === 'Y' ? 1 : -1));
      } else {
        return [];
      }
    } catch (e) {
      throw e;
    }
  }

  async getProjectById(id: number): Promise<Project> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<{ result: Project[] }>(`/sonet_group.get.json`, {
          params: {
            'FILTER[ID]': id,
          },
        }),
      );

      return data.result[0] || null;
    } catch (e) {
      throw e;
    }
  }

  async getTaskComments(taskId: number): Promise<GetCommentDto[]> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<{ result: CommentDto[] }>(
          '/task.commentitem.getlist',
          {
            params: { TASKID: taskId },
          },
        ),
      );

      const comments = data.result;
      const users = await this.getUsersByIds(
        comments.map((comment) => comment.AUTHOR_ID),
      );

      const usersMap = users.reduce((map, user) => {
        map.set(user.ID, user);
        return map;
      }, new Map());

      return comments.map((comment) => ({
        ...comment,
        AUTHOR: usersMap.get(comment.AUTHOR_ID),
      }));
    } catch (e) {
      throw e;
    }
  }

  async addComment(taskId: number, dto: CreateCommentDto): Promise<CommentDto> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.post<{ result: number }>('/task.commentitem.add', {
          TASKID: taskId,
          FIELDS: dto,
        }),
      );

      const { data: data2 } = await firstValueFrom(
        this.httpService.get<{ result: CommentDto }>(
          `/task.commentitem.get?TASKID=${taskId}&ITEMID=${data.result}`,
        ),
      );

      const users = await this.getUsersByIds([+data2.result.AUTHOR_ID]);

      return { ...data2.result, AUTHOR: users[0] };
    } catch (e) {
      throw e;
    }
  }

  async updateComment(
    taskId: number,
    commentId: number,
    dto: CreateCommentDto,
  ): Promise<boolean> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.post<boolean>('/task.commentitem.update', {
          TASKID: taskId,
          ITEMID: commentId,
          FIELDS: dto,
        }),
      );

      return data;
    } catch (e) {
      throw e;
    }
  }

  async deleteComment(taskId: number, commentId: number): Promise<boolean> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.post<boolean>('/task.commentitem.delete', {
          TASKID: taskId,
          ITEMID: commentId,
        }),
      );

      return data;
    } catch (e) {
      throw e;
    }
  }

  async getUsers(offset: number = 0) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.post<{ result: GetUserDto[] }>(
          '/user.get',
          {
            filter: {
              ACTIVE: true,
            },
          },
          {
            params: {
              start: offset,
            },
          },
        ),
      );

      return data.result.map((user) => ({
        id: user.ID,
        name: `${user.LAST_NAME || ''} ${user.NAME || user.EMAIL} ${
          user.SECOND_NAME || ''
        }`,
        icon: user.PERSONAL_PHOTO,
      }));
    } catch (e) {
      throw e;
    }
  }

  async getUsersByProjectId(projectId: number) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<{
          result: Array<{ USER_ID: string; ROLE: string }>;
        }>('/sonet_group.user.get', {
          params: {
            ID: projectId,
          },
        }),
      );

      const users = await this.getUsersByIds(
        data.result.map((u) => +u.USER_ID),
      );

      return users.map((u) => ({
        ...u,
        icon: u.PERSONAL_PHOTO ? u.PERSONAL_PHOTO : '/bitrix',
        name: `${u.LAST_NAME || ''} ${u.NAME || u.EMAIL} ${
          u.SECOND_NAME || ''
        }`,
      }));
    } catch (e) {
      throw e;
    }
  }

  private async getTaskFiles(taskId: number) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<{ result: FileDto[] }>('/task.item.getfiles', {
          params: { TASKID: taskId },
        }),
      );

      return data.result;
    } catch (e) {
      throw e;
    }
  }

  private async getUsersByIds(ids: number[]) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.post<{ result: GetUserDto[] }>('/user.get', {
          filter: {
            ID: ids,
          },
        }),
      );

      return data.result.map((u) => ({
        ...u,
        icon: u.PERSONAL_PHOTO ? u.PERSONAL_PHOTO : '/bitrix',
        name: `${u.LAST_NAME || ''} ${u.NAME || u.EMAIL} ${
          u.SECOND_NAME || ''
        }`,
      }));
    } catch (e) {
      throw e;
    }
  }

  private replacePriorityAndStatus(task: TaskDto | GetTaskDto) {
    return {
      ...task,
      status: STATUSES[task.status],
      priority: PRIORITIES[task.priority],
    };
  }
}
