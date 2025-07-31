import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Task } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService) {}

  async getTasks(userId: number): Promise<Task[]> {
    return await this.prisma.task.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getTaskById(userId: number, taskId: number): Promise<Task> {
    const task = await this.prisma.task.findFirst({
      where: {
        userId,
        id: taskId,
      },
    });

    if (!task) {
      throw new NotFoundException('条件に合致するタスクが見つかりません');
    }
    return task;
  }

  async createTask(userId: number, dto: CreateTaskDto): Promise<Task> {
    const task = await this.prisma.task.create({
      data: {
        userId,
        ...dto,
      },
    });
    return task;
  }

  async updateTaskById(
    userId: number,
    taskId: number,
    dto: UpdateTaskDto,
  ): Promise<Task> {
    return this.prisma.$transaction(async (ts) => {
      const task = await ts.task.findUnique({
        where: {
          id: taskId,
        },
      });

      if (!task || task.userId !== userId)
        throw new ForbiddenException('更新権限がありません');

      return ts.task.update({
        where: {
          id: taskId,
        },
        data: {
          ...dto,
        },
      });
    });
  }

  async deleteTaskById(userId: number, taskId: number): Promise<void> {
    const result = await this.prisma.task.deleteMany({
      where: {
        id: taskId,
        userId,
      },
    });

    if (result.count === 0) {
      throw new ForbiddenException('削除権限がありません');
    }
  }
}
