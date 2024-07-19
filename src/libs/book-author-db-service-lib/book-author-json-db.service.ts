import { AuthorEntity } from 'src/modules/authors/entities/author.entity';
import { BookEntity } from 'src/modules/books/entities/book.entity';
import { Injectable } from '@nestjs/common';
import { loadDataFromJSON } from 'src/common/helpers/utils';

@Injectable()
export class BookAuthorJsonDBService {
  public authors = loadDataFromJSON<AuthorEntity>('authors');  
  public books = loadDataFromJSON<BookEntity>('books');
  public book_author = loadDataFromJSON<{authorID: string, bookID: string}>('book_author');

  async getAllBooksFromAuthor(authorId: string): Promise<BookEntity[]> {
    const bookIDs = this.book_author.filter(item => item.authorID === authorId).map(item => item.bookID);
    const authorsBooks = this.books.filter(book => bookIDs.includes(book.id));
    return authorsBooks;
  }

  async getAllAuthorsFromBook(bookId: string): Promise<AuthorEntity[]> {
    const authorIDs = this.book_author.filter(item => item.bookID === bookId).map(item => item.authorID);
    const booksAuthors = this.authors.filter(author => authorIDs.includes(author.id));
    return booksAuthors;
  }

  async associateBooksToAuthor(authorId: string, bookIDs: string[]) {
    bookIDs.forEach(bookId => {
      this.book_author.push({ authorID: authorId, bookID: bookId });
    });

    this.book_author = Array.from(new Set(this.book_author));
  }

  async associateAuthorsToBook(bookId: string, authorIds: string[]) {
    authorIds.forEach(authorId => {
      this.book_author.push({ authorID: authorId, bookID: bookId });
    });

    this.book_author = Array.from(new Set(this.book_author));
  }

  async disassociateBooksFromAuthor(authorId: string, bookIds?: string[]) {
    if (!bookIds) {
      this.book_author = this.book_author.filter(item => item.authorID !== authorId);
      return;
    }

    this.book_author = this.book_author.filter(item => !bookIds.includes(item.bookID) || item.authorID !== authorId);
  }

  async disassociateAuthorsFromBook(bookId: string, authorIds?: string[]) {
    if (!authorIds) {
      this.book_author = this.book_author.filter(item => item.bookID !== bookId);
      return;
    }
    
    this.book_author = this.book_author.filter(item => !authorIds.includes(item.authorID) || item.bookID !== bookId);
  }
}