import {
  ICreateSectorDTO,
  IResponseSectorDTO,
  IUpdateSectorDTO,
} from '../dtos';

export interface ISectorsRepository {
  findById(id: string): Promise<IResponseSectorDTO | null>;
  findByName(name: string): Promise<IResponseSectorDTO | null>;
  remove(id: string): Promise<void>;
  findAll(): Promise<IResponseSectorDTO[]>;
  create({ name }: ICreateSectorDTO): Promise<IResponseSectorDTO>;
  update({ name }: IUpdateSectorDTO): Promise<IResponseSectorDTO>;
}
