import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // ou l'adresse spécifique de ton app, ex: 'http://localhost:19006'
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
