import { IsNumber, IsString, IsNotEmpty, IsPositive, Min, Max } from 'class-validator';
import { BookEntity } from 'src/modules/books/entities/book.entity';

export class AuthorEntity {
  id: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  penName: string;

  genres: string[];

  @IsNumber()
  @IsPositive()
  @Min(0)
  @Max(5)
  averageRating: number;

  bookIDs?: string[];
  books?: BookEntity[];
}