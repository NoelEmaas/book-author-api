import { AuthorEntity } from "./entities/author.entity";
import { CreateAuthorDto, UpdateAuthorDto } from "./dto";
import { BookEntity } from "../books/entities/book.entity";

export abstract class AuthorsServiceBase {
  abstract getAuthors(authorFilter: { search?: string, genres?: string[], averageRating?: number }): Promise<AuthorEntity[]>;
  abstract getAuthor(id: string): Promise<AuthorEntity | null>;
  abstract getAuthoredBooks(id: string): Promise<BookEntity[]>;
  abstract createAuthor(createAuthorDto: CreateAuthorDto): Promise<AuthorEntity>;
  abstract addAuthoredBooks(id: string, bookIDs: string[]): Promise<BookEntity[]>;
  abstract removeAuthoredBooks(id: string, bookIDs: string[]): Promise<BookEntity[]>;
  abstract updateAuthor(id: string, updateAuthorDto: UpdateAuthorDto): Promise<AuthorEntity>;
  abstract deleteAuthor(id: string): Promise<AuthorEntity>;
}