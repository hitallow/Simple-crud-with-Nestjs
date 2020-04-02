import { IsEmail, IsNumberString } from 'class-validator';

export class UserCreate {
  @IsEmail(
    {},
    {
      message: 'Este email é invalido',
    },
  )
  email: string;
}

export class FindMessages {
  @IsNumberString({
    message: 'O ID é obrigatório.',
  })
  id: number;
}
