import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import 'dotenv/config';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from '@/middlewares/httpExceptionFilter.middleware';
import { AuthGuard } from '@/guards/auth.guard';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('/api');
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalGuards(new AuthGuard());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.use(cookieParser(configService.get('COOKIE_SECRET')));
  app.use(
    session({
      secret: configService.get('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
    }),
  );

  const PORT = configService.get('APP_PORT') || 5000;

  await app.listen(PORT);
}

bootstrap();
