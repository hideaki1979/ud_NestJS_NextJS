import { Controller, Get, UseGuards, Patch, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { UserPayload } from 'src/types/jwt.type';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUser } from 'decorators/current-user.decorator';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getLoginUser(@CurrentUser() user: UserPayload): UserPayload {
    return user;
  }

  @Patch()
  updateUser(
    @CurrentUser() user: UserPayload,
    @Body() dto: UpdateUserDto,
  ): Promise<UserPayload> {
    return this.userService.updateUser(user.id, dto);
  }
}
