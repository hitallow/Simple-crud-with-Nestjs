import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { User } from '../db/models/user.entity';
import { UserInput } from './input/user.input';
import { UserService } from '../modules/repo/services/user.service';
@Resolver(() => User)
export class UserResolver {
  constructor(protected userService: UserService) {}

  @Query(() => [User])
  public users(): Promise<User[]> {
    return this.userService.userRepository.find();
  }

  @Query(() => User)
  public getUser(@Args('id') id: string): Promise<User> {
    return this.userService.userRepository.findOne(id);
  }

  @Mutation(() => User)
  public createUser(@Args('data') { email }: UserInput): Promise<User> {
    const user = this.userService.userRepository.create({
      email,
    });
    return this.userService.userRepository.save(user);
  }
}
