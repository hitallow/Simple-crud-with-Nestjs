import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { RepoService } from './modules/repo/services/repo.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly repoService: RepoService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/messages')
  async getTotalMessages() {
    return  `Total de livros ${await this.repoService.messageRepo.count()}`;
  }
  @Get('/users')
  async getTotalUsers(){
    return this.repoService.userRepo.count()
  }
}
