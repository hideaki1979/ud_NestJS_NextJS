import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'generated/prisma';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async updateUser(
    userId: number,
    dto: UpdateUserDto,
  ): Promise<Omit<User, 'hashedPassword'>> {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const { hashedPassword, ...userWithoutPassword } = user;
    // return userWithoutPassword;

    const { id, email, nickname, createdAt, updatedAt } = user;
    return { id, email, nickname, createdAt, updatedAt };
  }
}
