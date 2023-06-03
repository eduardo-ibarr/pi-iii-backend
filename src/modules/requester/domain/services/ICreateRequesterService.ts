import { ICreateRequesterDTO, IResponseRequesterDTO } from '../dtos';

export interface ICreateRequesterService {
  execute(data: ICreateRequesterDTO): Promise<IResponseRequesterDTO>;
}
