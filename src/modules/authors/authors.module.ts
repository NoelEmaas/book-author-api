import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { AuthorsJsonDBService } from './authors-json-db.service';
import { BooksModule } from '../books/books.module';
import { forwardRef, Module } from '@nestjs/common';

@Module({
  imports: [forwardRef(() => BooksModule)],
  controllers: [AuthorsController],
  providers: [AuthorsService, AuthorsJsonDBService],
  exports: [AuthorsJsonDBService],
})

export class AuthorsModule {}
