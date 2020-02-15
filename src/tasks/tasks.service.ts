import { Injectable, Param, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksFilterDto } from './dto/tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAll(): Task[] {
        return this.tasks;
    }

    getTaskFilter(filterDto: TasksFilterDto): Task[] {
        const {status, search} = filterDto;
        let tasks = this.getAll();

        if (status) {
            tasks = this.tasks.filter(task => task.status === status);
        }

        if (search) {
            tasks = this.tasks.filter(task =>
                task.title.includes(search) ||
                task.description.includes(search),
            );
        }

        return tasks;
    }

    getById(id: string): Task {
        const task = this.tasks.find(item => item.id === id);

        if (!task) {
            throw new NotFoundException();
        }

        return task;
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
        const task = this.getById(id);
        this.tasks.filter(item => item.id !== task.id);
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const task = this.getById(id);
        task.status = status;

        return task;
    }
}
