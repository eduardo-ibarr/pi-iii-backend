import {
  IAgentAuthDTO,
  ICreateAgentDTO,
  IResponseAgentDTO,
  IUpdateAgentDTO,
} from '../dtos';

export interface IAgentsRepository {
  findById(id: string): Promise<IResponseAgentDTO | null>;
  findByEmailReturningAuthData(email: string): Promise<IAgentAuthDTO | null>;
  findByEmail(email: string): Promise<IResponseAgentDTO | null>;
  remove(id: string): Promise<void>;
  findAll(): Promise<IResponseAgentDTO[]>;
  create(data: ICreateAgentDTO): Promise<IResponseAgentDTO>;
  update(data: IUpdateAgentDTO): Promise<IResponseAgentDTO>;
}
