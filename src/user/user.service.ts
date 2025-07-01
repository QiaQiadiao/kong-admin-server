import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  IuserDetail,
  typeFindUserPayload,
  typePayload,
  typeUserInfo,
  typeUserItem,
} from './user.type';
import { detailInfo, users, menus } from './user.data.index';
import { roles } from 'src/role/role.data';
import { departments } from 'src/department/department.data';
@Injectable()
export class UserService {
  constructor(private jwtService: JwtService) {}

  // 验证
  validateUser(name: string, password: string) {
    const user = users.find((item) => item.name === name);
    if (user && user.password === password) {
      return user;
    }
  }
  // 生成token
  getToken(user: typePayload) {
    const payload: typePayload = { id: user.id, name: user.name };
    console.log({
      id: user.id,
      access_token: this.jwtService.sign(payload),
    });

    return {
      id: user.id,
      access_token: this.jwtService.sign(payload),
    };
  }
  // 通过id获取用户详细信息
  getUserInfoById(id: number) {
    const info = detailInfo.find((item) => item.id === id);
    if (!info) throw new Error(`用户 ID 为 ${id} 的信息未找到`);
    return info;
  }
  // 通过角色id获取角色菜单
  getUserMenusByRoleId(id: number) {
    // 先通过前端发过来的角色id 在role角色表中找到对应角色是什么
    const role = roles.find((item) => item.id === id);
    if (!role) throw new Error(`角色 ID 为 ${id} 的信息未找到`);
    const ans: Array<object> = [];
    for (const i of role.menus) {
      const res = menus.find((item) => item.id === i);
      if (res) ans.push(res);
    }
    return ans;
  }

  // 查询用户列表(detailInfo)
  private showDetailInfo: IuserDetail[] = [...detailInfo];
  findUserDetailInfo(payload: typeFindUserPayload) {
    const cnd = new Map();
    for (const key in payload) {
      if (payload[key] === '') continue;
      cnd.set(key, payload[key]);
    }
    if (cnd.size === 0) {
      this.showDetailInfo = [...detailInfo];
      return;
    }
    this.showDetailInfo = detailInfo.filter((item) => {
      for (const [key, value] of cnd) {
        if (item[key] !== value) return false;
      }
      return true;
    });
  }

  // 获取用户详细信息
  postUserDetailInfo(size: number, offset: number) {
    const res: IuserDetail[] = []; // 用来返回此次调用接口该展现的数据
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

  // 删除一个用户
  deleteOneUser(id: number) {
    //先在对应显示的数据数组找是否有目标数据
    const idx = this.showDetailInfo.findIndex((item) => item.id === id);
    if (idx !== -1) this.showDetailInfo.splice(idx, 1);
    //再删除数据库中的
    const i = detailInfo.findIndex((item) => item.id === id);
    if (i !== -1) detailInfo.splice(i, 1);
  }

  // 新建一个用户
  createOneUser(userInfo: typeUserInfo) {
    const { name, realname, password, cellphone, departmentId, roleId } =
      userInfo;
    const newId = detailInfo.length + 1;
    const newDepartment = departments.find((item) => item.id === departmentId);
    if (!newDepartment)
      throw new Error(`部门 ID 为 ${departmentId} 的信息未找到`);
    const newRole = roles.find((item) => item.id === roleId);
    if (!newRole) throw new Error(`角色 ID 为 ${roleId} 的信息未找到`);
    const newUser: IuserDetail = {
      id: newId,
      name,
      realname,
      cellphone,
      enable: 1,
      createAt: '2024-5-1',
      updateAt: '2025-5-1',
      department: newDepartment,
      role: newRole,
    };
    const newUserLoginItem: typeUserItem = {
      id: roleId,
      name,
      password,
    };
    users.push(newUserLoginItem);
    console.log(users);
    detailInfo.unshift(newUser);
  }

  // 更改一个用户
  editOneUser(editInfo: IuserDetail) {
    const idx = detailInfo.findIndex((i) => i.id === editInfo.id);
    if (idx === -1) throw new Error(`用户 ID 为 ${editInfo.id} 的信息未找到`);
    for (const key in editInfo) {
      if (
        key === 'departmentId' &&
        detailInfo[idx]['department'].id !== editInfo[key]
      ) {
        const temp = departments.find((i) => i.id === editInfo[key]);
        if (!temp) throw new Error(`部门 ID 为 ${editInfo[key]} 的信息未找到`);
        detailInfo[idx]['department'] = temp;
        continue;
      }
      if (key === 'roleId' && detailInfo[idx]['role'].id !== editInfo[key]) {
        const target = roles.find((i) => i.id === editInfo[key]);
        if (!target)
          throw new Error(`角色 ID 为 ${editInfo[key]} 的信息未找到`);
        detailInfo[idx]['role'] = target;
        continue;
      }
      if (editInfo[key] === detailInfo[idx][key] || key === 'password')
        continue;
      detailInfo[idx][key] = editInfo[key];
    }
  }
}
