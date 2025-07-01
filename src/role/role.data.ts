import { Role } from './role.type';

export const roles: Role[] = [
  {
    id: 1,
    name: '超级管理员',
    intro: '所有权限',
    menus: [1, 2, 3, 4, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61],
  },
  { id: 2, name: '普通管理员', intro: '部分权限', menus: [1, 2] },
  { id: 3, name: '员工', intro: '仅供系统总览和随便聊聊', menus: [1, 3] },
];
