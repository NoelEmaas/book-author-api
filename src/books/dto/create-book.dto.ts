import { IsNumber, IsString, IsDate, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateBookDto {
  @IsNumber()
  id: number;

  @IsNumber()
  authorId: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  genre: string;

  @IsDate()
  datePublished: Date;

  @IsNumber()
  @IsPositive()
  rating: number;
}