import { Controller, Post } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
@Controller('department')
@UseGuards(AuthGuard)
export class DepartmentController {
  constructor(private departmentService: DepartmentService) {}

  @Post('/list')
  getAllDepartmentList() {
    return this.departmentService.getAllDepartmentList();
  }
}
