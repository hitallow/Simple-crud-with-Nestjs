import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/db/models/user.entity';
import { Repository } from 'typeorm';
import { Message } from 'src/db/models/message.entity';

@Injectable()
export class RepoService {
  public constructor(
    @InjectRepository(User) public readonly userRepo : Repository<User>,
    @InjectRepository(Message) public readonly messageRepo : Repository<Message>
  ) {}
}
