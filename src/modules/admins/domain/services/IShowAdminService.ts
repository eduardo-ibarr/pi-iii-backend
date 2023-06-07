import { IResponseAdminDTO } from '../dtos';

export interface IShowAdminService {
  execute(id: string): Promise<IResponseAdminDTO | null>;
}
