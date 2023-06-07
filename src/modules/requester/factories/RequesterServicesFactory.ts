import { IRequestersRepository } from '../domain/repositories/IRequestersRepository';
import { IHashProvider } from '../../../providers/HashProvider/models/IHashProvider';
import {
  ICreateRequesterService,
  IListRequestersService,
  IShowRequesterService,
  IDeleteRequesterService,
  IUpdateRequesterService,
  IUpdateRequesterPasswordService,
} from '../domain/services';
import { RequestersRepository } from '../infra/repositories/RequestersRepository';
import { BcryptHashProvider } from '../../../providers/HashProvider/implementations/BcryptHashProvider';
import {
  CreateRequesterService,
  ListRequestersService,
  ShowRequesterService,
  DeleteRequesterService,
  UpdateRequesterService,
} from '../services';
import { IRequesterServicesFactory } from '../domain/factories/IRequesterServicesFactory';
import { UpdateRequesterPasswordService } from '../services/UpdateRequesterPasswordService';
import { IAdminsRepository } from '../../admins/domain/repositories/IAdminsRepository';
import { AdminsRepository } from '../../admins/infra/repositories/AdminsRepository';
import { IAgentsRepository } from '../../agent/domain/repositories/IAgentsRepository';
import { AgentsRepository } from '../../agent/infra/repositories/AgentsRepository';

export class RequesterServicesFactory implements IRequesterServicesFactory {
  private requestersRepository(): IRequestersRepository {
    return new RequestersRepository();
  }

  private adminsRepository(): IAdminsRepository {
    return new AdminsRepository();
  }

  private agentsRepository(): IAgentsRepository {
    return new AgentsRepository();
  }

  private hashProvider(): IHashProvider {
    return new BcryptHashProvider();
  }

  public createRequesterService(): ICreateRequesterService {
    const agentsRepository = this.agentsRepository();
    const adminsRepository = this.adminsRepository();
    const requestersRepository = this.requestersRepository();
    const hashProvider = this.hashProvider();

    return new CreateRequesterService(
      requestersRepository,
      agentsRepository,
      adminsRepository,
      hashProvider
    );
  }

  public listRequestersService(): IListRequestersService {
    const requestersRepository = this.requestersRepository();

    return new ListRequestersService(requestersRepository);
  }

  public showRequesterService(): IShowRequesterService {
    const requestersRepository = this.requestersRepository();

    return new ShowRequesterService(requestersRepository);
  }

  public deleteRequesterService(): IDeleteRequesterService {
    const requestersRepository = this.requestersRepository();

    return new DeleteRequesterService(requestersRepository);
  }

  public updateRequesterService(): IUpdateRequesterService {
    const agentsRepository = this.agentsRepository();
    const adminsRepository = this.adminsRepository();
    const requestersRepository = this.requestersRepository();

    return new UpdateRequesterService(
      requestersRepository,
      agentsRepository,
      adminsRepository
    );
  }

  public updateRequesterPasswordService(): IUpdateRequesterPasswordService {
    const agentsRepository = this.requestersRepository();
    const hashProvider = this.hashProvider();

    return new UpdateRequesterPasswordService(agentsRepository, hashProvider);
  }
}
