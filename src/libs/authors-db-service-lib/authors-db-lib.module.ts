import { AuthorsJsonDBService } from './authors-json-db.service';
import { AuthorsPrismaDBService } from './authors-prisma-db.service';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { BookAuthorDBLibModule } from '../book-author-db-service-lib/book-author-db.lib.module';

@Module({
  imports: [BookAuthorDBLibModule, PrismaModule],
  providers: [AuthorsJsonDBService, AuthorsPrismaDBService],
  exports: [AuthorsJsonDBService, AuthorsPrismaDBService],
})

export class AuthorsDBLibModule {}
