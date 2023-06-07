import {
  IResponseAdminDTO,
  ICreateAdminDTO,
  IUpdateAdminDTO,
  IAdminAuthDTO,
} from '../dtos';

export interface IAdminsRepository {
  findById(id: string): Promise<IResponseAdminDTO | null>;
  findByEmail(email: string): Promise<IResponseAdminDTO | null>;
  findByEmailReturningAuthData(email: string): Promise<IAdminAuthDTO | null>;
  remove(id: string): Promise<void>;
  findAll(): Promise<IResponseAdminDTO[]>;
  create(data: ICreateAdminDTO): Promise<IResponseAdminDTO>;
  update(data: IUpdateAdminDTO): Promise<IResponseAdminDTO>;
}
