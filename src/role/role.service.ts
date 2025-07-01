import { Injectable } from '@nestjs/common';
import { roles } from './role.data';
import { Role, typeFindRole } from './role.type';

@Injectable()
export class RoleService {
  // 获取所有角色列表
  getRolesList() {
    return {
      code: 0,
      list: roles,
    };
  }

  // 显示角色数据
  private showDetailInfo = [...roles];

  // 删除一个角色
  deleteOneRole(id: number) {
    const idx = roles.findIndex((item) => item.id === id);
    if (idx !== -1) this.showDetailInfo.splice(idx, 1);
    const i = roles.findIndex((item) => item.id === id);
    if (i !== -1) roles.splice(idx, 1);
    console.log(roles);
  }

  // 新建一个角色
  createOneRole(roleInfo: Role) {
    const { name, intro, menus } = roleInfo;
    const newId = roles.length + 1;
    const newRole = {
      id: newId,
      name,
      intro,
      menus,
    };
    roles.unshift(newRole);
    console.log(roles);
  }

  // 查询角色
  findRole(findInfo: typeFindRole) {
    const cnd = new Map();
    for (const key in findInfo) {
      if (findInfo[key] === '') continue;
      cnd.set(key, findInfo[key]);
    }
    if (cnd.size === 0) {
      this.showDetailInfo = [...roles];
      return;
    }
    this.showDetailInfo = roles.filter((item) => {
      for (const [key, value] of cnd) {
        if (item[key] !== value) return false;
        return true;
      }
    });
  }

  // 显示角色列表
  postRoleInfo(size: number, offset: number) {
    const res: Role[] = []; // 用来返回此次调用接口该展现的数据
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

  // 编辑角色
  editRole(info: Role) {
    const idx = roles.findIndex((i) => i.id === info.id);
    console.log(roles[idx]);
    for (const key in roles[idx]) {
      console.log(roles[idx][key], info[key]);
      roles[idx][key] = info[key];
    }
    console.log(roles[idx]);
  }
}
