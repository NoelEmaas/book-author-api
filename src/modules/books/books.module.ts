import { BooksController } from './books.controller';
import { BooksJsonDBService } from './books-json-db.service';
import { BooksService } from './books.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [BooksController],
  providers: [BooksService, BooksJsonDBService]
})

export class BooksModule {}
