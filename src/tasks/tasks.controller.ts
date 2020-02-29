import { Controller, Get, Post, Body, Param, Delete, Put, Query, ValidationPipe, ParseIntPipe, UsePipes, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksFilterDto } from './dto/tasks-filter.dto';
import { TasksStatusValidationPipe } from './pipes/tasks-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task.enum';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private taskService: TasksService) { }

    @Get()
    getAll(
        @Query(ValidationPipe) filterDto: TasksFilterDto,
        @GetUser() user: User,
    ): Promise<Task[]> {
        return this.taskService.getAll(filterDto, user);
    }

    @Get('/:id')
    getById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.taskService.getById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User): Promise<Task> {
        return this.taskService.createTask(createTaskDto, user);
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
