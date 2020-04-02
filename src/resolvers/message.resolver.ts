import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Message } from 'src/db/models/message.entity';
import { MessageInput } from './input/message.input';
import { MessageService} from '../modules/repo/services/message.service'
@Resolver(() => Message)
export class MessageResolver {
  constructor(protected messageService: MessageService) {}
  @Query(() => [Message])
  public messages(): Promise<Message[]> {
    return this.messageService.messageRepository.find();
  }

  @Query(() => Message)
  public getUser(@Args('id') id: string): Promise<Message> {
    return this.messageService.messageRepository.findOne(id);
  }

  @Mutation(() => Message)
  public async message(@Args('data') data: MessageInput) {
    const message = this.messageService.messageRepository.create({
      content: data.content,
      userId: data.user_id,
    });

    return await this.messageService.messageRepository.save(message);
  }

  @Mutation(() => Message, { nullable: true })
  public async deleteMessage(@Args('id') id: number) {
    const message = await this.messageService.messageRepository.findOne(id);
    if (!message) return null;
    await this.messageService.messageRepository.remove({
      ...message,
    });
    return message;
  }
}
