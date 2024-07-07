import { AuthorsModule } from '../authors/authors.module';
import { BooksController } from './books.controller';
import { BooksJsonDBService } from './books-json-db.service';
import { BooksService } from './books.service';
import { forwardRef, Module } from '@nestjs/common';

@Module({
  imports: [forwardRef(() => AuthorsModule)],
  controllers: [BooksController],
  providers: [BooksService, BooksJsonDBService],
  exports: [BooksJsonDBService],
})

export class BooksModule {}
