import { GetUserDto } from './getUser.dto';

export class CommentDto {
  ID: number;
  AUTHOR_ID: number;
  POST_MESSAGE: string;
  POST_DATE: string;
  AUTHOR: GetUserDto;
}
