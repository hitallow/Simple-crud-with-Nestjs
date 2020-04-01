import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/db/models/user.entity';
import { Message } from 'src/db/models/message.entity';
import { RepoService } from './services/repo.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, Message])],
  providers: [RepoService],
  exports: [RepoService],
})
export class RepoModule {}
