import {
  IResponseRequesterDTO,
  ICreateRequesterDTO,
  IUpdateRequesterDTO,
  IRequesterAuthDTO,
} from '../dtos';

export interface IRequestersRepository {
  findById(id: string): Promise<IResponseRequesterDTO | null>;
  findByEmail(email: string): Promise<IResponseRequesterDTO | null>;
  findByEmailReturningAuthData(
    email: string
  ): Promise<IRequesterAuthDTO | null>;
  remove(id: string): Promise<void>;
  findAll(): Promise<IResponseRequesterDTO[]>;
  create(data: ICreateRequesterDTO): Promise<IResponseRequesterDTO>;
  update(data: IUpdateRequesterDTO): Promise<IResponseRequesterDTO>;
}
