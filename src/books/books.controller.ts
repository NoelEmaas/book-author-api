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

  @Post()
  createBook(@Body(new ValidationPipe()) createBookDto: CreateBookDto) {
    return this.booksService.createBook(createBookDto);
  }

  @Put(':id')
  updateBook(@Param('id') id: string, @Body(new ValidationPipe()) updateBookDto: UpdateBookDto) {
    return this.booksService.updateBook(id, updateBookDto);
  }

  @Delete(':id')
  deleteBook(@Param('id') id: string) {
    return this.booksService.deleteBook(id);
  }

}
