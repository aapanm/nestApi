import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('bootstrap');

  const serverConfig = config.get('server');
  const port = serverConfig.port;
  await app.listen(port);

  logger.log(`server is up at port ${port}`);
}
bootstrap();
