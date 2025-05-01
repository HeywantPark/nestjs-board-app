import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

import * as config from 'config';

interface ServerConfig {
  port: number;
  host: string;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const serverConfig = config.get<ServerConfig>('server');
  const port = serverConfig.port;

  await app.listen(process.env.PORT ?? port);
  Logger.log(`Application running on port ${port}`);
}
bootstrap();
