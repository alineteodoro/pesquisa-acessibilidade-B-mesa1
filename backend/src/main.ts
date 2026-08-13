import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_ORIGIN?.split(',') || true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    transformOptions: { enableImplicitConversion: true },
    forbidNonWhitelisted: false,
  }));

  const config = new DocumentBuilder()
    .setTitle('Api Plataforma CAD')
    .setDescription('Documentação dos endpoints da plataforma.')
    .setVersion('1.0')
    .addTag("Endpoints")
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document);

  await app.listen(3001);
}

bootstrap();
