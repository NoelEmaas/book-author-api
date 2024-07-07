import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { AuthorsJsonDBService } from './authors-json-db.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [AuthorsController],
  providers: [AuthorsService, AuthorsJsonDBService]
})

export class AuthorsModule {}
