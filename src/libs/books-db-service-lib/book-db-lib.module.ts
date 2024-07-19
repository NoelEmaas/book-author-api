import { BookAuthorDBLibModule } from '../book-author-db-service-lib/book-author-db.lib.module';
import { BooksJsonDBService } from './book-json-db.service';
import { BooksPrismaDBService } from './book-prisma-db.service';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/modules/prisma/prisma.module';

@Module({
  imports: [BookAuthorDBLibModule, PrismaModule],
  providers: [BooksPrismaDBService, BooksJsonDBService],
  exports: [BooksPrismaDBService, BooksJsonDBService],
})

export class BooksDBLibModule {}
