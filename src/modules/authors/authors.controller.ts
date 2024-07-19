import { Body, Controller, Get, Query, Post, Put, Delete, ValidationPipe, Param, Inject } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsServiceBase } from './authors-abstract.service';
import { CreateAuthorDto } from './dto/create-author.dto';

@Controller('authors')
export class AuthorsController {
  constructor(
    @Inject(AuthorsService)
    private readonly authorsService: AuthorsServiceBase
  ) {}

  @Get()
  getAuthors(
    @Query('search') search: string,
    @Query('genres') genres: string[],
    @Query('averageRating') averageRating: number,
  ) {
    return this.authorsService.getAuthors({ search, genres, averageRating });
  }

  @Get(':id')
  getAuthor(@Param('id') id: string) {
    return this.authorsService.getAuthor(id);
  }

  @Get(':id/books')
  getAuthoredBooks(@Param('id') id: string) {
    return this.authorsService.getAuthoredBooks(id);
  }

  @Post()
  createAuthor(@Body(new ValidationPipe()) createAuthorDto: CreateAuthorDto) {
    return this.authorsService.createAuthor(createAuthorDto);
  }

  @Post(':id/books')
  addAuthoredBooks(
    @Param('id') id: string, 
    @Body('bookIds') bookIds: string[]
  ) {
    return this.authorsService.addAuthoredBooks(id, bookIds);
  }

  @Delete(':id/books')
  removeAuthoredBooks(
    @Param('id') id: string, 
    @Body('bookIds') bookIds: string[]
  ) {
    return this.authorsService.removeAuthoredBooks(id, bookIds);
  }

  @Put(':id')
  updateAuthor(
    @Param('id') id: string, 
    @Body(new ValidationPipe()) updateAuthorDto: CreateAuthorDto
  ) {
    return this.authorsService.updateAuthor(id, updateAuthorDto);
  }

  @Delete(':id')
  deleteAuthor(@Param('id') id: string) {
    return this.authorsService.deleteAuthor(id);
  }
}
