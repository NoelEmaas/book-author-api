import { IsNumber, IsString, IsDate, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateAuthorDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  penName: string;

  genres?: string[];

  @IsDate()
  dateOfBirth?: Date;

  @IsDate()
  dateOfDeath?: Date;

  @IsNumber()
  @IsPositive()
  averageRating?: number;
}