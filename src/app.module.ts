import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './modules/books/books.module';
import { AuthorsModule } from './modules/authors/authors.module';

@Module({
  imports: [BooksModule, AuthorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
