import { CreateBookDto, UpdateBookDto } from 'src/modules/books/dto';
import { generateID } from 'src/common/helpers/utils';
import { Injectable } from '@nestjs/common';
import { BookEntity } from 'src/modules/books/entities/book.entity';
import { BookAuthorJsonDBService } from '../book-author-db-service-lib/book-author-json-db.service';

@Injectable()
export class BooksJsonDBService {
  constructor(private bookAuthorJsonDBService: BookAuthorJsonDBService) {}

  async getAll({ search, genre, authorIDs }: Partial<BookEntity> & { search?: string }): Promise<BookEntity[]> {
    const filteredBooks = this.bookAuthorJsonDBService.books.filter((book) => {
      const matchedSearch = search ? book.title.includes(search) : true;
      const matchedGenre = genre ? book.genre === genre : true;
      const matchedAuthor = authorIDs ? book.authorIDs.some(authorId => authorIDs.includes(authorId)) : true;
      return matchedSearch && matchedGenre && matchedAuthor;
    });

    return filteredBooks;
  }

  async get(id: string): Promise<BookEntity | null> {
    const book = this.bookAuthorJsonDBService.books.find((book) => book.id === id);
    return book || null;
  }

  async create(createBookDto: CreateBookDto): Promise<BookEntity> {
    const newBook = {
      ...createBookDto,
      id: generateID()
    };

    newBook.authors = [];
    this.bookAuthorJsonDBService.books.push(newBook);
    return newBook;
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<BookEntity> {
    const bookIndex = this.bookAuthorJsonDBService.books.findIndex((book) => book.id === id);
    this.bookAuthorJsonDBService.books[bookIndex] = {
      ...this.bookAuthorJsonDBService.books[bookIndex],
      ...updateBookDto,
    };

    const updatedBook = this.bookAuthorJsonDBService.books[bookIndex];
    updatedBook.authors = await this.bookAuthorJsonDBService.getAllAuthorsFromBook(updatedBook.id);
    return updatedBook;
  }

  async delete(id: string): Promise<void> {
    const bookIndex = this.bookAuthorJsonDBService.books.findIndex((book) => book.id === id);
    this.bookAuthorJsonDBService.disassociateAuthorsFromBook(id);
    this.bookAuthorJsonDBService.books.splice(bookIndex, 1);
  }
}
