import { IResponseRequesterDTO, IUpdateRequesterDTO } from '../dtos';

export interface IUpdateRequesterService {
  execute(data: IUpdateRequesterDTO): Promise<IResponseRequesterDTO>;
}
