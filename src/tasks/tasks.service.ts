import { Injectable, Param, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksFilterDto } from './dto/tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRespository: TaskRepository,
    ) {}

    async getAll(filterDto: TasksFilterDto, user: User) {
        return this.taskRespository.getAll(filterDto, user);
    }

    async getById(id: number, user: User): Promise<Task> {
        const task = await this.taskRespository.findOne({where: {id, user}});

        if (!task) {
            throw new NotFoundException('Task not found');
        }

        return task;
    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return this.taskRespository.createTask(createTaskDto, user);
    }

    async deleteTask(id: number, user: User): Promise<void> {
        const result = await this.taskRespository.delete({id, user});

        if (result.affected === 0) {
            throw new NotFoundException('Task not found');
        }
    }

    async updateTaskStatus(id: number, status: TaskStatus, user: User): Promise<Task> {
        const task = await this.getById(id, user);
        task.status = status;
        await task.save();

        return task;
    }
}
