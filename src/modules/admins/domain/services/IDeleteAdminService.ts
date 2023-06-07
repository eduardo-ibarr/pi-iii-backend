export interface IDeleteAdminService {
  execute(id: string): Promise<void>;
}
