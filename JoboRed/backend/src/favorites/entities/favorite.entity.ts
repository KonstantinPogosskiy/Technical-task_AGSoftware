import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Vacancy } from '../../vacancies/entities/vacancy.entity';

@Table({
  tableName: 'favorites',
  timestamps: true,
})
export class Favorite extends Model<Favorite> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => Vacancy)
  @Column(DataType.INTEGER)
  vacancyId: number;

  @BelongsTo(() => Vacancy)
  vacancy: Vacancy;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
