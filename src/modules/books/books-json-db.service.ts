import { BookType } from 'src/types/book.types';
import { CreateBookDto, UpdateBookDto } from './dto';
import { generateID, loadDataFromJSON } from 'src/lib/utils';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BooksJsonDBService {
  private books = loadDataFromJSON<BookType>('books');

  getAll({ search, genre, authorIds }: Partial<BookType> & { search?: string }): BookType[] {
    const filteredBooks = this.books.filter((book) => {
      const matchedSearch = search ? book.title.includes(search) : true;
      const matchedGenre = genre ? book.genre === genre : true;
      const matchedAuthor = authorIds ? book.authorIds.some(authorId => authorIds.includes(authorId)) : true;
      return matchedSearch && matchedGenre && matchedAuthor;
    });

    return filteredBooks;
  }

  get(id: string): BookType | null {
    const book = this.books.find((book) => book.id === id);
    return book || null;
  }

  create(createBookDto: CreateBookDto): BookType {
    const newBook = {
      ...createBookDto,
      id: generateID()
    };

    this.books.push(newBook);
    return newBook;
  }

  update(id: string, updateBookDto: UpdateBookDto): BookType {
    const bookIndex = this.books.findIndex((book) => book.id === id);
    this.books[bookIndex] = {
      ...this.books[bookIndex],
      ...updateBookDto,
    };

    return this.books[bookIndex];
  }

  delete(id: string): void {
    const bookIndex = this.books.findIndex((book) => book.id === id);
    this.books.splice(bookIndex, 1);
  }
}
