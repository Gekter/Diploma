export class CreateTaskDto {
  fields: CreateTaskFieldsDto;
}

export class CreateTaskFieldsDto {
  TITLE: string;
  GROUP_ID: number;

  DESCRIPTION?: string;
  RESPONSIBLE_ID?: number;
}
