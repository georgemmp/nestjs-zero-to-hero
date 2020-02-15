import { Injectable, Param } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAll(): Task[] {
        return this.tasks;
    }

    getById(id: string): Task {
        return this.tasks.find(item => item.id === id);
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const {title, description} = createTaskDto;
        const task: Task = {
            id: uuid(),
            description,
            title,
            status: TaskStatus.OPEN,
        };

        this.tasks.push(task);
        return task;
    }

    delete(id: string): void {
        this.tasks.filter(item => item.id !== id);
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const task = this.getById(id);
        task.status = status;

        return task;
    }
}
