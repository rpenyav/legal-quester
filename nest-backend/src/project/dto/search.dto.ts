import { IsOptional, IsString, IsDate } from 'class-validator';

export class SearchDto {
  @IsOptional()
  @IsDate()
  fechaInicio: Date;

  @IsOptional()
  @IsDate()
  fechaPublicacion: Date;

  @IsOptional()
  @IsString()
  descripcion: string;

  @IsOptional()
  @IsString()
  areaLegal: string;

  @IsOptional()
  @IsString()
  jurisdiccion: string;

  @IsOptional()
  @IsString()
  typeOfCase: string;

  @IsOptional()
  @IsString()
  cityOfProject: string;
}
