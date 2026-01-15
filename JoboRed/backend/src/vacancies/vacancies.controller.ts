import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { VacanciesService } from './vacancies.service';
import { QueryVacanciesDto } from './dto/query-vacancies.dto';

@Controller('vacancies')
export class VacanciesController {
  constructor(private readonly vacanciesService: VacanciesService) {}

  @Get()
  findAll(@Query() query: QueryVacanciesDto) {
    return this.vacanciesService.findAll(
      query.keyword,
      query.payment_from,
      query.payment_to,
      query.catalogues,
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.vacanciesService.findOne(id);
  }
}
