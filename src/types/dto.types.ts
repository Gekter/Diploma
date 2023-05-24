export interface IProject {
  ID: number;
  NAME: string;
  DESCRIPTION: string;
  NUMBER_OF_MEMBERS: string;
  ACTIVE: 'Y' | 'N';
  CLOSED: 'Y' | 'N';
  IS_EXTRANET: 'Y' | 'N';
  OPENED: 'Y' | 'N';
  PROJECT: 'Y' | 'N';
  VISIBLE: 'Y' | 'N';
}

export interface ITaskProject {
  id: number;
  name: string;
}

export interface ITaskUser {
  id: number;
  name: string;
  icon: string;
}

export interface IComment {
  ID: number;
  AUTHOR_ID: number;
  POST_MESSAGE: string;
  POST_DATE: string;
  AUTHOR: ITaskUser;
}

export interface IFile {
  ATTACHMENT_ID: string;
  NAME: string;
  FILE_ID: string;
  DOWNLOAD_URL: string;
  VIEW_URL: string;
}

export interface ITask {
  id: number;
  title: string;
  description: string;
  group: ITaskProject;
  creator: ITaskUser;
  commentsCount: string | number;
  createdDate: Date;
  responsible: ITaskUser;
  status: string;
  priority: string;
  deadline: Date | null;
  files: IFile[];
}

export interface ITaskWithComments extends ITask {
  comments: IComment[];
}

export interface ICreateTask {
  title: string;
  projectId: number;
  description?: string;
  responsibleId?: number;
}

export interface IUpdateTask {
  title?: string;
  description?: string;
  responsibleId?: number;
  projectId?: number;
  creatorId?: number;
  status?: string;
  priority?: string;
}
