import {
  Body,
  Controller,
  Post,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Get,
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { Department, typeFindDepPayload } from './department.type';
@Controller('department')
@UseGuards(AuthGuard)
export class DepartmentController {
  constructor(private departmentService: DepartmentService) {}

  // 获取所有部门列表
  @Get('/all')
  getAllDepartmentList() {
    return this.departmentService.getAllDepartmentList();
  }

  // 获取当前部门列表
  @Post('/list')
  postDepartmentList(@Body() body: typeFindDepPayload) {
    if (
      body.offset === null ||
      body.offset === undefined ||
      body.size === null ||
      body.offset === undefined
    ) {
      throw new Error('请求失败: 请求参数必须包含offset和size');
    }
    const { offset, size } = body;
    return this.departmentService.postDepList(size, offset);
  }

  // 更新当前展现部门列表
  @Post('/update')
  updateUserList(@Body() body: typeFindDepPayload) {
    this.departmentService.findDepDetailInfo(body);
  }

  // 删除一个部门
  @Delete('/delete/:id')
  deleteOneUser(@Param('id', ParseIntPipe) id: number) {
    this.departmentService.deleteOneDep(id);
  }

  // 新建一个用户
  @Post('/create')
  createOneUser(@Body() body: Department) {
    this.departmentService.createOneDep(body);
  }

  // 更改一个用户
  @Patch('/edit')
  editOneUser(@Body() editInfo: Department) {
    this.departmentService.editOneDep(editInfo);
  }
}
