import { IsNumber, IsString, IsDate, IsNotEmpty, IsPositive, Min, Max } from 'class-validator';

export class CreateAuthorDto {
  id: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  penName: string;

  genres?: string[];

  @IsNumber()
  @IsPositive()
  @Min(0)
  @Max(5)
  averageRating?: number;
}