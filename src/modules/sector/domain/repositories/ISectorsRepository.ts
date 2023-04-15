import { ISector, ICreateSector, IUpdateSector } from '../models';

export interface ISectorsRepository {
  findById(id: string): Promise<ISector | null>;
  delete(id: string): Promise<void>;
  list(): Promise<ISector[]>;
  create({ name }: ICreateSector): Promise<ISector>;
  update({ name }: IUpdateSector): Promise<void>;
}
