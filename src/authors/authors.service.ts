import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';

interface AuthorFilter {
  search?: string;
  genre?: string;
  averageRating?: number;
}  

@Injectable()
export class AuthorsService {
  private authors = [];

  getAuthors({ search, genre, averageRating }: AuthorFilter) {
    const filteredAuthors = this.authors.filter((author) => {
      const matchedSearch = search ? author.fullName.includes(search) || author.penName.includes(search) : true;
      const matchedGenre = genre ? author.genres.includes(genre) : true;
      const matchedRating = averageRating ? author.averageRating === averageRating : true;
      return matchedGenre && matchedRating && matchedSearch;
    });

    return filteredAuthors;
  }

  getAuthor(id: string) {
    console.log(id);
    const authorIndex = this.authors.findIndex((author) => author.id === id);

    if (authorIndex === -1) {
      throw new Error('Author not found');
    }

    return this.authors[authorIndex];
  }

  createAuthor(createAuthorDto: CreateAuthorDto) {
    const uid = () => String(Date.now().toString(32) + Math.random().toString(16)).replace(/\./g, '');
    console.log(uid());
    const newAuthor = {
      ...createAuthorDto,
      id: uid(),
    };

    this.authors.push(newAuthor);

    return newAuthor;
  }

  updateAuthor(id: string, updateAuthorDto: CreateAuthorDto) {
    const authorIndex = this.authors.findIndex((author) => author.id === id);

    if (authorIndex === -1) {
      throw new Error('Author not found');
    }

    this.authors[authorIndex] = {
      ...this.authors[authorIndex],
      ...updateAuthorDto,
    };

    return this.authors[authorIndex];
  }

  deleteAuthor(id: string) {
    const authorToRemove = this.getAuthor(id);
    const authorIndex = this.authors.findIndex((author) => author.id === id);

    if (authorIndex === -1) {
      throw new Error('Author not found');
    }

    this.authors.splice(authorIndex, 1);

    return authorToRemove;
  }
}
