import { IAgentsRepository } from '../domain/repositories/IAgentsRepository';
import { IHashProvider } from '../../../providers/HashProvider/models/IHashProvider';
import {
  ICreateAgentService,
  IListAgentsService,
  IShowAgentService,
  IDeleteAgentService,
  IUpdateAgentService,
  IUpdateAgentPasswordService,
} from '../domain/services';
import { AgentsRepository } from '../infra/repositories/AgentsRepository';
import { BcryptHashProvider } from '../../../providers/HashProvider/implementations/BcryptHashProvider';
import {
  CreateAgentService,
  ListAgentsService,
  ShowAgentService,
  DeleteAgentService,
  UpdateAgentService,
} from '../services';
import { IAgentServicesFactory } from '../domain/factories/IAgentServicesFactory';
import { UpdateAgentPasswordService } from '../services/UpdateAgentPasswordService';

export class AgentServicesFactory implements IAgentServicesFactory {
  private agentsRepository(): IAgentsRepository {
    return new AgentsRepository();
  }

  private hashProvider(): IHashProvider {
    return new BcryptHashProvider();
  }

  public createAgentService(): ICreateAgentService {
    const agentsRepository = this.agentsRepository();
    const hashProvider = this.hashProvider();

    return new CreateAgentService(agentsRepository, hashProvider);
  }

  public listAgentsService(): IListAgentsService {
    const agentsRepository = this.agentsRepository();

    return new ListAgentsService(agentsRepository);
  }

  public showAgentService(): IShowAgentService {
    const agentsRepository = this.agentsRepository();

    return new ShowAgentService(agentsRepository);
  }

  public deleteAgentService(): IDeleteAgentService {
    const agentsRepository = this.agentsRepository();

    return new DeleteAgentService(agentsRepository);
  }

  public updateAgentService(): IUpdateAgentService {
    const agentsRepository = this.agentsRepository();

    return new UpdateAgentService(agentsRepository);
  }

  public updateAgentPasswordService(): IUpdateAgentPasswordService {
    const agentsRepository = this.agentsRepository();
    const hashProvider = this.hashProvider();

    return new UpdateAgentPasswordService(agentsRepository, hashProvider);
  }
}
