import { IResponseSectorDTO, ICreateSectorDTO } from '../dtos';

export interface ICreateSectorService {
  execute(data: ICreateSectorDTO): Promise<IResponseSectorDTO>;
}
