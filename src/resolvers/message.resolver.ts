import { Resolver, Query, Args, Mutation, Subscription } from '@nestjs/graphql';
import { Message } from 'src/db/models/message.entity';
import { MessageInput } from './input/message.input';
import { MessageService } from '../modules/repo/services/message.service';
import { PubSub } from 'graphql-subscriptions';

export const MESSAGE_ADDED = 'messageAdded';

const pubSub = new PubSub();
@Resolver(() => Message)
export class MessageResolver {
  constructor(protected messageService: MessageService) {}
  @Query(() => [Message])
  public messages(): Promise<Message[]> {
    return this.messageService.messageRepository.find();
  }

  @Mutation(() => Message)
  public async message(@Args('data') data: MessageInput) {
    const message = this.messageService.messageRepository.create({
      content: data.content,
      userId: data.user_id,
    });

    const response = await this.messageService.messageRepository.save(message);

    pubSub.publish(MESSAGE_ADDED, { [MESSAGE_ADDED]: message });

    return response;
  }

  @Subscription(() => Message)
  public async messageAdded() {
    return pubSub.asyncIterator(MESSAGE_ADDED);
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
