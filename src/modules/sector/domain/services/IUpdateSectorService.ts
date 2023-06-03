import { IResponseSectorDTO, IUpdateSectorDTO } from '../dtos';

export interface IUpdateSectorService {
  execute(data: IUpdateSectorDTO): Promise<IResponseSectorDTO>;
}
