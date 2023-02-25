import { STATE } from './site';

export class Category {
  categoryId: string;
  userId?: number;
  name: string;
  color: string;
  tagName: string;
  state: STATE;
}
