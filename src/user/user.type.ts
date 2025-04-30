import { Department } from 'src/department/department.type';
import { Role } from 'src/role/role.type';
// 用户详细信息类型定义
export interface IuserDetail {
  id: number;
  name: string;
  realname: string;
  cellphone: string;
  enable: number;
  createAt: string;
  updateAt: string;
  department: Department;
  role: Role;
}
// 菜单项目类型定义
export interface typeMenuItem {
  id: number;
  name: string;
  type: number;
  url: string;
  icon: string;
  children: Children[];
}
export interface Children {
  id: number;
  url: string;
  name: string;
  type: number;
  children: any;
  parentId: number;
}
// 给用户项类型定义
export interface typeUserItem {
  id: number;
  name: string;
  password: string;
}
// 给用户登录时获取token传入信息时作类型定义
export interface typePayload {
  id: number;
  name: string;
}
// 给查找用户时需要的信息做定义
export interface typeFindUserPayload {
  size: number;
  offset: number;
  name?: string;
  realname?: string;
  cellphone?: string;
  enable?: number;
  createAt?: string;
}
// 给新建用户时用户数据定义类型
export interface typeUserInfo {
  name: string;
  realname: string;
  password: string;
  cellphone: string;
  departmentId: number;
  roleId: number;
}
