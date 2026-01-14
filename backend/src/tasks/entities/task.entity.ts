import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
  CreatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'tasks',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: false,
})
export class Task extends Model<Task> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description?: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  completed: boolean;

  @CreatedAt
  @Column({
    field: 'createdAt',
  })
  createdAt: Date;
}
