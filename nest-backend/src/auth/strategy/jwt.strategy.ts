import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserPayload } from 'src/types/jwt.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => (req?.cookies?.['access_token'] as string) ?? null,
      ]),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET') as string,
    });
  }

  async validate(payload: {
    sub: number;
    email: string;
  }): Promise<UserPayload> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });

    if (!user) {
      throw new UnauthorizedException('該当するユーザーが存在しません');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const { hashedPassword, ...userWithoutPassword } = user;
    // return userWithoutPassword;
    const { id, email, nickname, createdAt, updatedAt } = user;
    return { id, email, nickname, createdAt, updatedAt };
  }
}
