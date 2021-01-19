import { IsEmail, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString({ always: true })
  @MaxLength(100, { always: true })
  @IsEmail({ require_tld: false }, { always: true })
  email: string;

  @IsString({ always: true })
  password: string;

  @IsString({ always: true })
  firstName: string;

  @IsString({ always: true })
  lastName: string;
}

export class UpdateUserDto extends CreateUserDto {}
