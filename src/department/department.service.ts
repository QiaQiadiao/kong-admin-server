import { Injectable } from '@nestjs/common';
import { departments } from './department.data';
import {
  Department,
  typeCreateDep,
  typeFindDepPayload,
} from './department.type';
@Injectable()
export class DepartmentService {
  getAllDepartmentList() {
    return {
      code: 0,
      list: departments,
    };
  }

  private showDetailInfo = [...departments];
  postDepList(size: number, offset: number) {
    const res: Department[] = []; // 用来返回此次调用接口该展现的数据
    let count = 0;
    for (let i = offset; i < this.showDetailInfo.length; i++) {
      res.push(this.showDetailInfo[i]);
      if (++count === size) break;
    }
    return {
      data: {
        list: res,
        totalCount: this.showDetailInfo.length, // 符合条件的总共有多少条数据
      },
    };
  }

  // 删除一个部门
  deleteOneDep(id: number) {
    //先在对应显示的数据数组找是否有目标数据
    const idx = this.showDetailInfo.findIndex((item) => item.id === id);
    if (idx !== -1) this.showDetailInfo.splice(idx, 1);
    //再删除数据库中的
    const i = departments.findIndex((item) => item.id === id);
    if (i !== -1) departments.splice(i, 1);
  }

  // 查询部门列表(detailInfo)
  findDepDetailInfo(payload: typeFindDepPayload) {
    const cnd = new Map();
    for (const key in payload) {
      if (payload[key] === '') continue;
      cnd.set(key, payload[key]);
    }
    if (cnd.size === 0) {
      this.showDetailInfo = [...departments];
      return;
    }
    this.showDetailInfo = departments.filter((item) => {
      for (const [key, value] of cnd) {
        if (item[key] !== value) return false;
      }
      return true;
    });
  }

  // 新建一个部门
  createOneDep(DepInfo: typeCreateDep) {
    const { name, parentId, leader } = DepInfo;
    const newId = departments.length + 1;
    const newUser: Department = {
      id: newId,
      name,
      parentId,
      leader,
    };
    departments.unshift(newUser);
  }

  // 编辑一个部门
  editOneDep(editInfo: Department) {
    const idx = departments.findIndex((i) => i.id === editInfo.id);
    if (idx === -1) throw new Error(`用户 ID 为 ${editInfo.id} 的信息未找到`);
    console.log(departments[idx]);
    for (const key in editInfo) {
      departments[idx][key] = editInfo[key];
    }
  }
}
