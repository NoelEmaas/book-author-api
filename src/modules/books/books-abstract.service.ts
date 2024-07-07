import { BookType } from "src/types/book.types";
import { CreateBookDto, UpdateBookDto } from "./dto";

export abstract class BooksServiceBase {
  abstract getBooks(bookFilter: Partial<BookType> & { search?: string }): BookType[];
  abstract getBook(id: string): BookType | null;
  abstract createBook(createBookDto: CreateBookDto): BookType;
  abstract updateBook(id: string, updateBookDto: UpdateBookDto): BookType;
  abstract deleteBook(id: string): void;
}

