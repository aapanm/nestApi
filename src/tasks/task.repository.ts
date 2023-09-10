import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async getTasksRepository(tasksFilterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = tasksFilterDto;
    const query = this.createQueryBuilder('tasks');
    if (status) {
      query.andWhere('tasks.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        '(tasks.title LIKE :search OR tasks.description LIKE :search)',
        { search: `%${search}%` },
      );
    }
    const tasks = await query.getMany();
    return tasks;
  }

  async createTaskRepository(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();

    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;

    await task.save();
    return task;
  }

  async deleteTaskRepository(taskId: number): Promise<any> {
    try {
      const result = await this.delete(taskId);
      return result;
    } catch (e) {
      throw new Error(`something went wrong deleting task, ${e}`);
    }
  }

  async updateTaskRepository(
    task: Task,
    taskStatus: TaskStatus,
  ): Promise<Task> {
    task.status = taskStatus;
    await task.save();
    return task;
  }
}
