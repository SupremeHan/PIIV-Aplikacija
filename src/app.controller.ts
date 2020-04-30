import { Controller, Get } from '@nestjs/common';


@Controller()
export class AppController {

  @Get()
  getHello(): string {
    return 'Hello mudafuka!';
  }

  @Get('w')
  getWorld(): string {
    return 'World modafaka!'
  }
}
