import { AuthorType } from 'src/types/author.types';
import { CreateAuthorDto, UpdateAuthorDto } from './dto';
import { generateID, loadDataFromJSON } from 'src/common/helpers/utils';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthorsJsonDBService {
  private authors = loadDataFromJSON<AuthorType>('authors');

  getAll({ search, genres, averageRating }: Partial<AuthorType> & { search?: string }): AuthorType[] {
    const filteredAuthors = this.authors.filter((author) => {
      const matchedSearch = search ? author.fullName.includes(search) || author.penName.includes(search) : true;
      const matchedGenre = genres ? author.genres.some(genre => genres.includes(genre)) : true;
      const matchedRating = averageRating ? author.averageRating === averageRating : true;
      return matchedGenre && matchedRating && matchedSearch;
    });

    return filteredAuthors;
  }

  get(id: string) {
    const author = this.authors.find((author) => author.id === id);
    return author || null;
  }

  create(createAuthorDto: CreateAuthorDto): AuthorType {
    const newAuthor = {
      ...createAuthorDto,
      id: generateID(),
    };

    this.authors.push(newAuthor);
    return newAuthor;
  }

  update(id: string, updateAuthorDto: UpdateAuthorDto): AuthorType {
    const authorIndex = this.authors.findIndex((author) => author.id === id);
    this.authors[authorIndex] = {
      ...this.authors[authorIndex],
      ...updateAuthorDto,
    };

    return this.authors[authorIndex];
  }

  delete(id: string): void {
    const authorIndex = this.authors.findIndex((author) => author.id === id);
    this.authors.splice(authorIndex, 1);
  }

}
