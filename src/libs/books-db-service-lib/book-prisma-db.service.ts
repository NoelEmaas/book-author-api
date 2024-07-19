import { CreateBookDto, UpdateBookDto } from 'src/modules/books/dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { BookEntity } from 'src/modules/books/entities/book.entity';
import { BookAuthorPrismaDBService } from '../book-author-db-service-lib/book-author-prisma-db.service';

@Injectable()
export class BooksPrismaDBService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly bookAuthorPrismaDBService: BookAuthorPrismaDBService
  ) {}

  async getAll(bookFilter: { search?: string, genre?: string, authorIds?: string[] }): Promise<BookEntity[]> {
    const whereClause: any = {};

    if (bookFilter.search) {
      whereClause.title = { contains: bookFilter.search };
    }

    if (bookFilter.genre) {
      whereClause.genre = bookFilter.genre;
    }

    if (bookFilter.authorIds && bookFilter.authorIds.length > 0) {
      whereClause.authors = {
        some: {
          id: { in: bookFilter.authorIds }
        }
      };
    }

    const books = await this.prismaService.book.findMany({
      where: whereClause,
    });

    return books;
  }

  async get(id: string): Promise<BookEntity> {
    const book = await this.prismaService.book.findUnique({
      where: {
        id
      }
    })

    return book;
  }

  async create(createBookDto: CreateBookDto): Promise<BookEntity> {
    const { authors, ...bookData } = createBookDto;

    const createdBook = await this.prismaService.book.create({
      data: {
        ...bookData,
      }
    });

    return createdBook;
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<BookEntity> {
    const { authors, ...bookData } = updateBookDto;
    const updatedBook = await this.prismaService.book.update({
      where: { id },
      data: {
        ...bookData,
      }
    });

    return updatedBook;
  }

  async delete(id: string): Promise<BookEntity> {
    const bookToDelete = await this.prismaService.book.findUnique({
      where: { id }
    });

    await this.prismaService.$transaction(async (prisma) => {
      await this.bookAuthorPrismaDBService.disassociateAuthorsFromBook(id);
      await prisma.book.delete({
        where: { id },
      });
    });

    return bookToDelete;
  }
}
