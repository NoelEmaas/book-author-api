import { AuthorEntity } from "../authors/entities/author.entity";
import { CreateBookDto, UpdateBookDto } from "./dto";
import { BookEntity } from "./entities/book.entity";

export abstract class BooksServiceBase {
  abstract getBooks(bookFilter: { search: string, genre: string, authorIds: string[] }): Promise<BookEntity[]>;
  abstract getBook(id: string): Promise<BookEntity | null>;
  abstract getBookAuthors(id: string): Promise<AuthorEntity[]>;
  abstract createBook(createBookDto: CreateBookDto): Promise<BookEntity>;
  abstract addBookAuthors(id: string, authorIds: string[]): Promise<AuthorEntity[]>;
  abstract removeBookAuthors(id: string, authorIds: string[]): Promise<AuthorEntity[]>;
  abstract updateBook(id: string, updateBookDto: UpdateBookDto): Promise<BookEntity>;
  abstract deleteBook(id: string): Promise<BookEntity>;
}

