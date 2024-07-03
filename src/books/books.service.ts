import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

interface BookFilter {
  genre?: string;
  authorId?: number;
}

@Injectable()
export class BooksService {
  private books = [];

  getBooks({ genre, authorId }: BookFilter) {
    const filteredBooks = this.books.filter((book) => {
      const matchedGenre = genre ? book.genre === genre : true;
      const matchedAuthor = authorId ? book.authorId === authorId : true;
      return matchedGenre && matchedAuthor;
    });

    return filteredBooks;
  }

  getBook(id: string) {
    const bookIndex = this.books.findIndex((book) => book.id === id);

    if (bookIndex === -1) {
      throw new Error('Book not found');
    }

    return this.books[bookIndex];
  }

  createBook(createBookDto: CreateBookDto) {
    const uid = () => String(Date.now().toString(32) + Math.random().toString(16)).replace(/\./g, '');
    const newBook = {
      ...createBookDto,
      id: uid(),
    };

    this.books.push(newBook);

    return newBook;
  }

  updateBook(id: string, updateBookDto: UpdateBookDto) {
    const bookIndex = this.books.findIndex((book) => book.id === id);

    if (bookIndex === -1) {
      throw new Error('Book not found');
    }

    this.books[bookIndex] = {
      ...this.books[bookIndex],
      ...updateBookDto,
    };

    return this.books[bookIndex];
  }

  deleteBook(id: string) {
    const bookToRemove = this.getBook(id);
    const bookIndex = this.books.findIndex((book) => book.id === id);

    if (bookIndex === -1) {
      throw new Error('Book not found');
    }

    this.books.splice(bookIndex, 1);

    return bookToRemove;
  }
}
