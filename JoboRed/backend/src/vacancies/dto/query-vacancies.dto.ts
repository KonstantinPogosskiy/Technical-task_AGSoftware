import { IsOptional, IsString, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryVacanciesDto {
  @IsOptional()
  @IsString()
  keyword?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  payment_from?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  payment_to?: number;

  @IsOptional()
  @IsString()
  catalogues?: string;
}
