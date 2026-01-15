import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Vacancy } from './entities/vacancy.entity';
import { Op } from 'sequelize';

@Injectable()
export class VacanciesService {
  constructor(
    @InjectModel(Vacancy)
    private vacancyModel: typeof Vacancy,
  ) {}

  async findAll(
    keyword?: string,
    paymentFrom?: number,
    paymentTo?: number,
    catalogues?: string,
  ): Promise<Vacancy[]> {
    const where: any = {};

    if (keyword) {
      where[Op.or] = [
        { profession: { [Op.iLike]: `%${keyword}%` } },
        { firm_name: { [Op.iLike]: `%${keyword}%` } },
        { vacancyRichText: { [Op.iLike]: `%${keyword}%` } },
      ];
    }

    if (paymentFrom !== undefined) {
      where.payment_from = { [Op.gte]: paymentFrom };
    }

    if (paymentTo !== undefined) {
      where.payment_to = { [Op.lte]: paymentTo };
    }

    return this.vacancyModel.findAll({
      where,
      order: [['createdAt', 'DESC']],
    });
  }

  async findOne(id: number): Promise<Vacancy> {
    const vacancy = await this.vacancyModel.findByPk(id);
    if (!vacancy) {
      throw new NotFoundException(`Vacancy with ID ${id} not found`);
    }
    return vacancy;
  }
}
