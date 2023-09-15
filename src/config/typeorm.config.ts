import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Task } from 'src/tasks/task.entity';
import * as config from 'config';

const dbConfig = config.get('db');

export const typeOrmConfig: TypeOrmModule = {
  type: dbConfig.type,
  host: process.env.HOST || dbConfig.host,
  port: dbConfig.port,
  username: process.env.DB_USERNAME || dbConfig.username,
  password: process.env.DB_PASSWORD || dbConfig.password,
  schema: 'public',
  database: dbConfig.database,
  entities: [Task, User],
  synchronize: process.env.SYNC || dbConfig.synchronize,
};
