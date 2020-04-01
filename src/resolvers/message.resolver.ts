import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Message } from 'src/db/models/message.entity';
import { RepoService } from 'src/modules/repo/services/repo.service';
import { MessageInput } from './input/message.input';

@Resolver()
export class MessageResolver {
  constructor(protected repoService: RepoService) {}
  @Query(() => [Message])
  public messages(): Promise<Message[]> {
    return this.repoService.messageRepo.find();
  }

  @Query(() => Message)
  public getUser(@Args('id') id: string): Promise<Message> {
    return this.repoService.messageRepo.findOne(id);
  }
  @Mutation(() => Message)
  public async message(@Args('data') data: MessageInput) {
    const message = this.repoService.messageRepo.create({
      content: data.content,
      userId: data.user_id,
    });

    return await this.repoService.messageRepo.save(message);
  }
}
