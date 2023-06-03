export interface IDeleteCategoryService {
  execute(id: string): Promise<void>;
}
