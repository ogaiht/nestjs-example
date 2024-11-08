import { Pagination } from './pagination';

export interface UserFilter extends Pagination {
  name?: string;
  email?: string;
}
