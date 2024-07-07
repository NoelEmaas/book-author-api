import { AuthorsJsonDBService } from '../authors/authors-json-db.service';
import { BooksJsonDBService } from './books-json-db.service';
import { BooksServiceBase } from './books-abstract.service';
import { BookType } from 'src/types/book.types';
import { CreateBookDto, UpdateBookDto } from './dto';
import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class BooksService implements BooksServiceBase {
  constructor(
    private readonly booksJsonDBService: BooksJsonDBService,
    private readonly authorsJsonDBService: AuthorsJsonDBService
  ) {}

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

  addAuthorToBook(bookId: string, authorId: string): BookType {
    const book = this.booksJsonDBService.get(bookId);
    const author = this.authorsJsonDBService.get(authorId);

    if (!author) {
      throw new NotFoundException('Author you are trying to add to book does not exist');
    }

    if (!book) {
      throw new NotFoundException('Book you are trying to add author to does not exist');
    }

    if (book.authorIds.includes(authorId)) {
      throw new ConflictException('Author you are trying to add to book already exists');
    }

    book.authorIds.push(authorId);
    return this.booksJsonDBService.update(bookId, book);
  }

  removeAuthorFromBook(bookId: string, authorId: string): BookType {
    const book = this.booksJsonDBService.get(bookId);

    if (!book) {
      throw new NotFoundException('Book you are trying to remove author from does not exist');
    }

    if (!book.authorIds.includes(authorId)) {
      throw new NotFoundException('Author you are trying to remove from book does not exist');
    }

    if (book.authorIds.length === 1) {
      throw new BadRequestException('Book must have at least one author');
    }

    book.authorIds = book.authorIds.filter((id) => id !== authorId);
    return this.booksJsonDBService.update(bookId, book);
  }
}
