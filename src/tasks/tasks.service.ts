import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
  constructor(private taskRepository: TaskRepository) {}

  getTasksService(tasksFilterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasksRepository(tasksFilterDto);
  }

  createTaskService(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.createTaskRepository(createTaskDto);
    return task;
  }

  async getTaskByIdService(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id: id } });
    if (!task) throw new NotFoundException(`Task with id ${id} not found!`);
    return task;
  }

  async deleteTaskService(id: number): Promise<any> {
    const res = await this.taskRepository.deleteTaskRepository(id);
    if (res.affected === 0) {
      throw new NotFoundException(`Task with id ${id} not found!`);
    }
    return `Task deleted with id ${id}`;
  }

  async updateTaskStatusService(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskByIdService(id);
    const updatedTask = this.taskRepository.updateTaskRepository(task, status);
    return updatedTask;
  }
}
