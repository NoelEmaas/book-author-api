import { BooksJsonDBService } from './books-json-db.service';
import { BooksServiceBase } from './books-abstract.service';
import { BookType } from 'src/types/book.types';
import { CreateBookDto, UpdateBookDto } from './dto';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class BooksService implements BooksServiceBase {
  constructor(private readonly booksJsonDBService: BooksJsonDBService) {}

  getBooks(bookFilter: Partial<BookType> & { search?: string }): BookType[] {
    return this.booksJsonDBService.getAll(bookFilter);
  }

  getBook(id: string): BookType {
    const book = this.booksJsonDBService.get(id);

    if (!book) {
      throw new NotFoundException('Book you are trying to get does not exist');
    }

    return book;
  }

  createBook(createBookDto: CreateBookDto): BookType {
    return this.booksJsonDBService.create(createBookDto);
  }

  updateBook(id: string, updateBookDto: UpdateBookDto): BookType {
    const book = this.booksJsonDBService.get(id);

    if (!book) {
      throw new NotFoundException('Book you are trying to update does not exist');
    }

    return this.booksJsonDBService.update(id, updateBookDto);
  }

  deleteBook(id: string): BookType {
    const bookToRemove = this.booksJsonDBService.get(id);

    if (!bookToRemove) {
      throw new NotFoundException('Book you are trying to delete does not exist');
    }

    this.booksJsonDBService.delete(id);
    return bookToRemove;
  }
}
