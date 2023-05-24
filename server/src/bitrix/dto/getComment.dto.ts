import { GetUserDto } from './getUser.dto';

export class GetCommentDto {
  ID: number;
  AUTHOR_ID: number;
  POST_MESSAGE: string;
  POST_DATE: string;
  AUTHOR: GetUserDto;
}
