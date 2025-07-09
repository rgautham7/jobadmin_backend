// vercel-server.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  await app.init();
};

bootstrap();

export default server;
