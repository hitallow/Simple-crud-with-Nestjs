import {
  Controller,
  Get,
  Param,
  HttpStatus,
  Post,
  Body,
  HttpException,
} from '@nestjs/common';
import { UserService } from '../../messageGraphQL/services/user.service';
import { User } from 'src/db/models/user.entity';
import { UserCreate, FindMessages } from '../validators/user.validator';

@Controller('users')
export class UserController {
  constructor(protected userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.userRepository.find();
  }

  @Get(':id/messages')
  public async findMessagesFromUser(@Param() params: FindMessages) {
    const user = await this.userService.userRepository.findOne(params.id);
    return user.messages;
  }

  @Get(':id')
  async findOne(@Param() params: { id: string }): Promise<User | any> {
    const result = await this.userService.userRepository.findOne(params.id);

    if (!result)
      throw new HttpException('Entity not found', HttpStatus.NOT_FOUND);

    return result;
  }

  @Post()
  public async createUser(@Body() body: UserCreate) {
    let user = await this.userService.userRepository.findOne({
      where: {
        email: body.email,
      },
    });
    if (user) return user;
    user = this.userService.userRepository.create({
      email: body.email,
    });
    return this.userService.userRepository.save(user);
  }
}
