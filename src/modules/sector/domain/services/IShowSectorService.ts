import { IResponseSectorDTO } from '../dtos';

export interface IShowSectorService {
  execute(id: string): Promise<IResponseSectorDTO | null>;
}
