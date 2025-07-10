// vercel-server.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'https://jobadmin-frontend-rjb5b4y8l-gauthams-projects-94597e21.vercel.app',
    credentials: true,
  });
  await app.init();
};

bootstrap();

export default server;
