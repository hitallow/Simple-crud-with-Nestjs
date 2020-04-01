import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { User } from '../db/models/user.entity';
import { RepoService } from 'src/modules/repo/services/repo.service';
import { UserInput } from './input/user.input';

@Resolver()
export class UserResolver {
  constructor(protected repoService: RepoService) {}
  @Query(() => [User])
  public users(): Promise<User[]> {
    return this.repoService.userRepo.find();
  }

  @Query(() => User)
  public getUser(@Args('id') id: string): Promise<User> {
    return this.repoService.userRepo.findOne(id);
  }

  @Mutation(() => User)
  public createUser(@Args('data') { email }: UserInput): Promise<User> {
    const user = this.repoService.userRepo.create({
      email,
    });
    return this.repoService.userRepo.save(user);
  }
}
