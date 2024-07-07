import { IsNumber, IsString, IsNotEmpty, IsPositive, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateBookDto {
  id: string;

  @ArrayNotEmpty()
  authorIds: string[];

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  genre: string;

  @IsNumber()
  @IsPositive()
  rating: number;
}