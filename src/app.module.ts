import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorsModule } from './modules/authors/authors.module';
import { BooksModule } from './modules/books/books.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [BooksModule, AuthorsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
