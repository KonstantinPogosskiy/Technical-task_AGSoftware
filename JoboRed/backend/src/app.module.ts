import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { VacanciesModule } from './vacancies/vacancies.module';
import { FavoritesModule } from './favorites/favorites.module';
import { Vacancy } from './vacancies/entities/vacancy.entity';
import { Favorite } from './favorites/entities/favorite.entity';
import { SeedService } from './database/seed.service';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const dbConfig = configService.get('database');
        return {
          dialect: dbConfig.dialect,
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.user,
          password: dbConfig.password,
          database: dbConfig.db,
          models: [Vacancy, Favorite],
          logging: false,
          autoLoadModels: true,
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    SequelizeModule.forFeature([Vacancy]),
    VacanciesModule,
    FavoritesModule,
  ],
  controllers: [],
  providers: [SeedService],
})
export class AppModule {}
