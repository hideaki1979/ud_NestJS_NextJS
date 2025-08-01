import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserPayload } from 'src/types/jwt.type';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async updateUser(userId: number, dto: UpdateUserDto): Promise<UserPayload> {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });

    const { id, email, nickname, createdAt, updatedAt } = user;
    return { id, email, nickname, createdAt, updatedAt };
  }
}
