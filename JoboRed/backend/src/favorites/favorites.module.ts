import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { Favorite } from './entities/favorite.entity';
import { Vacancy } from '../vacancies/entities/vacancy.entity';

@Module({
  imports: [SequelizeModule.forFeature([Favorite, Vacancy])],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
