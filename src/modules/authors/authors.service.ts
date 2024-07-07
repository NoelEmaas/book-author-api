import { AuthorsJsonDBService } from './authors-json-db.service';  
import { AuthorsServiceBase } from './authors-abstract.service';
import { AuthorType } from 'src/types/author.types';
import { BooksJsonDBService } from '../books/books-json-db.service';
import { BookType } from 'src/types/book.types';
import { CreateAuthorDto, UpdateAuthorDto } from './dto';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AuthorsService implements AuthorsServiceBase {
  constructor(
    private readonly authorsJsonDBservice: AuthorsJsonDBService,
    private readonly booksJsonDBService: BooksJsonDBService
  ) {}

  getAuthors(authorFilter: Partial<AuthorType> & { search?: string }): AuthorType[] {
    return this.authorsJsonDBservice.getAll(authorFilter);
  }

  getAuthor(id: string): AuthorType {
    const author = this.authorsJsonDBservice.get(id);

    if (!author) {
      throw new NotFoundException('Author you are trying to get does not exist');
    }

    return author;
  }

  getAuthoredBooks(id: string): BookType[] {
    const authoredBooks = this.booksJsonDBService.getAll({ authorIds: [id] });
    return authoredBooks;
  }

  createAuthor(createAuthorDto: CreateAuthorDto): AuthorType {
    return this.authorsJsonDBservice.create(createAuthorDto);
  }

  updateAuthor(id: string, updateAuthorDto: UpdateAuthorDto): AuthorType {
    const authorToUpdate = this.authorsJsonDBservice.get(id);

    if (!authorToUpdate) {
      throw new NotFoundException('Author you are trying to update does not exist');
    }

    return this.authorsJsonDBservice.update(id, updateAuthorDto);
  }

  deleteAuthor(id: string): AuthorType {
    const authorToRemove = this.authorsJsonDBservice.get(id);
    const authoredBooks = this.getAuthoredBooks(id);

    if (!authorToRemove) {
      throw new NotFoundException('Author you are trying to delete does not exist');
    }

    if (authoredBooks.length > 0) {
      throw new BadRequestException('Author you are trying to delete has authored books');
    }

    this.authorsJsonDBservice.delete(id);
    return authorToRemove;
  }

}
