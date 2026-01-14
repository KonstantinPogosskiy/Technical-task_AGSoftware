import { IsString, IsOptional, IsBoolean, ValidateIf } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @ValidateIf((o) => o.title !== undefined && o.title !== null)
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}
