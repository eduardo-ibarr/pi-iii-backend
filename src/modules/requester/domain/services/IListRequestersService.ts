import { IResponseRequesterDTO } from '../dtos';

export interface IListRequestersService {
  execute(): Promise<IResponseRequesterDTO[]>;
}
