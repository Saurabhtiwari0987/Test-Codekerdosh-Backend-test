import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000', 'https://codekerdos.in', "https://codekerdos-admin.vercel.app", "http://localhost:3001", "https://test-codekerdosh-backend-test-admin.vercel.app/signin"], // Replace with your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(3001);
}
bootstrap();
