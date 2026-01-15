import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'vacancies',
  timestamps: true,
})
export class Vacancy extends Model<Vacancy> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.STRING)
  profession: string;

  @Column(DataType.STRING)
  firm_name: string;

  @Column(DataType.INTEGER)
  payment_from: number;

  @Column(DataType.INTEGER)
  payment_to: number;

  @Column(DataType.STRING)
  currency: string;

  @Column(DataType.STRING)
  type_of_work: string;

  @Column(DataType.TEXT)
  vacancyRichText: string;

  @Column(DataType.STRING)
  town: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
