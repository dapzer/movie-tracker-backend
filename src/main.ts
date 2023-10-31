import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import 'dotenv/config';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });
  app.setGlobalPrefix('/api');
  const configService = app.get(ConfigService);
  const PORT = configService.get('APP_PORT') || 5000;

  await app.listen(PORT);
}
bootstrap();
