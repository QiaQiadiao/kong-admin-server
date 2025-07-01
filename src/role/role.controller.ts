import {
  Controller,
  Post,
  UseGuards,
  Body,
  Param,
  ParseIntPipe,
  Get,
  Delete,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleService } from './role.service';
import { Role, typeFindRole } from './role.type';

@Controller('role')
@UseGuards(AuthGuard)
export class RoleController {
  constructor(private roleService: RoleService) {}

  // 获取角色列表
  @Get('/all')
  getRolesList() {
    return this.roleService.getRolesList();
  }

  // 获取当前角色信息列表
  @Post('/list')
  postRoleList(@Body() body: typeFindRole) {
    if (
      body.offset === null ||
      body.offset === undefined ||
      body.size === null ||
      body.offset === undefined
    ) {
      throw new Error('请求失败: 请求参数必须包含offset和size');
    }
    const { offset, size } = body;
    return this.roleService.postRoleInfo(size, offset);
  }

  // 删除一个角色
  @Delete('/delete/:id')
  deleteOneRole(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.deleteOneRole(id);
  }

  // 新建一个角色
  @Post('/create')
  createOneRole(@Body() roleInfo: Role) {
    this.roleService.createOneRole(roleInfo);
  }

  // 更新当前展现的角色列表
  @Post('/update')
  updateRoleList(@Body() body: typeFindRole) {
    this.roleService.findRole(body);
  }

  // 编辑一个角色
  @Patch('/edit')
  editRole(@Body() body: Role) {
    this.roleService.editRole(body);
  }
}
