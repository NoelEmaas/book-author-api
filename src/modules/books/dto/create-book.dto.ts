import { BookEntity } from '../entities/book.entity';
import { OmitType } from '@nestjs/mapped-types';

export class CreateBookDto extends OmitType(BookEntity, ['id']) {}