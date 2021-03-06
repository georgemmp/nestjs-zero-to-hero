import { TaskStatus } from '../task.enum';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';
export class TasksFilterDto {

    @IsOptional()
    @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}
