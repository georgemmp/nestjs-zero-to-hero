import { Controller, Get, Post, Body, Param, Delete, Put, Query, ValidationPipe, ParseIntPipe, UsePipes } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksFilterDto } from './dto/tasks-filter.dto';
import { TasksStatusValidationPipe } from './pipes/tasks-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task.enum';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) { }

    @Get()
    getAll(@Query(ValidationPipe) filterDto: TasksFilterDto): Promise<Task[]> {
        return this.taskService.getAll(filterDto);
    }

    @Get('/:id')
    getById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.taskService.getById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskService.createTask(createTaskDto);
    }

    @Delete('/:id')
    delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.taskService.deleteTask(id);
    }

    @Put('/:id/status')
    updateTaskStatus(@Param('id', ParseIntPipe) id: number,
                     @Body('status', TasksStatusValidationPipe) status: TaskStatus): Promise<Task> {
        return this.taskService.updateTaskStatus(id, status);
    }
}
