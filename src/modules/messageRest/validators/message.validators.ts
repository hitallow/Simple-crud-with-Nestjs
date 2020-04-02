import { IsNumber, IsString, IsNumberString } from 'class-validator';

export class CreateMessage {
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    {
      message: 'O campo user_id é obrigatório e numérico',
    },
  )
  user_id: number;
  @IsString({
    message: 'O content é obrigatório',
  })
  content: string;
}

export class DeleteMessage {
  @IsNumberString()
  id: number;
}
