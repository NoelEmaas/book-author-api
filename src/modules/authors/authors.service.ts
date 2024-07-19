import { AuthorEntity } from './entities/author.entity';
import { AuthorsJsonDBService } from 'src/libs/authors-db-service-lib/authors-json-db.service';  
import { AuthorsPrismaDBService } from 'src/libs/authors-db-service-lib/authors-prisma-db.service';
import { AuthorsServiceBase } from './authors-abstract.service';
import { CreateAuthorDto, UpdateAuthorDto } from './dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BookEntity } from '../books/entities/book.entity';
import { BookAuthorJsonDBService } from 'src/libs/book-author-db-service-lib/book-author-json-db.service';
import { BookAuthorPrismaDBService } from 'src/libs/book-author-db-service-lib/book-author-prisma-db.service';

@Injectable()
export class AuthorsService implements AuthorsServiceBase {
  constructor(
    private readonly authorsDbService: AuthorsPrismaDBService,
    private readonly bookAuthorDbService: BookAuthorPrismaDBService,
  ) {}

  async getAuthors(authorFilter: { search?: string, genres?: string[], averageRating?: number }): Promise<AuthorEntity[]> {
    return await this.authorsDbService.getAll(authorFilter);
  }

  async getAuthor(id: string): Promise<AuthorEntity> {
    const author = await this.authorsDbService.get(id);

    if (!author) {
      throw new NotFoundException('Author you are trying to get does not exist');
    }

    return author;
  }

  async getAuthoredBooks(id: string): Promise<BookEntity[]> {
    const author = await this.authorsDbService.get(id);

    if (!author) {
      throw new NotFoundException('Author you are trying to get books does not exist');
    }

    return await this.bookAuthorDbService.getAllBooksFromAuthor(id);
  }

  async createAuthor(createAuthorDto: CreateAuthorDto): Promise<AuthorEntity> {
    return await this.authorsDbService.create(createAuthorDto);
  }

  async addAuthoredBooks(id: string, bookIDs: string[]): Promise<BookEntity[]> {
    const author = await this.authorsDbService.get(id);

    if (!author) {
      throw new NotFoundException('Author you are trying to add books does not exist');
    }

    await this.bookAuthorDbService.associateBooksToAuthor(id, bookIDs);
    return await this.getAuthoredBooks(id);
  }

  async removeAuthoredBooks(id: string, bookIDs: string[]): Promise<BookEntity[]> {
    const author = await this.authorsDbService.get(id);

    if (!author) {
      throw new NotFoundException('Author you are trying to remove books does not exist');
    }

    await this.bookAuthorDbService.disassociateBooksFromAuthor(id, bookIDs);
    return await this.getAuthoredBooks(id);
  }

  async updateAuthor(id: string, updateAuthorDto: UpdateAuthorDto): Promise<AuthorEntity> {
    const authorToUpdate = await this.authorsDbService.get(id);

    if (!authorToUpdate) {
      throw new NotFoundException('Author you are trying to update does not exist');
    }

    return this.authorsDbService.update(id, updateAuthorDto);
  }

  async deleteAuthor(id: string): Promise<AuthorEntity> {
    const authorToRemove = await this.authorsDbService.get(id);

    if (!authorToRemove) {
      throw new NotFoundException('Author you are trying to delete does not exist');
    }

    this.authorsDbService.delete(id);
    return authorToRemove;
  }

}
