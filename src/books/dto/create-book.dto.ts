import { IsNumber, IsString, IsDate, IsNotEmpty, IsPositive, isNotEmpty } from 'class-validator';

export class CreateBookDto {
  id: string;

  @IsNotEmpty()
  authorId: string;

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