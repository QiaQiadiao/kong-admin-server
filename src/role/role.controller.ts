import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleService } from './role.service';

@Controller('role')
@UseGuards(AuthGuard)
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post('/list')
  getRolesList() {
    return this.roleService.getRolesList();
  }
}
