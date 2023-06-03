import { ISectorsRepository } from '../domain/repositories/ISectorsRepository';
import {
  ICreateSectorService,
  IListSectorsService,
  IShowSectorService,
  IDeleteSectorService,
  IUpdateSectorService,
} from '../domain/services';
import {
  CreateSectorService,
  ListSectorsService,
  ShowSectorService,
  DeleteSectorService,
  UpdateSectorService,
} from '../services';
import { ISectorServicesFactory } from '../domain/factories/ISectorServicesFactory';
import { SectorsRepository } from '../infra/repositories/SectorsRepository';

export class SectorServicesFactory implements ISectorServicesFactory {
  private sectorsRepository(): ISectorsRepository {
    return new SectorsRepository();
  }

  public createSectorService(): ICreateSectorService {
    const sectorsRepository = this.sectorsRepository();

    return new CreateSectorService(sectorsRepository);
  }

  public listSectorsService(): IListSectorsService {
    const sectorsRepository = this.sectorsRepository();

    return new ListSectorsService(sectorsRepository);
  }

  public showSectorService(): IShowSectorService {
    const sectorsRepository = this.sectorsRepository();

    return new ShowSectorService(sectorsRepository);
  }

  public deleteSectorService(): IDeleteSectorService {
    const sectorsRepository = this.sectorsRepository();

    return new DeleteSectorService(sectorsRepository);
  }

  public updateSectorService(): IUpdateSectorService {
    const sectorsRepository = this.sectorsRepository();

    return new UpdateSectorService(sectorsRepository);
  }
}
