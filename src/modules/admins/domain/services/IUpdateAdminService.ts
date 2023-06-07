import { IResponseAdminDTO, IUpdateAdminDTO } from '../dtos';

export interface IUpdateAdminService {
  execute(data: IUpdateAdminDTO): Promise<IResponseAdminDTO>;
}
