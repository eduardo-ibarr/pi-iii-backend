import {
  IAgentPasswordDTO,
  ICreateAgentDTO,
  IReturnAgentDTO,
  IUpdateAgentDTO,
} from '../dtos';

export interface IAgentsRepository {
  findById(id: string): Promise<IReturnAgentDTO | null>;
  findByIdReturningPassword(id: string): Promise<IAgentPasswordDTO | null>;
  findByEmail(email: string): Promise<IReturnAgentDTO | null>;
  remove(id: string): Promise<any>;
  findAll(): Promise<IReturnAgentDTO[]>;
  create(data: ICreateAgentDTO): Promise<IReturnAgentDTO>;
  update(data: IUpdateAgentDTO): Promise<IReturnAgentDTO>;
}
