import { Body, Controller, Get, Query, Post, Put, Delete } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  getAuthors(
    @Query('search') search: string,
    @Query('genre') genre: string,
    @Query('averageRating') averageRating: number,
  ) {
    return this.authorsService.getAuthors({ search, genre, averageRating });
  }

  @Get(':id')
  getAuthor(@Query('id') id: string) {
    return this.authorsService.getAuthor(+id);
  }

  @Post()
  createAuthor(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.createAuthor(createAuthorDto);
  }

  @Put(':id')
  updateAuthor(@Query('id') id: string, @Body() updateAuthorDto: CreateAuthorDto) {
    return this.authorsService.updateAuthor(+id, updateAuthorDto);
  }

  @Delete(':id')
  deleteAuthor(@Query('id') id: string) {
    return this.authorsService.deleteAuthor(+id);
  }
}
