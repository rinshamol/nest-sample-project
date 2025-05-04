import { Controller, Get, Req } from '@nestjs/common';

@Controller('admin')
export class AdminController {
  @Get()
  index(): string {
    return 'Admin page';
  }
}
