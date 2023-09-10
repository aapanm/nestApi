import { PipeTransform, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatus = [
    TaskStatus.DONE,
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
  ];

  transform(value: any) {
    const val = value.toUpperCase();
    if (!this.isValidStatus(val))
      throw new BadRequestException(`"${value}" is an invalid status`);
    return value;
  }

  private isValidStatus(status: any): boolean {
    console.log(status);
    console.log(this.allowedStatus);
    const idx = this.allowedStatus.indexOf(status);
    return idx !== -1;
  }
}
