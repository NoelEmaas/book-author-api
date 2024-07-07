import { AuthorType } from "src/types/author.types";
import { CreateAuthorDto, UpdateAuthorDto } from "./dto";

export abstract class AuthorsServiceBase {
  abstract getAuthors(authorFilter: Partial<AuthorType> & { search?: string }): AuthorType[];
  abstract getAuthor(id: string): AuthorType | null;
  abstract createAuthor(createAuthorDto: CreateAuthorDto): AuthorType;
  abstract updateAuthor(id: string, updateAuthorDto: UpdateAuthorDto): AuthorType;
  abstract deleteAuthor(id: string): void;
}