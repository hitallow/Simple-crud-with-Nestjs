import { Module } from '@nestjs/common';
import { MessageController } from './controllers/message.controller';
import { UserController } from './controllers/user.controller';

@Module({
  controllers: [MessageController, UserController],
})
export class MessageRestModule {}
