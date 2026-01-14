import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TasksController } from '../tasks/tasks.controller';
import { TasksService } from '../tasks/tasks.service';
import { Task } from './entities/task.entity';

@Module({
  imports: [SequelizeModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
