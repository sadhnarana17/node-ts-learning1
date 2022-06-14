import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import { BookMode } from '../../../../database/entity/Book';

class BookInput {
  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  mode: string;

  @ValidateIf((values) => values.mode === BookMode.online)
  @IsString()
  link: string;
}

export default BookInput;
