import { Controller, UseGuards, Post } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { MenuService } from './menu.service';
@Controller('menu')
@UseGuards(AuthGuard)
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Post('/list')
  GetAllMenu() {
    return this.menuService.getAllMenu();
  }
}
