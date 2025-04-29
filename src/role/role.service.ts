import { Injectable } from '@nestjs/common';
import { roles } from './role.data';

@Injectable()
export class RoleService {
  getRolesList() {
    return {
      code: 0,
      list: roles,
    };
  }
}
