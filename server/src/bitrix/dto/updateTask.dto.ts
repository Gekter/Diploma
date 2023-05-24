export class UpdateTaskDto {
  fields: UpdateTaskFieldsDto;
}

class UpdateTaskFieldsDto {
  TITLE?: string;
  DESCRIPTION?: string;
  RESPONSIBLE_ID?: number;
  GROUP_ID?: number;
  CREATOR_ID?: number;
  STATUS?: string;
  PRIORITY?: string;
}
