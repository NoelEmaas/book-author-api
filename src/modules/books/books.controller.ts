import { Body, Delete, Get, Inject, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksServiceBase } from './books-abstract.service';
import { Controller, Query } from '@nestjs/common';
import { CreateBookDto, UpdateBookDto } from './dto';

@Controller('books')
export class BooksController {
  constructor(
    @Inject(BooksService)
    private readonly booksService: BooksServiceBase
  ) {}

  @Get()
  getBooks(
    @Query('search') search: string,
    @Query('genre') genre: string,
    @Query('authorIds') authorIds: string[],
  ) {
    return this.booksService.getBooks({ search, genre, authorIds });
  }

  @Get(':id')
  getBook(@Param('id') id: string) {
    return this.booksService.getBook(id);
  }

  @Get(':id/authors')
  getBookAuthors(@Param('id') id: string) {
    return this.booksService.getBookAuthors(id);
  }

  @Post()
  createBook(@Body(new ValidationPipe()) createBookDto: CreateBookDto) {
    return this.booksService.createBook(createBookDto);
  }

  @Post(':id/authors')
  addBookAuthors(
    @Param('id') id: string, 
    @Body('authorIds') authorIds: string[]
  ) {
    return this.booksService.addBookAuthors(id, authorIds);
  }

  @Delete(':id/authors')
  removeBookAuthors(
    @Param('id') id: string, 
    @Body('authorIds') authorIds: string[]
  ) {
    return this.booksService.removeBookAuthors(id, authorIds);
  }

  @Put(':id')
  updateBook(
    @Param('id') id: string, 
    @Body(new ValidationPipe()) updateBookDto: UpdateBookDto
  ) {
    return this.booksService.updateBook(id, updateBookDto);
  }

  @Delete(':id')
  deleteBook(@Param('id') id: string) {
    return this.booksService.deleteBook(id);
  }
}

