import { Controller, Get, Post, Body, Param, Delete, Put, Query, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksFilterDto } from './dto/tasks-filter.dto';
import { TasksStatusValidationPipe } from './pipes/tasks-status-validation.pipe';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) { }

    // @Get()
    // getAll(@Query(ValidationPipe) filterDto: TasksFilterDto): Task[] {
    //     if (Object.keys(filterDto).length) {
    //         return this.taskService.getTaskFilter(filterDto);
    //     } else {
    //         return this.taskService.getAll();
    //     }
    // }

    @Get('/:id')
    getById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.taskService.getById(id);
    }

    // @Post()
    // createTask(@Body() createTaskDto: CreateTaskDto): Task {
    //     return this.taskService.createTask(createTaskDto);
    // }

    // @Delete('/:id')
    // delete(@Param('id') id: string): void {
    //     this.taskService.delete(id);
    // }

    // @Put('/:id/status')
    // updateTaskStatus(@Param('id') id: string,
    //                  @Body('status', TasksStatusValidationPipe) status: TaskStatus): Task {
    //     return this.taskService.updateTaskStatus(id, status);
    // }
}
