import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/db/models/user.entity';
import { Message } from 'src/db/models/message.entity';
import { MessageService } from './services/message.service';
import { UserService } from './services/user.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, Message])],
  providers: [MessageService, UserService],
  exports: [MessageService, UserService],
})
export class RepoModule {}
