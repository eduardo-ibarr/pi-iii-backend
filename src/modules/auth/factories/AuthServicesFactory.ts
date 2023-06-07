import { IAgentsRepository } from '../../../modules/agent/domain/repositories/IAgentsRepository';
import { AgentsRepository } from '../../../modules/agent/infra/repositories/AgentsRepository';
import { RequestersRepository } from '../../requester/infra/repositories/RequestersRepository';
import { LoginService } from '../services/LoginService';
import { ILoginService } from '../domain/services/ILoginService';
import { IHashProvider } from '../../../providers/HashProvider/models/IHashProvider';
import { BcryptHashProvider } from '../../../providers/HashProvider/implementations/BcryptHashProvider';
import { IAuthServicesFactory } from '../domain/factories/IAuthFactory';
import { IAdminsRepository } from '../../admins/domain/repositories/IAdminsRepository';
import { AdminsRepository } from '../../admins/infra/repositories/AdminsRepository';

export class AuthServicesFactory implements IAuthServicesFactory {
  private agentsRepository(): IAgentsRepository {
    return new AgentsRepository();
  }

  private adminsRepository(): IAdminsRepository {
    return new AdminsRepository();
  }

  private requestersRepository(): RequestersRepository {
    return new RequestersRepository();
  }

  private hashProvider(): IHashProvider {
    return new BcryptHashProvider();
  }

  public login(): ILoginService {
    const agentsRepository = this.agentsRepository();
    const requestersRepository = this.requestersRepository();
    const adminsRepository = this.adminsRepository();
    const hashProvider = this.hashProvider();

    return new LoginService(
      requestersRepository,
      agentsRepository,
      adminsRepository,
      hashProvider
    );
  }
}
