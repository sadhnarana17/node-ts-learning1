import { IsEmail, IsNotEmpty } from 'class-validator';

export default class Authenticate {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
