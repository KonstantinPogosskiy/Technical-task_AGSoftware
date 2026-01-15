import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { VacanciesController } from './vacancies.controller';
import { VacanciesService } from './vacancies.service';
import { Vacancy } from './entities/vacancy.entity';

@Module({
  imports: [SequelizeModule.forFeature([Vacancy])],
  controllers: [VacanciesController],
  providers: [VacanciesService],
  exports: [VacanciesService],
})
export class VacanciesModule {}
