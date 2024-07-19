import { IsNumber, IsString, IsNotEmpty, IsPositive, ArrayNotEmpty } from 'class-validator';
import { AuthorEntity } from 'src/modules/authors/entities/author.entity';

export class BookEntity {
  id: string;

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

  authorIDs?: string[];
  authors?: AuthorEntity[];
}