import { Injectable } from '@nestjs/common';
import { departments } from './department.data';
@Injectable()
export class DepartmentService {
  getAllDepartmentList() {
    return {
      code: 0,
      list: departments,
    };
  }
}
