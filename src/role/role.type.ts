export interface Role {
  id: number;
  name: string;
  intro: string;
  menus: number[];
}
export interface typeFindRole {
  offset: number;
  size: number;
  name?: string;
  intro?: string;
  menu?: number;
}
