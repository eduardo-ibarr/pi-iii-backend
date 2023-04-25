import { ISector, ICreateSector, IUpdateSector } from '../models';

export interface ISectorsRepository {
  findById(id: string): Promise<ISector | null>;
  remove(id: string): Promise<void>;
  findAll(): Promise<ISector[]>;
  create({ name }: ICreateSector): Promise<ISector>;
  update({ name }: IUpdateSector): Promise<void>;
}
