import { BooksJsonDBService } from 'src/libs/books-db-service-lib/book-json-db.service';
import { BooksServiceBase } from './books-abstract.service';
import { BookEntity } from './entities/book.entity';
import { BooksPrismaDBService } from 'src/libs/books-db-service-lib/book-prisma-db.service';
import { CreateBookDto, UpdateBookDto } from './dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BookAuthorJsonDBService } from 'src/libs/book-author-db-service-lib/book-author-json-db.service';
import { AuthorEntity } from '../authors/entities/author.entity';
import { plainToClass } from 'class-transformer';
import { BookAuthorPrismaDBService } from 'src/libs/book-author-db-service-lib/book-author-prisma-db.service';

@Injectable()
export class BooksService implements BooksServiceBase {
  constructor(
    private readonly booksDbService: BooksPrismaDBService,
    private readonly bookAuthorDbService: BookAuthorPrismaDBService
  ) {}

  async getBooks(bookFilter: { search: string, genre: string, authorIds: string[] }): Promise<BookEntity[]> {
    return await this.booksDbService.getAll(bookFilter);
  }

  async getBook(id: string): Promise<BookEntity> {
    const book = await this.booksDbService.get(id);

    if (!book) {
      throw new NotFoundException('Book you are trying to get does not exist');
    }

    return book;
  }

  async getBookAuthors(id: string): Promise<AuthorEntity[]> {
    const book = await this.booksDbService.get(id);

    if (!book) {
      throw new NotFoundException('Book you are trying to get authors does not exist');
    }

    return await this.bookAuthorDbService.getAllAuthorsFromBook(id);
  }

  async createBook(createBookDto: CreateBookDto): Promise<BookEntity> {
    return await this.booksDbService.create(createBookDto);
  }

  async addBookAuthors(id: string, authorIds: string[]): Promise<AuthorEntity[]> {
    const book = await this.booksDbService.get(id);

    if (!book) {
      throw new NotFoundException('Book you are trying to add authors does not exist');
    }

    await this.bookAuthorDbService.associateAuthorsToBook(id, authorIds);
    return await this.getBookAuthors(id);
  }

  async removeBookAuthors(id: string, authorIds: string[]): Promise<AuthorEntity[]> {
    const book = await this.booksDbService.get(id);

    if (!book) {
      throw new NotFoundException('Book you are trying to remove authors does not exist');
    }

    await this.bookAuthorDbService.disassociateAuthorsFromBook(id, authorIds);
    return await this.getBookAuthors(id);
  }

  async updateBook(id: string, updateBookDto: UpdateBookDto): Promise<BookEntity> {
    const book = await this.booksDbService.get(id);

    if (!book) {
      throw new NotFoundException('Book you are trying to update does not exist');
    }

    return await this.booksDbService.update(id, updateBookDto);
  }

  async deleteBook(id: string): Promise<BookEntity> {
    const bookToRemove = await this.booksDbService.get(id);

    if (!bookToRemove) {
      throw new NotFoundException('Book you are trying to delete does not exist');
    }

    await this.booksDbService.delete(id);
    return bookToRemove;
  }
}
