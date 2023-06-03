import { IResponseSectorDTO } from '../dtos';

export interface IListSectorsService {
  execute(): Promise<IResponseSectorDTO[]>;
}
