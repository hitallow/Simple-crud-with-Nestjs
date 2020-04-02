import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './modules/repo/services/user.service';
import { MessageService } from './modules/repo/services/message.service';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly messageService: MessageService,
    private readonly userService: UserService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/messages')
  async getTotalMessages() {
    return `Total de livros ${await this.messageService.messageRepository.count()}`;
  }
  @Get('/users')
  async getTotalUsers() {
    return this.userService.userRepository.count();
  }
}
