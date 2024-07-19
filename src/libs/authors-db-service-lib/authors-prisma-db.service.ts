import { AuthorEntity } from 'src/modules/authors/entities/author.entity';
import { CreateAuthorDto, UpdateAuthorDto } from 'src/modules/authors/dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { BookAuthorPrismaDBService } from '../book-author-db-service-lib/book-author-prisma-db.service';

@Injectable()
export class AuthorsPrismaDBService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly bookAuthorPrismaDBService: BookAuthorPrismaDBService
  ) {}

  async getAll(authorFilter: { search?: string, genres?: string[], averageRating?: number }): Promise<AuthorEntity[]> {
    const whereClause: any = {};

    if (authorFilter.search) {
      whereClause.OR = [{ fullName: { contains: authorFilter.search } }, { penName: { contains: authorFilter.search } }];
    }

    if (authorFilter.genres) {
      whereClause.genres = { hasSome: authorFilter.genres };
    }

    if (authorFilter.averageRating) {
      whereClause.averageRating = authorFilter.averageRating;
    }

    const authors = await this.prismaService.author.findMany({
      where: whereClause,
    });
  
    return authors;
  }

  async get(id: string): Promise<AuthorEntity> {
    const author = await this.prismaService.author.findUnique({
      where: { 
        id 
      }
    });

    return author;
  }

  async create(createAuthorDto: CreateAuthorDto): Promise<AuthorEntity> {
    const { books, ...authorInfo } = createAuthorDto;

    const newAuthor = await this.prismaService.author.create({
      data: {
        ...authorInfo,
      }
    });

    return newAuthor;
  }

  async update(id: string, updateAuthorDto: UpdateAuthorDto): Promise<AuthorEntity> {
    const { books, ...authorInfo } = updateAuthorDto;

    const updatedAuthor = await this.prismaService.author.update({
      where: { id },
      data: {
        ...authorInfo,
      }
    });

    return updatedAuthor;
  }

  async delete(id: string): Promise<AuthorEntity> {
    const authorToDelete = await this.prismaService.author.findUnique({
      where: { id },
    });

    await this.prismaService.$transaction(async (prisma) => {
      await this.bookAuthorPrismaDBService.disassociateBooksFromAuthor(id);
      await prisma.author.delete({
        where: { id },
      });
    });

    return authorToDelete;
  }
}
