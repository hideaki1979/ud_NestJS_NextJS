import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { doubleCsrf } from 'csrf-csrf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true, // class-transformerを有効化
    }),
  );
  app.enableCors({
    credentials: true,
    origin: ['http://localhost:3003'],
  });
  app.use(cookieParser());

  // CSRF保護の設定
  const { doubleCsrfProtection } = doubleCsrf({
    getSecret: () => process.env.CSRF_SECRET || 'default-csrf-secret',
    getSessionIdentifier: (req) => req.ip || 'anonymous', // セッションがない場合はIPアドレスを使用
    cookieName:
      process.env.NODE_ENV === 'production'
        ? '__Host-psifi.x-csrf-token'
        : 'csrf-token', // 開発環境では __Host- プレフィックスを使わない
    cookieOptions: {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    },
    size: 32,
    ignoredMethods: ['GET', 'HEAD', 'OPTIONS'],
  });

  app.use(doubleCsrfProtection);
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
