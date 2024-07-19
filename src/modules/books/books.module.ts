import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { BooksDBLibModule } from 'src/libs/books-db-service-lib/book-db-lib.module';
import { BookAuthorDBLibModule } from 'src/libs/book-author-db-service-lib/book-author-db.lib.module';

@Module({
  imports: [BooksDBLibModule, BookAuthorDBLibModule, PrismaModule],
  controllers: [BooksController],
  providers: [BooksService],
})

export class BooksModule {}
