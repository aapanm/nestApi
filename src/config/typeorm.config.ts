import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/tasks/task.entity';

export const typeOrmConfig: TypeOrmModule = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  schema: 'public',
  database: 'task-management',
  entities: [Task],
  synchronize: true,
};
