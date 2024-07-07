import { AuthorType } from 'src/types/author.types';
import { CreateAuthorDto, UpdateAuthorDto } from './dto';
import { Injectable } from '@nestjs/common';

import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class AuthorsJsonDBService {
  private filePath =  path.join(process.cwd(), 'data', 'authors.json');
  private authors = [];

  constructor() {
    this.loadAuthorsFromJSON();
  }

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
    const uid = () => String(Date.now().toString(32) + Math.random().toString(16)).replace(/\./g, '');
    const newAuthor = {
      ...createAuthorDto,
      id: uid(),
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

  private loadAuthorsFromJSON() {
    return fs.readFile(this.filePath, 'utf-8').then((data) => {
      this.authors = JSON.parse(data);
    });
  }
}
