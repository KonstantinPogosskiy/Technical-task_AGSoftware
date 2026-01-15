import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Favorite } from './entities/favorite.entity';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { Vacancy } from '../vacancies/entities/vacancy.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(Favorite)
    private favoriteModel: typeof Favorite,
  ) {}

  async create(createFavoriteDto: CreateFavoriteDto): Promise<Favorite> {
    const vacancy = await Vacancy.findByPk(createFavoriteDto.vacancyId);
    if (!vacancy) {
      throw new NotFoundException(
        `Vacancy with ID ${createFavoriteDto.vacancyId} not found`,
      );
    }

    const existingFavorite = await this.favoriteModel.findOne({
      where: { vacancyId: createFavoriteDto.vacancyId },
    });

    if (existingFavorite) {
      throw new ConflictException('Vacancy already in favorites');
    }

    return this.favoriteModel.create({
      vacancyId: createFavoriteDto.vacancyId,
    });
  }

  async findAll(): Promise<Favorite[]> {
    return this.favoriteModel.findAll({
      include: [{ model: Vacancy, as: 'vacancy' }],
      order: [['createdAt', 'DESC']],
    });
  }

  async remove(id: number): Promise<void> {
    const favorite = await this.favoriteModel.findByPk(id);
    if (!favorite) {
      throw new NotFoundException(`Favorite with ID ${id} not found`);
    }
    await favorite.destroy();
  }

  async removeByVacancyId(vacancyId: number): Promise<void> {
    const favorite = await this.favoriteModel.findOne({
      where: { vacancyId },
    });
    if (!favorite) {
      throw new NotFoundException(
        `Favorite with vacancy ID ${vacancyId} not found`,
      );
    }
    await favorite.destroy();
  }
}
