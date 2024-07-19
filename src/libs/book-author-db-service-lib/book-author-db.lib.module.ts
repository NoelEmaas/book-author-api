import { BookAuthorPrismaDBService } from './book-author-prisma-db.service';
import { BookAuthorJsonDBService } from './book-author-json-db.service';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/modules/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [BookAuthorPrismaDBService, BookAuthorJsonDBService],
  exports: [BookAuthorPrismaDBService, BookAuthorJsonDBService],
})

export class BookAuthorDBLibModule {}
