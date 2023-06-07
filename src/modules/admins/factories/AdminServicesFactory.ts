import { IAdminsRepository } from '../domain/repositories/IAdminsRepository';
import { IHashProvider } from '../../../providers/HashProvider/models/IHashProvider';
import {
  ICreateAdminService,
  IListAdminsService,
  IShowAdminService,
  IDeleteAdminService,
  IUpdateAdminService,
  IUpdateAdminPasswordService,
} from '../domain/services';
import { AdminsRepository } from '../infra/repositories/AdminsRepository';
import { BcryptHashProvider } from '../../../providers/HashProvider/implementations/BcryptHashProvider';
import {
  CreateAdminService,
  ListAdminsService,
  ShowAdminService,
  DeleteAdminService,
  UpdateAdminService,
} from '../services';
import { IAdminServicesFactory } from '../domain/factories/AdminServicesFactory';
import { UpdateAdminPasswordService } from '../services/UpdateAdminPasswordService';
import { RequestersRepository } from '../../requester/infra/repositories/RequestersRepository';
import { IRequestersRepository } from '../../requester/domain/repositories/IRequestersRepository';
import { AgentsRepository } from '../../agent/infra/repositories/AgentsRepository';
import { IAgentsRepository } from '../../agent/domain/repositories/IAgentsRepository';

export class AdminServicesFactory implements IAdminServicesFactory {
  private adminsRepository(): IAdminsRepository {
    return new AdminsRepository();
  }

  private agentsRepository(): IAgentsRepository {
    return new AgentsRepository();
  }

  private requestersRepository(): IRequestersRepository {
    return new RequestersRepository();
  }

  private hashProvider(): IHashProvider {
    return new BcryptHashProvider();
  }

  public createAdminService(): ICreateAdminService {
    const adminsRepository = this.adminsRepository();
    const agentsRepository = this.agentsRepository();
    const requestersRepository = this.requestersRepository();
    const hashProvider = this.hashProvider();

    return new CreateAdminService(
      adminsRepository,
      requestersRepository,
      agentsRepository,
      hashProvider
    );
  }

  public listAdminsService(): IListAdminsService {
    const adminsRepository = this.adminsRepository();

    return new ListAdminsService(adminsRepository);
  }

  public showAdminService(): IShowAdminService {
    const adminsRepository = this.adminsRepository();

    return new ShowAdminService(adminsRepository);
  }

  public deleteAdminService(): IDeleteAdminService {
    const adminsRepository = this.adminsRepository();

    return new DeleteAdminService(adminsRepository);
  }

  public updateAdminService(): IUpdateAdminService {
    const adminsRepository = this.adminsRepository();
    const agentsRepository = this.agentsRepository();
    const requestersRepository = this.requestersRepository();

    return new UpdateAdminService(
      adminsRepository,
      requestersRepository,
      agentsRepository
    );
  }

  public updateAdminPasswordService(): IUpdateAdminPasswordService {
    const agentsRepository = this.adminsRepository();
    const hashProvider = this.hashProvider();

    return new UpdateAdminPasswordService(agentsRepository, hashProvider);
  }
}
