import { AuthorEntity } from '../entities/author.entity';
import { OmitType } from '@nestjs/mapped-types';

export class CreateAuthorDto extends OmitType(AuthorEntity, ['id']) {}