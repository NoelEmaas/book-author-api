import { AuthorEntity } from 'src/modules/authors/entities/author.entity';
import { BookAuthorJsonDBService } from '../book-author-db-service-lib/book-author-json-db.service';
import { CreateAuthorDto, UpdateAuthorDto } from 'src/modules/authors/dto';
import { generateID } from 'src/common/helpers/utils';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthorsJsonDBService {
  constructor(private bookAuthorJsonDBService: BookAuthorJsonDBService) {}

  async getAll({ search, genres, averageRating }: {search?: string, genres?: string[], averageRating?: number}): Promise<AuthorEntity[]> {
    const filteredAuthors = this.bookAuthorJsonDBService.authors.filter((author) => {
      const matchedSearch = search ? author.fullName.includes(search) || author.penName.includes(search) : true;
      const matchedGenre = genres ? author.genres.some(genre => genres.includes(genre)) : true;
      const matchedRating = averageRating ? author.averageRating === averageRating : true;
      return matchedGenre && matchedRating && matchedSearch;
    });

    return filteredAuthors;
  }

  async get(id: string): Promise<AuthorEntity | null> {
    const author = this.bookAuthorJsonDBService.authors.find((author) => author.id === id);
    return author || null;
  }

  async create(createAuthorDto: CreateAuthorDto): Promise<AuthorEntity> {
    const newAuthor = {
      ...createAuthorDto,
      id: generateID(),
    };

    newAuthor.books = [];
    this.bookAuthorJsonDBService.authors.push(newAuthor);
    return newAuthor;
  }

  async update(id: string, updateAuthorDto: UpdateAuthorDto): Promise<AuthorEntity> {
    const authorIndex = this.bookAuthorJsonDBService.authors.findIndex((author) => author.id === id);
    this.bookAuthorJsonDBService.authors[authorIndex] = {
      ...this.bookAuthorJsonDBService.authors[authorIndex],
      ...updateAuthorDto,
    };

    const updatedAuthor = this.bookAuthorJsonDBService.authors[authorIndex];
    updatedAuthor.books = await this.bookAuthorJsonDBService.getAllBooksFromAuthor(updatedAuthor.id);
    return updatedAuthor;
  }

  async delete(id: string): Promise<void> {
    const authorIndex = this.bookAuthorJsonDBService.authors.findIndex((author) => author.id === id);
    this.bookAuthorJsonDBService.disassociateBooksFromAuthor(id);
    this.bookAuthorJsonDBService.authors.splice(authorIndex, 1);
  }

}