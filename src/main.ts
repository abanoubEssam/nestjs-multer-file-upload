import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
  app.useStaticAssets(join(process.cwd() , 'uploads') , {
    prefix: "/uploads",
    maxAge: "7d"
  })
  await app.listen(3000);
}
bootstrap();
