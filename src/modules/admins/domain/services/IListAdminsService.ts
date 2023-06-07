import { IResponseAdminDTO } from '../dtos';

export interface IListAdminsService {
  execute(): Promise<IResponseAdminDTO[]>;
}
