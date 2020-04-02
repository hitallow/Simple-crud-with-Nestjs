import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  HttpStatus,
  HttpException,
  Delete,
} from '@nestjs/common';
import { MessageService } from 'src/modules/messageGraphQL/services/message.service';

import { CreateMessage, DeleteMessage } from '../validators/message.validators';
import { QueryFailedError } from 'typeorm';

@Controller('messages')
export class MessageController {
  
  constructor(protected messageService: MessageService) {}

  @Get()
  findAll() {
    return this.messageService.messageRepository.find();
  }
  @Get(':id')
  findOne(@Param() params: { id: string }) {
    return this.messageService.messageRepository.findOne(params.id);
  }

  @Post()
  public async insertMessage(@Body() body: CreateMessage) {
    const message = this.messageService.messageRepository.create({
      content: body.content,
      userId: body.user_id,
    });
    try {
      await this.messageService.messageRepository.save(message);
      return message;
    } catch (e) {
      if (e instanceof QueryFailedError)
        throw new HttpException(
          {
            message: 'Usuário não encontrado',
          },
          HttpStatus.NOT_FOUND,
        );
    }
  }

  @Delete(':id')
  public async deleteMessage(@Param() params: DeleteMessage) {
    if (!params.id)
      throw new HttpException(
        {
          message: 'ID is required',
        },
        HttpStatus.BAD_REQUEST,
      );
    const message = await this.messageService.messageRepository.findOne(
      params.id,
    );
    if (!message)
      throw new HttpException(
        {
          message: 'Entity NOT FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    this.messageService.messageRepository.remove(message);
    return;
  }
}
