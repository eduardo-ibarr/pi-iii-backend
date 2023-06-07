import { ICreateAdminDTO, IResponseAdminDTO } from '../dtos';

export interface ICreateAdminService {
  execute(data: ICreateAdminDTO): Promise<IResponseAdminDTO>;
}
