import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TodoService } from './todo.service';
import { Task } from '@prisma/client';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CurrentUser } from 'decorators/current-user.decorator';
import { UserPayload } from 'src/types/jwt.type';

@UseGuards(AuthGuard('jwt'))
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getTasks(@CurrentUser() user: UserPayload): Promise<Task[]> {
    return this.todoService.getTasks(user.id);
  }

  @Get(':id')
  async getTaskById(
    @CurrentUser() user: UserPayload,
    @Param('id', ParseIntPipe) taskId: number,
  ): Promise<Task> {
    return this.todoService.getTaskById(user.id, taskId);
  }

  @Post()
  async createTask(
    @CurrentUser() user: UserPayload,
    @Body() dto: CreateTaskDto,
  ): Promise<Task> {
    return this.todoService.createTask(user.id, dto);
  }

  @Patch(':id')
  async updateTaskById(
    @CurrentUser() user: UserPayload,
    @Param('id', ParseIntPipe) taskId: number,
    @Body() dto: UpdateTaskDto,
  ): Promise<Task> {
    return this.todoService.updateTaskById(user.id, taskId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteTaskById(
    @CurrentUser() user: UserPayload,
    @Param('id', ParseIntPipe) taskId: number,
  ): Promise<void> {
    return this.todoService.deleteTaskById(user.id, taskId);
  }
}
