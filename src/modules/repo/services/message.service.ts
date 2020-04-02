import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from 'src/db/models/message.entity';

@Injectable()
export class MessageService {
  public constructor(
    @InjectRepository(Message) public readonly messageRepository: Repository<Message>,
  ) {}
}
