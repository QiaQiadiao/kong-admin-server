import { Injectable } from '@nestjs/common';
import { menus } from 'src/user/user.data';

@Injectable()
export class MenuService {
  getAllMenu() {
    return {
      data: {
        list: menus,
        totalCount: menus.length,
      },
    };
  }
}
