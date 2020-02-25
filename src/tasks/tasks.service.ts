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

    async deleteTask(id: number): Promise<void> {
        const result = await this.taskRespository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException('Task not found');
        }
    }

    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
        const task = await this.getById(id);
        task.status = status;
        await task.save();

        return task;
    }
}
