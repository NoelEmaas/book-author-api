import { Body, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { Controller, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getBooks(
    @Query('genre') genre: string,
    @Query('authorId') authorId: number,
  ) {
    return this.booksService.getBooks({ genre, authorId });
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
