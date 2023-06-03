import { IResponseAgentDTO } from '../domain/dtos';
import { IAgentsRepository } from '../domain/repositories/IAgentsRepository';
import { IListAgentsService } from '../domain/services';

export class ListAgentsService implements IListAgentsService {
  constructor(private agentsRepository: IAgentsRepository) {}

  public async execute(): Promise<IResponseAgentDTO[]> {
    const agents = await this.agentsRepository.findAll();
    return agents;
  }
}
