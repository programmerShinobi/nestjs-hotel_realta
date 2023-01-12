import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3012
  await app.listen(port, ()=> console.info(`Server started at http://localhost:${port}`));
}
bootstrap();
