import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Jwt, Msg } from './interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async signUp(dto: AuthDto): Promise<Msg> {
    const hashed = await bcrypt.hash(dto.password, 10);

    try {
      await this.prisma.user.create({
        data: {
          email: dto.email,
          hashedPassword: hashed,
        },
      });
      return {
        message: 'ok',
      };
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ForbiddenException(
            'こちらのメールアドレスは既に使用されています',
          );
        }
      }
      throw err;
    }
  }

  async login(dto: AuthDto): Promise<Jwt> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

      if (!user)
        throw new ForbiddenException(
          'Eメール、パスワードのいずれかに誤りがあります',
        );

      const isValid = await bcrypt.compare(dto.password, user.hashedPassword);

      if (!isValid)
        throw new ForbiddenException(
          'Eメール、パスワードのいずれかに誤りがあります',
        );

      return this.generateJwt(user.id, user.email);
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('ログインエラー発生：', err);
      } else {
        console.error('ログインエラー発生：');
      }
      throw err;
    }
  }

  async generateJwt(userId: number, email: string): Promise<Jwt> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get<string>('JWT_SECRET');
    if (!secret) {
      throw new Error('JWT_SECRETの環境変数が定義されてません');
    }

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '30m',
      secret: secret,
    });

    return {
      accessToken: token,
    };
  }
}
