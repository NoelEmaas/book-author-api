import { AuthorsJsonDBService } from '../authors/authors-json-db.service';
import { BooksController } from './books.controller';
import { BooksJsonDBService } from './books-json-db.service';
import { BooksService } from './books.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [BooksController],
  providers: [AuthorsJsonDBService, BooksService, BooksJsonDBService]
})

export class BooksModule {}
