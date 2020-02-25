import { Injectable, Param, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksFilterDto } from './dto/tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task.enum';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRespository: TaskRepository,
    ) {}
    // private tasks: Task[] = [];

    // getAll(): Task[] {
    //     return this.tasks;
    // }

    // getTaskFilter(filterDto: TasksFilterDto): Task[] {
    //     const {status, search} = filterDto;
    //     let tasks = this.getAll();

    //     if (status) {
    //         tasks = this.tasks.filter(task => task.status === status);
    //     }

    //     if (search) {
    //         tasks = this.tasks.filter(task =>
    //             task.title.includes(search) ||
    //             task.description.includes(search),
    //         );
    //     }

    //     return tasks;
    // }

    async getById(id: number): Promise<Task> {
        const task = await this.taskRespository.findOne(id);

        if (!task) {
            throw new NotFoundException('Task not found');
        }

        return task;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRespository.createTask(createTaskDto);
    }

    // delete(id: string): void {
    //     const task = this.getById(id);
    //     this.tasks.filter(item => item.id !== task.id);
    // }

    // updateTaskStatus(id: string, status: TaskStatus): Task {
    //     const task = this.getById(id);
    //     task.status = status;

    //     return task;
    // }
}
