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

export class RequesterServicesFactory implements IRequesterServicesFactory {
  private requestersRepository(): IRequestersRepository {
    return new RequestersRepository();
  }

  private hashProvider(): IHashProvider {
    return new BcryptHashProvider();
  }

  public createRequesterService(): ICreateRequesterService {
    const requestersRepository = this.requestersRepository();
    const hashProvider = this.hashProvider();

    return new CreateRequesterService(requestersRepository, hashProvider);
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
    const requestersRepository = this.requestersRepository();

    return new UpdateRequesterService(requestersRepository);
  }

  public updateRequesterPasswordService(): IUpdateRequesterPasswordService {
    const agentsRepository = this.requestersRepository();
    const hashProvider = this.hashProvider();

    return new UpdateRequesterPasswordService(agentsRepository, hashProvider);
  }
}
