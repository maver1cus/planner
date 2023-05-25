import * as process from 'process';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const port = process.env.BACKEND_PORT || 3001;

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Planner')
    .setDescription('API description')
    .setTitle('1.0')
    .addTag('planner')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('doc', app, document);

  await app.listen(port);
}

bootstrap();
