import { Injectable } from '@nestjs/common';
import { AuthorEntity } from 'src/modules/authors/entities/author.entity';
import { BookEntity } from 'src/modules/books/entities/book.entity';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class BookAuthorPrismaDBService {
  constructor(private prismaService: PrismaService) {}

  async getAllBooksFromAuthor(authorId: string): Promise<BookEntity[]> {
    const author = await this.prismaService.author.findUnique({
      where: { id: authorId },
      include: {
        books: {
          include: {
            book: true
          }
        }
      }
    });

    return author.books.map(({ book }) => {
      const { id, title, description, genre, rating } = book;
      return { id, title, description, genre, rating };
    });
  }

  async getAllAuthorsFromBook(bookId: string): Promise<AuthorEntity[]> {
    const book = await this.prismaService.book.findUnique({
      where: { id: bookId },
      include: {
        authors: {
          include: {
            author: true
          }
        }
      }
    });

    return book.authors.map(({ author }) => {
      const { id, fullName, penName, genres, averageRating } = author;
      return { id, fullName, penName, genres, averageRating };
    });
  }

  async associateBooksToAuthor(authorId: string, bookIDs: string[]) {
    await this.prismaService.authorBook.createMany({
      data: bookIDs.map(bookId => ({ authorId, bookId }))
    });
  }

  async associateAuthorsToBook(bookId: string, authorIds: string[]) {
    await this.prismaService.authorBook.createMany({
      data: authorIds.map(authorId => ({ authorId, bookId }))
    });
  }

  async disassociateBooksFromAuthor(authorId: string, bookIds?: string[]) {
    if (!bookIds) {
      await this.prismaService.authorBook.deleteMany({
        where: { authorId: authorId }
      });
      return;
    }

    await this.prismaService.authorBook.deleteMany({
      where: {
        AND: [
          { authorId: authorId },
          { bookId: { in: bookIds } }
        ]
      }
    });
  }

  async disassociateAuthorsFromBook(bookId: string, authorIds?: string[]) {
    if (!authorIds) {
      await this.prismaService.authorBook.deleteMany({
        where: { bookId: bookId }
      });
      return;
    }

    await this.prismaService.authorBook.deleteMany({
      where: {
        AND: [
          { bookId: bookId },
          { authorId: { in: authorIds } }
        ]
      }
    });
  }
}