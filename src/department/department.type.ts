export interface Department {
  id: number;
  name: string;
  parentId: number | null;
  leader: string;
}
