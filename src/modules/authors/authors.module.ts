import { AuthorsController } from './authors.controller';
import { AuthorsDBLibModule } from 'src/libs/authors-db-service-lib/authors-db-lib.module';
import { AuthorsService } from './authors.service';
import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { BookAuthorDBLibModule } from 'src/libs/book-author-db-service-lib/book-author-db.lib.module';

@Module({
  imports: [AuthorsDBLibModule, BookAuthorDBLibModule, PrismaModule],
  controllers: [AuthorsController],
  providers: [AuthorsService],
})

export class AuthorsModule {}
