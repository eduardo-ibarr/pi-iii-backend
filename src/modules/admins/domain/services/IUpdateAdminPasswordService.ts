import { IUpdateAdminPasswordDTO } from '../dtos';

export interface IUpdateAdminPasswordService {
  execute(data: IUpdateAdminPasswordDTO): Promise<void>;
}
