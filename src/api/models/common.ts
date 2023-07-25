export interface IPaginationParams {
  _page: number;
  _limit: number;
  _sort: string;
  _order: string;
  _q: string;
  _total: number;
}

export interface IListResponse<T> {
  data: T[];
  pagination: IPaginationParams;
}
