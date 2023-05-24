export type Status = '2' | '3' | '4' | '5' | '6';

export type Priority = '0' | '1' | '2';

export const STATUSES = {
  '2': 'Ждёт выполнения',
  '3': 'Выполняется',
  '4': 'Ожидает контроля',
  '5': 'Завершена',
  '6': 'Отложена',
};

export const PRIORITIES = {
  '0': 'Низкий',
  '1': 'Средний',
  '2': 'Высокий',
};

export interface ITaskProject {
  id: number;
  name: string;
}

export interface ITaskUser {
  id: number;
  name: string;
  icon: string;
}

export class TaskDto {
  id: number;
  title: string;
  description: string;
  group: ITaskProject;
  creator: ITaskUser;
  responsible: ITaskUser;
  status: Status;
  priority: Priority;
  createdDate: string;
  closedDate: string;
  commentsCount: string;
}
