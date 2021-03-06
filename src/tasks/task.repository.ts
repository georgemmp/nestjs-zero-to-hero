import { Repository, EntityRepository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task.enum';
import { TasksFilterDto } from './dto/tasks-filter.dto';
import { User } from 'src/auth/user.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

    async getAll(filterDto: TasksFilterDto, user: User): Promise<Task[]> {
        const {status, search} = filterDto;

        const query = this.createQueryBuilder('task');

        query.innerJoin('task.user', 'user')
            .where('user.id = :userId', {userId: user.id});

        if (status) {
            query.andWhere('task.status = :status', {status});
        }

        if (search) {
            query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', {search: `%${search}%`});
        }

        const tasks = await query.getMany();

        return tasks;
    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const {title, description} = createTaskDto;

        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        task.user = user;
        await task.save();

        delete task.user;

        return task;
    }
}
