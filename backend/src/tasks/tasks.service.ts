import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Task } from '../tasks/entities/task.entity';
import { CreateTaskDto } from '../tasks/dto/create-task.dto';
import { UpdateTaskDto } from '../tasks/dto/update-task.dto';
import { QueryTasksDto } from '../tasks/dto/query-tasks.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task)
    private userModel: typeof Task,
  ) {}

  public async findAll(query: QueryTasksDto) {
    const { page = 1, limit = 10, search = '' } = query;
    const offset = (page - 1) * limit;

    const where = search
      ? {
          title: {
            [Op.iLike]: `%${search}%`,
          },
        }
      : {};

    const { count, rows: tasks } = await Task.findAndCountAll({
      where,
      order: [['createdAt', 'DESC']],
      limit,
      offset,
    });

    return {
      tasks,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit),
      },
    };
  }

  public async create(createTaskDto: CreateTaskDto): Promise<Task> {
    return await Task.create({
      title: createTaskDto.title.trim(),
      description: createTaskDto.description?.trim() || null,
      completed: createTaskDto.completed || false,
    });
  }

  public async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await Task.findByPk(id);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (updateTaskDto.title !== undefined) {
      const trimmedTitle = updateTaskDto.title?.trim();
      if (!trimmedTitle || trimmedTitle === '') {
        throw new BadRequestException('Title cannot be empty');
      }
      task.title = trimmedTitle;
    }

    if (updateTaskDto.description !== undefined) {
      task.description = updateTaskDto.description?.trim() || null;
    }

    if (updateTaskDto.completed !== undefined) {
      task.completed = updateTaskDto.completed;
    }

    return await task.save();
  }

  public async remove(id: number): Promise<void> {
    const deletedCount = await Task.destroy({
      where: { id },
    });

    if (deletedCount === 0) {
      throw new NotFoundException('Task not found');
    }
  }
}
