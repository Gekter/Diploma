import { FileDto } from './file.dto';
import { GetCommentDto } from './getComment.dto';
import { ITaskProject, ITaskUser, STATUSES, PRIORITIES } from './task.dto';

export class GetTaskDto {
  id: number;
  title: string;
  description: string;
  group: ITaskProject;
  creator: ITaskUser;
  responsible: ITaskUser;
  status: string;
  priority: string;
  createdDate: string;
  closedDate: string;
  commentsCount: string;
  comments: GetCommentDto[];
  files: FileDto[];
}
