export interface Department {
  id: number;
  name: string;
  parentId: number | null;
  leader: string;
}
// 给查找部门时需要的信息做定义
export interface typeFindDepPayload {
  size: number;
  offset: number;
  name?: string;
  leader?: string;
  parentId?: number | null;
}

// 给新建部门时需要的信息做定义
export interface typeCreateDep {
  name: string;
  leader: string;
  parentId: number | null;
}
