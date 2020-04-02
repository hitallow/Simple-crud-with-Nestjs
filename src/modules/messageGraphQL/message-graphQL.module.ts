import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/db/models/user.entity';
import { Message } from 'src/db/models/message.entity';
import { MessageService } from './services/message.service';
import { UserService } from './services/user.service';

import { UserResolver } from './resolvers/user.resolver';
import { MessageResolver } from './resolvers/message.resolver';

const graphQLImports = [UserResolver, MessageResolver];
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, Message]), ...graphQLImports],
  providers: [MessageService, UserService],
  exports: [MessageService, UserService],
})
export class MessageGraphQLModule {}
