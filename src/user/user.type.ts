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
export interface Department {
  id: number;
  name: string;
}
export interface Role {
  id: number;
  name: string;
  intro: string;
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
  cellphone: number;
  departmentId: number;
  roleId: number;
}
