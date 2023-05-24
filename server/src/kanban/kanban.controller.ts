import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';

import { BitrixService } from 'src/bitrix/bitrix.service';
import { CreateCommentDto } from 'src/bitrix/dto/createComment.dto';
import {
  CreateTaskDto,
  CreateTaskFieldsDto,
} from 'src/bitrix/dto/createTask.dto';
import { UpdateTaskDto } from 'src/bitrix/dto/updateTask.dto';

@Controller('kanban')
export class KanbanController {
  constructor(private bitrixService: BitrixService) {}

  @Get('/projects')
  async getProjects(@Query('offset') offset?: number) {
    return this.bitrixService.getProjects(offset);
  }

  @Get('/task/:id')
  async getTaskById(@Param('id') id: number) {
    return this.bitrixService.getTaskById(id);
  }

  @Get('/users')
  async getUsers(@Query('offset') offset?: number) {
    return this.bitrixService.getUsers(offset);
  }

  @Get('/projects/:id/tasks')
  async getTasksByProjectId(
    @Param('id') id: number,
    @Query('status') status: number,
    @Query('offset') offset?: number,
  ) {
    return this.bitrixService.getTasksByProjectId(id, status, offset);
  }

  @Get('/projects/:id/users')
  async getUsersByProjectId(@Param('id') id: number) {
    return this.bitrixService.getUsersByProjectId(id);
  }

  @Get('/projects/:id')
  async getProjectById(@Param('id') id: number) {
    return this.bitrixService.getProjectById(id);
  }

  @Get('/task/:id/comments')
  async getTaskComments(@Param('id') id: number) {
    return this.bitrixService.getTaskComments(id);
  }

  // TODO чё-то с файлами надо решить, ну и вообще какие поля можно добавлять
  @Post('/task')
  async addTask(@Body() dto: CreateTaskFieldsDto) {
    return this.bitrixService.addTask({ fields: dto });
  }

  @Patch('/task/:id')
  async updateTask(@Body() dto: CreateTaskFieldsDto, @Param('id') id: number) {
    return this.bitrixService.updateTask(id, { fields: dto });
  }

  @Delete('/task/:id')
  async deleteTask(@Param('id') id: number) {
    return this.bitrixService.deleteTask(id);
  }

  @Post('/task/:id/comment')
  async addComment(@Body() dto: CreateCommentDto, @Param('id') id: number) {
    return this.bitrixService.addComment(id, dto);
  }

  @Patch('/task/:taskId/comment/:commentId')
  async updateComment(
    @Body() dto: CreateCommentDto,
    @Param('taskId') taskId: number,
    @Param('commentId') commentId: number,
  ) {
    return this.bitrixService.updateComment(taskId, commentId, dto);
  }

  @Delete('/task/:taskId/comment/:commentId')
  async deleteComment(
    @Param('taskId') taskId: number,
    @Param('commentId') commentId: number,
  ) {
    return this.bitrixService.deleteComment(taskId, commentId);
  }
}
